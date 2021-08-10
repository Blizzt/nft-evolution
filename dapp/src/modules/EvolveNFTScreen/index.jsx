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
  EntryText,
  Code,
  CodeContainer
} from './styles';

// Components
import AuthLayout from '../../components/Layout/AuthLayout';
import FetchIPFS from '../../components/UI/FetchIPFS';
import Button from '../../components/UI/Button';

// API
import API from '../../api';

// Hooks
import useAppContext from '../../hooks/useAppContext';
import EvolveNFTForm from '../../components/UI/EvolveNFTForm';

const stateTypes = {
  WAITING: 'waiting',
  PROCESS: 'process',
  REDEEM: 'redeem',
  FINISHED: 'finished'
};

function EvolveNFTScreen({ match: { params: { nftId } } }) {
  // Hooks
  const { setIndicatorText, putPowerDelivery, removePowerDelivery } = useAppContext();

  // State
  const [currentNFT, setCurrentNFT] = useState(null);
  const [currentProgress, setCurrentProgress] = useState(0);
  const [currentEvolveCode, setCurrentEvolveCode] = useState(null);
  const [currentState, setCurrentState] = useState(stateTypes.WAITING);

  const CurrentEvolutionStyle = useSpring({
    visibility: currentState === stateTypes.PROCESS ? 'hidden' : 'visible',
    opacity: currentState === stateTypes.PROCESS ? 0 : 1
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

  const getEvolutionCode = useCallback(() => {
    // 1. Change state to process
    setCurrentState(stateTypes.PROCESS);

    // 2. Execute API
    API.getEvolutionCode(nftId, setCurrentProgress).then(({ code }) => {
      setTimeout(() => {
        setCurrentEvolveCode(code);
        setCurrentProgress(0);
        setCurrentState(stateTypes.REDEEM);
      }, 1000);
    }).catch((err) => {
      console.log(err);
      setCurrentProgress(0);
    });
  }, [nftId]);

  const evolveNFT = useCallback((values) => {
    // 1. Change state to process
    setCurrentProgress(0);
    setCurrentState(stateTypes.PROCESS);

    // 2. Execute API
    API.evolve(nftId, values.code, setCurrentProgress).then(({ data }) => {
      setCurrentProgress(100);
      setCurrentState(stateTypes.FINISHED);
    }).catch((err) => {
      console.log(err);
      setCurrentProgress(0);

      setTimeout(() => {
        setCurrentState(stateTypes.REDEEM);
      }, 1000);
    });
  }, [nftId]);

  const renderEvolutionState = useCallback((nft) => {
    switch (currentState) {
      case stateTypes.FINISHED:
        return (
          <div>
            <Title>Finished!!!!</Title>
          </div>
        );

      case stateTypes.REDEEM:
        return (
          <Layout>
            <CodeContainer>
              <Title>This is the code available to evolve the NFT, if you want to evolve it enter it below.</Title>
              <Code>{currentEvolveCode}</Code>
            </CodeContainer>
            <EvolveNFTForm onSubmit={evolveNFT} />
          </Layout>
        );

      case stateTypes.WAITING:
      default:
        return (
          <Layout>
            <Container>
              <Card>
                <Picture
                  source={nft.image}
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
              <Title>Press the following button to generate the evolution code</Title>
              <Button
                customStyleContainer={{
                  marginTop: '1rem'
                }}
                caption={'Get evolution code'}
                onClick={getEvolutionCode}
              />
            </EntryText>
          </Layout>
        );
    }
  }, [currentState, currentProgress, currentEvolveCode]);

  if (!currentNFT) {
    return null;
  }

  return (
    <AuthLayout>
      <FetchIPFS
        id={currentNFT}
        onComplete={renderEvolutionState}
      />
    </AuthLayout>
  );
}

export default EvolveNFTScreen;
