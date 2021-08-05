// Dependencies
import styled from 'styled-components';

export const Layout = styled.div``;

export const Form = styled.div`
  padding: 2rem;
`;

export const Fieldset = styled.fieldset`
  border: 0;
  padding: 0 0 2rem;
  max-width: ${props => props.maxWidth || '400px'};

  &:last-child {
    padding-bottom: 0;
  }
`;

export const Title = styled.h3``;

export const EPicture = styled.img`
  width: 70px;
  height: 70px;
  border-radius: 8px;
`;

export const EData = styled.div`
  padding-left: 2rem;
  width: 100%;
  max-width: 400px;
`;

export const EName = styled.h3`
  margin: 0.5rem 0 0;
  font-size: 16px;
  font-weight: 600;
`;

export const EDescription = styled.p`
  margin-top: 0.5rem;
  font-size: 14px;
  font-weight: 300;
`;

export const EAction = styled.div`
  margin-top: 1.4rem;
  margin-bottom: 0.6rem;
`;

export const ERemove = styled.div`
  flex: 1;
  display: flex;
  align-items: flex-end;
  justify-content: flex-end;
`;

export const Evolution = styled.div`
  padding: 1rem;
  background-color: rgba(255, 255, 255, 0.04);
  border: 1px solid rgba(255, 255, 255, 0.29);
  display: flex;
  flex-direction: row;
  margin-bottom: 2rem;
  box-shadow: 0 0 12px 2px rgba(255, 255, 255, 0.16);
`;
