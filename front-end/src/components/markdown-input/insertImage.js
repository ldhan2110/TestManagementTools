import React, { useEffect, useState } from 'react';
import { Image } from 'cloudinary-react'
import axios from 'axios';
import {
    Button,
    Dialog,
    DialogActions,
    DialogContent,
    DialogContentText,
    DialogTitle,
  } from '@material-ui/core'


const InsertImage = (props) => {

    const {isOpen, insertImage, openMethod} = props;

    const [open, setOpen] = useState(isOpen);
    const [imageSelected, setImageSelected] = useState("");
    const [uploadedImg, setUploadedImg] = useState("");

    useEffect(()=>{
        setOpen(isOpen);
      },[isOpen])

    const handleClose = () => {
        setOpen(false);
        openMethod(false);
        setImageSelected("");
    }

    const uploadImage = () => {       
        const files = imageSelected;
        if(files[0] !== undefined){
            const data = new FormData();
            data.append('file', files[0]);
            data.append('upload_preset', 'testcontrol');
            var temp = "";
            axios.post("https://api.cloudinary.com/v1_1/testcontrol/image/upload", data)
            .then(res => {setUploadedImg(res.data.secure_url)})
        }
    }

    return(
        <Dialog open={open} onClose={handleClose}>
            <DialogContent>
                <DialogTitle>Insert image</DialogTitle>
                <DialogContentText>
                Choose an image to insert
                </DialogContentText>
                <input
                    accept="image/*"
                    id="contained-button-file"
                    multiple
                    type="file"
                    onChange={(event) => {setImageSelected(event.target.files)}}
                />
                <Button id="UpBtn" variant='outlined' color="primary" onClick={uploadImage}>Upload</Button>
                {uploadedImg !== "" && <Image id="preview" cloudName="testcontrol" 
                publicId={uploadedImg} style={{maxWidth: 500, maxHeight: 500}}/>}
            </DialogContent>

            <DialogActions>
                <Button id="InsertBtn" disabled={uploadedImg !== "" ? false : true} variant="contained" color="primary" onClick={()=>{insertImage(uploadedImg)}}>Insert</Button>
                <Button onClick={handleClose} color="primary">
                    Cancel
                </Button>
            </DialogActions>
            
        </Dialog>

    );
}

export default (InsertImage)