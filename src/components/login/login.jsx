import { useContext, useRef } from "react";
import { Link } from "react-router-dom";
import profileContext from "../../contexts/profileContext.js";
import SvgFileToInline from "../svgFileToInline/svgFileToInline.jsx";
import InlineImageText from "../inlineImageText/inlineImageText.jsx";
import classes from "./login.module.css";

function Login() {
  const profile = useContext(profileContext)
  const emailInput = useRef(null);
  const passwordInput = useRef(null);

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
            profile
              .login({
                email: emailInput.current.value,
                password: passwordInput.current.value,
              })
          }}
        >
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
          </div>
          <button type="submit" className={`${classes.btn} primary-btn`}>
            Log in
          </button>
          <div className={classes.division}>
            <hr />
            <p className="secon-text-semibold">OR</p>
            <hr />
          </div>
          <button className={`${classes.btn} no-border-btn`}>
            <InlineImageText
              path={"/icons/facebook-logo.svg"}
              text={"Log in with Facebook"}
            />
          </button>
          <p className="middle-text">Forgot password?</p>
        </form>
      </div>
      <div className={classes.wrapper}>
        <p className="middle-text">
          Don&apos;t have an account?{" "}
          <Link to={"/accounts/signup"} className="no-border-btn">
            Sign up
          </Link>
        </p>
      </div>
    </div>
  );
}

export default Login;
