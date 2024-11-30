import { useState, useEffect } from "react";
import PropTypes from "prop-types";
import InlineImageText from "../inlineImageText/inlineImageText.jsx";
import classes from "./tabs.module.css";

function Tabs({ tabs = [], initTab, bottomBorder }) {
  const [tabIndex, setTabIndex] = useState(0);

  function switchTab(index) {
    setTabIndex(index);
  }

  useEffect(() => {
    setTabIndex(0);
    if (initTab) {
      tabs.forEach((tab, i) => {
        if (tab.name === initTab) {
          setTabIndex(i);
        }
      });
    }
  }, [initTab, tabs]);

  return (
    <div className={classes.container}>
      <div className={`${classes.tabs} ${bottomBorder ? classes.bottom : ""}`}>
        {tabs.map((tab, i) => {
          return (
            <button
              className={`unstyled-btn ${classes.tab} ${
                tabs[tabIndex].name === tab.name ? classes.selected : ""
              }`}
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
  bottomBorder: PropTypes.bool,
};

export default Tabs;
