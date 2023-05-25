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

const StackStyled = styled(Stack)(({ theme }) => ({
  color: theme.palette.primary.main,
  fontWeight: 700,
}));

const PaperStyled = styled(Paper)(() => ({
  backgroundColor: '#00D9D9',
  color: '#fff',
}));

const Cart: React.FC = () => {
  const { cart, addToCart, removeFromCart, decreaseQuantity, clearAll, totalPrice } = useCartContext();
  const {
    handleSubmit,
    handleChange,
    values: { tokenId, nameOptionOne, nameOptionTwo },
    errors,
    touched,
  } = useFormik({
    initialValues: {
      tokenId: '',
      nameOptionOne: PAYMENT_METHOD.CART,
      nameOptionTwo: PAYMENT_METHOD.CASH,
    },
    validationSchema: validationSchemaOrder,
    onSubmit: ({ tokenId }) => {
      console.log(' submit ', tokenId);
    },
  });

  const handleOnChange = (event: any) => {
    console.log(event.target.value, event.target.checked);

    handleChange(event);
  };

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

      <PaymentRadio
        onClickHandler={handleOnChange}
        values={[
          {
            name: 'radioGroup',
            value: nameOptionOne,
          },
          {
            name: 'radioGroup',
            value: nameOptionTwo,
          },
        ]}
      />

      {nameOptionOne === PAYMENT_METHOD.CART && (
        <TextField
          id="tokenId"
          label="tokenId"
          name="tokenId"
          onChange={handleChange}
          value={tokenId}
          required
          fullWidth
          autoFocus
          error={Boolean(errors.tokenId && touched.tokenId)}
          helperText={errors.tokenId}
          margin="normal"
        />
      )}
      <Box sx={{ width: '100%', mb: 5 }}>
        <Button
          onClick={() => console.log('submit')}
          variant="contained"
          sx={{ p: 2, width: '100%' }}
          disabled={!cart.length}
        >
          Make an order
        </Button>
      </Box>
    </Box>
  );
};

export default Cart;
