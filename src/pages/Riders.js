import React, { useEffect, useMemo, useState} from 'react';
import AppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import Toolbar from '@mui/material/Toolbar';
import IconButton from '@mui/material/IconButton';
import Typography from '@mui/material/Typography';
import Button from '@mui/material/Button';
import  {DataGrid}  from '@mui/x-data-grid';
import './Bikes.css';
import DialogAddRider from './DialogAddRider';
import DialogEditRider from './DialogEditRider';
import axios from 'axios';
import { CustomPagination } from './CustomPagination';
import PropTypes from 'prop-types';
import { FormControl, FormGroup, FormLabel, TextField } from '@mui/material';

function RequestRiders(setResponse,setCount,page,rowsPerPage) {
  axios
    .request({
      url: "/api/riders/getall?page="+page+"&limit="+rowsPerPage,
      method: "GET",
    })
    .then((response) => {
      setResponse(response.data);
      setCount(parseInt(response.data?.results));
    });
}

function DeleteRider(id) {
  axios
    .request({
      url: "/api/riders/delete/"+id,
      method: "POST",
    });
}

function GetRiderGear(setResponse,id) {
  axios
    .request({
        url: "/api/riders/get/"+id,
        method: "GET",
    })
    .then((response) => {
      setResponse(response.data);
   });
}

function Riders() {

  const [data, setData] = useState(null);
  const [selectedRow, setSelectedRow] = useState(null);
  // const [geardata, setGearData] = useState(null);
  const [openCreate, setOpenCreate] = useState(false);
  const [openEdit, setOpenEdit] = useState(false);
  const [currentPageSize, setCurrentPageSize] = useState(5);
  const [currentPage , setCurrentPage] = useState(1);
  const [count, setCount] = useState(0);
  const [isLoading, setIsLoading] = useState(false);

  const HandleSetData = (value) => {
    setData(value);
  }

  // const HandleSetGearData = (value) => {
  //   setGearData(value);
  // }

  // useEffect(() => {
  //   if (selectedRow !== null) {
  //     GetRiderGear(HandleSetGearData,selectedRow?.r_id);
  //   }
    
  // }, [selectedRow]);

  const HandleRequest = () => {
    setIsLoading(true);
    RequestRiders(HandleSetData,HandleSetCount,currentPage,currentPageSize);
  }

  useEffect(() => {
    setIsLoading(false)
  }, [data]);

  const HandleSetCount = (value) => {
    setCount(value);
  }

  useEffect(() => {
    console.log("Count: "+count);
  }, [count]);

  useEffect(() => {
    HandleRequest();
    console.log("Current page: "+currentPage);
    console.log("Current page size: "+currentPageSize);
  }, [currentPage,currentPageSize]);

  const handleDelete = () => {
    DeleteRider(selectedRow?.r_id);
    console.log("delete called on "+ selectedRow?.r_id);
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


  DialogAddRider.propTypes = {
    open: PropTypes.bool.isRequired,
    onClose: PropTypes.func.isRequired,
  };

  DialogEditRider.propTypes = {
    open: PropTypes.bool.isRequired,
    onClose: PropTypes.func.isRequired,
  };
  
  const rows = useMemo(() => data?.riders || [], [data]);
  const columns = useMemo(() => [
    { field: 'r_name', headerName: 'Name', width: 150 },
    { field: 'height', headerName: 'Height', width: 150 },
    { field: 'r_weight', headerName: 'Weight', width: 150 },
    { field: 'specialization', headerName: 'Specialization', width: 150 },
    { field: 'email', headerName: 'Email', width: 150 },
    { field: 'phone', headerName: 'Phone', width: 150 },
    { field: 'no_events', headerName: 'No. of Events', width: 150 },
   
  ], []);
  
  useEffect(() => {
    console.log(selectedRow);
  }, [selectedRow]);
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
            Riders - select a rider to edit or delete
          </Typography>
          

          <Typography variant="h6" component="div" align='center' sx={{ flexGrow: 1 }}>
          {selectedRow && (<p>Selected rider: {selectedRow.name} {selectedRow.email}</p>
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
      {/* <Typography variant="h6" component="div" sx={{ flexGrow: 1 }}>
            Select a bike to edit or delete
          </Typography> */}
      <DataGrid
            
            sx={{width:'fit-content',
                  display:'flex' ,
                  alignContent:'center',
                  justifyContent:'center',
                  }}
            autoHeight = {true}
            columns={columns}
            rows={rows}
            getRowId={(row) => row.r_id}
            onRowClick={handleRowClick}
            loading={isLoading}
            
            localeText={{
              footerRowSelected: CustomPagination
            }}
            components={{
              Pagination: (props) => 
              <CustomPagination 
              pageCount={Math.ceil((count/currentPageSize)) } 
              currentPage={currentPage}
              currentPageSize={currentPageSize} 
              setCurrentPage={setCurrentPage}
              setCurrentPageSize={setCurrentPageSize} 
              {...props} 
              />
            }}
          />

          {/* <FormGroup>
            <FormControl>
              <FormLabel>Bike</FormLabel>
              <TextField
                value={geardata?.bike?.brand || ""}
                InputProps={{ readOnly: true }}
              />
              <TextField
                value={geardata?.bike?.model || ""}
                InputProps={{ readOnly: true }}
              />
              <TextField
                value={geardata?.bike?.size || ""}
                InputProps={{ readOnly: true }}
              />
              
            </FormControl>
            <FormControl>
              <FormLabel>Helmet</FormLabel>
              <TextField
                value={geardata?.helmet?.brand || ""}
                InputProps={{ readOnly: true }}
              />
              <TextField
                value={geardata?.helmet?.model || ""}
                InputProps={{ readOnly: true }}
              />
              <TextField
                value={geardata?.helmet?.size || ""}
                InputProps={{ readOnly: true }}
              />
            </FormControl>
          </FormGroup> */}

      <DialogAddRider 
         open={openCreate} 
         onClose={handleCloseCreate}
      />

      <DialogEditRider 
         open={openEdit}
         onClose={handleCloseEdit}
         id={selectedRow?.r_id}
      />
    </Box>
  );
}

export default Riders; 