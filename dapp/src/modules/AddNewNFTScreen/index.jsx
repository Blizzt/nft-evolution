// Dependencies
import React, { useCallback, useLayoutEffect } from 'react';
import { useFormik } from 'formik';
import { v4 as uuidv4 } from 'uuid';

// Styled Components
import {
  Layout,
  Form,
  Fieldset,

  Title,
  Evolution,
  EPicture,
  EData,
  EName,
  EDescription,
  ERemove
} from './styles';

// Components
import Header from '../../components/UI/Header';
import InputText from '../../components/UI/InputText';
import Button from '../../components/UI/Button';

// API
import API from '../../api';

// Hooks
import useFormValidation from '../../hooks/useFormValidation';
import useAppContext from '../../hooks/useAppContext';
import InputFile from '../../components/UI/InputFile';
import AddEvolutionForm from '../../components/UI/AddEvolutionForm';

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

  const formik = useFormik({
    initialValues: {
      name: '',
      photo: null,
      quantity: 1,
      description: '',
      evolutions: []
    },

    onSubmit: async function(values, formikHelpers) {
      formikHelpers.setSubmitting(true);

      await API.mint({
        name: values.name,
        photo: values.photo,
        quantity: values.quantity,
        description: values.description,
        evolutions: values.evolutions
      });
    }
  });

  const [, changeValue] = useFormValidation(formik);

  const onClickAddEvolution = useCallback((values, formikHelpers) => {
    values.id = uuidv4();
    changeValue('evolutions', [
      ...formik.values.evolutions,
      values
    ]);
    formikHelpers.resetForm();
  }, [formik.values.evolutions]);

  const onClickRemoveEvolution = useCallback((id) => {
    changeValue('evolutions', formik.values.evolutions.filter(e => e.id !== id));
  }, [formik.values.evolutions]);

  return (
    <Layout>
      <Header
        title={'Add NFT to Device'}
        description={'Fill in the following data to add NFT.'}
      />

      <Form onSubmit={formik.handleSubmit}>
        <Fieldset>
          <InputFile
            label={'Base NFT Photo'}
            width={'100px'}
            height={'100px'}
            onChange={({ file }) => changeValue('photo', file)}
          />
        </Fieldset>

        <Fieldset>
          <InputText
            label={'NFT Name'}
            name={'name'}
            placeholder={'My Awesome NFT #1 - Basic'}
            value={formik.values.name}
            onChange={name => changeValue('name', name)}
          />
        </Fieldset>

        <Fieldset>
          <InputText
            label={'Description'}
            name={'description'}
            type={'text'}
            placeholder={'Type the description here'}
            value={formik.values.description}
            onChange={description => changeValue('description', description)}
          />
        </Fieldset>

        <Fieldset>
          <InputText
            label={'Quantity'}
            name={'quantity'}
            type={'number'}
            placeholder={'100'}
            value={formik.values.quantity}
            onChange={quantity => changeValue('quantity', quantity)}
          />
        </Fieldset>

        <Fieldset maxWidth={'auto'}>
          <Title>Evolutions</Title>
          {formik.values.evolutions.map((evolution, index) => (
            <Evolution key={`--evolution-key-${index.toString()}`}>
              <EPicture src={evolution.base64} />
              <EData>
                <EName>{evolution.name}</EName>
                <EDescription>{evolution.description}</EDescription>
              </EData>
              <ERemove>
                <Button
                  caption={'Remove Evolution'}
                  onClick={() => onClickRemoveEvolution(evolution.id)}
                />
              </ERemove>
            </Evolution>
          ))}

          <AddEvolutionForm
            onSubmit={onClickAddEvolution}
          />
        </Fieldset>

        <Fieldset>
          <Button
            type={'submit'}
            caption={'Create NFT'}
            onClick={formik.handleSubmit}
          />
        </Fieldset>
      </Form>
    </Layout>
  );
}

export default AddNewNFTScreen;
