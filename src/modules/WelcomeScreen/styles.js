// Dependencies
import styled from 'styled-components';

export const Layout = styled.div`
  flex: 1;
  display: flex;
  align-items: center;
  justify-content: center;
  flex-direction: column;
  padding: 2rem;
`;

export const Logo = styled.img`
  margin-bottom: 3rem;
  width: 40px;
  height: 40px;
`;

export const Title = styled.h1`
  font-size: 18px;
  font-weight: 500;
  margin: 0;
`;

export const Actions = styled.div`
  display: grid;
  grid-template-columns: 1fr 1fr;
  grid-column-gap: 22px;
  margin-top: 2rem;
`;

export const Paragraph = styled.p`
  text-align: center;
  font-size: 14px;
  line-height: 22px;
`;
