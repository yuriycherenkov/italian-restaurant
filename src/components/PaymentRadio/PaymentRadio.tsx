import * as React from 'react';
import RadioGroup from '@mui/material/RadioGroup';
import Radio from '@mui/material/Radio';
import FormControlLabel from '@mui/material/FormControlLabel';
import SvgIcon from '@mui/icons-material/CheckCircleRounded';
import CreditCardIcon from '@mui/icons-material/CreditCard';
import AttachMoneyIcon from '@mui/icons-material/AttachMoney';
import { styled } from '@mui/material/styles';
import Typography from '@mui/material/Typography';

const RadioGroupStyled = styled(RadioGroup)(({ theme }) => ({
  display: 'flex',
  flexDirection: 'row',
  justifyContent: 'center',
  alignItems: 'center',

  '.MuiFormControlLabel-root > .MuiRadio-root': {
    display: 'none',
  },
  '.Mui-checked + .MuiFormControlLabel-label': {
    border: `3px solid ${theme.palette.primary.main}`,
  },
  '.MuiFormControlLabel-label': {
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',

    width: 150,
    padding: 30,
    border: `3px solid transparent`,
    borderRadius: 5,
    margin: 10,
    backgroundColor: '#F9F9F9',
  },
}));

const PaymentRadio = () => {
  return (
    <RadioGroupStyled defaultValue="Cash" row sx={{ mb: 5 }}>
      <FormControlLabel
        value="Cash"
        control={<Radio />}
        label={
          <>
            <SvgIcon component={AttachMoneyIcon} viewBox="0 0 24 24" sx={{ mr: 2 }} />
            <Typography variant="body1" sx={{ fontSize: 20 }}>
              Cash
            </Typography>
          </>
        }
      />
      <FormControlLabel
        value="Cart"
        control={<Radio />}
        label={
          <>
            <SvgIcon component={CreditCardIcon} viewBox="0 0 24 24" sx={{ mr: 2 }} />

            <Typography variant="body1" sx={{ fontSize: 20 }}>
              Cart
            </Typography>
          </>
        }
      />
    </RadioGroupStyled>
  );
};

export default PaymentRadio;
