// Dependencies
import styled from 'styled-components';
import { animated } from 'react-spring';

export const Layout = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  height: 100%;
  flex-direction: column;
`;

export const Card = styled.div`
  padding: 12px;
  border-radius: 100%;
  width: 194px;
  z-index: 4;
  position: absolute;
  background-color: rgba(255, 255, 255, 0.04);
  backdrop-filter: blur(12px);
`;

export const Picture = styled.img`
  width: 100%;
  border-radius: 100%;
  vertical-align: bottom;
  
  ${props => `
    ${props.itIsEvolving && `
      animation: evolutionNFT 800ms ease infinite;
    `}
  `}
`;

export const Title = styled.h2`
  font-size: 16px;
  font-weight: 500;
  margin: 4rem 2rem 2rem 2rem;
`;

export const Backspace = styled.div`
  width: 280px;
  height: 55px;
  position: relative;
  
  &:after {
    content: "";
    top: 12px;
    left: 40%;
    width: 60px;
    height: 6px;
    position: absolute;
    border-radius: 6px;
  }
  
  ${props => `
    ${props.isPressed ? `
      border-top: 4px solid #212121;
      background-color: #1f1f1f;
      
      &:after {
        background-color: #313131;
      }
    ` : `
      border-bottom: 4px solid #252525;
      background-color: #212121;
      
      &:after {
        background-color: #4b4b4b;
      }
    `}
  `}
`;

export const Container = styled.div`
  position: relative;
  display: flex;
  align-items: center;
  justify-content: center;
`;

export const Progress = styled.div`
  width: 200px;
  height: 200px;
  border-radius: 200px;
  box-shadow: 0 0 54px -36px rgba(255, 151, 19, 0);
  transition: all 0.2s ease-in-out;
`;

export const EntryText = styled(animated.div)`
  display: flex;
  justify-content: center;
  align-items: center;
  flex-direction: column;
  max-height: 250px;
  overflow: hidden;
`;
