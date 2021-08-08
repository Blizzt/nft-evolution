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
  Amount, EvolveButton
} from './styles';

// Components
import Header from '../../components/UI/Header';
import Button from '../../components/UI/Button';
import AuthLayout from '../../components/Layout/AuthLayout';
import API from '../../api';
import FetchIPFS from '../../components/UI/FetchIPFS';

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
            <FetchIPFS
              key={`--nft-list-item-${index.toString()}`}
              id={nft.id}
              onComplete={(data) => (
                <Item key={`--nft-list-item-${index.toString()}`}>
                  <div>
                    <Image src={data.image} />
                    <Title>{data.name}</Title>
                    <Amount>{nft.quantity}</Amount>
                  </div>
                  <EvolveButton to={`/my-nfts/evolve/${nft.id}`}>
                    Evolve NFT
                  </EvolveButton>
                </Item>
              )}
            />
          ))}
        </List>
      </Layout>
    </AuthLayout>
  );
}

export default MyNFTsScreen;
