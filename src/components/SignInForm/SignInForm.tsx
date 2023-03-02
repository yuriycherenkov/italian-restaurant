import Button from '@mui/material/Button';
import { useFormik } from 'formik';
import { Box, TextField } from '@mui/material';
import { validationSchema } from './validation';
import { useSignIn } from '@/hooks/useSignIn';
import { AlertComponent } from '../AlertComponent';

const SignInForm: React.FC<{ csrfToken?: string }> = ({ csrfToken }) => {
  const { signIn, hasError, setError: resetError } = useSignIn();

  const { handleSubmit, handleChange, values, errors, touched } = useFormik({
    initialValues: {
      email: '',
      password: '',
    },
    validationSchema,
    onSubmit: ({ email, password }) =>
      signIn('credentials', {
        redirect: false,
        email,
        password,
      }),
  });

  return (
    <Box
      component="form"
      onSubmit={(e) => {
        e.preventDefault();
        handleSubmit(e);
      }}
      noValidate
      sx={{ mt: 1 }}
    >
      <input type="hidden" name="csrfToken" defaultValue={csrfToken} />
      <TextField
        id="email"
        label="Email"
        name="email"
        onChange={handleChange}
        value={values.email}
        required
        fullWidth
        autoComplete="email"
        autoFocus
        error={Boolean(errors.email && touched.email)}
        helperText={errors.email}
        margin="normal"
      />
      <TextField
        id="password"
        type="password"
        label="Password"
        name="password"
        onChange={handleChange}
        value={values.password}
        required
        fullWidth
        autoComplete="current-password"
        error={Boolean(errors.password && touched.password)}
        helperText={errors.password}
        margin="normal"
      />
      <AlertComponent
        hasError={hasError}
        severity="error"
        resetError={resetError}
        message="Email or password is not correct"
      />
      <Button type="submit" fullWidth variant="contained" sx={{ mt: 3, mb: 2 }}>
        Sign in
      </Button>
    </Box>
  );
};

export default SignInForm;
