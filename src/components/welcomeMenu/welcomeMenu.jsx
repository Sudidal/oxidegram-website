import { useContext } from "react";
import { useNavigate } from "react-router-dom";
import modalContext from "../../contexts/modalContext.js";
import classes from "./welcomeMenu.module.css";

function WelcomeMenu() {
  const modal = useContext(modalContext);
  const nav = useNavigate();

  return (
    <div className={classes.container}>
      <section className={classes.section}>
        <h1 className="huge-text middle-text">Welcome to Oxidegram</h1>
        <div className="middle-text">
          The clone of <span className="semibold-text">Instagram</span>
        </div>
      </section>
      <section className={classes.section}>
        <p className="semibold-text">Features: </p>
        <ul>
          <li>Creating and managing accounts</li>
          <li>Posting photos and videos and commenting on them</li>
          <li>Real-time messaging through WebSockets</li>
        </ul>
      </section>
      <section className={classes.section}>
        <p className="semibold-text">Things to consider: </p>
        <ul>
          <li>Information you share here is not guaranteed to be safe</li>
          <li>
            Some UI elements are not functional (They are just for decoration)
          </li>
        </ul>
      </section>
      <section className={classes.bottom}>
        <button className="secondary-btn" onClick={modal.close}>
          Continue as a guest
        </button>
        <button
          className="primary-btn"
          onClick={() => {
            nav("/accounts");
            modal.close();
          }}
        >
          Log in
        </button>
      </section>
    </div>
  );
}

export default WelcomeMenu;
