// Dependencies
import React from 'react';

// Styled Components
import {
  Layout,
  Title,
  Field,
  Paragraph
} from './styles';
import Header from '../../components/UI/Header';

function HelpScreen() {
  return (
    <Layout>
      <Header
        title={'Welcome to NFTS Evolutionary'}
      />

      <Field>
        <Title>What is NFTS Evolutionary?</Title>
        <Paragraph>
          This decentralized application was created to provide a brief example of how to implement different evolutions in an NFT.
        </Paragraph>
      </Field>

      <Field>
        <Title>Project vision</Title>
        <Paragraph>
          Our goal is to showcase a technology that we think could complement video game development.
        </Paragraph>
      </Field>

      <Field>
        <Title>About Blizzt.io</Title>
        <Paragraph>
          Blizzt is a company that provides blockchain technologies to video game development companies to completely improve the player experience and enrich the value of games.
        </Paragraph>
      </Field>

    </Layout>
  );
}

export default HelpScreen;
