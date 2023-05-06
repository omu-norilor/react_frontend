import React, { useEffect, useMemo, useState} from 'react';
import AppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import Toolbar from '@mui/material/Toolbar';
import IconButton from '@mui/material/IconButton';
import Typography from '@mui/material/Typography';
import Button from '@mui/material/Button';
import  {DataGrid}  from '@mui/x-data-grid';
import './Bikes.css';
import DialogAddEventrider from './DialogAddEventrider';
import DialogEditEventrider from './DialogEditEventrider';
import axios from 'axios';
import { CustomPagination } from './CustomPagination';
import PropTypes from 'prop-types';

function RequestEventrider(setResponse,setCount,page,rowsPerPage) {
  axios
    .request({
      url: "/api/eventrider/getall?page="+page+"&limit="+rowsPerPage,
      method: "GET",
    })
    .then((response) => {
      setResponse(response.data);
      setCount(parseInt(response.data?.results));
    });
}

function DeleteEventrider(e_id,r_id) {
  axios
    .request({
      url: "/api/eventrider/delete/?event_id="+e_id+"&rider_id="+r_id,
      method: "POST",
    });
}

function Eventrider() {

  const [data, setData] = useState(null);
  const [selectedRow, setSelectedRow] = useState(null);
  const [openCreate, setOpenCreate] = useState(false);
  const [openEdit, setOpenEdit] = useState(false);
  const [currentPageSize, setCurrentPageSize] = useState(5);
  const [currentPage , setCurrentPage] = useState(1);
  const [count, setCount] = useState(0);

  const HandleSetData = (value) => {
    setData(value);
  }

  const HandleRequest = () => {
    RequestEventrider(HandleSetData,HandleSetCount,currentPage,currentPageSize);
  }

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
    DeleteEventrider(selectedRow?.r_id,selectedRow?.e_id);
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


  DialogAddEventrider.propTypes = {
    open: PropTypes.bool.isRequired,
    onClose: PropTypes.func.isRequired,
  };

  DialogEditEventrider.propTypes = {
    open: PropTypes.bool.isRequired,
    onClose: PropTypes.func.isRequired,
  };
  
  const rows = useMemo(() => data?.eventriders || [], [data]);

  const columns = useMemo(() => [
    { field: 'e_id', headerName: 'Event id', width: 150 },
    { field: 'r_id', headerName: 'Rider id', width: 150 },
    { field: 'er_type', headerName: 'Type', width: 150 },
    { field: 'er_specialization', headerName: 'Specialization', width: 150 },
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
            EventRider - select a rider-event relation to edit or delete
          </Typography>
          

          <Typography variant="h6" component="div" align='center' sx={{ flexGrow: 1 }}>
          {selectedRow && (<p>Selected eventrider: {selectedRow.er_type} {selectedRow.er_specialization}</p>
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
      <DialogAddEventrider 
         open={openCreate} 
         onClose={handleCloseCreate}
      />

      <DialogEditEventrider 
         open={openEdit}
         onClose={handleCloseEdit}
         eid={selectedRow?.e_id}
         rid={selectedRow?.r_id}
      />
    </Box>
  );
}

export default Eventrider; 