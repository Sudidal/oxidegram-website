import classes from "./footer.module.css";

function Footer() {
  return (
    <div>
      <nav className={classes.nav}>
        <ul>
          <li className="tertiary-text">About</li>
          <li className="tertiary-text">Help</li>
          <li className="tertiary-text">Press</li>
          <li className="tertiary-text">API</li>
          <li className="tertiary-text">Jobs</li>
          <li className="tertiary-text">Privacy</li>
          <li className="tertiary-text">Terms</li>
          <li className="tertiary-text">Locations</li>
          <li className="tertiary-text">Language</li>
          <li className="tertiary-text">Oxide</li>
          <li className="tertiary-text">Verified</li>
        </ul>
      </nav>
      <p className="tertiary-text">© 2024 OXIDEGRAM FROM OXIDE</p>
    </div>
  );
}

export default Footer;
