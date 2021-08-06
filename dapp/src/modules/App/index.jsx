// Dependencies
import React from 'react';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';

// Styled Components
import {
  Layout
} from './styles';

// Components
import DeviceFrame from '../../components/Device/Frame';

// Config
import routes from '../../config/routes';

// Context
import { AppContextProvider } from '../../context/AppContext';

function App() {
  return (
    <AppContextProvider>
      <Router>
        <Layout>
          <DeviceFrame>
            <Switch>
              {routes.map((route, index) => (
                <Route
                  exact={true}
                  key={`--app-router-key-${index.toString()}`}
                  {...route}>
                </Route>
              ))}
            </Switch>
          </DeviceFrame>
        </Layout>
      </Router>
    </AppContextProvider>
  );
}

export default App;
