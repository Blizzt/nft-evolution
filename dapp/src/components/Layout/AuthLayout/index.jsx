// Dependencies
import React, { useEffect, useLayoutEffect, useRef, useState } from 'react';

// Web3
import MetaMaskOnboarding from '@metamask/onboarding';
import { useWeb3React } from '@web3-react/core';
import { UserRejectedRequestError } from '@web3-react/injected-connector';

// Assets
import FoxIcon from '../../../assets/images/metamask-logo.svg';

// Hooks
import useEagerConnect from '../../../hooks/useEagerConnect';

// Utils
import { injected } from '../../../utils/web3';

// Styled Components
import {
  Title,
  Center,
  Content,
  Paragraph,
  MetamaskLogo
} from './styles';

// Button
import Button from '../../UI/Button';

function AuthLayout({ children }) {
  const triedToEagerConnect = useEagerConnect();
  const onboarding = useRef();

  const {
    active,
    error,
    activate,
    account,
    setError
  } = useWeb3React();

  useLayoutEffect(() => {
    onboarding.current = new MetaMaskOnboarding();
  }, []);

  const [, setConnecting] = useState(false);
  useEffect(() => {
    if (active || error) {
      setConnecting(false);
      onboarding.current?.stopOnboarding();
    }
  }, [active, error]);

  if (!triedToEagerConnect) {
    return null;
  }

  if (typeof account !== 'string') {
    const hasMetaMaskOrWeb3Available =
      MetaMaskOnboarding.isMetaMaskInstalled() ||
      window?.ethereum ||
      window?.web3;

    return (
      <>
        {hasMetaMaskOrWeb3Available ? (
          <Center>
            <Content>
              <MetamaskLogo src={FoxIcon} />
              <Title>Connect with MetaMask</Title>
              <Paragraph>To continue with the Decentralized App it is necessary that you connect your metamask wallet</Paragraph>
            </Content>

            <Button
              caption={MetaMaskOnboarding.isMetaMaskInstalled() ? 'Connect to MetaMask' : 'Connect to Wallet'}
              onClick={() => {
                setConnecting(true);
                activate(injected, undefined, true).catch((error) => {
                  if (error instanceof UserRejectedRequestError) {
                    setConnecting(false);
                  } else {
                    setError(error);
                  }
                });
              }}
            />
          </Center>
        ) : (
          <Button
            caption={'Install Metamask'}
            onClick={() => onboarding.current?.startOnboarding()}
          />
        )}
      </>
    );
  }

  return active ? children : null;
}

export default AuthLayout;
