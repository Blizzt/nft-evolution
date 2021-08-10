// Dependencies
import React from 'react';
import { useFormik } from 'formik';

// Styled Components
import {
  Form,
  Action
} from './styles';

// Components
import Button from '../Button';
import InputText from '../InputText';

// Hooks
import useFormValidation from '../../../hooks/useFormValidation';

function EvolveNFTForm({ onSubmit }) {
  const formik = useFormik({
    initialValues: {
      code: ''
    },
    onSubmit
  });

  const [, changeValue] = useFormValidation(formik);

  return (
    <Form>
      <InputText
        type={'text'}
        label={'Evolution code'}
        onChange={code => changeValue('code', code)}
        placeholder={'Copy and paste the evolution code here.'}
      />
      <Action>
        <Button
          caption={'Evolve NFT'}
          onClick={formik.handleSubmit}
        />
      </Action>
    </Form>
  );
}

export default EvolveNFTForm;
