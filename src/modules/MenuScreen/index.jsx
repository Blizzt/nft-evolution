// Dependencies
import React from 'react';

// Styled Components
import {
  Layout,
  Navigation,
  Link
} from './styles';

// Components
import Header from '../../components/UI/Header';

function MenuScreen() {
  return (
    <Layout>
      <Header
        title={'Main Menu'}
        description={'Select one of the following options'}
      />

      <Navigation>
        <Link href={'/my-nfts'}>
          My NFT´s List
        </Link>
        <Link href={'/incubator'}>
          NFT Incubator
        </Link>
        <Link href={'/settings'}>
          Settings
        </Link>
        <Link href={'/credits'}>
          Credits
        </Link>
      </Navigation>
    </Layout>
  );
}

export default MenuScreen;
