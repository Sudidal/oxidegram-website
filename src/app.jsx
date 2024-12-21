import { useState, useEffect, useRef } from "react";
import { useNavigate } from "react-router-dom";
import profileContext from "./contexts/profileContext.js";
import modalContext from "./contexts/modalContext.js";
import dialogContext from "./contexts/dialogContext.js";
import alertContext from "./contexts/alertContext.js";
import { Outlet } from "react-router-dom";
import SidePanel from "./components/sidePanel/sidePanel.jsx";
import api from "../api.js";
import Modal from "./components/modal/modal.jsx";
import Dialog from "./components/dialog/dialog.jsx";
import Alert from "./components/alert/alert.jsx";
import themeManager from "./utils/themeManager.js";

function App() {
  const [profile, setProfile] = useState(null);
  const [panelState, setPanelState] = useState("");
  const modalRef = useRef(null);
  const dialogRef = useRef(null);
  const alertRef = useRef(null);
  const nav = useNavigate();

  themeManager.updateBody();

  useEffect(() => {
    reqProfile();
  }, []);

  function login(data) {
    api.login(data).then((res) => {
      alertRef.current.show(res.msg);
      if (res.ok) {
        reqProfile();
        nav("/");
      }
    });
  }
  function logout() {
    api.logout().then(() => {
      setProfile(null);
      nav("/accounts");
    });
  }

  function reqProfile() {
    api.getMyProfile().then((res) => {
      alertRef.current.show(res.msg);
      if (res.ok) {
        setProfile(res.profile);
      }
    });
  }

  function outletRenderCallback(mode) {
    if (mode === "collapse-panel") {
      setPanelState("collapse");
    } else if (mode === "no-panel") {
      setPanelState("hide");
    } else {
      setPanelState("shrink");
    }
  }

  const modalCallback = (controls) => {
    modalRef.current = controls;
  };
  const dialogCallback = (controls) => {
    dialogRef.current = controls;
  };
  const alertCallback = (controls) => {
    alertRef.current = controls;
  };

  return (
    <profileContext.Provider value={{ ...profile, login, logout }}>
      <modalContext.Provider value={modalRef.current}>
        <dialogContext.Provider value={dialogRef.current}>
          <alertContext.Provider value={alertRef.current}>
            <Modal callback={modalCallback} />
            <Dialog callback={dialogCallback} />
            <Alert callback={alertCallback} />
            <SidePanel state={panelState} />
            <Outlet context={outletRenderCallback} />
          </alertContext.Provider>
        </dialogContext.Provider>
      </modalContext.Provider>
    </profileContext.Provider>
  );
}

export default App;
