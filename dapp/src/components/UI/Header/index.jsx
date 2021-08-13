// Dependencies
import React from 'react';
import { Link } from 'react-router-dom';

// Styled Components
import {
  Layout,
  Title,
  Description
} from './styles';

// Assets
import { ArrowBack } from 'react-ionicons';

function Header({ title, goBack = null, description = null, rightElement = null }) {
  return (
    <Layout>
      <div className={'container'}>
        {goBack && (
          <Link to={goBack} className={'go-back'}>
            <ArrowBack />
          </Link>
        )}
        <div>
          <Title>{title}</Title>
          {description && <Description>{description}</Description>}
        </div>
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
