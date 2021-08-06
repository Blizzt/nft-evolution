/**
 *  NFTs Evolutionary
 *  ==========================================================
 *  This project has been created by the Blizzt.io team to be presented at the HackFS hackathon in 2021.
 *  The theme of this project is oriented to a how through a smartcontract you can make a NFT evolve to different phases.
 *
 *  This technology can be implemented in video games to maximize the capabilities
 *  of the blockchain and generate value and impact on the players' experience.
 *
 *  Authors:
 *  ==========================================================
 *  Blockchain:                  DApp Developer
 *  Jorge Gomes Durán       |    Germán D. Schneck
 *  CEO                     |    CTO
 *  jorge.gomes@blizz.io    |    german.schneck@blizzt.io
 *
 *  Visit our website:
 *  https://blizzt.io
 */

// Dependencies
import React from 'react';
import ReactDOM from 'react-dom';
import { Web3Provider } from '@ethersproject/providers';
import { Web3ReactProvider } from '@web3-react/core';

// Static Files
import './index.css';

// WebVitals
import reportWebVitals from './reportWebVitals';

// App
import App from './modules/App';

function getLibrary(provider) {
  return new Web3Provider(provider);
}

ReactDOM.render(
  <React.StrictMode>
    <Web3ReactProvider getLibrary={getLibrary}>
      <App />
    </Web3ReactProvider>
  </React.StrictMode>,
  document.getElementById('root')
);

reportWebVitals();
