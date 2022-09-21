import { useState } from 'react';
import Header from '../components/Header';
import Select from 'react-select';
import api from '../utils/api';
import Button from '@mui/material/Button';
import Paper from '../components/Paper';
import TextField from '@mui/material/TextField';
import InputLabel from '@mui/material/InputLabel';
import CustomizedSnackbars from '../components/SnackBar';

const AddUser = () => {
   const [user, setUser] = useState({});
   const [userDetails, setUserDetails] = useState(null);
   const [value, setValue] = useState(null);

   const onChangeHandle = (e) => {
      setUser({ ...user, [e.target.name]: e.target.value });
   };
   const onSubmitClick = async (e) => {
      e.preventDefault();
      try {
         const result = await api.post('/users/newUser', user);
         setUserDetails(result);
      } catch (err) {
         console.log(err);
      }
   };
   return (
      <Paper width={'500'}>
         <Header title="Add User" />
         <form
            className="add-form"
            onChange={onChangeHandle}
            id="add-user-form"
            onSubmit={onSubmitClick}>
            <InputLabel id="firstNameLabel" htmlFor="firstName">
               First Name
            </InputLabel>
            <TextField
               id="firstName"
               name="firstName"
               label="First Name"
               variant="outlined"
               className="form-control bg-white"
               type="text"
               sx={{ margin: '0 0 15px' }}
            />

            <InputLabel id="lastNameLabel" htmlFor="lastName">
               Last Name
            </InputLabel>
            <TextField
               id="lastName"
               name="lastName"
               label="Last Name"
               variant="outlined"
               className="form-control bg-white"
               type="text"
               sx={{ margin: '0 0 15px' }}
            />

            <InputLabel id="emailLabel" htmlFor="email">
               Email
            </InputLabel>
            <TextField
               id="email"
               name="email"
               label="Email"
               variant="outlined"
               className="form-control bg-white"
               type="text"
               sx={{ margin: '0 0 15px' }}
            />

            <InputLabel id="birthdayLabel" htmlFor="birthday">
               Birth date
            </InputLabel>
            <TextField
               id="birthday"
               name="birthday"
               variant="outlined"
               className="form-control bg-white"
               type="date"
               sx={{ margin: '0 0 15px' }}
            />

            <Button
               type="submit"
               variant="contained"
               size="large"
               sx={{
                  margin: '17px 1px auto',
               }}>
               Save
            </Button>
         </form>
         {userDetails === undefined ? (
            <CustomizedSnackbars isSuccess={false} msg={'No user added, email must be unique'} />
         ) : null}
         {userDetails?.status === 200 ? (
            <CustomizedSnackbars isSuccess={true} msg={'User Added'} />
         ) : null}
      </Paper>
   );
};

export default AddUser;
