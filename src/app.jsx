import { useState, useEffect } from "react";
import profileContext from "./contexts/userContext.js";
import Home from "./pages/home.jsx";
import api from "../api.js";

function App() {
  const [profile, setProfile] = useState(null);

  useEffect(() => {
    api.getMyProfile().then((res) => {
      setProfile(res.profile);
    });
  }, []);

  return (
    <profileContext.Provider value={profile}>
      <Home />
    </profileContext.Provider>
  );
}

export default App;
