// Dependencies
import styled from 'styled-components';

export const Layout = styled.div`

`;

export const Navigation = styled.nav`
  display: grid;
  grid-template-columns: 1fr;
`;

export const Link = styled.a`
  padding: 22px 2rem;
  background: linear-gradient(to right, rgb(255 255 255 / 0%) 0%, rgb(255 255 255 / 0%) 100%);
  transition: all 0.2s ease-in-out;
  text-decoration: none;
  font-weight: 600;
  color: #b2b2b2;
  box-shadow: inset 0 0 0 0 black;

  &:hover {
    background: linear-gradient(to right, rgb(255 255 255 / 5%) 0%, rgb(255 255 255 / 0%) 100%);
    color: #fff;
    box-shadow: inset 4px 0 0 0 #ffffff;
  }
`;
