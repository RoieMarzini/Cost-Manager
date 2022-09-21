import { useState, useEffect } from 'react';
import api from '../utils/api';
import Header from '../components/Header';
import Select from 'react-select';
import Paper from '../components/Paper';
import Button from '@mui/material/Button';
import TextField from '@mui/material/TextField';
import InputLabel from '@mui/material/InputLabel';
import { Typography } from '@mui/material';
import CustomizedSnackbars from '../components/SnackBar';

const AddCost = () => {
   const [cost, setCost] = useState({});
   const [users, setUsers] = useState([]);
   const [costDetails, setCostDetails] = useState([]);
   useEffect(() => {
      const fetchUsers = async () =>
         await api.get('users/').then((res) => {
            setUsers(res.data);
         });
      fetchUsers().catch((err) => {
         console.log(err);
      });
   }, []);

   const onChangeHandle = (e) => {
      setCost({ ...cost, [e.target.name]: e.target.value });
   };

   const onSubmitClick = async (e) => {
      e.preventDefault();
      try {
         const result = await api.post('/costs/newCost', cost);
         result.status === 200 && setCostDetails([result, ...costDetails]);
      } catch (err) {
         console.log(err);
      }
   };

   return (
      <Paper>
         <Header title="Add Cost" />
         <form
            className="add-form"
            onChange={onChangeHandle}
            id="add-cost-form"
            onSubmit={onSubmitClick}>
            <InputLabel id="categoryLabel" htmlFor="user">
               User ID
            </InputLabel>
            <Select
               id="user"
               name="user"
               options={users.map((user) => ({
                  label: user.firstName + ' ' + user.lastName,
                  value: user._id,
               }))}
               onChange={(change) => setCost({ ...cost, user: change.value })}
               className="form-control z-index"
            />

            <InputLabel id="categoryLabel" htmlFor="category">
               Category
            </InputLabel>
            <Select
               name="category"
               options={[
                  { label: 'Clothing', value: 'Clothing' },
                  { label: 'Food', value: 'Food' },
                  { label: 'Restaurant', value: 'Restaurant' },
                  { label: 'Electricity', value: 'Electricity' },
                  { label: 'Water', value: 'Water' },
                  { label: 'School', value: 'School' },
               ]}
               onChange={(change) => setCost({ ...cost, category: change.value })}
               className="form-control z-index-secondary"
            />

            <InputLabel id="descriptionLabel" htmlFor="description">
               Description
            </InputLabel>
            <TextField
               id="description"
               name="description"
               label="Description"
               variant="outlined"
               className="form-control bg-white"
               type="text"
               multiline={true}
               maxRows={5}
               sx={{ margin: '0 0 15px' }}
            />

            <InputLabel id="amountLabel" htmlFor="amount">
               Amount
            </InputLabel>
            <TextField
               id="amount"
               name="amount"
               label="Amount"
               variant="outlined"
               className="form-control bg-white"
               type="number"
               sx={{ margin: '0 0 15px' }}
            />

            <InputLabel id="dateLabel" htmlFor="date">
               Date
            </InputLabel>
            <TextField
               id="date"
               name="date"
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
         {costDetails.length > 0
            ? costDetails.map((res, index) =>
                 res.status === 200 ? (
                    <CustomizedSnackbars key={res.data._id} isSuccess={true} msg={'Cost Added'} />
                 ) : (
                    <CustomizedSnackbars
                       key={res.data._id}
                       isSuccess={false}
                       msg={'Something went wrong...'}
                    />
                 ),
              )
            : null}
      </Paper>
   );
};
export default AddCost;
