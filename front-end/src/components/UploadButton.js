import React, { useState, useEffect } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import {
    Button,
    Typography,
  } from "@material-ui/core";
import axios from 'axios';



const useStyles = makeStyles((theme) => ({
  root: {
    '& > *': {
      margin: theme.spacing(1),
    },
  },
  input: {
    //display: 'none',
  },
}));

const UploadButton = (props) => {
  const classes = useStyles();

  const {upload, uploadedPictureId, setLoadProgress, setLoadEnable} = props;

  const [imageSelected, setImageSelected] = useState("");
  const [error, setError] = useState("");

  const uploadImage = () => {
    document.getElementById('fileid').click();
  };

  const saveImg = (event) =>{
    setError("");
    setLoadProgress(0);
    setImageSelected(event.target.files);
  }

  useEffect(()=>{
    if (imageSelected !== ""){
      const files = imageSelected;
      if(files[0] !== undefined){
          setLoadEnable(true); 
          const data = new FormData();
          data.append('file', files[0]);
          data.append('upload_preset', 'testcontrol');
          axios.post("https://api.cloudinary.com/v1_1/testcontrol/image/upload", data, config)
          .then(res => {uploadedPictureId(res.data.public_id); upload(res.data.secure_url); setLoadEnable(false); setLoadProgress(0)})
          .catch(error => {setError(error.response.data.error.message);setLoadEnable(false); setLoadProgress(0);})
      }    
    }

  },[imageSelected])

  const config = {
    onUploadProgress: progressEvent => setLoadProgress(Math.round(progressEvent.loaded / progressEvent.total * 100))
}

  return (
    <div style={{display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center'}}>
    <div>      
      <input
        accept="image/*"
        className={classes.input}
        id="fileid"
        multiple
        type="file"
        onChange={(event) => {saveImg(event)}}
        hidden
      />
      <label>
        <Button variant="contained" color="primary" component="span" style={{marginLeft: 10}} onClick={uploadImage}>
          Upload & Save
        </Button>
      </label>      
    </div>
    {error !== "" && 
    <Typography variant="subtitle2" style={{color: 'red', marginTop: 5}}>
        {error}
    </Typography>}</div>
  );
}


export default (UploadButton);