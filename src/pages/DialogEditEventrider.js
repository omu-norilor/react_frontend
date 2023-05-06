// import logo from './logo.svg';
import React, { useEffect, useMemo, useState} from 'react';
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

function EditEventrider(e_id,r_id,body) {
    axios
      .request({
        url: "/api/eventrider/edit?event_id="+e_id+"&rider_id="+r_id,
        method: "POST",
        data: body
      });
  }
  
  function GetEventrider(e_id,r_id,setResponse) {
    axios
      .request({
          url: "/api/eventrider/getbyids?event_id="+e_id+"&rider_id="+r_id,
          method: "GET",
      })
      .then((response) => {
        setResponse(response.data);
     });
  }

function DialogEditEventrider({open, onClose,eid,rid}) {

    const [data, setData] = useState(null);
    const eventrider = useMemo(() => data?.eventrider.eventrider || [], [data]);
    const [e_id, setEID] = useState(eid);
    const [r_id, setRID] = useState(rid);
    const [er_type, setERType] = useState(eventrider?.er_type);
    const [er_specialization, setSpecialization] = useState(eventrider?.er_specialization);
    const [errors, setErrors] = useState({});

    const HandleSetData = (value) => {
        setData(value);
    }

    const HandleGet = () =>{
        GetEventrider(eid,rid,HandleSetData);
    }

    useEffect(() => {
        if(eid!==undefined && rid!==undefined)
            HandleGet();
    }, [eid,rid]);


    useEffect(() => {
        setRID(eventrider?.r_id);
        setEID(eventrider?.e_id);
        setERType(eventrider?.er_type);
        setSpecialization(eventrider?.er_specialization);
        
    }, [eventrider]);

    const HandleEdit = (newBody) => {
        EditEventrider(e_id,r_id,newBody);
    }

    const HandleEditEventrider = () => { 
        
        const errors = {};
        if (!r_id) errors.r_id = 'Rider id required.';
        if (!e_id) errors.e_id = 'Event id required.';
        if (!er_type) errors.er_type = 'Type of activity required.';
        if (!er_specialization) errors.er_specialization = 'specialization required.';
        
        
        if (Object.keys(errors).length > 0) {
        setErrors(errors);
        return;
        }

        if (Object.keys(errors).length > 0) {
        setErrors(errors);
        return;
        }
        const created_at = eventrider?.created_at;
        const updated_at = eventrider?.created_at;

        let eventriderData = {
            "e_id": e_id,
            "r_id": r_id,
            "er_type": er_type,
            "er_specialization": er_specialization,
            "created_at": created_at,
            "updated_at": updated_at
        };
        
        let eventriderJson = JSON.stringify(eventriderData,null,2);

        HandleEdit(eventriderJson);

        console.log("e_id: "+ e_id);
        console.log("r_id: "+ r_id);
        console.log("er_type: "+ er_type);
        console.log("er_specialization: "+ er_specialization);
        onClose();
    }

    return (
    <Box>
        <Dialog open={open} aria-labelledby="form-dialog-title">
            <DialogTitle id="form-dialog-title">Edit EventRider</DialogTitle>
            <DialogContent>
                <DialogContentText>
                    To change a EventRider relation, please enter the EventRider details here.
                </DialogContentText>
                <TextField
                autoFocus
                margin="dense"
                id="e_id"
                label="Event ID"
                type="text"
                fullWidth
                defaultValue={eventrider?.e_id}
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
                defaultValue={eventrider?.r_id}
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
                    defaultValue={eventrider?.er_type}
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
                    defaultValue={eventrider?.er_specialization}
                    onChange={event => { setSpecialization(event.target.value) }}
                    error={!!errors.er_specialization}
                    helperText={errors.er_specialization}
                />
              
            </DialogContent>
            <DialogActions>
                <Button  color="primary"
                onClick={onClose}
                >
                    Cancel  
                </Button>
                <Button  color="primary"
                onClick={HandleEditEventrider}  
                >
                    Edit eventrider
                </Button>
            </DialogActions>
        </Dialog>
    </Box>
    );
}

export default DialogEditEventrider;