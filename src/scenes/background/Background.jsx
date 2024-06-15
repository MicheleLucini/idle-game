import React from "react";
import PropTypes from "prop-types";

import "./background.css";

const Background = ({ gamePhase }) => {
  return (
    <div id="bg">
      <div className="noise"></div>
      {/* <div></div> */}
    </div>
  );
};

Background.propTypes = {
  gamePhase: PropTypes.string,
};

Background.defaultProps = {
  gamePhase: null,
};

export default Background;
