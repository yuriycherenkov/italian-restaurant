import * as Yup from 'yup';

export const validationSchema = Yup.object({
  email: Yup.string().email('Invalid email address').required('Please enter your email'),
  password: Yup.string().required('Please enter your password'),
});

export const validationSchemaOrder = Yup.object({
  tokenId: Yup.string().required('Please enter token ID'),
  optionCash: Yup.string().optional(),
  nameOptionTwo: Yup.string().optional(),
});
