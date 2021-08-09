// Dependencies
import styled from 'styled-components';

export const Layout = styled.div`
  width: 42px;
  height: 42px;
  background-color: #282828;
  display: flex;
  align-items: center;
  justify-content: center;
  border-radius: 4px;
  position: relative;

  &:after {
    content: "";
    position: absolute;
    top: 16px;
    height: 8px;
    width: 400px;
    right: 42px;

    background: linear-gradient(to bottom,rgb(51 51 51) 0%,rgb(41 41 41) 100%);
  }

  &:before {
    content: "";
    position: absolute;
    top: 5px;
    height: 32px;
    width: 4px;
    left: 42px;
    background-color: #c07d24;
  }
`;
