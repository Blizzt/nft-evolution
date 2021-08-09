// Dependencies
import React, { useCallback, useLayoutEffect, useMemo, useRef, useState } from 'react';
import { CircularProgressbar } from 'react-circular-progressbar';
import { useSpring } from 'react-spring';

// Styled Components
import {
  Card,
  Layout,
  Picture,
  Title,
  Backspace,
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

  // Refs
  const currentTimer = useRef(null);

  // State
  const [currentNFT, setCurrentNFT] = useState(null);
  const [currentProgress, setCurrentProgress] = useState(0);
  const [currentState, setCurrentState] = useState(stateTypes.WAITING);

  const CurrentEvolutionStyle = useSpring({
    visibility: currentState === stateTypes.PROCESS ? 'hidden' : 'visible',
    opacity: currentState === stateTypes.PROCESS ? 0 : 1,
    maxHeight: currentState === stateTypes.PROCESS ? 0 : 200
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
      console.log(response);
    });
  }, [nftId]);

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
              {currentState === stateTypes.WAITING ? (
                <>
                  <Button caption={'Evolve NFT'} onClick={evolveNFT} />
                </>
              ) : (
                <>
                  <Title>Finished!!!!</Title>
                </>
              )}
            </EntryText>
          </Layout>
        )}
      />
    </AuthLayout>
  );
}

export default EvolveNFTScreen;
