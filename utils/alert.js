import { useState } from 'react';
import { Snackbar, Alert } from '@mui/material';

export const useSnackbar = () => {
  const [snackbarOpen, setSnackbarOpen] = useState(false);
  const [snackbarMessage, setSnackbarMessage] = useState('');
  const [snackbarSeverity, setSnackbarSeverity] = useState('success');

  const handleSnackbarClose = (event, reason) => {
    if (reason === 'clickaway') {
      return;
    }
    setSnackbarOpen(false);
  };

  const handleOpenSnackbar = (message, severity = 'success') => {
    setSnackbarMessage(message);
    setSnackbarSeverity(severity);
    setSnackbarOpen(true);
  };

  const SnackbarComponent = (
    <Snackbar
      open={snackbarOpen}
      autoHideDuration={4000}
      onClose={handleSnackbarClose}
      anchorOrigin={{ vertical: 'top', horizontal: 'center' }}
    >
      <Alert
        onClose={handleSnackbarClose}
        severity={snackbarSeverity}
        sx={{
          fontSize: '1.25rem',
          padding: '20px 40px',
          width: '100%',
          maxWidth: '600px',
          boxShadow: 3,
        }}
      >
        {snackbarMessage}
      </Alert>
    </Snackbar>
  );

  return { handleOpenSnackbar, SnackbarComponent };
};