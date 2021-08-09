// Dependencies
import React, { useCallback, useEffect, useLayoutEffect, useMemo, useState } from 'react';
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
  const [items, setItems] = useState([]);

  const onClickAddNFT = useCallback(() => {
    history.push('/my-nfts/new');
  }, []);

  useLayoutEffect(() => {
    API.getAll().then((ids) => {
      setItems(ids);
    });
  }, []);

  console.log({ items });

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
          {(items || []).map((item, index) => (
            <FetchIPFS
              key={`--nft-list-item-${index.toString()}`}
              id={item[1]}
              onLoading={() => (
                <div>
                  Loading
                </div>
              )}
              onComplete={(data) => (
                <Item key={`--nft-list-item-${index.toString()}`}>
                  <div>
                    {console.log(data)}
                    <Image src={data.image} />
                    <Title>{data.name}</Title>
                    <Amount>0</Amount>
                  </div>
                  <EvolveButton to={`/my-nfts/evolve/${item[0]}`}>
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
