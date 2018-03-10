import React from 'react';
import PropTypes from 'prop-types';

const TabContainer = ({ children }) => {
  return (
    <div style={{ padding: 8 * 3 }}>
      {children}
    </div>
  );
}

TabContainer.propTypes = {
  children: PropTypes.node.isRequired,
};

export default TabContainer;