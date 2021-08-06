// Dependencies
import React from 'react';

// Styled Components
import {
  Layout,
  Title,
  Description
} from './styles';

function Header({ title, description = null, rightElement = null }) {
  return (
    <Layout>
      <div>
        <Title>{title}</Title>
        {description && <Description>{description}</Description>}
      </div>

      {rightElement && (
        <div>
          {rightElement}
        </div>
      )}
    </Layout>
  );
}

export default Header;
