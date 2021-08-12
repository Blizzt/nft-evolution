// Dependencies
import styled from 'styled-components';

export const Layout = styled.button`
  background: #3b3b3b;
  color: #fff;
  height: 50px;
  padding: 0 22px;
  min-width: 150px;
  border-radius: 2px;
  font-weight: 600;
  text-transform: uppercase;
  border: 1px solid #808080;
  outline: none;
  text-align: center;
  
  position: relative;
  overflow: hidden;
  transition: all 50ms linear;
  
  flex-direction: row;
  display: flex;
  align-items: center;
  justify-content: center;
  
  ${props => props.disabled ? `
    opacity: 0.5;
    border: 1px solid #808080FF;
  ` : `
    cursor: pointer;
    &:hover {
      background: #575757;
    }
  `}

`;
