import React, {PropTypes} from 'react';
import {Icon} from 'semantic-ui-react';

const Error = (props) => {
  const {clearError, error} = props;
  //If error, display error
  if (error) {
    return(
      <div className="error-wrapper">
        <div className="error-container">
          <span className="error-text">ERROR: {error}</span>
          <Icon className="error-close" name="remove" onClick={clearError} />
        </div>
      </div>
    );
  }
  return (
    <div></div>
  );
}

Error.PropTypes = {
  clearError: PropTypes.func,
  error: PropTypes.object
};

export default Error;
