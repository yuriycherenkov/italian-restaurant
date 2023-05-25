import React from 'react';
import { OrderStatus } from '@prisma/client';
import Stepper from '@mui/material/Stepper';
import Step from '@mui/material/Step';
import StepLabel from '@mui/material/StepLabel';

const STATUSES: OrderStatus[] = ['PENDING', 'PROCESSING', 'READY'];

export const OrderStatusStepper: React.FC<{ status: OrderStatus }> = ({ status }) => {
  const activeStatus = React.useMemo(() => STATUSES.findIndex((item) => item === status) || 0, [status]);
  return (
    <Stepper activeStep={activeStatus} alternativeLabel>
      {STATUSES.map((label) => (
        <Step key={label}>
          <StepLabel>{label}</StepLabel>
        </Step>
      ))}
    </Stepper>
  );
};
