import * as React from 'react';
import Stack from '@mui/material/Stack';
import Button from '@mui/material/Button';
import Snackbar from '@mui/material/Snackbar';
import MuiAlert, { AlertProps } from '@mui/material/Alert';

const Alert = React.forwardRef(function Alert(props, ref) {
   return <MuiAlert elevation={6} ref={ref} variant="filled" {...props} />;
});

export default function CustomizedSnackbars({ isSuccess, msg }) {
   const [open, setOpen] = React.useState(true);

   const handleClose = (event, reason) => {
      if (reason === 'clickaway') return;
      setOpen(false);
   };

   return (
      <Stack spacing={2} sx={{ width: '100%' }}>
         <Snackbar open={open} autoHideDuration={6000} onClose={handleClose}>
            {isSuccess ? (
               <Alert onClose={handleClose} severity="success" sx={{ width: '100%' }}>
                  {msg}
               </Alert>
            ) : (
               <Alert onClose={handleClose} severity="error" sx={{ width: '100%' }}>
                  {msg}
               </Alert>
            )}
         </Snackbar>
      </Stack>
   );
}
