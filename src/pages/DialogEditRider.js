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

function EditRider(id,body) {
    axios
      .request({
        url: process.env.REACT_APP_API_PREFIX + "/api/riders/edit/"+id,
        method: "POST",
        data: body
      });
  }
  
  function GetRider(id,setResponse) {
    axios
      .request({
          url: process.env.REACT_APP_API_PREFIX+"/api/riders/get/"+id,
          method: "GET",
      })
      .then((response) => {
        setResponse(response.data);
     });
  }

function DialogEditRider({open, onClose, id}) {

    const [data, setData] = useState(null);
    const rider = useMemo(() => data?.rider.rider || [], [data]);
    const [helmet_id, setHID] = useState(rider?.helmet_id);
    const [bike_id, setBID] = useState(rider?.bike_id);
    const [r_name, setName] = useState(rider?.r_name);
    const [height, setHeight] = useState(rider?.height);
    const [weight, setWeight] = useState(rider?.r_weight);
    const [specialization, setSpecialization] = useState(rider?.specialization);
    const [email, setEmail] = useState(rider?.email);
    const [phone, setPhone] = useState(rider?.phone);
    const [errors, setErrors] = useState({});

    const HandleSetData = (value) => {
        setData(value);
    }

    const HandleGet = () =>{
        GetRider(id,HandleSetData);
    }

    useEffect(() => {
        if(id!==undefined)
            HandleGet();
    }, [id]);


    useEffect(() => {

        setHID(rider?.helmet_id);
        setBID(rider?.bike_id);
        setName(rider?.r_name);
        setHeight(rider?.height);
        setWeight(rider?.weight);
        setSpecialization(rider?.specialization);
        setEmail(rider?.email);
        setPhone(rider?.phone);
        
    }, [rider]);

    const HandleEdit = (newBody) => {
        EditRider(id,newBody);
    }

    const HandleEditRider = () => { 
        
        const errors = {};
        if (!r_name) {
        errors.r_name = "Name is required";
        }
        if (!height) {
        errors.height = "Height is required";
        }
        if (!weight) {
        errors.weight = "Weight is required";
        }
        if (!phone || !/^\d{10}$/.test(phone)) {
        errors.phone = "Phone number is invalid. It should be a 10-digit number";
        }
        if (!["Freeride", "Road", "Trail", "Enduro", "Downhill", "Cross-country", "Dirt", "BMX", "Other"].includes(specialization)) {
        errors.specialization = "Specialization must be Freeride, Road, Trail, Enduro, Downhill, Cross-country, Dirt, BMX, or Other";
        }
        if (!email || !/\S+@\S+\.\S+/.test(email)) {
        errors.email = "Email address is invalid";
        }
        if (Object.keys(errors).length > 0) {
        setErrors(errors);
        return;
        }

        if (Object.keys(errors).length > 0) {
        setErrors(errors);
        return;
        }
        const r_id = rider?.r_id;
        const created_at = rider?.created_at;
        const updated_at = rider?.created_at;

        let riderData = {
            "r_id": r_id,
            "helmet_id": helmet_id,
            "bike_id": bike_id,
            "r_name": r_name,
            "height": height,
            "r_weight": weight,
            "specialization": specialization,
            "email": email,
            "phone": phone,
            "created_at": created_at,
            "updated_at": updated_at
        };
        
        riderData.height = parseFloat(riderData.height);
        riderData.r_weight = parseFloat(riderData.r_weight);
        
        let riderJson = JSON.stringify(riderData,null,2);

        HandleEdit(riderJson);

        console.log("r_id: "+ r_id);
        console.log("helmet_id: "+ helmet_id);
        console.log("bike_id: "+ bike_id);
        console.log("r_name: "+ r_name);
        console.log("height: "+ height);
        console.log("r_weight: "+ weight);
        console.log("specialization: "+ specialization);
        console.log("email: "+ email);
        console.log("phone: "+ phone);
        console.log("created_at: "+ created_at);
        console.log("updated_at: "+ updated_at);
        onClose();
    }

    return (
    <Box>
        <Dialog open={open} aria-labelledby="form-dialog-title">
            <DialogTitle id="form-dialog-title">Edit Bike</DialogTitle>
            <DialogContent>
                <DialogContentText>
                    To change a rider, please enter the rider details here.
                </DialogContentText>
                <TextField
                autoFocus
                margin="dense"
                id="helmet_id"
                label="Helmet ID"
                type="text"
                fullWidth
                defaultValue={rider?.helmet_id}
                onChange={event => { setHID(event.target.value) }}
                
            />
            <TextField
                autoFocus
                margin="dense"
                id="bike_id"
                label="Bike ID"
                type="text"
                fullWidth
                defaultValue={rider?.bike_id}
                onChange={event => { setBID(event.target.value) }}
            />
            <TextField
                autoFocus
                margin="dense"
                id="r_name"
                label="Name"
                type="text"
                fullWidth
                defaultValue={rider?.r_name}
                onChange={event => { setName(event.target.value) }}
                error={!!errors.r_name}
                helperText={errors.r_name}
            />
            <TextField
                autoFocus
                margin="dense"
                id="height"
                label="Height"
                type="text"
                fullWidth
                defaultValue={rider?.height}
                onChange={event => { setHeight(event.target.value) }}
                error={!!errors.height}
                helperText={errors.height}
            />
            <TextField
                autoFocus
                margin="dense"
                id="r_weight"
                label="Weight"
                type="text"
                fullWidth
                defaultValue={rider?.r_weight}
                onChange={event => { setWeight(event.target.value) }}
                error={!!errors.weight}
                helperText={errors.weight}
            />
            <TextField

                autoFocus
                margin="dense"
                id="specialization"
                label="Specialization"
                type="text"
                fullWidth
                defaultValue={rider?.specialization}
                onChange={event => { setSpecialization(event.target.value) }}
                error={!!errors.specialization}
                helperText={errors.specialization}
            />
            <TextField
                autoFocus
                margin="dense"
                id="email"
                label="Email"
                type="text"
                fullWidth
                defaultValue={rider?.email}
                onChange={event => { setEmail(event.target.value) }}
                error={!!errors.email}
                helperText={errors.email}
            />
            <TextField
                autoFocus
                margin="dense"
                id="phone"
                label="Phone"
                type="text"
                fullWidth
                defaultValue={rider?.phone}
                onChange={event => { setPhone(event.target.value) }}
                error={!!errors.phone}
                helperText={errors.phone}
            />
              
            </DialogContent>
            <DialogActions>
                <Button  color="primary"
                onClick={onClose}
                >
                    Cancel  
                </Button>
                <Button  color="primary"
                onClick={HandleEditRider}  
                >
                    Edit Rider
                </Button>
            </DialogActions>
        </Dialog>
    </Box>
    );
}

export default DialogEditRider;