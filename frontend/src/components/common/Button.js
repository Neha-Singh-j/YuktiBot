import React from 'react';
import PropTypes from 'prop-types';

function Button({ children, onClick, variant = 'primary', ...props }) {
  return (
    <button 
      className={`btn btn-${variant}`}
      onClick={onClick}
      {...props}
    >
      {children}
    </button>
  );
}

Button.propTypes = {
  children: PropTypes.node.isRequired,
  onClick: PropTypes.func,
  variant: PropTypes.oneOf(['primary', 'secondary', 'danger'])
};

export default Button;