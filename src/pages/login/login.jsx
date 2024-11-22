import api from "../../../api.js";
import { useRef } from "react";
import { useNavigate, Link } from "react-router-dom";
import SvgFileToInline from "../../components/svgFileToInline/svgFileToInline.jsx";
import InlineImageText from "../../components/inlineImageText/inlineImageText.jsx";
import Footer from "../../components/footer/footer.jsx";
import classes from "./login.module.css";

function Login() {
  const emailInput = useRef(null);
  const passwordInput = useRef(null);
  const nav = useNavigate();

  return (
    <div className={classes.container}>
      <div className={classes.wrapper}>
        <div className={classes.logo}>
          <SvgFileToInline path={"/icons/instagram-logo-large.svg"} />
        </div>
        <form
          className={classes.form}
          onSubmit={(ev) => {
            ev.preventDefault();
            api
              .login({
                email: emailInput.current.value,
                password: passwordInput.current.value,
              })
              .then((res) => {
                if (res) {
                  nav("/login");
                }
              });
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
          <Link to={"/signup"} className="no-border-btn">
            Sign up
          </Link>
        </p>
      </div>
      Get the app.
      <div className={classes.download}>
        <img src="/icons/appStore.png" alt="" />
        <img src="/icons/googlePlay.png" alt="" />
      </div>
      <Footer />
    </div>
  );
}

export default Login;
