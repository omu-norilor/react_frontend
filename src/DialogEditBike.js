import logo from './logo.svg';
import React, { useEffect, useMemo, useState} from 'react';
import AppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import Toolbar from '@mui/material/Toolbar';
import IconButton from '@mui/material/IconButton';
import Typography from '@mui/material/Typography';
import Container from '@mui/material/Container';
import Tooltip from '@mui/material/Tooltip';
import TextField from '@mui/material/TextField';
import Drawer from '@mui/material/Drawer';
import Button from '@mui/material/Button';
import  {DataGrid}  from '@mui/x-data-grid';
import Dialog from '@mui/material/Dialog';
import DialogTitle from '@mui/material/DialogTitle';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogActions from '@mui/material/DialogActions';
import './App.css';
import useFetch  from './hooks/useFetch';


function DialogEditBike({open, onClose, id}) {

    const [again, setAgain] = useState(1);
    const [body, setBody] = useState(null);
    const [getLink, setGetLink] = useState(null);
    const {data, loading, error} = useFetch(getLink,"GET",null,again);
    const {data2, loading1, error1} = useFetch("http://127.0.0.1:8000/bikes/edit/"+id,"POST", body,again);
    const bike = useMemo(() => data?.bike.bike || [], [data]);
    /// make brand model wheelsize size price sold update on the same time as bike
    const [brand, setBrand] = useState(bike?.brand);
    const [model, setModel] = useState(bike?.model);
    const [wheelsize, setWheelsize] = useState(bike?.wheelsize);
    const [size, setSize] = useState(bike?.size);
    const [price, setPrice] = useState(bike?.price);
    const [sold, setSold] = useState(bike?.sold);

    const HandleSetGetLink = () => {
        setGetLink("http://127.0.0.1:8000/bikes/get/"+id);
    }

    useEffect(() => {
        console.log("DialogEditBike mounted");
        if(id!==null)
        {
            HandleSetGetLink();
            HandleSetAgain();
        }
    }, [id]);


    useEffect(() => {
        setBrand(bike?.brand);
        setModel(bike?.model);
        setWheelsize(bike?.wheelsize);
        setSize(bike?.size);
        setPrice(bike?.price);
        setSold(bike?.sold);
        console.log("brand: "+ bike?.brand);
        console.log("model: "+ bike?.model);
        console.log("wheelsize: "+ bike?.wheelsize);
        console.log("size: "+ bike?.size);
        console.log("price: "+ bike?.price);
        console.log("sold: "+ bike?.sold);

    }, [data]);

    const HandleSetAgain = () => {
        if(again===1)setAgain(0);
    else setAgain(1);
    }
    const HandleSetBody = (newBody) => {
        setBody(newBody);
        HandleSetAgain();
    }
    useEffect(() => {
        HandleSetAgain();
    }, [body]);
    useEffect(() => {
        HandleSetAgain();
    }, []);

    const HandleEdit = () => {  
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

        HandleSetBody(bikeJson);

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

    if (loading) {
        return <div>Loading...</div>;
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
                onClick={HandleEdit}  
                >
                    Edit Bike
                </Button>
            </DialogActions>
        </Dialog>
    </Box>
    );
}

export default DialogEditBike;