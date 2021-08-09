// Dependencies
import React, { useCallback, useLayoutEffect, useState } from 'react';
import { CircularProgressbar } from 'react-circular-progressbar';
import { useSpring } from 'react-spring';

// Styled Components
import {
  Card,
  Layout,
  Picture,
  Title,
  Container,
  Progress,
  EntryText
} from './styles';

// Components
import AuthLayout from '../../components/Layout/AuthLayout';
import FetchIPFS from '../../components/UI/FetchIPFS';

// API
import API from '../../api';
import Button from '../../components/UI/Button';

// Hooks
import useAppContext from '../../hooks/useAppContext';

const stateTypes = {
  WAITING: 'waiting',
  PROCESS: 'process',
  FINISHED: 'finished'
};

function EvolveNFTScreen({ match: { params: { nftId } } }) {
  // Hooks
  const { setIndicatorText, putPowerDelivery, removePowerDelivery } = useAppContext();

  // State
  const [currentNFT, setCurrentNFT] = useState(null);
  const [currentProgress, setCurrentProgress] = useState(0);
  const [currentState, setCurrentState] = useState(stateTypes.WAITING);

  const CurrentEvolutionStyle = useSpring({
    visibility: currentState === stateTypes.PROCESS ? 'hidden' : 'visible',
    opacity: currentState === stateTypes.PROCESS ? 0 : 1,
    maxHeight: currentState === stateTypes.PROCESS ? 0 : 100
  });

  useLayoutEffect(() => {
    putPowerDelivery();
    setIndicatorText('Power Delivery connected');

    return () => {
      removePowerDelivery();
      setIndicatorText('Power Delivery disconnected');
    };
  }, []);

  useLayoutEffect(() => {
    API.getNFTById(nftId).then((id) => {
      setCurrentNFT(id);
    });
  }, []);

  const evolveNFT = useCallback(() => {
    setCurrentState(stateTypes.PROCESS);
    API.evolve(nftId, setCurrentProgress).then((response) => {
      setCurrentProgress(100);
      setCurrentState(stateTypes.FINISHED);
      console.log(response);
    }).catch((err) => {
      console.log(err);
      setCurrentProgress(0);
    });
  }, [nftId]);

  const renderEvolutionState = useState(() => {
    switch (currentState) {
      case stateTypes.FINISHED:
        return (
          <div>
            <Title>Finished!!!!</Title>
          </div>
        );

      case stateTypes.WAITING:
      default:
        return (
          <div>
            <Button caption={'Evolve NFT'} onClick={evolveNFT} />
          </div>
        );
    }
  }, [currentState]);

  if (!currentNFT) {
    return null;
  }

  return (
    <AuthLayout>
      <FetchIPFS
        id={currentNFT}
        onComplete={(nft) => (
          <Layout>
            <Container>
              <Card>
                <Picture
                  src={nft.image}
                  itIsEvolving={currentState === stateTypes.PROCESS}
                />
              </Card>
              <Progress>
                <CircularProgressbar
                  value={currentProgress}
                  strokeWidth={2}
                  styles={{
                    path: {
                      stroke: '#ffa430'
                    },
                    trail: {
                      stroke: '#545454'
                    }
                  }}
                />
              </Progress>
            </Container>

            <EntryText style={CurrentEvolutionStyle}>
              {renderEvolutionState}
            </EntryText>
          </Layout>
        )}
      />
    </AuthLayout>
  );
}

export default EvolveNFTScreen;
