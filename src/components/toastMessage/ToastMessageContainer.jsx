import React, { useMemo, useCallback, useEffect, useState } from "react";
import PropTypes from "prop-types";

import "./toastMessage.css";

const ToastMessageContainer = ({ messages }) => {
  return (
    <div id="toast_message_container">
      {messages?.map((message, i) => (
        <div key={i} className={"toast-message " + message.type}>
          {message.type === "error" && (
            <span className="icon material-symbols-rounded">priority_high</span>
          )}
          {message.type === "success" && (
            <span className="icon material-symbols-rounded">check</span>
          )}
          <span className="text">{message.text}</span>
        </div>
      ))}
    </div>
  );
};

ToastMessageContainer.propTypes = {
  messages: PropTypes.array.isRequired,
};

export default ToastMessageContainer;
