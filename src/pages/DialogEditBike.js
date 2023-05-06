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

function EditBike(id,body) {
    axios
      .request({
        url: "/api/bikes/edit/"+id,
        method: "POST",
        data: body
      });
  }
  
  function GetBike(id,setResponse) {
    axios
      .request({
          url: "/api/bikes/get/"+id,
          method: "GET",
      })
      .then((response) => {
        setResponse(response.data);
     });
  }

function DialogEditBike({open, onClose, id}) {

    const [data, setData] = useState(null);
    const bike = useMemo(() => data?.bike.bike || [], [data]);
    const [brand, setBrand] = useState(bike?.brand);
    const [model, setModel] = useState(bike?.model);
    const [wheelsize, setWheelsize] = useState(bike?.wheelsize);
    const [size, setSize] = useState(bike?.size);
    const [price, setPrice] = useState(bike?.price);
    const [sold, setSold] = useState(bike?.sold);
    const [errors, setErrors] = useState({});
    const HandleSetData = (value) => {
        setData(value);
    }

    const HandleGet = () =>{
        GetBike(id,HandleSetData);
    }

    useEffect(() => {
        if(id!==undefined)
            HandleGet();
    }, [id]);


    useEffect(() => {
        setBrand(bike?.brand);
        setModel(bike?.model);
        setWheelsize(bike?.wheelsize);
        setSize(bike?.size);
        setPrice(bike?.price);
        setSold(bike?.sold);

    }, [bike]);

    const HandleEdit = (newBody) => {
        EditBike(id,newBody);
    }

    const HandleEditBike = () => {  

        const errors = {};
        if (!brand) {
            errors.brand = "Brand is required";
        }
        if (!model) {
            errors.model = "Model is required";
        }
        if (!["XS", "S", "M", "L", "XL", "XXL"].includes(size)) {
            errors.size = "Size must be XS, S, M, L, XL, or XXL";
        }
        if (![26.0, 27.5, 29.0, 20.0, 24.0, 28.0].includes(Number(wheelsize))) {
            errors.wheelsize = "Wheel size must be 26.0, 27.5, 29.0, 20.0, 24.0, or 28.0";
        }
        if (isNaN(price)) {
            errors.price = "Price must be a number";
        }
        if (Object.keys(errors).length > 0) {
            setErrors(errors);
            return;
        }
        const b_id = bike?.b_id;
        const created_at = bike?.created_at;
        const updated_at = bike?.created_at;

        let bikeData = {
            "brand": brand,
            "model": model,
            "wheelsize": wheelsize,
            "size": size,
            "price": price,
            "sold": sold,
        };
        
        bikeData.wheelsize = parseFloat(bikeData.wheelsize);
        bikeData.price = parseFloat(bikeData.price);
        
        let bikeJson = JSON.stringify(bikeData,null,2);

        HandleEdit(bikeJson);

        console.log("b_id: "+ b_id);
        console.log("brand: "+ brand);
        console.log("model: "+ model);
        console.log("wheelsize: "+ wheelsize);
        console.log("size: "+ size);
        console.log("price: "+ price);
        console.log("sold: "+ sold);
        console.log("created_at: "+ created_at);
        console.log("created_at: "+ updated_at);
        onClose();
    }

    return (
    <Box>
        <Dialog open={open} aria-labelledby="form-dialog-title">
            <DialogTitle id="form-dialog-title">Edit Bike</DialogTitle>
            <DialogContent>
                <DialogContentText>
                    To change a bike, please enter the bike details here.
                </DialogContentText>
                <TextField
                    autoFocus
                    margin="dense"
                    id="brand"
                    label="Brand"
                    type="text"
                    fullWidth
                    defaultValue={bike?.brand}
                    onChange={event => {setBrand(event.target.value)}}
                />
                <TextField
                    autoFocus
                    margin="dense"
                    id="model"
                    label="Model"
                    type="text"
                    fullWidth
                    defaultValue={bike?.model}
                    onChange={event => {setModel(event.target.value)}}
                />
                <TextField
                    autoFocus
                    margin="dense"
                    id="wheelsize"
                    label="Wheel Size"
                    type="text"
                    fullWidth
                    defaultValue={bike?.wheelsize}
                    onChange={event => {setWheelsize(event.target.value)}}
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
                    defaultValue={bike?.size}
                    onChange={event => {setSize(event.target.value)}}
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
                    defaultValue={bike?.price}
                    onChange={event => {setPrice(event.target.value)}}
                />
            </DialogContent>
            <DialogActions>
                <Button  color="primary"
                onClick={onClose}
                >
                    Cancel  
                </Button>
                <Button  color="primary"
                onClick={HandleEditBike}  
                >
                    Edit Bike
                </Button>
            </DialogActions>
        </Dialog>
    </Box>
    );
}

export default DialogEditBike;