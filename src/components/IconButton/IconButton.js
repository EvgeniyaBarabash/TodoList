import React from 'react';
import PropTypes, { func } from 'prop-types';
import './IconButton.scss';
const IconButton = ({ children, onClick, ...allyProps }) => {
  return (
    <button
      className="IconButton"
      type="button"
      onClick={onClick}
      {...allyProps}
    >
      {children}
    </button>
  );
};
IconButton.defaultProps = {
  onClick: () => null,
  children: null,
};
IconButton.propTypes = {
  onClick: PropTypes.func,
  children: PropTypes.node,
  'aria-label': PropTypes.string.isRequired,
}
export default IconButton;
