// Dependencies
import styled from 'styled-components';

export const Layout = styled.div`
  width: 100%;
  max-width: 54rem;
  height: 38rem;
  background: #1d1d1d;
  border-radius: 2rem;
  box-shadow: 0 5px 0px -1px #252525;
  border: 4px solid #292929;
  display: flex;
  padding: 2.4rem;
  flex-direction: column;
`;

export const Screen = styled.div`
  display: flex;
  background-color: #242524;
  flex: 1;
  border-radius: 1rem;
  box-shadow: inset 0 3px 0 #1c1f1c;
  border: 8px solid #212121;
  padding: 2rem;
  overflow: hidden;
  position: relative;
  
  color: #4aea4a;
`;

export const Header = styled.header`
  padding-bottom: 1rem;
`;

export const Title = styled.div`
  color: #333333;
  font-weight: 600;
  text-shadow: 0 -1px 1px #000000;
  text-transform: uppercase;
`;

export const Noise = styled.div`
  pointer-events: none;
  position: absolute;
  width: 100%;
  height: 100%;
  background-image: url("https://media.giphy.com/media/oEI9uBYSzLpBK/giphy.gif");
  background-repeat: no-repeat;
  background-size: cover;
  z-index: 1;
  opacity: .02;
  left: 0;
  top: 0;
  right: 0;
  bottom: 0;
`;

export const Overlay = styled.div`
  content: "";
  pointer-events: none;
  position: absolute;
  width: 100%;
  height: 100%;
  background: repeating-linear-gradient(180deg, rgba(0, 0, 0, 0) 0, rgba(0, 0, 0, 0.3) 50%, rgba(0, 0, 0, 0) 100%);
  background-size: auto 4px;
  z-index: 1;
  left: 0;
  top: 0;
  right: 0;
  bottom: 0;
  
  &:before {
    content: "";
    pointer-events: none;
    position: absolute;
    display: block;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
    width: 100%;
    height: 100%;
    background-image: linear-gradient(0deg, transparent 0%, rgba(32, 128, 32, 0.2) 2%, rgba(32, 128, 32, 0.8) 3%, rgba(32, 128, 32, 0.2) 3%, transparent 100%);
    background-repeat: no-repeat;
    animation: scan 7.5s linear 0s infinite;
  }
    
`;
