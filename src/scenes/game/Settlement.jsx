import React, { useRef, useState, useEffect } from "react";
import PropTypes from "prop-types";

const Settlement = ({
  MAP_DIAMETER_TILES,
  TILE_DIMENSIONS_PX,
  data,
  isMine,
}) => {
  const mapCenter = MAP_DIAMETER_TILES * TILE_DIMENSIONS_PX;
  return (
    <div style={{
      position: "absolute",
      top: mapCenter + (data.y * TILE_DIMENSIONS_PX * -1),
      left: mapCenter + (data.x * TILE_DIMENSIONS_PX),
      height: TILE_DIMENSIONS_PX,
      width: TILE_DIMENSIONS_PX,
      backgroundColor: isMine ? "green" : "red",
    }} />
  );
};

Settlement.propTypes = {
  data: PropTypes.shape(),
};

export default Settlement;
