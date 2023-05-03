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

function EditHelmet(id,body) {
    axios
      .request({
        url: process.env.REACT_APP_API_PREFIX + "/api/helmets/edit/"+id,
        method: "POST",
        data: body
      });
  }
  
  function GetHelmet(id,setResponse) {
    axios
      .request({
          url: process.env.REACT_APP_API_PREFIX+"/api/helmets/get/"+id,
          method: "GET",
      })
      .then((response) => {
        setResponse(response.data);
     });
  }

function DialogEditHelmet({open, onClose, id}) {

    const [data, setData] = useState(null);
    const helmet = useMemo(() => data?.helmet.helmet || [], [data]);
    const [brand, setBrand] = useState(helmet?.brand);
    const [model, setModel] = useState(helmet?.model);
    const [h_type, setHtype] = useState(helmet?.h_type);
    const [size, setSize] = useState(helmet?.size);
    const [price, setPrice] = useState(helmet?.price);
    const [sold, setSold] = useState(helmet?.sold);
    const [errors, setErrors] = useState({});

    const HandleSetData = (value) => {
        setData(value);
    }

    const HandleGet = () =>{
        GetHelmet(id,HandleSetData);
    }

    useEffect(() => {
        if(id!==undefined)
            HandleGet();
    }, [id]);


    useEffect(() => {
        setBrand(helmet?.brand);
        setModel(helmet?.model);
        setHtype(helmet?.h_type);
        setSize(helmet?.size);
        setPrice(helmet?.price);
        setSold(helmet?.sold);

    }, [helmet]);

    const HandleEdit = (newBody) => {
        EditHelmet(id,newBody);
    }

    const HandleEditHelmet = () => { 
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
        if (!["full face", "enduro", "trial", "cross-country"].includes(h_type)) {
            errors.h_type = "Helmet type must be full face, enduro, trial, or cross-country";
        }
        if (price === "") {
            errors.price = "Price cannot be empty";
        }

        if (Object.keys(errors).length > 0) {
            setErrors(errors);
            return;
        }
        

        const h_id = helmet?.h_id;
        const created_at = helmet?.created_at;
        const updated_at = helmet?.created_at;

        let helmetData = {
            "brand": brand,
            "model": model,
            "h_type": h_type,
            "size": size,
            "price": price,
            "sold": sold,
        };
        
        helmetData.h_type = parseFloat(helmetData.h_type);
        helmetData.price = parseFloat(helmetData.price);
        
        let helmetJson = JSON.stringify(helmetData,null,2);

        HandleEdit(helmetJson);

        console.log("h_id: "+ h_id);
        console.log("brand: "+ brand);
        console.log("model: "+ model);
        console.log("h_type: "+ h_type);
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
            <DialogTitle id="form-dialog-title">Edit Helmet</DialogTitle>
            <DialogContent>
                <DialogContentText>
                    To change a helmet, please enter the helmet details here.
                </DialogContentText>
                <TextField
                    autoFocus
                    margin="dense"
                    id="brand"
                    label="Brand"
                    type="text"
                    fullWidth
                    defaultValue={helmet?.brand}
                    onChange={event => {setBrand(event.target.value)}}
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
                    defaultValue={helmet?.model}
                    onChange={event => {setModel(event.target.value)}}
                    error={!!errors.model}
                    helperText={errors.model}
                />
                <TextField
                    autoFocus
                    margin="dense"
                    id="h_type"
                    label="Helmet Type"
                    type="text"
                    fullWidth
                    defaultValue={helmet?.h_type}
                    onChange={event => {setHtype(event.target.value)}}
                    error={!!errors.h_type}
                    helperText={errors.h_type}
                />
                <TextField
                    autoFocus
                    margin="dense"
                    id="size"
                    label="Size"
                    type="text"
                    fullWidth
                    defaultValue={helmet?.size}
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
                    defaultValue={helmet?.price}
                    onChange={event => {setPrice(event.target.value)}}
                    error={!!errors.price}
                    helperText={errors.price}
                />
            </DialogContent>
            <DialogActions>
                <Button  color="primary"
                onClick={onClose}
                >
                    Cancel  
                </Button>
                <Button  color="primary"
                onClick={HandleEditHelmet}  
                >
                    Edit Helmet
                </Button>
            </DialogActions>
        </Dialog>
    </Box>
    );
}

export default DialogEditHelmet;