import React from 'react'
import PropTypes from "prop-types";

Error.propTypes = {
  hideError: PropTypes.func,
  errorText: PropTypes.string
};

export default function Error({hideError, errorText}) {
  return (
    <div className="error" onClick={(e) => hideError()}>{errorText}</div>
  )
};

