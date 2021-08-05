// Dependencies
import React, { useEffect, useLayoutEffect, useRef, useState } from 'react';

// Web3
import MetaMaskOnboarding from '@metamask/onboarding';
import { useWeb3React } from '@web3-react/core';
import { UserRejectedRequestError } from '@web3-react/injected-connector';

// Utils
import { injected } from '../../../utils/web3';
import Button from '../../UI/Button';

function AuthLayout({ children }) {
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

  const [connecting, setConnecting] = useState(false);
  useEffect(() => {
    if (active || error) {
      setConnecting(false);
      onboarding.current?.stopOnboarding();
    }
  }, [active, error]);

  if (typeof account !== 'string') {
    const hasMetaMaskOrWeb3Available =
      MetaMaskOnboarding.isMetaMaskInstalled() ||
      window?.ethereum ||
      window?.web3;

    return (
      <>
        {hasMetaMaskOrWeb3Available ? (
          <Button
            caption={MetaMaskOnboarding.isMetaMaskInstalled() ? 'Connect to MetaMask' : 'Connect to Wallet'}
            onClick={() => {
              setConnecting(true);
              activate(injected, undefined, true).catch((error) => {
                // ignore the error if it's a user rejected request
                if (error instanceof UserRejectedRequestError) {
                  setConnecting(false);
                } else {
                  setError(error);
                }
              });
            }}
          />
        ) : (
          <Button
            caption={'Install Metamask'}
            onClick={() => onboarding.current?.startOnboarding()}
          />
        )}
      </>
    );
  }

  return active ? children : (
    <div>
      Hola
    </div>
  );
}

export default AuthLayout;
