// Dependencies
import React, { useCallback, useMemo, useState } from 'react';

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
import AuthLayout from '../../components/Layout/AuthLayout';

// API
import API from '../../api';
import Button from '../../components/UI/Button';

const viewTypes = {
  LIST: 'list',
  CONFIRM: 'confirm'
};

function IncubatorScreen() {
  // Hooks
  const [currentView, setCurrentView] = useState(viewTypes.LIST);
  const [currentNFT, setCurrentNFT] = useState(null);
  const items = useMemo(() => API.getAll(), []);

  const onClickNFT = useCallback((nft) => {
    setCurrentNFT(nft);
    setCurrentView(viewTypes.CONFIRM);
  }, []);

  const onClickEvolve = useCallback(async() => {
    await API.evolve(currentNFT);
  }, [currentNFT]);

  const onClickCancel = useCallback(() => {
    setCurrentView(viewTypes.LIST);
  }, []);

  const renderView = useMemo(() => {
    switch (currentView) {
      case viewTypes.CONFIRM:
        return (
          <>
            <Header
              title={'Are you sure you want to evolve this NFT?'}
            />
            <Title>
              Are you sure?
            </Title>
            <Button
              caption={'Yes'}
              onClick={onClickEvolve}
            />
            <Button
              caption={'No'}
              onClick={onClickCancel}
            />
          </>
        );

      case viewTypes.LIST:
      default:
        return (
          <>
            <Header
              title={'Evolve NFT'}
              description={'Select the NFT you want to evolve from the list'}
              rightElement={() => {}}
            />
            <List>
              {(items || []).map((nft, index) => (
                <Item key={`--nft-list-item-${index.toString()}`} onClick={() => onClickNFT(nft)}>
                  <Image src={nft.image} />
                  <Title>{nft.name}</Title>
                  <Amount>{nft.quantity}</Amount>
                </Item>
              ))}
            </List>
          </>
        );
    }
  }, [currentView, currentNFT]);

  return (
    <AuthLayout>
      <Layout>
        {renderView}
      </Layout>
    </AuthLayout>
  );
}

export default IncubatorScreen;
