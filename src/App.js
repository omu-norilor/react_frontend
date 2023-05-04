
import React, { useEffect, useMemo, useState} from 'react';
import AppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import Toolbar from '@mui/material/Toolbar';
import IconButton from '@mui/material/IconButton';
import Typography from '@mui/material/Typography';
import Button from '@mui/material/Button';
import  {DataGrid}  from '@mui/x-data-grid';
import './App.css';
// import DialogAddBike from './pages/DialogAddBike';
// import DialogEditBike from './pages/DialogEditBike';
import axios from 'axios';

import {Route, Routes} from 'react-router-dom';

import PropTypes from 'prop-types';
import { Link } from '@mui/material';

import Bikes from './pages/Bikes';
import Helmets from './pages/Helmets';
import Riders from './pages/Riders';
import Eventrider from './pages/Eventrider';
import HelmetsStat from './pages/HelmetsStat';
import RidersStat from './pages/RidersStat';



function App() {


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
          <Typography variant="h3" component="div" sx={{ flexGrow: 1 }}>
            Bike Shop
          </Typography>
          
          
          <Typography variant="h6" component="div" sx={{ flexGrow: 1 }}>
            <Link 
            color='inherit'
            align='right'
            sx={{
              ':hover': {
                bgcolor: 'dodgerblue', // theme.palette.primary.main
                color: 'white',
              },
            }}
            href='/bikes'>Bikes</Link>
          </Typography>
          
          
          <Typography variant="h6" component="div" sx={{ flexGrow: 1 }}>
            <Link 
            color='inherit'
            align='right'
            sx={{
              ':hover': {
                bgcolor: 'dodgerblue', // theme.palette.primary.main
                color: 'white',
              },
            }}
            href='/helmets'>Helmets</Link>
          </Typography>
          
          <Typography variant="h6" component="div" sx={{ flexGrow: 1 }}>
            <Link 
            color='inherit'
            align='right'
            sx={{
              ':hover': {
                bgcolor: 'dodgerblue', // theme.palette.primary.main
                color: 'white',
              },
            }}
            href='/riders'>Riders</Link>
          </Typography>
          
          <Typography variant="h6" component="div" sx={{ flexGrow: 1 }}>
            <Link 
            color='inherit'
            align='right'
            sx={{
              ':hover': {
                bgcolor: 'dodgerblue', // theme.palette.primary.main
                color: 'white',
              },
            }}
            href='/eventrider'>EventRider</Link>
          </Typography>

          <Typography variant="h6" component="div" sx={{ flexGrow: 1 }}>
            <Link 
            color='inherit'
            align='right'
            sx={{
              ':hover': {
                bgcolor: 'dodgerblue', // theme.palette.primary.main
                color: 'white',
              },
            }}
            href='/helmetstat'>Helmet statistics</Link>
          </Typography>

          <Typography variant="h6" component="div" sx={{ flexGrow: 1 }}>
            <Link 
            color='inherit'
            align='right'
            sx={{
              ':hover': {
                bgcolor: 'dodgerblue', // theme.palette.primary.main
                color: 'white',
              },
            }}
            href='/riderstat'>Rider statistics</Link>
          </Typography>

          </Toolbar>
      </AppBar>
      <Routes>
          <Route
            path='/bikes'
            element={<Bikes />}
          />
          <Route
            path='/helmets'
            element={<Helmets />}
          />
          <Route
            path='/riders'
            element={<Riders />}
          />
          <Route
            path='/eventrider'
            element={<Eventrider />}
          />
          <Route
            path='/helmetstat'
            element={<HelmetsStat />}
          />
          <Route
            path='/riderstat'
            element={<RidersStat />}
          />
          </Routes>
       
    </Box>
  );
}

export default App; 