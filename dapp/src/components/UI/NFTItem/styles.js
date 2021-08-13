// Dependencies
import styled from 'styled-components';
import { Link } from 'react-router-dom';

export const Item = styled.div`
  background-color: rgb(49 49 49);
  padding: 12px;
  border-radius: 4px;
  border: 1px solid #424242;
  position: relative;

  &:after {
    content: "";
    top: 0;
    left: 0;
    right: 0;
    height: ${props => props.currentProgress}%;
    background: rgb(213 48 232 / 14%);
    position: absolute;
    z-index: 0;
    box-shadow: 0 0 0 1px #b15bbd;
    border-radius: 4px;
    transition: all 0.2s ease-in-out;
    visibility: ${props => props.currentProgress > 0 ? 'visible' : 'hidden'};
  }
`;

export const Container = styled.div`
  position: relative;
  z-index: 10;
`;

export const Image = styled.div`
  width: 100%;
  padding-bottom: 100%;
  background-size: cover;
  background-position: center;
  background-image: url(${props => props.source});
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

  ${props => props.disabled && `
    background: transparent;
    cursor: default;
  `}
  }
`;

export const ItemContent = styled.div`
  display: flex;
  flex-direction: column;
  flex-grow: 1;
`;
