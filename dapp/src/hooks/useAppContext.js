// Dependencies
import { useContext } from 'react';
import AppContext from '../context/AppContext';

export default function useAppContext() {
  const {
    indicatorText,
    isNFTCardEnabled,
    isPowerDeliveryEnabled,

    setIndicatorText,
    putNFTCard,
    removeNFTCard,

    putPowerDelivery,
    removePowerDelivery
  } = useContext(AppContext);

  return {
    // Vars
    indicatorText,
    isNFTCardEnabled,
    isPowerDeliveryEnabled,

    // Methods
    setIndicatorText,
    putNFTCard,
    removeNFTCard,
    putPowerDelivery,
    removePowerDelivery
  };
}
