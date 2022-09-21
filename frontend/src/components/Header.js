import PropTypes from 'prop-types';
import { Typography } from '@mui/material';

const Header = ({ title, home }) => {
   return (
      <Typography
         variant="h3"
         component="h2"
         sx={{
            fontWeight: 'bold',
            textAlign: 'center',
            margin: '10px',
            borderBottom: !home ? '1px solid #1976d2' : 'none',
         }}>
         {title}
      </Typography>
   );
};

export default Header;
