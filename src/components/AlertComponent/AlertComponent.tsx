import { Alert, AlertColor } from '@mui/material';

const AlertComponent: React.FC<{
  hasError: boolean;
  message: string;
  severity: AlertColor;
  resetError: (_: boolean) => void;
}> = ({ hasError, message, severity, resetError }) => {
  return hasError ? (
    <Alert onClose={() => resetError(false)} severity={severity} sx={{ width: '100%' }}>
      {message}
    </Alert>
  ) : null;
};

export default AlertComponent;
