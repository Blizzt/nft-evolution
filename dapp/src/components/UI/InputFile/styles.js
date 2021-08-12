// Dependencies
import styled from 'styled-components';

export const Layout = styled.div`
  display: flex;
  flex-direction: column;
`;

export const Label = styled.label`
  padding: 12px 0;
  display: block;
`;

export const EPicture = styled.img`
  border-radius: 8px;
`;

export const EPictureInput = styled.div`
  width: ${props => props.width};
  height: ${props => props.height};
  border-radius: 8px;
  background-color: rgba(255, 255, 255, 0.07);
  display: flex;
  align-items: center;
  justify-content: center;
  
  ${EPicture} {
    width: ${props => props.width};
    height: ${props => props.height};
  }
  
  ${props => props.error && (`
    border: 1px solid #8a1f1f;
    background-color: #332828;
  `)}
`;
