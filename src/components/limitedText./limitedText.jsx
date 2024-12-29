import { useState } from "react";
import PropTypes from "prop-types";

function LimitedText({ text = "", limit = null, extendable = true }) {
  const [more, setMore] = useState(false);

  let output = text;
  let overflow = false;

  if (limit && output.length > limit && !more) {
    overflow = true;
  }
  if (overflow) {
    output = output.slice(0, limit);
    output += "...";
  }

  return (
    <span>
      {output}{" "}
      {overflow && extendable && (
        <span
          role="button"
          className="secon-text"
          onClick={() => {
            setMore(true);
          }}
        >
          more
        </span>
      )}
    </span>
  );
}

LimitedText.propTypes = {
  text: PropTypes.string,
  limit: PropTypes.number,
  extendable: PropTypes.bool,
};

export default LimitedText;
