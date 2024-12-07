import { useState, useEffect } from "react";
import api from "../../../api.js";
import ProfileCard from "../profileCard/profileCard.jsx";
import classes from "./searchMenu.module.css";

function SearchMenu() {
  const [results, setResults] = useState(null);
  let curTimeout = 0;

  useEffect(() => {
    search("");
  }, []);

  function search(query) {
    api.searchProfiles(query).then((res) => {
      setResults(res.profiles);
    });
  }

  function inputChange(ev) {
    clearTimeout(curTimeout);
    curTimeout = setTimeout(() => {
      search(ev.target.value);
    }, 750);
  }

  return (
    <div className={classes.container}>
      <h1 className="huge-text">Search</h1>
      <input
        className="input hidden-round-border"
        type="text"
        placeholder="Search by username"
        onChange={inputChange}
      />
      <hr className="seperator" />
      <div className={classes.resultList}>
        {results &&
          results.map((res) => {
            return <ProfileCard key={res.id} profile={res} />;
          })}
      </div>
    </div>
  );
}

export default SearchMenu;
