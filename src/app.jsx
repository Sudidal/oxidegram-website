import { useState, useEffect, useRef } from "react";
import profileContext from "./contexts/profileContext.js";
import modalContext from "./contexts/modalContext.js";
import { Outlet } from "react-router-dom";
import api from "../api.js";
import Modal from "./components/modal/modal.jsx";

function App() {
  const [profile, setProfile] = useState(null);
  const modalRef = useRef(null);

  useEffect(() => {
    api.getMyProfile().then((res) => {
      setProfile(res.profile);
    });
  }, []);

  const modalCallback = (controls) => {
    modalRef.current = controls;
  };

  return (
    <profileContext.Provider value={profile}>
      <modalContext.Provider value={modalRef}>
        <Modal callback={modalCallback} />
        <Outlet />
      </modalContext.Provider>
    </profileContext.Provider>
  );
}

export default App;
