import React, { useState, useEffect } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Button from '@material-ui/core/Button';
import axios from 'axios';
import { UPLOAD_IMAGE_REQ, RESET_UPLOAD_IMAGE } from '../redux/image-upload/constants';
import { connect } from 'react-redux';

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

//MAP STATES TO PROPS - REDUX
const  mapStateToProps = (state) => {
  return {
    imgUpload: state.imgUpload
  }
}

//MAP DISPATCH ACTIONS TO PROPS - REDUX
const mapDispatchToProps = dispatch => {
  return {
    uploadImageReq: (payload) => dispatch({ type: UPLOAD_IMAGE_REQ, payload }),
    resetUploadImageRedux: () => dispatch({ type: RESET_UPLOAD_IMAGE})
  }
}

const UploadButton = (props) => {
  const classes = useStyles();

  const {upload, load, uploadImageReq, imgUpload, resetUploadImageRedux} = props;

  const [imageSelected, setImageSelected] = useState("");
  const [loading, setLoading] = useState(false);

  useEffect(() =>{
    resetUploadImageRedux();
  },[])

  useEffect(()=>{
    if(imgUpload.success){
      setLoading(false);
      upload(imgUpload.image.secure_url);
    }
    setLoading(false);
  },[imgUpload])

  useEffect(()=>{
    load(loading);
  },[loading])

  const uploadImage = () => {  
    const files = imageSelected;
    const data = new FormData();
    data.append('file', files[0]);
    data.append('upload_preset', 'testcontrol');
    setLoading(true);

    uploadImageReq(data);
    /* axios.post("https://api.cloudinary.com/v1_1/testcontrol/image/upload", data)
    .then(res => setImage(res.data.secure_url))
    .then(setLoading(false))
    .catch(err => console.log(err)); */
  };


  return (
    <div className={classes.root}>
      
      <input
        accept="image/*"
        className={classes.input}
        id="contained-button-file"
        multiple
        type="file"
        onChange={(event) => {setImageSelected(event.target.files)}}
        //ref={hiddenImageInput}
      />
      <label >
        <Button variant="contained" color="primary" component="span" onClick={uploadImage}>
          Upload
        </Button>
      </label>
    </div>
  );
}


export default connect(mapStateToProps,mapDispatchToProps)(UploadButton);