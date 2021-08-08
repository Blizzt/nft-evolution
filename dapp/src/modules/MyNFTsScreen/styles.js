// Dependencies
import styled from 'styled-components';
import { Link } from 'react-router-dom';

export const Layout = styled.div``;

export const List = styled.ul`
  display: grid;
  grid-template-columns: repeat(6, minmax(0%, 100%));
  padding: 2rem;
  grid-column-gap: 18px;
  grid-row-gap: 18px;
`;

export const Item = styled.li`
  background-color: rgb(49 49 49);
  padding: 12px;
  border-radius: 4px;
  border: 1px solid #424242;
  position: relative;
`;

export const Image = styled.img`
  width: 100%;
`;

export const Title = styled.h3`
  font-size: 13px;
  margin-bottom: 0;
`;

export const Amount = styled.span`
  font-size: 11px;
  
  &:before {
    content: "Minted amount";
    display: block;
    margin-top: 8px;
  }
`;

export const EvolveButton = styled(Link)`
  display: flex;
  align-items: center;
  justify-content: center;
  text-align: center;
  padding: 6px;
  background: #4e4e4e;
  border-radius: 6px;
  margin-top: 14px;
  font-size: 12px;
  text-decoration: none;
  text-transform: uppercase;
  font-weight: 600;
`;
