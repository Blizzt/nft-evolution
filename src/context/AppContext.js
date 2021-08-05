// Dependencies
import React, { useCallback, useRef, useState } from 'react';

export const DEFAULT_APP_SETTINGS = {
  indicatorText: null,
  isNFTCardEnabled: false,

  setIndicatorText: () => {},
  putNFTCard: () => {},
  removeNFTCard: () => {}
};

export const AppContext = React.createContext(DEFAULT_APP_SETTINGS);

export function AppContextProvider({ children }) {
  const timer = useRef(null);
  const [indicatorText, setIndicatorTextState] = useState(DEFAULT_APP_SETTINGS.indicatorText);
  const [isNFTCardEnabled, setNFTCardState] = useState(DEFAULT_APP_SETTINGS.isNFTCardEnabled);

  const putNFTCard = useCallback(() => {
    setNFTCardState(true);
  }, []);

  const removeNFTCard = useCallback(() => {
    setNFTCardState(false);
  }, []);

  const setIndicatorText = useCallback((text) => {
    if (timer.current) {
      clearTimeout(timer.current);
    }
    setIndicatorTextState(text);
    timer.current = setTimeout(() => {
      setIndicatorTextState(null);
    }, 1500);
  }, [timer]);

  const stateToProps = {
    indicatorText,
    isNFTCardEnabled,

    setIndicatorText,
    putNFTCard,
    removeNFTCard
  };

  return (
    <AppContext.Provider value={stateToProps}>
      {children}
    </AppContext.Provider>
  );
}

export default AppContext;
