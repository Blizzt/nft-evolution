// Dependencies
import React from 'react';

// Styled Components
import {
  Layout
} from './styles';

function Button({ type = 'button', caption, onClick = () => {} }) {
  return (
    <Layout type={type} onClick={onClick}>
      {caption}
    </Layout>
  );
}

export default Button;
