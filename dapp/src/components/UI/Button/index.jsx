// Dependencies
import React from 'react';

// Styled Components
import {
  Layout
} from './styles';

function Button({ type = 'button', customStyleContainer = {}, caption, onClick = () => {} }) {
  return (
    <Layout type={type} style={customStyleContainer} onClick={onClick}>
      {caption}
    </Layout>
  );
}

export default Button;
