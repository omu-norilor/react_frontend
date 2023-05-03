import React, { useEffect, useMemo, useState} from 'react';
import AppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import Toolbar from '@mui/material/Toolbar';
import IconButton from '@mui/material/IconButton';
import Typography from '@mui/material/Typography';
import Button from '@mui/material/Button';
import  {DataGrid}  from '@mui/x-data-grid';
import './Bikes.css';
import DialogAddHelmet from './DialogAddHelmet';
import DialogEditHelmet from './DialogEditHelmet';
import axios from 'axios';
import { CustomPagination } from './CustomPagination';
import PropTypes from 'prop-types';

function RequestHelmets(setResponse,setCount,page,rowsPerPage) {
  axios
    .request({
      url: process.env.REACT_APP_API_PREFIX + "/api/helmets/getall?page="+page+"&limit="+rowsPerPage,
      method: "GET",
    })
    .then((response) => {
       setResponse(response.data);
       setCount(parseInt(response.data?.results));
    });
}

function DeleteHelmet(id) {
  axios
    .request({
      url: process.env.REACT_APP_API_PREFIX + "/api/helmets/delete/"+id,
      method: "POST",
    });
}


function Helmets() {

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
    RequestHelmets(HandleSetData,HandleSetCount,currentPage,currentPageSize);
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
    DeleteHelmet(selectedRow?.h_id);
    console.log("delete called on "+ selectedRow?.h_id);
    HandleRequest();
  }

  const handleRowClick = (params) => {
    setSelectedRow(params.row);
  };

  const handlePageChange = (params) => {
    setCurrentPage(params.page);
  };

  const handlePageSizeChange = (params) => {
    setCurrentPageSize(params.pageSize);
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


  DialogAddHelmet.propTypes = {
    open: PropTypes.bool.isRequired,
    onClose: PropTypes.func.isRequired,
  };

  DialogEditHelmet.propTypes = {
    open: PropTypes.bool.isRequired,
    onClose: PropTypes.func.isRequired,
  };
  
  const rows = useMemo(() => data?.helmets || [], [data]);
  const columns = useMemo(() => [
    { field: 'brand', headerName: 'Brand', width: 150 },
    { field: 'model', headerName: 'Model', width: 150 },
    { field: 'h_type', headerName: 'Helmet Type', width: 150 },
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
            Helmets - select a helmet to edit or delete
          </Typography>
          

          <Typography variant="h6" component="div" align='center' sx={{ flexGrow: 1 }}>
          {selectedRow && (<p>Selected helmet: {selectedRow.brand} {selectedRow.model}</p>
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
            getRowId={(row) => row.h_id}
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
      <DialogAddHelmet 
         open={openCreate} 
         onClose={handleCloseCreate}
      />

      <DialogEditHelmet 
         open={openEdit}
         onClose={handleCloseEdit}
         id={selectedRow?.h_id}
      />
    </Box>
  );
}

export default Helmets; 
