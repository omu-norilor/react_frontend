// import logo from './logo.svg';
import React, { useState} from 'react';
// import AppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
// import Toolbar from '@mui/material/Toolbar';
// import IconButton from '@mui/material/IconButton';
// import Typography from '@mui/material/Typography';
// import Container from '@mui/material/Container';
// import Tooltip from '@mui/material/Tooltip';
import TextField from '@mui/material/TextField';
// import Drawer from '@mui/material/Drawer';
import Button from '@mui/material/Button';
// import  {DataGrid}  from '@mui/x-data-grid';
import Dialog from '@mui/material/Dialog';
import DialogTitle from '@mui/material/DialogTitle';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogActions from '@mui/material/DialogActions';
import './Bikes.css';
import axios from 'axios';
// import useFetch  from './hooks/useFetch';
function AddEventrider(body) {
    axios
      .request({
        url:  "/api/eventrider/new",
        method: "POST",
        data: body,
      });
  }

function DialogAddEventrider({open, onClose}) {

    const [r_id, setRID] = useState("");
    const [e_id, setEID] = useState("");
    const [er_type, setERType] = useState("");
    const [er_specialization, setSpecialization] = useState("");
    const [errors, setErrors] = useState({});

    const HandleAdd = (new_body) => {
        AddEventrider(new_body);
    }

    const HandleAddEventrider = () => {

    const errors = {};
    if (!r_id) errors.r_id = 'Rider id required.';
    if (!e_id) errors.e_id = 'Event id required.';
    if (!er_type) errors.er_type = 'Type of activity required.';
    if (!er_specialization) errors.er_specialization = 'specialization required.';
    if (Object.keys(errors).length > 0) {
    setErrors(errors);
    return;
    }
    let eventriderData = {
        "r_id": r_id,
        "e_id": e_id,
        "er_type": er_type,
        "er_specialization": er_specialization,
        "created_at": "2001-04-22T16:23:26.668492",
        "updated_at": "2001-04-22T16:23:26.668492"
    };
    
    let eventriderJson = JSON.stringify(eventriderData,null,2);

    HandleAdd(eventriderJson);

    console.log("r_id: "+ r_id);
    console.log("e_id: "+ e_id);
    console.log("er_type: "+ er_type);
    console.log("er_specialization: "+ er_specialization);
    console.log("created_at: 2001-04-22T16:23:26.668492");
    console.log("created_at: 2001-04-22T16:23:26.668492");
    onClose();
    }
    

    return (
    <Box>
    <Dialog open={open}  aria-labelledby="form-dialog-title">
        <DialogTitle id="form-dialog-title">Add EventRider</DialogTitle>
        <DialogContent>
                <DialogContentText>
                    To add a EventRider relation, please enter the EventRider details here.
                </DialogContentText>
                <TextField
                autoFocus
                margin="dense"
                id="e_id"
                label="Event ID"
                type="text"
                fullWidth
                onChange={event => { setEID(event.target.value) }}
                error={!!errors.e_id}
                helperText={errors.e_id}
                />

                <TextField
                autoFocus
                margin="dense"
                id="r_id"
                label="Rider ID"
                type="text"
                fullWidth
                onChange={event => { setRID(event.target.value) }}
                error={!!errors.r_id}
                helperText={errors.r_id}
                />  

                <TextField
                    autoFocus
                    margin="dense"
                    id="er_type"
                    label="Type"
                    type="text"
                    fullWidth
                    onChange={event => { setERType(event.target.value) }}
                    error={!!errors.er_type}
                    helperText={errors.er_type}
                />

                <TextField

                    autoFocus
                    margin="dense"
                    id="er_specialization"
                    label="Specialization"
                    type="text"
                    fullWidth
                    onChange={event => { setSpecialization(event.target.value) }}
                    error={!!errors.er_specialization}
                    helperText={errors.er_specialization}
                />
              
            </DialogContent>
        <DialogActions>
            <Button  color="primary"
            onClick={onClose}>
            
                Cancel  
            </Button>
            <Button  color="primary"
            onClick={HandleAddEventrider}
            >
                Add EventRider
            </Button>
        </DialogActions>
    </Dialog>
    </Box>
    );
}

export default DialogAddEventrider;