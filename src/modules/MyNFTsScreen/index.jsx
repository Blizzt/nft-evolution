// Dependencies
import React, { useCallback } from 'react';
import { useHistory } from 'react-router-dom';

// Styled Components
import {
  Layout,
  List,
  Item,
  Image,
  Title,
  Amount
} from './styles';

// Components
import Header from '../../components/UI/Header';
import Button from '../../components/UI/Button';
import AuthLayout from '../../components/Layout/AuthLayout';

function MyNFTsScreen() {
  // Hooks
  const history = useHistory();

  const onClickAddNFT = useCallback(() => {
    history.push('/my-nfts/new');
  }, []);

  return (
    <AuthLayout>
      <Layout>
        <Header
          title={'My NFT`s'}
          description={'List of NFT\'s stored in the device.'}
          rightElement={(
            <Button
              caption={'Add NFT'}
              onClick={onClickAddNFT}
            />
          )}
        />
        <List>
          <Item>
            <Image src={'https://lh3.googleusercontent.com/zpe-PQgVcFcdZF5dJfXex0hS_buqdW9k9zuopCI5HKNwbSGF1oXTZw2_XnSMyDzZ2ZXhjmBnhoZ3gNZ4980PxWgBCm5foGQ-EmuhxA=w600'} />
            <Title>Example NFT #1</Title>
            <Amount>260</Amount>
          </Item>
          <Item>
            <Image src={'https://lh3.googleusercontent.com/BDndoBqNh9dr5nd_0fxs8Ya_WFOOxctXMCJR59J9VoUuIH8ZrsqsCX2EmVsKXsY60XHnhMTnUFySyExMsW9le3VEWuLNF-rliCr6cjI=w600'} />
            <Title>Example NFT #2</Title>
            <Amount>2252</Amount>
          </Item>
          <Item>
            <Image src={'https://lh3.googleusercontent.com/2jDygBe5rKjFN_Vq8A0FJ5lzF9KMC90HOhAekiRCNdwvpAu3Rn9NobkaC4H_B4qiamFX1ciWQXMkVKTMvRxNn0IJW1SW8C6tJFjN=w600'} />
            <Title>Example NFT #3</Title>
            <Amount>6323</Amount>
          </Item>
          <Item>
            <Image src={'https://lh3.googleusercontent.com/b_fC0D0BrAGcPhdqqpXSZ2pHJ98u_AB6IOQ_KFLL7zSxBwCYTf8KwhCR6kWrsot3PfeJbzL76ZM_JWpiyFNPNnZ6BwZkjLcnLEIOQw=w600'} />
            <Title>Example NFT #4</Title>
            <Amount>123</Amount>
          </Item>
          <Item>
            <Image src={'https://lh3.googleusercontent.com/2jDygBe5rKjFN_Vq8A0FJ5lzF9KMC90HOhAekiRCNdwvpAu3Rn9NobkaC4H_B4qiamFX1ciWQXMkVKTMvRxNn0IJW1SW8C6tJFjN=w600'} />
            <Title>Example NFT #5</Title>
            <Amount>663</Amount>
          </Item>
          <Item>
            <Image src={'https://lh3.googleusercontent.com/iebyIOEQ25F4SfUD5Ab9JRvIOScfyHlmgGlmqSdwZ8wI8SMls_C6bcJCf5HJfr0RJ5JTiWojIZeRCONhoB5kRcsxuJMQEhfjz7Vn=w600'} />
            <Title>Example NFT #6</Title>
            <Amount>236</Amount>
          </Item>
          <Item>
            <Image src={'https://lh3.googleusercontent.com/ZEv4jXMvOxAMpxxGq4DfFzmiQibljknI94Xe3kZBbCN3FNy-Y4lrf1PDku98KcE3paO_9a-5narGwSNhmsrManF8tyIlgKHDAcIDYsE=w600'} />
            <Title>Example NFT #7</Title>
            <Amount>43</Amount>
          </Item>
          <Item>
            <Image src={'https://lh3.googleusercontent.com/FlcfCY2pcT1MBFfNibr-q8wulEzd1tXZzKzuV9jAY2clrHdUKA6K3u7xOtZ2u1-jP8aFMnCeHxKN5chD8p2wpJH5p2GG6FK-EeQztg=w600'} />
            <Title>Example NFT #8</Title>
            <Amount>865</Amount>
          </Item>
        </List>
      </Layout>
    </AuthLayout>
  );
}

export default MyNFTsScreen;
