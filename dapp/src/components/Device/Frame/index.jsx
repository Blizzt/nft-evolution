// Dependencies
import React from 'react';
import { format } from 'date-fns';
import { useSpring } from 'react-spring';

// Assets
import {
  BatteryHalfOutline,
  WifiOutline
} from 'react-ionicons';

// Components
import Card from '../Card';

// Styled Components
import {
  Frame,
  Layout,
  Screen,
  Title,
  Header,
  Noise,
  Overlay,

  StatusBar,
  Indicator,
  Interaction,
  Inner, IndicatorText
} from './styles';

// Hooks
import useTime from '../../../hooks/useTime';
import useAppContext from '../../../hooks/useAppContext';

function DeviceFrame({ children }) {
  // Hooks
  const currentTime = useTime();
  const { isNFTCardEnabled, indicatorText } = useAppContext();

  const NFTCardStyles = useSpring({
    top: isNFTCardEnabled ? -100 : -500,
    left: 80,
    opacity: isNFTCardEnabled ? 1 : 0
  });

  return (
    <Frame>
      <Layout>
        <Header>
          <Title>NFTs Evolutionary 2000</Title>
        </Header>
        <Screen className="container">
          {/* Status Bar */}
          <StatusBar>
            <Indicator>
              <IndicatorText>
                {indicatorText}
              </IndicatorText>
            </Indicator>
            <Indicator top={'2px'}>
              <WifiOutline width={'20px'} height={'20px'} color={'#fff'} s />
            </Indicator>
            <Indicator top={'2px'}>
              <BatteryHalfOutline width={'22px'} height={'22px'} color={'#fff'} s />
            </Indicator>
            <Indicator>
              {format(currentTime, 'HH:mm')}
            </Indicator>
          </StatusBar>

          <Noise />
          <Overlay />
          <Inner>
            {children}
          </Inner>
        </Screen>
      </Layout>
      <Interaction style={NFTCardStyles}>
        <Card />
      </Interaction>
    </Frame>
  );
}

export default DeviceFrame;
