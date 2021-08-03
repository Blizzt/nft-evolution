// Dependencies
import React from 'react';

// Assets
import {
  Layout,
  Screen,
  Title,
  Header,
  Noise,
  Overlay
} from './styles';

function DeviceFrame({ children }) {
  return (
    <Layout>
      <Header>
        <Title>NFTs Evolutionary 2000</Title>
      </Header>
      <Screen className="container">
        <Noise />
        <Overlay />
        {children}
      </Screen>
    </Layout>
  );
}

export default DeviceFrame;
