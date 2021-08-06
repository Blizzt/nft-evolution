// Dependencies
import React from 'react';

// Styled Components
import {
  Layout,
  Screw,
  Text,
  Memory,
  Label
} from './styles';

function Card() {
  return (
    <Layout>
      <Text>
        <Memory>128</Memory>
        <Label>NFT Card</Label>
      </Text>

      <Screw left={'8px'} bottom={'8px'} />
      <Screw right={'8px'} bottom={'8px'} />
    </Layout>
  );
}

export default Card;
