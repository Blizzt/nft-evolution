// Dependencies
import React from 'react';
import Loader from 'react-loader-spinner';

// Styled Components
import {
  Layout
} from './styles';

function Button({
  caption,
  type = 'button',
  disabled = false,
  isLoading = false,
  loadingLabel = '',
  onClick = () => {},
  customStyleContainer = {}
}) {
  return (
    <Layout
      type={type}
      disabled={disabled || isLoading}
      style={customStyleContainer}
      onClick={onClick}
    >
      {isLoading ? (
        <>
          <Loader
            type="TailSpin"
            color="#fff"
            height={22}
            width={22}
            style={{
              marginRight: '16px'
            }}
          />
          {loadingLabel}
        </>
      ) : caption}
    </Layout>
  );
}

export default Button;
