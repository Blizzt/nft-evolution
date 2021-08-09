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
  const [currentPower, setCurrentPower] = useState(0);
  const [isPressed, setPressed] = useState(false);
  const [currentState, setCurrentState] = useState(stateTypes.WAITING);

  const CurrentEvolutionStyle = useSpring({
    visibility: currentState === stateTypes.PROCESS ? 'hidden' : 'visible',
    opacity: currentState === stateTypes.PROCESS ? 0 : 1,
    maxHeight: currentState === stateTypes.PROCESS ? 0 : 200
  });

  const onPressKey = useCallback((e) => {
    if (e.keyCode === 32 && currentState === stateTypes.WAITING) {
      setPressed(false);
      setCurrentPower(e => e + 5);

      clearInterval(currentTimer.current);

      currentTimer.current = setInterval(() => {
        setCurrentPower(e => {
          if (e >= 0 && e <= 99) {
            return e - 5;
          } else if (e >= 100) {
            setCurrentState(stateTypes.PROCESS);
            clearInterval(currentTimer.current);
            API.evolve(nftId).then((response) => {
              console.log(response);
            });
            return 100;
          } else {
            clearInterval(currentTimer.current);
            return 0;
          }
        });
      }, 500);
    }
  }, [currentState, currentPower]);

  const onKeyDown = useCallback((e) => {
    if (e.keyCode === 32) {
      setPressed(true);
    }
  }, []);

  const onEvolutionEnd = useCallback((e) => {
    setCurrentState(stateTypes.FINISHED);
  }, []);

  useLayoutEffect(() => {
    putPowerDelivery();
    setIndicatorText('Power Delivery connected');

    window.addEventListener('keyup', onPressKey, false);
    window.addEventListener('keydown', onKeyDown, false);

    return () => {
      removePowerDelivery();
      setIndicatorText('Power Delivery disconnected');
      window.removeEventListener('keyup', onPressKey, false);
      window.removeEventListener('keyup', onKeyDown, false);
    };
  }, []);

  return (
    <AuthLayout>
      <FetchIPFS
        id={nftId}
        onComplete={(nft) => (
          <Layout>
            <Container>
              <Card>
                <Picture
                  src={nft.image}
                  itIsEvolving={currentState === stateTypes.PROCESS}
                  onAnimationEnd={onEvolutionEnd}
                />
              </Card>
              <Progress>
                <CircularProgressbar
                  value={currentPower}
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
                  <Title>To start evolving in NFT, start successively pressing SPACE</Title>
                  <Backspace isPressed={isPressed} />
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
