// Dependencies
import * as Yup from 'yup';
const validationSchema = Yup.object().shape({
  name: Yup
    .string()
    .required('Indicates the name of the evolution'),

  photo: Yup
    .mixed()
    .required('You must upload a photo'),

  description: Yup
    .string()
    .required('Indicates the description of the evolution')
});

export default validationSchema;
