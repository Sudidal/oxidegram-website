import PropTypes from "prop-types";
import { useState, useEffect } from "react";
import classes from "./svgFileToInline.module.css";

function SvgFileToInline({ path }) {
  const [markup, setMarkup] = useState("");

  useEffect(() => {
    fetch(path).then(async (res) => {
      const data = await res.text();
      setMarkup(data);
    });
  }, [path]);

  if (!markup) return null;

  return (
    <div
      style={{ display: "flex", alignItems: "center" }}
      className={classes.container}
      dangerouslySetInnerHTML={{ __html: markup }}
    ></div>
  );
}

SvgFileToInline.propTypes = {
  path: PropTypes.string,
};

export default SvgFileToInline;
