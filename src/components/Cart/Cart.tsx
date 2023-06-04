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
import { post } from '@/service/fetch';
import List from '@mui/material/List';
import { ListItem } from '@mui/material';
import { useRouter } from 'next/router';

const BoxWrapperStyled = styled(Box)<{ noValidate: boolean }>(({ theme }) => ({
  width: '100%',
  padding: 16,
  [theme.breakpoints.up('sm')]: {
    width: 600,
  },
}));

const StackStyledBold = styled(Stack)(({ theme }) => ({
  color: theme.palette.primary.main,
  fontWeight: 700,
}));

const ListItemStyled = styled(ListItem)(({ theme }) => ({
  padding: 0,
  [theme.breakpoints.down('sm')]: {
    flexWrap: 'wrap',
    marginBottom: 32,
  },
}));

const StackStyledProduct = styled(Stack)(({ theme }) => ({
  maxWidth: 340,
  width: '100%',
  marginRight: 16,
  [theme.breakpoints.down('sm')]: {
    maxWidth: '100%',
    marginBottom: 8,
    marginRight: 0,
  },
}));

const PaperStyled = styled(Paper)(() => ({
  backgroundColor: '#00D9D9',
  color: '#fff',
}));

const radioValues = [PAYMENT_METHOD.CART, PAYMENT_METHOD.CASH];

const Cart: React.FC = () => {
  const { query } = useRouter();
  const tokenId = query?.tokenId as string | undefined;

  const [tokenIDError, setError] = useState('');

  const { cart, addToCart, removeFromCart, decreaseQuantity, clearAll, totalPrice } = useCartContext();
  const { handleSubmit, handleChange, values, errors, touched, isSubmitting } = useFormik({
    initialValues: {
      tokenId: tokenId ?? '',
      paymentMethod: PAYMENT_METHOD.CART,
    },
    validationSchema: validationSchemaOrder,
    onSubmit: async (values) => {
      setError('');

      try {
        await getToken(values.tokenId);

        const orderCartInfo = cart.map(({ quantity, item }) => ({
          quantity,
          itemId: item.id,
        }));

        const result = await post('/api/orders', {
          orderCartInfo,
          paymentDetails: {
            paymentMethod: values.paymentMethod,
            tokenId: Number(values.tokenId),
          },
        });

        window.location.href = result.checkout_url ?? `/order/${result.id}`;
      } catch (error: any) {
        setError(error?.response?.data?.error || 'something went wrong');
      }
    },
  });

  const emptyCart = !cart.length && !totalPrice;

  return (
    <BoxWrapperStyled
      component="form"
      onSubmit={(e: any) => {
        e.preventDefault();
        handleSubmit(e);
      }}
      noValidate
    >
      <Stack direction="row" justifyContent="space-between" alignItems="center" sx={{ mb: 2 }}>
        <Typography variant="h5">Current Order</Typography>
        <Button disabled={emptyCart} onClick={() => clearAll()}>
          Clear all
        </Button>
      </Stack>

      {emptyCart ? (
        <Typography variant="h6" sx={{ mb: 3 }}>
          Your cart is empty
        </Typography>
      ) : (
        <>
          <Box sx={{ width: '100%', mb: 5 }}>
            <List>
              {cart.map(({ item, quantity }) => (
                <ListItemStyled alignItems="center" key={item.id} sx={{ mb: 2 }}>
                  <StackStyledProduct direction="row" alignItems="center">
                    <Paper sx={{ overflow: 'hidden', height: 80, width: '100%', maxWidth: 80, mr: 1 }}>
                      <Image src={item.dish.image || 'todo'} height={80} alt="" width={80} />
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
                  </StackStyledProduct>

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
                  <StackStyledBold direction="row" alignItems="center" sx={{ mr: 'auto' }}>
                    ${(item.price * quantity).toFixed(2)}
                  </StackStyledBold>

                  <IconButton
                    sx={{ ml: 'auto' }}
                    onClick={() => {
                      removeFromCart(item.id);
                    }}
                  >
                    <DeleteIcon fontSize="inherit" />
                  </IconButton>
                </ListItemStyled>
              ))}
            </List>
          </Box>
          <Box>
            <PaperStyled elevation={2} sx={{ width: '100%', p: 2, mb: 5 }}>
              <Stack direction="row" justifyContent="space-between" alignItems="center">
                <Typography variant="h6">Total</Typography>
                <Typography variant="body1" sx={{ fontSize: 26 }}>
                  ${totalPrice.toFixed(2)}
                </Typography>
              </Stack>
              <Stack direction="row" justifyContent="space-between" alignItems="center">
                <Typography variant="body1">Including VAT</Typography>
                <Typography variant="body2">${(totalPrice * 0.2).toFixed(2)}</Typography>
              </Stack>
            </PaperStyled>
          </Box>
          <Box>
            <Stack direction="row" justifyContent="space-between" alignItems="center">
              <Typography variant="h5" sx={{ width: '100%', textAlign: 'center', mb: 1 }}>
                Payment Method
              </Typography>
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
            disabled={!!tokenId}
            fullWidth
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
        </>
      )}

      <Box sx={{ width: '100%', mb: 5 }}>
        <Button
          type="submit"
          variant="contained"
          sx={{ p: 2, width: '100%' }}
          disabled={!!Object.keys(errors).length || !values.tokenId || isSubmitting || emptyCart}
        >
          Make an order
        </Button>
      </Box>
    </BoxWrapperStyled>
  );
};

export default Cart;
