// Dependencies
import React from 'react';
import { useFormik } from 'formik';

// Styles
import { EAction, EData, Evolution } from '../../../modules/AddNewNFTScreen/styles';

// Components
import InputFile from '../InputFile';
import InputText from '../InputText';
import Button from '../Button';

// Validation
import validationSchema from './validation';

// Hooks
import useFormValidation from '../../../hooks/useFormValidation';

function AddEvolutionForm({ onSubmit = () => {} }) {
  const formik = useFormik({
    initialValues: {
      photo: null,
      base64: null,
      name: '',
      description: ''
    },
    validationSchema,
    enableReinitialize: true,
    onSubmit
  });

  const [isValidForm, changeValue, getErrorFromField] = useFormValidation(formik);

  return (
    <Evolution>
      <InputFile
        label={'Evolution Photo'}
        width={'100px'}
        height={'100px'}
        error={getErrorFromField('photo')}
        value={formik.values.base64}
        onChange={({ file, base64 }) => {
          changeValue('base64', base64);
          changeValue('photo', file);
        }}
      />

      <EData>
        <InputText
          label={'Evolution name'}
          name={'name'}
          placeholder={'My Awesome NFT #1 - Pro'}
          value={formik.values.name}
          error={getErrorFromField('name')}
          onChange={name => changeValue('name', name)}
        />

        <InputText
          label={'Evolution description'}
          name={'name'}
          placeholder={'This NFT is a PRO version'}
          value={formik.values.description}
          error={getErrorFromField('description')}
          onChange={description => changeValue('description', description)}
        />

        <EAction>
          <Button
            caption={'Add evolution'}
            disabled={!isValidForm}
            onClick={formik.handleSubmit}
          />
        </EAction>
      </EData>
    </Evolution>
  );
}

export default AddEvolutionForm;
