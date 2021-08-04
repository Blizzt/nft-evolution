// Dependencies
import styled from 'styled-components';

export const Layout = styled.div`
  position: relative;
  z-index: 100;
  background: linear-gradient(to bottom,rgb(35 35 35) 0%,rgb(35 35 35) 100%);
  border: 2px solid #383838;
  border-radius: 8px 8px 2px 2px;

  width: 170px;
  height: 200px;
  
  display: flex;
  flex-grow: 1;
  
  user-select: none;
  cursor: default;
  
  flex-direction: column;
  text-align: center;
  padding: 0.5rem 2rem;
`;

export const Screw = styled.div`
  position: absolute;
  width: 18px;
  height: 18px;
  border-radius: 18px;
  background-color: #252525;
  align-items: center;
  justify-content: center;
  display: flex;

  &:after {
    content: "+";
    color: #333333;
    font-weight: 600;
    top: -1px;
    position: relative;
  }

  ${props => `
    top: ${props.top || 'inherit'};
    bottom: ${props.bottom || 'inherit'};
    left: ${props.left || 'inherit'};
    right: ${props.right || 'inherit'};
  `}
`;

export const Text = styled.p`
  font-weight: 600;
  display: block;
  font-size: 22px;
`;

export const Memory = styled.span`
  display: block;
  font-size: 22px;
  color: #363636;
  text-shadow: 0px -1px #1d1d1d;

  &:after {
    content: "mb";
    font-size: 16px;
    text-transform: uppercase;
    position: relative;
    top: -1px;
  }
`;

export const Label = styled.span`
  display: block;
  color: #363636;
  text-shadow: 0px -1px #1d1d1d;
  text-transform: uppercase;
  font-size: 15px;
`;
