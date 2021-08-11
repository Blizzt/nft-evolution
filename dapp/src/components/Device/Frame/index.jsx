// Dependencies
import React from 'react';
import { format } from 'date-fns';
import { useSpring } from 'react-spring';

// Assets
import {
  BatteryHalfOutline,
  WifiOutline,
  BatteryCharging,
  LogoDiscord,
  LogoLinkedin
} from 'react-ionicons';

// Components
import Card from '../Card';
import PowerDelivery from '../PowerDelivery';

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
  Inner,
  IndicatorText,

  Footer,
  Navigator,
  Link
} from './styles';

// Hooks
import useTime from '../../../hooks/useTime';
import useAppContext from '../../../hooks/useAppContext';

function DeviceFrame({ children }) {
  // Hooks
  const currentTime = useTime();
  const { isNFTCardEnabled, isPowerDeliveryEnabled, indicatorText } = useAppContext();

  const NFTCardStyles = useSpring({
    top: isNFTCardEnabled ? -100 : -500,
    left: 80,
    opacity: isNFTCardEnabled ? 1 : 0
  });

  const PowerDeliveryStyle = useSpring({
    bottom: 120,
    left: isPowerDeliveryEnabled ? -42 : -450,
    config: {
      duration: 150
    }
  });

  return (
    <Frame>
      <Layout>
        <Header>
          <Title>NFTs Evolutionary - Blizzt</Title>
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
              <WifiOutline width={'20px'} height={'20px'} color={'#fff'} />
            </Indicator>
            <Indicator top={'2px'}>
              {isPowerDeliveryEnabled ? (
                <BatteryCharging width={'22px'} height={'22px'} color={'#fff'} />
              ) : (
                <BatteryHalfOutline width={'22px'} height={'22px'} color={'#fff'} />
              )}
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

        <Footer>
          <Navigator>
            <div>
              <Link
                target={'_blank'}
                href={'https://blizzt.io'}>
                Powered by Blizzt
              </Link>
            </div>
            <div>
              <Link
                target={'_blank'}
                href={'https://discord.com/invite/38jHjVKZXH'}>
                <LogoDiscord
                  width={'18px'}
                  height={'18px'}
                  color={'#333333'}
                />
              </Link>
              <Link
                target={'_blank'}
                href={'https://www.linkedin.com/company/74049428'}>
                <LogoLinkedin
                  width={'18px'}
                  height={'18px'}
                  color={'#333333'}
                />
              </Link>
            </div>
          </Navigator>
        </Footer>
      </Layout>
      <Interaction style={NFTCardStyles}>
        <Card />
      </Interaction>

      <Interaction style={PowerDeliveryStyle}>
        <PowerDelivery />
      </Interaction>

    </Frame>
  );
}

export default DeviceFrame;
