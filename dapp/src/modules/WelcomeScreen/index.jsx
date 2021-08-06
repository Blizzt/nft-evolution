// Dependencies
import React, { useCallback } from 'react';
import { useHistory } from 'react-router-dom';

// Styled Components
import {
  Layout,
  Logo,
  Title,
  Actions,
  Paragraph
} from './styles';

// Assets
import BlizztLogo from '../../assets/images/blizzt-logo.svg';

// Components
import Button from '../../components/UI/Button';

function WelcomeScreen() {
  // Hooks
  const history = useHistory();

  const onClickInstruction = useCallback(() => {
    history.push('/help');
  }, []);

  const onClickStart = useCallback(() => {
    history.push('/home');
  }, []);

  return (
    <Layout>
      <Logo src={BlizztLogo} alt={'Welcome to Blizzt!'} />
      <Title>Welcome to Blizzt NFT Evolutionary</Title>
      <Paragraph>If this is your first time and you want to know more about how this works, click on the Introduction button. Otherwise, press start to continue.</Paragraph>

      <Actions>
        <Button
          caption={'Instructions'}
          onClick={onClickInstruction}
        />

        <Button
          caption={'Start'}
          onClick={onClickStart}
        />
      </Actions>
    </Layout>
  );
}

export default WelcomeScreen;
