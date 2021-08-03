// Dependencies
import React from 'react';

// Styled Components
import {
  Layout
} from './styles';

function Button({ caption, onClick = () => {} }) {
  return (
    <Layout onClick={onClick}>
      {caption}
    </Layout>
  );
}

export default Button;
