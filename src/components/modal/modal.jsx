import React from "react";
import modalContext from "../../contexts/modalContext.js";
import PropTypes from "prop-types";
import classes from "./modal.module.css";

function Modal({ callback }) {
  const [menues, setMenues] = React.useState([]);

  callback({
    open: open,
  });

  function open(input) {
    const menuObj = {
      element: input,
      open: open,
      close: () => {
        setMenues((curMenues) => curMenues.filter((val) => val !== menuObj));
      },
    };
    setMenues((curMenues) => [...curMenues, menuObj]);
  }

  let count = 0;

  return (
    <div>
      {menues.map((menu) => {
        return <RealModal key={count} menu={menu} />;
      })}
    </div>
  );
}

function RealModal({ menu }) {
  const ref = React.useRef();

  React.useEffect(() => {
    if (ref.current) {
      ref.current.showModal();
    }
  }, [ref]);

  return (
    <dialog
      ref={ref}
      className={classes.dialog}
      onClick={(ev) => {
        if (ev.target === ev.currentTarget) {
          menu.close();
        }
      }}
    >
      <modalContext.Provider
        value={{
          open: menu.open,
          close: menu.close,
        }}
      >
        {menu.element}
      </modalContext.Provider>
    </dialog>
  );
}

Modal.propTypes = {
  callback: PropTypes.func,
};
RealModal.propTypes = {
  menu: PropTypes.object,
};

export default Modal;
