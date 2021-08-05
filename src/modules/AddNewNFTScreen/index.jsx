// Dependencies
import React, { useLayoutEffect } from 'react';

// Styled Components
import {
  Layout,
  Form,
  Fieldset
} from './styles';

// Components
import Header from '../../components/UI/Header';
import InputText from '../../components/UI/InputText';

// AppContext
import useAppContext from '../../hooks/useAppContext';

function AddNewNFTScreen() {
  // Hooks
  const { setIndicatorText, putNFTCard, removeNFTCard } = useAppContext();

  useLayoutEffect(() => {
    putNFTCard();
    setIndicatorText('NFT Card Added');

    return () => {
      removeNFTCard();
      setIndicatorText('NFT Card Removed');
    };
  }, []);

  return (
    <Layout>
      <Header
        title={'Add NFT to Device'}
        description={'Fill in the following data to add NFT.'}
      />

      <Form>
        <Fieldset>
          <InputText
            label={'NFT Name'}
            name={'name'}
            placeholder={'My Awesome NFT #1'}
          />
        </Fieldset>

        <Fieldset>
          <InputText
            label={'Quantity'}
            name={'name'}
            type={'number'}
            placeholder={'100'}
          />
        </Fieldset>
      </Form>
    </Layout>
  );
}

export default AddNewNFTScreen;
