import classes from "./notFound.module.css"
import Footer from "../../components/footer/footer.jsx";
import { Link } from "react-router-dom";

function NotFound() {
  return (
    <div className={classes.container}>
      <h1 className="huge-text">Sorry, this page isn&apos;t available.</h1>
      <p className="big-text">
        The link you followed may be broken, or the page you followed may have
        been removed. <Link className="no-decoration" to={"/"}>Go back to Oxidegram.</Link>
      </p>
      <Footer />
    </div>
  );
}

export default NotFound;
