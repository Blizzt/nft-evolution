// Dependencies
import styled from 'styled-components';
import { TransitionGroup } from 'react-transition-group';
import { Switch } from 'react-router-dom';

export const Layout = styled.div`
  flex: 1;
  display: flex;
  align-items: center;
  justify-content: center;
  flex-direction: column;
  padding: 2rem;
`;

export const TransitionGroupStyle = styled(TransitionGroup)`
  display: flex;
  flex: 1;
  position: relative;
  & > div {
    position: absolute;
    top: 0;
    left: 0;
    bottom: 0;
    right: 0;
  }
`;

export const RouteWrapper = styled(Switch)`
  display: flex;
  flex: 1;
`;
