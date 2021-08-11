// Dependencies
import styled from 'styled-components';
import { animated } from 'react-spring';

export const Frame = styled.div`
  position: relative;
  z-index: 5;
  width: 100%;
  max-width: 60rem;
`;

export const Layout = styled.div`
  background: #1d1d1d;
  height: 42rem;
  border-radius: 2rem;
  box-shadow: 0 5px 0px -1px #252525;
  border: 4px solid #292929;
  display: flex;
  padding: 2.4rem 2.4rem 22px;
  flex-direction: column;
  position: relative;
  z-index: 5;
`;

export const Screen = styled.div`
  display: flex;
  background-color: #191919;
  flex: 1;
  flex-direction: column;
  border-radius: 1rem;
  box-shadow: inset 0 3px 0 #1c1f1c;
  border: 8px solid #212121;
  overflow: hidden;
  position: relative;
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
  background: repeating-linear-gradient(180deg, rgba(0, 0, 0, 0) 0, rgba(0, 0, 0, 0.12) 50%, rgba(0, 0, 0, 0) 100%);
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
    background-image: linear-gradient(0deg, transparent 0%, rgba(112, 112, 112, 0.2) 2%, rgba(110, 110, 110, 0.8) 3%, rgba(105, 105, 105, 0.2) 3%, transparent 100%);
    background-repeat: no-repeat;
    animation: scan 7.5s linear 0s infinite;
    opacity: 0.1;
  }
`;

export const StatusBar = styled.div`
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: flex-end;
  padding: 0 0.6rem;
`;

export const Indicator = styled.div`
  padding: 0.6rem;
  font-weight: 600;
  font-size: 14px;
  
  position: relative;
  top: ${props => props.top || '0px'}
`;

export const Interaction = styled(animated.div)`
  position: absolute;
  z-index: 1;
`;

export const Inner = styled.div`
  display: flex;
  flex-direction: column;
  height: 100%;
  overflow: auto;

  ::-webkit-scrollbar {
    width: 6px;
  }

  /* Track */

  ::-webkit-scrollbar-track {
    background: rgba(255, 255, 255, 0.03);
  }

  /* Handle */

  ::-webkit-scrollbar-thumb {
    background: #505050;
  }

  /* Handle on hover */

  ::-webkit-scrollbar-thumb:hover {
    background: #707070;
  }
`;

export const IndicatorText = styled.span`
  text-transform: uppercase;
  font-size: 12px;
`;

export const Footer = styled.footer`
  margin-top: 18px;
  padding: 0 1rem;
  display: flex;
  justify-content: flex-end;
`;

export const Navigator = styled.nav`
  display: flex;
  width: 100%;
  flex-direction: row;
  justify-content: space-between;
  align-items: center;
  grid-column-gap: 12px;
`;

export const Link = styled.a`
  color: #333333;
  font-weight: 600;
  font-size: 12px;
  text-transform: uppercase;
  text-decoration: none;
  margin-right: 18px;
  
  &:last-child {
    margin-right: 0;
  }
`;
