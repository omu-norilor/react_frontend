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
function AddBike(body) {
    axios
      .request({
        url:  "/api/bikes/new",
        method: "POST",
        data: body,
      });
  }

function DialogAddBike({open, onClose}) {

    const [brand, setBrand] = useState("");
    const [model, setModel] = useState("");
    const [wheelsize, setWheelsize] = useState("");
    const [size, setSize] = useState("");
    const [price, setPrice] = useState("");
    const sold=false;
    const [errors, setErrors] = useState({});


    const HandleAdd = (newBody) => {
        AddBike(newBody);
    }

    const HandeSetBrand = (newBrand) => {
        setBrand(newBrand);
    }
    const HandeSetModel = (newModel) => {
        setModel(newModel);
    }
    const HandeSetWheelsize = (newWheelsize) => {
        setWheelsize(newWheelsize);
    }
    const HandeSetSize = (newSize) => {
        setSize(newSize);
    }
    const HandeSetPrice = (newPrice) => {
        setPrice(newPrice);
    }

    const HandleAddBike = () => {

    const errors = {};
    if (brand === "") {
        errors.brand = "Brand cannot be empty";
    }
    if (model === "") {
        errors.model = "Model cannot be empty";
    }

    if (!["XS", "S", "M", "L", "XL", "XXL"].includes(size)) {
        errors.size = "Size must be XS, S, M, L, XL, or XXL";
    }
    if (![26.0, 27.5, 29.0, 20.0, 24.0, 28.0].includes(Number(wheelsize))) {
        errors.wheelsize = "Wheel size must be 26.0, 27.5, 29.0, 20.0, 24.0, or 28.0";
    }
    if (isNaN(Number(price))) {
        errors.price = "Price must be a number";
    }

    if (Object.keys(errors).length > 0) {
        setErrors(errors);
        return;
    }

    let bikeData = {
        "b_id": "mumumuee-muue-muee-mueu-muueedragnea",
        "brand": brand,
        "model": model,
        "wheelsize": wheelsize,
        "size": size,
        "price": price,
        "sold": sold,
        "created_at": "2001-04-22T16:23:26.668492",
        "updated_at": "2001-04-22T16:23:26.668492"
    };
    bikeData.wheelsize = parseFloat(bikeData.wheelsize);
    bikeData.price = parseFloat(bikeData.price);
    let bikeJson = JSON.stringify(bikeData,null,2);

    HandleAdd(bikeJson);

    console.log("b_id: mumumuee-muue-muee-mueu-muueedragnea");
    console.log("brand: "+ brand);
    console.log("model: "+ model);
    console.log("wheelsize: "+ wheelsize);
    console.log("size: "+ size);
    console.log("price: "+ price);
    console.log("sold: "+ sold);
    console.log("created_at: 2001-04-22T16:23:26.668492");
    console.log("created_at: 2001-04-22T16:23:26.668492");
    onClose();
    }
    

    return (
    <Box>
    <Dialog open={open}  aria-labelledby="form-dialog-title">
        <DialogTitle id="form-dialog-title">Add Bike</DialogTitle>
        <DialogContent>
            <DialogContentText>
                To add a bike, please enter the bike details here.
            </DialogContentText>
            <TextField
                autoFocus
                margin="dense"
                id="brand"
                label="Brand"
                type="text"
                fullWidth
                onChange={event => { HandeSetBrand(event.target.value) }}
                error={!!errors.brand}
                helperText={errors.brand}
            />
            <TextField
                autoFocus
                margin="dense"
                id="model"
                label="Model"
                type="text"
                fullWidth
                onChange={event => { HandeSetModel(event.target.value) }}
                error={!!errors.model}
                helperText={errors.model}
            />
            <TextField
                autoFocus
                margin="dense"
                id="wheelsize"
                label="Wheel Size"
                type="text"
                fullWidth
                onChange={event => { HandeSetWheelsize(event.target.value) }}
                error={!!errors.wheelsize}
                helperText={errors.wheelsize}
            />
            <TextField
                autoFocus
                margin="dense"
                id="size"
                label="Size"
                type="text"
                fullWidth
                onChange={event => { HandeSetSize(event.target.value) }}
                error={!!errors.size}
                helperText={errors.size}
            />
            <TextField

                autoFocus
                margin="dense"
                id="price"
                label="Price"
                type="text"
                fullWidth
                onChange={event => { HandeSetPrice(event.target.value) }}
                error={!!errors.price}
                helperText={errors.price}
            />
        </DialogContent>
        <DialogActions>
            <Button  color="primary"
            onClick={onClose}>
            
                Cancel  
            </Button>
            <Button  color="primary"
            onClick={HandleAddBike}
            >
                Add Bike
            </Button>
        </DialogActions>
    </Dialog>
    </Box>
    );
}

export default DialogAddBike;