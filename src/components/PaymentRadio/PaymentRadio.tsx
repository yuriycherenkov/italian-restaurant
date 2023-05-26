import React, { MouseEvent } from 'react';
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

interface PaymentRadioProps {
  onClickHandler: (_event: MouseEvent<HTMLLabelElement>) => void;
  name: string;
  values: string[];
}

const PaymentRadio: React.FC<PaymentRadioProps> = ({ onClickHandler, values, name }) => {
  return (
    <>
      <RadioGroupStyled defaultValue={values[0]} name={name} row sx={{ mb: 5 }}>
        <FormControlLabel
          tabIndex={0}
          value={values[0]}
          control={<Radio />}
          onClick={onClickHandler}
          label={
            <>
              <SvgIcon component={AttachMoneyIcon} viewBox="0 0 24 24" sx={{ mr: 2 }} />
              <Typography variant="body1" sx={{ fontSize: 20 }}>
                {values[0]}
              </Typography>
            </>
          }
        />
        <FormControlLabel
          tabIndex={0}
          value={values[1]}
          control={<Radio />}
          onClick={onClickHandler}
          label={
            <>
              <SvgIcon component={CreditCardIcon} viewBox="0 0 24 24" sx={{ mr: 2 }} />

              <Typography variant="body1" sx={{ fontSize: 20 }}>
                {values[1]}
              </Typography>
            </>
          }
        />
      </RadioGroupStyled>
    </>
  );
};

export default PaymentRadio;
