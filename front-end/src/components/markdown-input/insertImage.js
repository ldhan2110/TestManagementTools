import React, { useEffect, useState } from 'react';
import { Image, Transformation } from 'cloudinary-react';
import axios from 'axios';
import {
    Button,
    Dialog,
    DialogActions,
    DialogContent,
    DialogContentText,
    DialogTitle,
    Typography,
  } from '@material-ui/core'
import CircularProgress from '@material-ui/core/CircularProgress';
import Box from '@material-ui/core/Box';
import PropTypes from 'prop-types';

function CircularProgressWithLabel(props) {
    return (
      <Box position="relative" display="inline-flex" style={{marginLeft: 5}}>
        <CircularProgress variant="determinate" {...props} />
        <Box
          top={0}
          left={0}
          bottom={0}
          right={0}
          position="absolute"
          display="flex"
          alignItems="center"
          justifyContent="center"
        >
          <Typography variant="caption" component="div" color="textSecondary">{`${Math.round(
            props.value,
          )}%`}</Typography>
        </Box>
      </Box>
    );
  }

  CircularProgressWithLabel.propTypes = {
    /**
     * The value of the progress indicator for the determinate variant.
     * Value between 0 and 100.
     */
    value: PropTypes.number.isRequired,
  };


const InsertImage = (props) => {

    const {isOpen, insertImage, openMethod} = props;

    const [loadProgress, setLoadProgress] = useState("");
    const [loadEnable, setLoadEnable] = useState(false);
    const [open, setOpen] = useState(isOpen);
    const [imageSelected, setImageSelected] = useState("");
    const [uploadedImg, setUploadedImg] = useState("");
    const [insertImg, setInsertImg] = useState("");
    const [error, setError] = useState("");

    useEffect(()=>{
        setOpen(isOpen);
      },[isOpen])

    const handleClose = () => {
        setOpen(false);
        openMethod(false);
        setImageSelected("");
    }

    const uploadImage = () => {
        setUploadedImg("");
        setError("");
        setLoadProgress(0);
        const files = imageSelected;
        if(files[0] !== undefined){
            setLoadEnable(true); 
            const data = new FormData();
            data.append('file', files[0]);
            data.append('upload_preset', 'testcontrol');
            axios.post("https://api.cloudinary.com/v1_1/testcontrol/image/upload", data, config)
            .then(res => {setUploadedImg(res.data.public_id); setInsertImg(res.data.secure_url); setLoadEnable(false); setLoadProgress(0)})
            .catch(error => setError(error.response.data.error.message))
        }
    }

    const config = {
        onUploadProgress: progressEvent => setLoadProgress(Math.round(progressEvent.loaded / progressEvent.total * 100))
    }

    return(
        <Dialog open={open} onClose={handleClose}>
            <DialogContent>
                <DialogTitle style={{marginLeft: -12, marginTop: -10}}>Insert image</DialogTitle>
                <DialogContentText>
                    Choose an image to insert
                </DialogContentText>
                <div style={{display: 'flex', justifyContent: 'flex-start', alignItems: 'center'}}>
                    <input
                    accept="image/*"
                    id="contained-button-file"
                    //multiple
                    type="file"
                    onChange={(event) => {setImageSelected(event.target.files)}}
                    />
                    <div style={{display: 'flex', justifyContent: 'center', alignItems: 'center', marginLeft: 10, marginBottom: 10}} >              
                        <Button id="UpBtn" variant='outlined' color="primary" onClick={uploadImage}>Upload</Button>
                        {loadEnable &&<CircularProgressWithLabel value={loadProgress} />}
                    </div>                
                </div>
                {error !== "" && <DialogContentText style={{color: 'red'}}>
                {error}
                </DialogContentText>}
                {uploadedImg !== "" && 
                <Image cloudName="testcontrol" publicId={uploadedImg} style={{maxHeight: 500, maxWidth: 500}} >
                    <Transformation quality="auto" fetchFormat="auto" />
                </Image>}
            </DialogContent>

            <DialogActions>
                <Button id="InsertBtn" disabled={uploadedImg !== "" ? false : true} variant="contained" color="primary" onClick={()=>{insertImage(insertImg)}}>Insert</Button>
                <Button onClick={handleClose} color="primary">
                    Cancel
                </Button>
            </DialogActions>
            
        </Dialog>

    );
}

export default (InsertImage)