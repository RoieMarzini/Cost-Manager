import { useState, useEffect, useMemo } from 'react';
import api from '../utils/api';
import Select from 'react-select';
import Header from '../components/Header';
import DataTable from './../components/Table';
import Button from '@mui/material/Button';
import DeleteIcon from '@mui/icons-material/Delete';
import Paper from '../components/Paper';
import TextField from '@mui/material/TextField';
import InputLabel from '@mui/material/InputLabel';

const Report = () => {
   const [report, setReport] = useState([]);
   const [users, setUsers] = useState([]);
   const [Params, setParams] = useState([]);
   const [selectedCategory, setSelectedCategory] = useState();
   const [selected, setSelected] = useState('');
   const [usersToOptions, setUsersToOptions] = useState([]);
   const [reportIds, setReportIds] = useState([]);

   useEffect(() => {
      const fetchData = async () => {
         try {
            const result = await api.get('users/');
            setUsers(result.data);
         } catch (err) {
            console.log(err);
         }
      };
      fetchData();
   }, [report]);

   useEffect(() => {
      let updatedSelect = users.map((user) => ({
         value: user._id,
         label: user.firstName + ' ' + user.lastName + ',Total Cost: ' + user.totalCost,
      }));
      setUsersToOptions(updatedSelect);
      setSelected(updatedSelect[0]);
   }, [users]);

   const onChangeHandle = (e) => {
      setParams({ ...Params, [e.target.name]: e.target.value });
   };

   const onSubmitClick = async (e) => {
      e.preventDefault();
      try {
         const result = await api.get('/costs/getCostsbyMonthandYear/', { params: Params });
         setReport(result.data);
      } catch (err) {
         console.log(err);
      }
   };

   var filteredList = useMemo(getFilteredList, [selectedCategory, report]);

   function getFilteredList() {
      if (!selectedCategory) {
         return report;
      }
      return report.filter((item) => item.category === selectedCategory);
   }

   const handleReportDelete = async (ids) => {
      try {
         let userid = report[0]?.user;
         await api.post('/costs/delete', { ids, userid });
         const filteredReports = report.filter((report) => !ids.includes(report._id));
         setReport(filteredReports);
      } catch (e) {
         console.log(e);
      }
   };

   const onHandleDelete = () => {
      handleReportDelete(reportIds);
   };

   return (
      <div className="report-container">
         <Paper width={'600px'} margin={'30px 30px'}>
            <Header title="Get Report" />
            <form
               className="add-form"
               onChange={onChangeHandle}
               id="add-user-form"
               onSubmit={onSubmitClick}>
               <InputLabel id="userLabel" htmlFor="user">
                  User:
               </InputLabel>
               <Select
                  name="user"
                  options={usersToOptions}
                  onChange={(change) => setParams({ ...Params, userId: change.value })}
                  className="form-control z-index"
               />

               <InputLabel id="dateLabel" htmlFor="date">
                  Date:
               </InputLabel>
               <TextField
                  id="date"
                  name="date"
                  variant="outlined"
                  className="form-control bg-white"
                  type="month"
                  sx={{ margin: '0 0 15px' }}
               />

               <Button
                  type="submit"
                  variant="contained"
                  size="large"
                  sx={{
                     margin: '17px 1px auto',
                  }}>
                  Submit
               </Button>
            </form>
         </Paper>
         {report.length > 0 && (
            <Paper width={'1300px'} margin={'30px 30px'} maxWidth={'none'}>
               <Select
                  name="category"
                  options={[
                     { label: 'All', value: '' },
                     { label: 'Clothing', value: 'Clothing' },
                     { label: 'Food', value: 'Food' },
                     { label: 'Restaurant', value: 'Restaurant' },
                     { label: 'Electricity', value: 'Electricity' },
                     { label: 'Water', value: 'Water' },
                     { label: 'School', value: 'School' },
                  ]}
                  onChange={(change) => setSelectedCategory(change.value)}
                  className="select z-index"
                  style={{ width: '200px', margin: '10px auto' }}
               />
               <DataTable
                  filteredList={filteredList}
                  handleReportDelete={handleReportDelete}
                  setReportIds={setReportIds}
               />

               <Button
                  onClick={onHandleDelete}
                  variant="contained"
                  size="large"
                  startIcon={<DeleteIcon />}
                  disabled={!reportIds.length}
                  color="error"
                  sx={{
                     margin: '17px 1px auto',
                  }}>
                  delete
               </Button>
            </Paper>
         )}
      </div>
   );
};

export default Report;
