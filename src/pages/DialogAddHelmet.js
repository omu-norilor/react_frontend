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
function AddHelmet(body) {
    axios
      .request({
        url:  "/api/helmets/new",
        method: "POST",
        data: body,
      });
  }

  function DialogAddHelmet({open, onClose}) {

    const [brand, setBrand] = useState("");
    const [model, setModel] = useState("");
    const [htype, setHtype] = useState("");
    const [size, setSize] = useState("");
    const [price, setPrice] = useState("");
    const [errors, setErrors] = useState({});
    const sold=false;


    const HandleAdd = (newBody) => {
        AddHelmet(newBody);
    }

    const HandeSetBrand = (newBrand) => {
        setBrand(newBrand);
    }
    const HandeSetModel = (newModel) => {
        setModel(newModel);
    }
    const HandleSetHtype = (newHtype) => {
        setHtype(newHtype);
    }
    const HandeSetSize = (newSize) => {
        setSize(newSize);
    }
    const HandeSetPrice = (newPrice) => {
        setPrice(newPrice);
    }

    const HandleAddHelmet = () => {
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
    if (!["full face", "enduro", "trial", "cross-country"].includes(htype)) {
        errors.htype = "Helmet type must be full face, enduro, trial, or cross-country";
    }
    if (price === "") {
        errors.price = "Price cannot be empty";
    }

    if (Object.keys(errors).length > 0) {
        setErrors(errors);
        return;
    }
    let helmetData = {
        "h_id": "mumumuee-muue-muee-mueu-muueedragnea",
        "brand": brand,
        "model": model,
        "h_type": htype,
        "size": size,
        "price": price,
        "sold": sold,
        "created_at": "2001-04-22T16:23:26.668492",
        "updated_at": "2001-04-22T16:23:26.668492"
    };
    helmetData.price = parseFloat(helmetData.price);
    let helmetJson = JSON.stringify(helmetData,null,2);

    HandleAdd(helmetJson);

    console.log("h_id: mumumuee-muue-muee-mueu-muueedragnea");
    console.log("brand: "+ brand);
    console.log("model: "+ model);
    console.log("h_type: "+ htype);
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
        <DialogTitle id="form-dialog-title">Add Helmet</DialogTitle>
        <DialogContent>
            <DialogContentText>
                To add a helmet, please enter the helmet details here.
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
                id="htype"
                label="Helmet Type"
                type="text"
                fullWidth
                onChange={event => { HandleSetHtype(event.target.value) }}
                error={!!errors.htype}
                helperText={errors.htype}
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
            onClick={HandleAddHelmet}
            >
                Add Helmet
            </Button>
        </DialogActions>
    </Dialog>
    </Box>
    );
}

export default DialogAddHelmet;