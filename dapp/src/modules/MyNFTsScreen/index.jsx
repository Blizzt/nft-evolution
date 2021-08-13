// Dependencies
import React, { useCallback, useLayoutEffect, useState } from 'react';
import { useHistory } from 'react-router-dom';

// Styled Components
import {
  Layout,
  List
} from './styles';

// Components
import Header from '../../components/UI/Header';
import Button from '../../components/UI/Button';
import AuthLayout from '../../components/Layout/AuthLayout';
import API from '../../api';
import FetchIPFS from '../../components/UI/FetchIPFS';
import NFTItem from '../../components/UI/NFTItem';

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
                <NFTItem
                  key={`--nft-list-item-data-${index.toString()}`}
                  item={item}
                  data={data}
                />
              )}
            />
          ))}
        </List>
      </Layout>
    </AuthLayout>
  );
}

export default MyNFTsScreen;
