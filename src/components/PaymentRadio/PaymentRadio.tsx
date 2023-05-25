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

interface ValuesProps {
  name: string;
  value: string;
}

interface PaymentRadioProps {
  onClickHandler: (_event: MouseEvent<HTMLLabelElement>) => void;
  values: ValuesProps[];
}

const PaymentRadio: React.FC<PaymentRadioProps> = ({ onClickHandler, values }) => {
  return (
    <>
      <RadioGroupStyled defaultValue={values[0].value} row sx={{ mb: 5 }}>
        <FormControlLabel
          value={values[0].value}
          control={<Radio />}
          name={values[0].name}
          onClick={onClickHandler}
          label={
            <>
              <SvgIcon component={AttachMoneyIcon} viewBox="0 0 24 24" sx={{ mr: 2 }} />
              <Typography variant="body1" sx={{ fontSize: 20 }}>
                {values[0].value}
              </Typography>
            </>
          }
        />
        <FormControlLabel
          value={values[1].value}
          control={<Radio />}
          name={values[1].name}
          onClick={onClickHandler}
          label={
            <>
              <SvgIcon component={CreditCardIcon} viewBox="0 0 24 24" sx={{ mr: 2 }} />

              <Typography variant="body1" sx={{ fontSize: 20 }}>
                {values[1].value}
              </Typography>
            </>
          }
        />
      </RadioGroupStyled>
    </>
  );
};

export default PaymentRadio;
