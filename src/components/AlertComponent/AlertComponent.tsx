import { Alert, AlertColor, SxProps, Theme } from '@mui/material';

const AlertComponent: React.FC<{
  sx?: SxProps<Theme>;
  hasError: boolean;
  message: string;
  severity: AlertColor;
  resetError: (_: boolean) => void;
}> = ({ sx = {}, hasError, message, severity, resetError }) => {
  return hasError ? (
    <Alert onClose={() => resetError(false)} severity={severity} sx={{ width: '100%', ...sx }}>
      {message}
    </Alert>
  ) : null;
};

export default AlertComponent;
