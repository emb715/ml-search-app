import React from 'react';
import Media from 'react-media';

const withIsMobile = (Component) => {
  const WrappedComponent = props => (
    <Media query="(max-width: 960px)">
      {isSmall => (
        <Component
          {...props}
          isMobile={isSmall}
        />
      )}
    </Media>
  );

  WrappedComponent.propTypes = {};

  WrappedComponent.defaultProps = {};

  return WrappedComponent;
};

export default withIsMobile;
