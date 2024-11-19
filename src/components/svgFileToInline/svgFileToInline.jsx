import PropTypes from "prop-types";
import { useState, useEffect } from "react";

function SvgFileToInline({ path }) {
  const [markup, setMarkup] = useState("");

  useEffect(() => {
    fetch(path).then(async (res) => {
      const data = await res.text();
      setMarkup(data);
    });
  }, [path]);

  return (
    <div
      style={{ display: "flex", alignItems: "center" }}
      className="inline-svg"
      dangerouslySetInnerHTML={{ __html: markup }}
    ></div>
  );
}

SvgFileToInline.propTypes = {
  path: PropTypes.string,
};

export default SvgFileToInline;
