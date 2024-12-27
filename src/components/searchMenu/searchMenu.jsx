import { useState, useEffect, useRef } from "react";
import api from "../../../api.js";
import ProfileCard from "../profileCard/profileCard.jsx";
import classes from "./searchMenu.module.css";

function SearchMenu() {
  const [results, setResults] = useState(null);
  const lastQuery = useRef("");
  const inputRef = useRef();
  let curTimeout = 0;

  useEffect(() => {
    search("");
  }, []);

  function search(query) {
    lastQuery.current = query;
    api.searchProfiles(query).then((res) => {
      setResults(res.profiles);
    });
  }

  function inputChange() {
    clearTimeout(curTimeout);
    curTimeout = setTimeout(() => {
      search(inputRef.current.value);
    }, 750);
  }

  return (
    <div className={classes.container}>
      <h1 className="huge-text">Search</h1>
      <input
        ref={inputRef}
        className="input hidden-round-border"
        type="text"
        placeholder="Search by username"
        onChange={inputChange}
      />
      <hr className="seperator" />
      {results?.length > 0 ? (
        <div className={classes.resultList}>
          {results &&
            results.map((res) => {
              return <ProfileCard key={res.id} profile={res} />;
            })}
        </div>
      ) : (
        <p style={{ wordBreak: "break-all" }}>
          No results match your query &quot;{lastQuery.current}&quot;
        </p>
      )}
    </div>
  );
}

export default SearchMenu;
