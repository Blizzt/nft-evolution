// Dependencies
import React from 'react';

// Styled Components
import {
  Layout
} from './styles';

// Components
import Header from '../../components/UI/Header';
import AuthLayout from '../../components/Layout/AuthLayout';
import FetchIPFS from '../../components/UI/FetchIPFS';

// API
import API from '../../api';
import Button from '../../components/UI/Button';

function EvolveNFTScreen({ match: { params: { nftId } } }) {
  return (
    <AuthLayout>
      <FetchIPFS
        id={nftId}
        onComplete={(nft) => (
          <Layout>
            {console.log(nft)}
            GAME
          </Layout>
        )}
      />
    </AuthLayout>
  );
}

export default EvolveNFTScreen;
