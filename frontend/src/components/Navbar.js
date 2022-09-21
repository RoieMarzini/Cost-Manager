import CustomLink from './CustomLink';
import { shadows } from '@mui/system';
import Box from '@mui/material/Box';

const Navbar = () => {
   return (
      <Box
         sx={{
            boxShadow: 4,
            width: '100%',
            margin: '0 auto',
            borderRadius: '0 0 50px 50px ',
         }}>
         <div className="navbar">
            <CustomLink to="/" name="Home" />
            <CustomLink to="/addUser" name="Add User" />
            <CustomLink to="/addCost" name="Add Cost" />
            <CustomLink to="/report" name="Get Report" />
         </div>
      </Box>
   );
};

export default Navbar;
