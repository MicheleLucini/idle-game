import React from "react";
import PropTypes from "prop-types";

import { CARD_SUIT } from "../../logic/constants";

import "./suit.css";

const Suit = ({ type }) => {
  return (
    <>
      {type === CARD_SUIT.DIAMOND && (
        <div className="diamond">
          <div className="square"></div>
        </div>
      )}
      {type === CARD_SUIT.SPADE && (
        <div className="spade">
          <div className="square"></div>
          <div className="circle1"></div>
          <div className="circle2"></div>
          <div className="tail"></div>
        </div>
      )}
      {type === CARD_SUIT.HEART && (
        <div className="heart">
          <div className="square"></div>
          <div className="circle1"></div>
          <div className="circle2"></div>
        </div>
      )}
      {type === CARD_SUIT.CLUB && (
        <div className="club">
          <div className="circle1"></div>
          <div className="circle2"></div>
          <div className="circle3"></div>
          <div className="tail"></div>
        </div>
      )}
      {type === CARD_SUIT.JOKER && (
        <div className="joker">
          <svg className="star">
            <path d="M9.5 14.25l-5.584 2.936 1.066-6.218L.465 6.564l6.243-.907L9.5 0l2.792 5.657 6.243.907-4.517 4.404 1.066 6.218" />
          </svg>
        </div>
      )}
    </>
  );
};

Suit.propTypes = {
  type: PropTypes.number.isRequired,
};

Suit.defaultProps = {};

export default Suit;
