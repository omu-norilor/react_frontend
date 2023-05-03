import React, { useEffect, useMemo, useState} from 'react';
import AppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import Toolbar from '@mui/material/Toolbar';
import IconButton from '@mui/material/IconButton';
import Typography from '@mui/material/Typography';
import Button from '@mui/material/Button';
import  {DataGrid}  from '@mui/x-data-grid';
import './Bikes.css';
import DialogAddBike from './DialogAddBike';
import DialogEditBike from './DialogEditBike';
import { CustomPagination } from './CustomPagination';
import axios from 'axios';
import PropTypes from 'prop-types';
import { Checkbox, MenuItem, Select, TextField } from '@mui/material';

function RequestBikes(setResponse,setCount,page,rowsPerPage) {
  axios
    .request({
      url: process.env.REACT_APP_API_PREFIX + "/api/bikes/getall?page="+page+"&limit="+rowsPerPage,
      // http://127.0.0.1:8000/api/bikes/getall?page=1&limit=5
      method: "GET",
    })
    .then((response) => {
      setResponse(response.data); 
      setCount(parseInt(response.data?.results));
    });
}

function FilterBikes(setResponse,setCount,page,rowsPerPage,compare,price) {
  axios
  .request({
    url: process.env.REACT_APP_API_PREFIX + "/api/bikes/filter?comp="+compare+"&page="+page+"&limit="+rowsPerPage+"&bike_price="+price,
    method: "GET",
  })
  .then((response) => {
    setResponse(response.data);
    setCount(parseInt(response.data?.results));
  });
}

function DeleteBike(id) {
  axios
    .request({
      url: process.env.REACT_APP_API_PREFIX + "/api/bikes/delete/"+id,
      method: "POST",
    });
}

function Bikes() {

  const [data, setData] = useState(null);
  const [selectedRow, setSelectedRow] = useState(null);
  const [openCreate, setOpenCreate] = useState(false);
  const [openEdit, setOpenEdit] = useState(false);
  const [currentPageSize, setCurrentPageSize] = useState(5);
  const [currentPage , setCurrentPage] = useState(1);
  const [count, setCount] = useState(0);
  const [compare, setCompare] = useState("gt");
  const [price, setPrice] = useState(0);
  const [filter, setFilter] = useState(false);

  const HandleSetData = (value) => {
    setData(value);
  }

  const HandleRequest = () => {
    RequestBikes(HandleSetData,HandleSetCount,currentPage,currentPageSize);
  }
  const HandleSetCount = (value) => {
    setCount(value);
  }

  const HandleFilter = (compare,price) => {
    FilterBikes(HandleSetData,HandleSetCount,currentPage,currentPageSize,compare,price);
  }

  const HandleFear = () => {
    if (filter) {
      HandleFilter(compare,price);
    } else {
      HandleRequest();
    }
  }
  
  useEffect(() => {
    console.log("Count: "+count);
  }, [count]);

  // useEffect(() => {
  //   console.log("Filter: "+filter);
  //   console.log("Compare: "+compare);
  //   console.log("Price: "+price);
  //   HandleFear();
  // }, [filter]);


  useEffect(() => {
    HandleFear();
    console.log("Current page: "+currentPage);
    console.log("Current page size: "+currentPageSize);
    console.log("Filter: "+filter);
    console.log("Count: "+count); 
    if(filter) {
    console.log("Compare: "+compare);
    console.log("Price: "+price);}
    console .log("########################################");

  }, [currentPage,currentPageSize,filter]);

  const handleDelete = () => {
    DeleteBike(selectedRow?.b_id);
    console.log("delete called on "+ selectedRow?.b_id);
    HandleFear();
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
    HandleFear();
  };

  const handleOpenEdit = () => {
    if (selectedRow !== null) {
      setOpenEdit(true);
    }
  };

  const handleCloseEdit = () => {
    setOpenEdit(false);
    console.log("close edit");
    HandleFear();
  };

  const handleCheckboxChange
  = (event) => {
    setFilter(event.target.checked);
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
            Bikes - select a bike to edit or delete
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

      <Toolbar
        position="static"
        color="default"
        elevation={0}
      >
          <Select 
          value={compare}
          sx={{ m: 1, width: '25ch' , height: '55px'}}
          onChange={event => {setCompare(event.target.value)}}
          >
            <MenuItem value="gt">Greater than</MenuItem>
            <MenuItem value="lt">Less than</MenuItem>
            <MenuItem value="eq">Equal to</MenuItem>
          </Select> 
          
          <TextField
            autoFocus 
            type="text"
            fullWidth 
            label="Filter by price"
            id="outlined-start-adornment"
            value={price}
            onChange={event => {setPrice(event.target.value)}}
            sx={{ m: 1, width: '25ch', height: '50px'}}
          />
          <Checkbox 
          sx={{ m: 1, height: '50px'}}
          checked={filter} onChange={handleCheckboxChange}/>
          
          <Typography variant="h6" component="div" sx={{ flexGrow: 1 }}>
              Filter
          </Typography>
      </Toolbar>
      <DataGrid   
            sx={{width:'fit-content',
                  display:'flex' ,
                  alignContent:'center',
                  justifyContent:'center',
                  }}
            autoHeight = {true}
            columns={columns}
            rows={rows}
            getRowId={(row) => row.b_id}
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

export default Bikes; 
