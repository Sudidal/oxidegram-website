import { useState, useRef, useEffect } from "react";
import PropTypes from "prop-types";
import InlineImageText from "../inlineImageText/inlineImageText.jsx";
import classes from "./tabs.module.css";

function Tabs({ tabs = [], initTab }) {
  const [tabIndex, setTabIndex] = useState(0);
  const tabsParentRef = useRef(null);

  function switchTab(index) {
    setTabIndex(index);
  }

  useEffect(() => {
    setTabIndex(0)
    tabs.forEach((tab, i) => {
      if (tab.name === initTab) {
        setTabIndex(i);
      }
    });
  }, [initTab, tabs]);

  if (tabsParentRef.current) {
    tabsParentRef.current.childNodes.forEach((child) => {
      child.classList.remove(classes.selected);
    });
    tabsParentRef.current.childNodes[tabIndex].classList.add(classes.selected);
  }

  return (
    <div className={classes.container}>
      <div ref={tabsParentRef} className={classes.tabs}>
        {tabs.map((tab, i) => {
          return (
            <button
              className={`unstyled-btn ${classes.tab}`}
              key={i}
              onClick={(ev) => {
                ev.relatedTarget;
                switchTab(i);
              }}
            >
              <InlineImageText path={tab.iconPath} text={tab.name} />
            </button>
          );
        })}
      </div>
      <div className={classes.body}>{tabs[tabIndex]?.content}</div>
    </div>
  );
}

Tabs.propTypes = {
  tabs: PropTypes.array,
  initTab: PropTypes.string,
};

export default Tabs;
