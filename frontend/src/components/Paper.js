import * as React from 'react';
import Paper from '@mui/material/Paper';
import { styled } from '@mui/material/styles';

const Item = styled(Paper)(({ theme }) => ({
   ...theme.typography.body2,
   textAlign: 'center',
   borderRadius: '10px',
   backgroundColor: '#12a7f22b',
}));

export default function Elevation({ children, width, margin, maxWidth }) {
   return (
      <Item
         className="container"
         style={{ width: width, margin: margin, maxWidth: maxWidth }}
         elevation={8}>
         {children}
      </Item>
   );
}
