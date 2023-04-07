import logo from './logo.svg';
import React, { useMemo, useState} from 'react';
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


function DialogAddBike({open, onClose}) {

    React.useEffect(() => {
        console.log("DialogAddBike mounted");
        }, []);

        const [body, setBody] = useState(null);
        const [again, setAgain] = useState(1);
        const {data2, loading1, error1} = useFetch(process.env.REACT_APP_API_PREFIX+"/bikes/new","POST", body,again);
        const [brand, setBrand] = useState("");
        const [model, setModel] = useState("");
        const [wheelsize, setWheelsize] = useState("");
        const [size, setSize] = useState("");
        const [price, setPrice] = useState("");
        const sold=false;

        const HandleSetAgain = () => {
            if(again===1)setAgain(0);
        else setAgain(1);
        }
        const HandleSetBody = (newBody) => {
            setBody(newBody);
            HandleSetAgain();
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

        HandleSetBody(bikeJson);

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
            />
            <TextField
                autoFocus
                margin="dense"
                id="model"
                label="Model"
                type="text"
                fullWidth
                onChange={event => { HandeSetModel(event.target.value) }}
            />
            <TextField
                autoFocus
                margin="dense"
                id="wheelsize"
                label="Wheel Size"
                type="text"
                fullWidth
                onChange={event => { HandeSetWheelsize(event.target.value) }}
            />
            <TextField
                autoFocus
                margin="dense"
                id="size"
                label="Size"
                type="text"
                fullWidth
                onChange={event => { HandeSetSize(event.target.value) }}
            />
            <TextField

                autoFocus
                margin="dense"
                id="price"
                label="Price"
                type="text"
                fullWidth
                onChange={event => { HandeSetPrice(event.target.value) }}
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