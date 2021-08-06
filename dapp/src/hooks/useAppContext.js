// Dependencies
import { useContext } from 'react';
import AppContext from '../context/AppContext';

export default function useAppContext() {
  const {
    indicatorText,
    isNFTCardEnabled,

    setIndicatorText,
    putNFTCard,
    removeNFTCard
  } = useContext(AppContext);

  return {
    // Vars
    indicatorText,
    isNFTCardEnabled,

    // Methods
    setIndicatorText,
    putNFTCard,
    removeNFTCard
  };
}
