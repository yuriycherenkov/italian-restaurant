import Image from 'next/image';
import Box from '@mui/material/Box';
import Stack from '@mui/material/Stack';
import Typography from '@mui/material/Typography';
import Button from '@mui/material/Button';
import DeleteIcon from '@mui/icons-material/Delete';
import AddIcon from '@mui/icons-material/Add';
import RemoveIcon from '@mui/icons-material/Remove';
import IconButton from '@mui/material/IconButton';
import Paper from '@mui/material/Paper';
import { useCartContext } from '@/context/CartContext';
import { styled } from '@mui/material/styles';
import { PaymentRadio } from '../PaymentRadio';
import { PAYMENT_METHOD } from '../PaymentRadio/constants';
import TextField from '@mui/material/TextField';
import { useFormik } from 'formik';
import { validationSchemaOrder } from '../SignInForm/validation';
import { getToken } from './getToken';
import { useState } from 'react';
import { AlertComponent } from '../AlertComponent';

const StackStyled = styled(Stack)(({ theme }) => ({
  color: theme.palette.primary.main,
  fontWeight: 700,
}));

const PaperStyled = styled(Paper)(() => ({
  backgroundColor: '#00D9D9',
  color: '#fff',
}));

const radioValues = [PAYMENT_METHOD.CART, PAYMENT_METHOD.CASH];

const Cart: React.FC = () => {
  const [tokenIDError, setError] = useState('');

  const { cart, addToCart, removeFromCart, decreaseQuantity, clearAll, totalPrice } = useCartContext();
  const { handleSubmit, handleChange, values, errors, touched } = useFormik({
    initialValues: {
      tokenId: '',
      paymentMethod: PAYMENT_METHOD.CART,
    },
    validationSchema: validationSchemaOrder,
    onSubmit: async (values) => {
      setError('');

      try {
        // TODO: do we need this?
        // eslint-disable-next-line no-unused-vars
        const res = await getToken(values.tokenId);
      } catch (error: any) {
        setError(error?.response?.data?.error);
      }

      // TODO: make order if no errors
    },
  });

  return (
    <Box
      component="form"
      onSubmit={(e) => {
        e.preventDefault();
        handleSubmit(e);
      }}
      noValidate
      sx={{ width: 600, p: 2 }}
    >
      <Stack direction="row" justifyContent="space-between" alignItems="center" sx={{ mb: 2 }}>
        <Typography variant="h5">Current Order</Typography>
        <Button onClick={() => clearAll()}>Clear all</Button>
      </Stack>
      <Box sx={{ width: '100%', mb: 5 }}>
        {cart.map(({ item, quantity }) => (
          <Stack direction="row" alignItems="center" key={item.id} sx={{ mb: 2 }}>
            <Stack direction="row" alignItems="center" sx={{ maxWidth: 340, width: '100%', mr: 2 }}>
              <Paper sx={{ overflow: 'hidden', height: 60, width: '100%', maxWidth: 60, mr: 1 }}>
                <Image src={item.dish.image || 'todo'} height={60} alt="" width={60} />
              </Paper>
              <Typography
                variant="h6"
                sx={{
                  width: '100%',
                  whiteSpace: 'nowrap',
                  overflow: 'hidden',
                  textOverflow: 'ellipsis',
                }}
              >
                {item.dish.title}
              </Typography>
            </Stack>

            <Stack direction="row" alignItems="center" sx={{ mr: 2 }}>
              <IconButton
                disabled={quantity <= 1}
                onClick={() => {
                  decreaseQuantity(item.id);
                }}
              >
                <RemoveIcon fontSize="inherit" />
              </IconButton>
              <Typography variant="body1" sx={{ padding: 1 }}>
                {quantity}
              </Typography>
              <IconButton
                onClick={() => {
                  addToCart(item);
                }}
              >
                <AddIcon fontSize="inherit" />
              </IconButton>
            </Stack>
            <StackStyled direction="row" alignItems="center" sx={{ mr: 'auto' }}>
              ${(item.price * quantity).toFixed(2)}
            </StackStyled>

            <IconButton
              sx={{ ml: 'auto' }}
              onClick={() => {
                removeFromCart(item.id);
              }}
            >
              <DeleteIcon fontSize="inherit" />
            </IconButton>
          </Stack>
        ))}
      </Box>
      <Box>
        <PaperStyled elevation={2} sx={{ width: '100%', p: 2, mb: 5 }}>
          <Stack direction="row" justifyContent="space-between" alignItems="center">
            <Typography variant="h6">Total</Typography>
            <Typography variant="body1">{totalPrice.toFixed(2)}</Typography>
          </Stack>
        </PaperStyled>
      </Box>
      <Box>
        <Stack direction="row" justifyContent="space-between" alignItems="center">
          <Typography variant="h5">Payment Method</Typography>
        </Stack>
      </Box>
      <PaymentRadio onClickHandler={handleChange} values={radioValues} name="paymentMethod" />
      <TextField
        id="tokenId"
        label="please enter token ID"
        name="tokenId"
        onChange={handleChange}
        value={values.tokenId}
        required
        fullWidth
        autoFocus
        error={Boolean(errors.tokenId && touched.tokenId)}
        autoComplete="token-id"
        helperText={errors.tokenId}
        margin="normal"
        sx={{ mb: 2 }}
      />
      <AlertComponent
        hasError={!!tokenIDError}
        severity="error"
        resetError={() => setError('')}
        message={tokenIDError}
        sx={{ mb: 2 }}
      />

      <Box sx={{ width: '100%', mb: 5 }}>
        <Button
          type="submit"
          variant="contained"
          sx={{ p: 2, width: '100%' }}
          disabled={!cart.length || !!Object.keys(errors).length}
        >
          Make an order
        </Button>
      </Box>
    </Box>
  );
};

export default Cart;
