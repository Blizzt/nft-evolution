// Dependencies
import * as Yup from 'yup';

const validationSchema = Yup.object().shape({
  name: Yup
    .string()
    .required('Indicates the name of the NFT'),

  photo: Yup
    .mixed()
    .required('You must upload a photo'),

  quantity: Yup
    .number()
    .min(1, 'The minimum is 1')
    .required('Indicate the amount of NTFs you are going to mint'),

  description: Yup
    .string()
    .required('Indicates the description of the NFT'),

  evolutions: Yup
    .array()
    .required('You must add an evaluation')
});

export default validationSchema;
