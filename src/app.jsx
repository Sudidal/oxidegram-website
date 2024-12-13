import { useState, useEffect, useRef } from "react";
import { useNavigate } from "react-router-dom";
import profileContext from "./contexts/profileContext.js";
import modalContext from "./contexts/modalContext.js";
import dialogContext from "./contexts/dialogContext.js";
import { Outlet } from "react-router-dom";
import api from "../api.js";
import Modal from "./components/modal/modal.jsx";
import Dialog from "./components/dialog/dialog.jsx";
import themeManager from "./utils/themeManager.js";

function App() {
  const [profile, setProfile] = useState(null);
  const modalRef = useRef(null);
  const dialogRef = useRef(null);
  const nav = useNavigate();

  themeManager.updateBody();

  useEffect(() => {
    reqProfile();
  }, []);

  function login(data) {
    api.login(data).then((res) => {
      reqProfile();
      nav("/");
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
      setProfile(res.profile);
    });
  }

  const modalCallback = (controls) => {
    modalRef.current = controls;
  };
  const dialogCallback = (controls) => {
    dialogRef.current = controls;
  };

  return (
    <profileContext.Provider value={{ ...profile, login, logout }}>
      <modalContext.Provider value={modalRef.current}>
        <dialogContext.Provider value={dialogRef.current}>
          <Modal callback={modalCallback} />
          <Dialog callback={dialogCallback} />
          {<Outlet />}
        </dialogContext.Provider>
      </modalContext.Provider>
    </profileContext.Provider>
  );
}

export default App;
