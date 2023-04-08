
import React, { useEffect, useMemo, useState} from 'react';
import AppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import Toolbar from '@mui/material/Toolbar';
import IconButton from '@mui/material/IconButton';
import Typography from '@mui/material/Typography';
// import Container from '@mui/material/Container';
// import Tooltip from '@mui/material/Tooltip';
// import TextField from '@mui/material/TextField';
// import Drawer from '@mui/material/Drawer';
import Button from '@mui/material/Button';
import  {DataGrid}  from '@mui/x-data-grid';
import './App.css';
// import useFetch  from './hooks/useFetch';s
import DialogAddBike from './DialogAddBike';
import DialogEditBike from './DialogEditBike';
import axios from 'axios';

import PropTypes from 'prop-types';
function RequestBikes(setResponse) {
  axios
    .request({
      url: process.env.REACT_APP_API_PREFIX + "/bikes/getall",
      method: "GET",
    })
    .then((response) => {
       setResponse(response.data);
    });
}

function DeleteBike(id) {
  axios
    .request({
      url: process.env.REACT_APP_API_PREFIX + "/bikes/delete/"+id,
      method: "POST",
    });
}

function App() {

  const [data, setData] = useState(null);
  const [selectedRow, setSelectedRow] = useState(null);
  const [openCreate, setOpenCreate] = useState(false);
  const [openEdit, setOpenEdit] = useState(false);

  const HandleSetData = (value) => {
    setData(value);
  }

  const HandleRequest = () => {
    RequestBikes(HandleSetData);
  }

  useEffect(() => {
    HandleRequest();
  }, []);

  const handleDelete = () => {
    DeleteBike(selectedRow?.b_id);
    console.log("delete called on "+ selectedRow?.b_id);
    HandleRequest();
  }

  const handleRowClick = (params) => {
    setSelectedRow(params.row);
  };

  const handleOpenCreate = () => {
    setOpenCreate(true);
  }

  const handleCloseCreate = () => {
    setOpenCreate(false);
    console.log("close create");
    HandleRequest();
  };

  const handleOpenEdit = () => {
    if (selectedRow !== null) {
      setOpenEdit(true);
    }
  };

  const handleCloseEdit = () => {
    setOpenEdit(false);
    console.log("close edit");
    HandleRequest();
  };


  DialogAddBike.propTypes = {
    open: PropTypes.bool.isRequired,
    onClose: PropTypes.func.isRequired,
  };

  DialogEditBike.propTypes = {
    open: PropTypes.bool.isRequired,
    onClose: PropTypes.func.isRequired,
  };
  
  const rows = useMemo(() => data?.bikes || [], [data]);
  const columns = useMemo(() => [
    { field: 'brand', headerName: 'Brand', width: 150 },
    { field: 'model', headerName: 'Model', width: 150 },
    { field: 'wheelsize', headerName: 'Wheel Size', width: 150 },
    { field: 'size', headerName: 'Size', width: 150 },
    { field: 'price', headerName: 'Price', width: 150 },
   
  ], []);
  
 return (
    <Box sx={{ flexGrow: 1}} >
      <AppBar position="static">
        <Toolbar>
          <IconButton
            size="large"
            edge="start"
            color="inherit"
            aria-label="menu"
            sx={{ mr: 2 }}
          >
          </IconButton>
          <Typography variant="h6" component="div" sx={{ flexGrow: 1 }}>
            Bike Shop - select a bike to edit or delete
          </Typography>
          <Typography variant="h6" component="div" align='center' sx={{ flexGrow: 1 }}>
          {selectedRow && (<p>Selected bike: {selectedRow.brand} {selectedRow.model}</p>
          )}
          </Typography>
          
          
            <Button 
            color='inherit'
            sx={{
              ':hover': {
                bgcolor: 'mediumseagreen', // theme.palette.primary.main
                color: 'white',
              },
            }}
            onClick={handleOpenCreate}
            >
              Create
            </Button>

            <Button 
            color='inherit'
            sx={{
              ':hover': {
                bgcolor: 'dodgerblue', // theme.palette.primary.main
                color: 'white',
              },
            }}
            onClick={handleOpenEdit}
            >
              Edit
            </Button>

            <Button 
            color='inherit'
            sx={{
              ':hover': {
                bgcolor: 'red', // theme.palette.primary.main
                color: 'white',
              },
            }}
            onClick={handleDelete}
            >
              Delete
            </Button>
          </Toolbar>
          
      </AppBar>
      <Typography variant="h6" component="div" sx={{ flexGrow: 1 }}>
            Select a bike to edit or delete
          </Typography>
      <DataGrid
            sx={{width:'fit-content',
                  display:'flex' ,
                  alignContent:'center',
                  justifyContent:'center',
                  }}
            
            autoHeight = {true}
            columns={columns}
            rows={rows}
            pageSize={5}
            rowsPerPageOptions={[5,10]}
            getRowId={(row) => row.b_id}
            onRowClick={handleRowClick}
          />

        {selectedRow && (
        <p>Selected bike: {selectedRow.brand} {selectedRow.model}</p>
      )}
      <DialogAddBike 
         open={openCreate} 
         onClose={handleCloseCreate}
      />

      <DialogEditBike 
         open={openEdit}
         onClose={handleCloseEdit}
         id={selectedRow?.b_id}
      />
    </Box>
  );
}

export default App; 