import logo from '../images/cost-manager-logo.jpeg';
import Header from '../components/Header';
import Paper from '../components/Paper';
import { Typography } from '@mui/material';
const Home = () => {
   return (
      <>
         <Header title={'Cost Manager Application'} home={true} />
         <div className="home-container">
            <Typography variant="h5" component="h2">
               Welcome to Expense Manager
            </Typography>
            <Typography
               variant="h6"
               component="h6"
               sx={{
                  fontWeight: '100',
                  width: '480px',
               }}>
               The final project includes the development of the front end of a website that works
               as a cost manager application.
            </Typography>
            <img src={logo} alt="logo" />
         </div>
      </>
   );
};
export default Home;
