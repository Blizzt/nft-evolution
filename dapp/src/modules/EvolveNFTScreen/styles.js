// Dependencies
import styled from 'styled-components';
import { animated } from 'react-spring';

export const Layout = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  flex-direction: column;
  padding: 2rem 0;
  margin: 0 auto;
  max-width: 500px;
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

export const Picture = styled.div`
  width: 100%;
  border-radius: 100%;
  padding-bottom: 100%;
  background-size: cover;
  background-position: center;
  background-image: url(${props => props.source});
  
  ${props => `
    ${props.itIsEvolving && `
      animation: evolutionNFT 800ms ease infinite;
    `}
  `}
`;

export const Title = styled.h2`
  font-size: 14px;
  font-weight: 500;
  line-height: 22px;
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
  margin: 2rem 0;
  max-width: 500px;
  text-align: center;
`;

export const Code = styled.code`
  font-family: monospace !important;
  font-size: 12px;
  background: #333;
  display: flex;
  padding: 8px;
  border-radius: 2px;
  width: 100%;
  
  &:before {
    content: "CODE:";
    margin-right: 8px;
    color: #e7962f;
  }
`;

export const CodeContainer = styled.div`
  border-bottom: 1px dashed #2f2f2f;
  padding-bottom: 2rem;
`;
