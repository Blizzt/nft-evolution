// Dependencies
import React from 'react';
import { BrowserRouter as Router, Route } from 'react-router-dom';
import { CSSTransition } from 'react-transition-group';

// Styled Components
import {
  Layout, RouteWrapper,
  TransitionGroupStyle
} from './styles';

// Components
import DeviceFrame from '../../components/DeviceFrame';

// Config
import routes from '../../config/routes';

function App() {
  return (
    <Router>
      <Layout>
        <DeviceFrame>
          <Route
            render={({ location }) => (
              <TransitionGroupStyle className="TransitionGroupStyle">
                <CSSTransition
                  key={location.pathname}
                  classNames="fade"
                  timeout={500}
                >
                  <RouteWrapper className="RouteWrapper" location={location}>
                    {routes.map((route, index) => (
                      <Route
                        exact={true}
                        key={`--app-router-key-${index.toString()}`}
                        {...route}>
                      </Route>
                    ))}
                  </RouteWrapper>
                </CSSTransition>
              </TransitionGroupStyle>
            )}
          />
        </DeviceFrame>
      </Layout>
    </Router>
  );
}

export default App;
