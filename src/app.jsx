import { useState, useEffect, useRef } from "react";
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

  themeManager.updateBody()

  useEffect(() => {
    api.getMyProfile().then((res) => {
      setProfile(res.profile);
    });
  }, []);

  const modalCallback = (controls) => {
    modalRef.current = controls;
  };
  const dialogCallback = (controls) => {
    dialogRef.current = controls;
  };

  return (
    <profileContext.Provider value={profile}>
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
