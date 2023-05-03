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
function AddRider(body) {
    axios
      .request({
        url: process.env.REACT_APP_API_PREFIX + "/api/riders/new",
        method: "POST",
        data: body,
      });
  }

function DialogAddRider({open, onClose}) {

    const [helmet_id, setHID] = useState("");
    const [bike_id, setBID] = useState("");
    const [r_name, setName] = useState("");
    const [height, setHeight] = useState("");
    const [weight, setWeight] = useState("");
    const [specialization, setSpecialization] = useState("");
    const [email, setEmail] = useState("");
    const [phone, setPhone] = useState("");
    const [errors, setErrors] = useState({});

    const HandleAdd = (new_body) => {
        AddRider(new_body);
    }

    const HandleSetName = (new_name) => {
        setName(new_name);
    }
    const HandleSetHID = (new_helmet_id) => {
        setHID(new_helmet_id);
    }
    
    const HandleSetBID = (new_bike_id) => {
        setBID(new_bike_id);
    }

    const HandleSetHeight = (new_height) => {
        setHeight(new_height);
    }

    const HandleSetWeight = (new_weight) => {
        setWeight(new_weight);
    }

    const HandleSetSpecialization = (new_specialization) => {
        setSpecialization(new_specialization);
    }

    const HandleSetEmail = (new_email) => {
        setEmail(new_email);
    }

    const HandleSetPhone = (new_phone) => {
        setPhone(new_phone);
    }

    const HandleAddRider = () => {

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
    
    let riderData = {
        "r_id": "mumumuee-muue-muee-mueu-muueedragnea",
        "helmet_id": helmet_id,
        "bike_id": bike_id,
        "r_name": r_name,
        "height": height,
        "r_weight": weight,
        "specialization": specialization,
        "email": email,
        "phone": phone,
        "created_at": "2001-04-22T16:23:26.668492",
        "updated_at": "2001-04-22T16:23:26.668492"
    };
    riderData.height = parseFloat(riderData.height);
    riderData.r_weight = parseFloat(riderData.r_weight);
    let riderJson = JSON.stringify(riderData,null,2);

    HandleAdd(riderJson);

    console.log("r_id: mumumuee-muue-muee-mueu-muueedragnea");
    console.log("bike_id: "+ bike_id);
    console.log("helmet_id: "+ helmet_id);
    console.log("r_name: "+ r_name);
    console.log("height: "+ height);
    console.log("r_weight: "+ weight);
    console.log("specialization: "+ specialization);
    console.log("email: "+ email);
    console.log("phone: "+ phone);
    console.log("created_at: 2001-04-22T16:23:26.668492");
    console.log("created_at: 2001-04-22T16:23:26.668492");
    onClose();
    }
    

    return (
    <Box>
    <Dialog open={open}  aria-labelledby="form-dialog-title">
        <DialogTitle id="form-dialog-title">Add Rider</DialogTitle>
        <DialogContent>
            <DialogContentText>
                    To add a rider, please enter the rider details here.
            </DialogContentText>
            <TextField
                autoFocus
                margin="dense"
                id="helmet_id"
                label="Helmet ID"
                type="text"
                fullWidth
                onChange={event => { HandleSetHID(event.target.value) }}
            />
            <TextField
                autoFocus
                margin="dense"
                id="bike_id"
                label="Bike ID"
                type="text"
                fullWidth
                onChange={event => { HandleSetBID(event.target.value) }}
            />
            <TextField
                autoFocus
                margin="dense"
                id="r_name"
                label="Name"
                type="text"
                fullWidth
                onChange={event => { HandleSetName(event.target.value) }}
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
                onChange={event => { HandleSetHeight(event.target.value) }}
            />
            <TextField
                autoFocus
                margin="dense"
                id="r_weight"
                label="Weight"
                type="text"
                fullWidth
                onChange={event => { HandleSetWeight(event.target.value) }}
            />
            <TextField

                autoFocus
                margin="dense"
                id="specialization"
                label="Specialization"
                type="text"
                fullWidth
                onChange={event => { HandleSetSpecialization(event.target.value) }}
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
                onChange={event => { HandleSetEmail(event.target.value) }}
            />
            <TextField
                autoFocus
                margin="dense"
                id="phone"
                label="Phone"
                type="text"
                fullWidth
                onChange={event => { HandleSetPhone(event.target.value) }}
                error={!!errors.phone}
                helperText={errors.phone}
            />
        </DialogContent>
        <DialogActions>
            <Button  color="primary"
            onClick={onClose}>
            
                Cancel  
            </Button>
            <Button  color="primary"
            onClick={HandleAddRider}
            >
                Add Rider
            </Button>
        </DialogActions>
    </Dialog>
    </Box>
    );
}

export default DialogAddRider;