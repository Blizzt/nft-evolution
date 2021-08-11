// Dependencies
import React, { useCallback, useLayoutEffect, useState } from 'react';
import { useHistory } from 'react-router-dom';

// Styled Components
import {
  Layout,
  List,
  Item,
  Image,
  Title,
  ItemContent,
  Amount,
  EvolveButton
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
  const [items, setItems] = useState([]);

  const onClickAddNFT = useCallback(() => {
    history.push('/my-nfts/new');
  }, []);

  useLayoutEffect(() => {
    API.getAll().then((ids) => {
      setItems(ids);
      console.log({ items });
    });
  }, []);

  const onPayToEvolve = useCallback(() => {

  }, []);

  const getMintedAmount = useCallback((attributes = []) => {
    if (attributes.length) {
      const attr = attributes.find(e => e.trait_type === 'Minted units');
      return attr.value;
    } else {
      return 0;
    }
  }, []);

  return (
    <AuthLayout>
      <Layout>
        <Header
          title={'List of NFTs available'}
          description={'These are all the NFTs available in the smart contract'}
          rightElement={(
            <Button
              caption={'Create an NFT'}
              onClick={onClickAddNFT}
            />
          )}
        />
        <List>
          {(items || []).map((item, index) => (
            <FetchIPFS
              key={`--nft-list-item-${index.toString()}`}
              id={item[1]}
              onLoading={(
                <div>
                  Loading
                </div>
              )}
              onComplete={(data) => (
                <Item key={`--nft-list-item-data-${index.toString()}`}>
                  <ItemContent>
                    <Image source={data.image} />
                    <Title>{data.name}</Title>
                    <Amount>{getMintedAmount(data.attributes)}</Amount>
                  </ItemContent>
                  <EvolveButton to={`/my-nfts/evolve/${item[0]}`}>
                    Evolve
                  </EvolveButton>
                  <EvolveButton to={'#'} onClick={() => onPayToEvolve(data)}>
                    Pay to evolve
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
