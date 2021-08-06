// Dependencies
import React, { useCallback, useEffect, useLayoutEffect, useMemo } from 'react';
import { useHistory } from 'react-router-dom';

// Styled Components
import {
  Layout,
  List,
  Item,
  Image,
  Title,
  Amount
} from './styles';

// Components
import Header from '../../components/UI/Header';
import Button from '../../components/UI/Button';
import AuthLayout from '../../components/Layout/AuthLayout';
import API from '../../api';

function MyNFTsScreen() {
  // Hooks
  const history = useHistory();

  const onClickAddNFT = useCallback(() => {
    history.push('/my-nfts/new');
  }, []);

  const items = useMemo(() => API.getAll(), []);

  return (
    <AuthLayout>
      <Layout>
        <Header
          title={'My NFT`s'}
          description={'List of NFT\'s stored in the device.'}
          rightElement={(
            <Button
              caption={'Add NFT'}
              onClick={onClickAddNFT}
            />
          )}
        />
        <List>
          {(items || []).map((nft, index) => (
            <Item key={`--nft-list-item-${index.toString()}`}>
              <Image src={nft.image} />
              <Title>{nft.name}</Title>
              <Amount>{nft.quantity}</Amount>
            </Item>
          ))}
        </List>
      </Layout>
    </AuthLayout>
  );
}

export default MyNFTsScreen;
