import api from "../../../api.js";
import { useRef } from "react";
import { useNavigate, Link } from "react-router-dom";
import SvgFileToInline from "../svgFileToInline/svgFileToInline.jsx";
import InlineImageText from "../inlineImageText/inlineImageText.jsx";
import classes from "./signup.module.css";

function Signup() {
  const emailInput = useRef(null);
  const passwordInput = useRef(null);
  const fullNameInput = useRef(null);
  const usernameInput = useRef(null);
  const nav = useNavigate();

  return (
    <div className={classes.container}>
      <div className={classes.wrapper}>
        <div className={classes.logo}>
          <SvgFileToInline path={"/icons/instagram-text-logo-large.svg"} />
        </div>
        <form
          className={classes.form}
          onSubmit={(ev) => {
            ev.preventDefault();
            api
              .signup({
                email: emailInput.current.value,
                password: passwordInput.current.value,
                fullName: fullNameInput.current.value,
                username: usernameInput.current.value,
              })
              .then((res) => {
                if (res) {
                  nav("/accounts/login");
                }
              });
          }}
        >
          <p className="secon-text-semibold-big middle-text">
            Sign up to see photos and videos from your friends
          </p>
          <button className={`${classes.btn} primary-btn`}>
            <InlineImageText
              path={"/icons/facebook-logo.svg"}
              text={"Log in with Facebook"}
            />
          </button>
          <div className={classes.division}>
            <hr />
            <p className="secon-text-semibold">OR</p>
            <hr />
          </div>
          <div className={classes.fields}>
            <input
              ref={emailInput}
              name="email"
              className="input"
              type="email"
              placeholder="Email"
            />
            <input
              ref={passwordInput}
              name="password"
              className="input"
              type="password"
              placeholder="Password"
            />
            <input
              ref={fullNameInput}
              name="fullName"
              className="input"
              type="text"
              placeholder="Full Name"
            />
            <input
              ref={usernameInput}
              name="userName"
              className="input"
              type="text"
              placeholder="Username"
            />
          </div>
          <p className="secon-text small-text middle-text">
            People who use our service may have uploaded your contact
            information to Instagram. <span className="link">Learn More</span>
          </p>
          <p className="secon-text small-text middle-text">
            By signing up, you agree to our <span className="link">Terms</span>{" "}
            , <span className="link">Privacy Policy</span> and{" "}
            <span className="link">Cookies Policy</span> .
          </p>
          <button type="submit" className={`${classes.btn} primary-btn`}>
            Sign up
          </button>
        </form>
      </div>
      <div className={classes.wrapper}>
        <p className="middle-text">
          Have an account?{" "}
          <Link to={"/accounts/login"} className="no-border-btn">
            Log in
          </Link>
        </p>
      </div>
    </div>
  );
}

export default Signup;
