import classes from "./footer.module.css";

function Footer() {
  return (
    <footer className={classes.container}>
      <div className={classes.top}>
        <div className="secon-text small-text">Oxide</div>
        <div className="secon-text small-text">About</div>
        <div className="secon-text small-text">Blog</div>
        <div className="secon-text small-text">Jobs</div>
        <div className="secon-text small-text">Help</div>
        <div className="secon-text small-text">API</div>
        <div className="secon-text small-text">Privacy</div>
        <div className="secon-text small-text">Terms</div>
        <div className="secon-text small-text">Locations</div>
        <div className="secon-text small-text">Instagram Lite</div>
        <div className="secon-text small-text">Threads</div>
        <div className="secon-text small-text">
          Contact Uploading & Non-Users
        </div>
        <div className="secon-text small-text">Oxide Verified</div>
      </div>
      <div className={classes.bottom}>
        <select name="language" className="select-input" id="language-select">
          <option value="en">English</option>
          <option value="ar">Arabic</option>
        </select>
        <p className="secon-text small-text">© 2024 Oxidegram from oxide</p>
      </div>
    </footer>
  );
}

export default Footer;
