// Dependencies
import * as Yup from 'yup';
const validationSchema = Yup.object().shape({
  code: Yup
    .string()
    .required('Write the evolution code')
});

export default validationSchema;
