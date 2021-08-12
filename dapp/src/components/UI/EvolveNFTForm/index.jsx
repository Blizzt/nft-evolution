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

// Validations
import validationSchema from './validation';

function EvolveNFTForm({ onSubmit }) {
  const formik = useFormik({
    initialValues: {
      code: ''
    },
    validationSchema,
    onSubmit
  });

  const [isValidForm, changeValue, getErrorFromField] = useFormValidation(formik);

  return (
    <Form>
      <InputText
        type={'text'}
        label={'Evolution code'}
        error={getErrorFromField('code')}
        onChange={code => changeValue('code', code)}
        placeholder={'Copy and paste the evolution code here.'}
      />
      <Action>
        <Button
          caption={'Evolve NFT'}
          isLoading={formik.isSubmitting}
          disabled={!isValidForm}
          onClick={formik.handleSubmit}
        />
      </Action>
    </Form>
  );
}

export default EvolveNFTForm;
