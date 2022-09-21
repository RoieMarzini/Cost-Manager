import * as React from 'react';
import { DataGrid, GridColDef, GridValueGetterParams } from '@mui/x-data-grid';

const columns: GridColDef[] = [
   { field: 'id', headerName: 'id', width: 220 },
   { field: 'userid', headerName: 'UserID', width: 220 },
   { field: 'date', headerName: 'Date', width: 130 },
   { field: 'category', headerName: 'Category', width: 130 },
   { field: 'amount', headerName: 'Amount Spent', width: 130 },
   { field: 'description', headerName: 'Description', width: 130 },
];

export default function DataTable({ filteredList, handleReportDelete, setReportIds }) {
   const dateFormat = (date) => {
      const newDate = new Date(date);
      return newDate.toLocaleDateString();
   };

   const tableRows = () =>
      filteredList.map((report, index) => {
         return {
            id: report._id,
            userid: report.user,
            date: dateFormat(report.date),
            category: report.category,
            amount: report.amount,
            description: report.description,
         };
      });
   return (
      <div style={{ height: 400, width: '100%', background: 'white' }}>
         <DataGrid
            rows={tableRows()}
            columns={columns}
            pageSize={5}
            rowsPerPageOptions={[5]}
            checkboxSelection
            onSelectionModelChange={(ids) => setReportIds(ids)}
         />
      </div>
   );
}
