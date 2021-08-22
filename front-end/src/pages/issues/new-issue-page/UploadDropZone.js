import React, {useEffect, useState, useMemo} from 'react';
import {useDropzone} from 'react-dropzone';
import {
    IconButton,
  } from "@material-ui/core";
import CancelIcon from '@material-ui/icons/Cancel';
import { makeStyles } from '@material-ui/core/styles';

const useStyles = makeStyles((theme) => ({
    thumb: {
        display: 'inline-flex',
        flexDirection: 'column',
        alignItems: 'center',
        borderRadius: 2,
        border: '1px solid #eaeaea',
        marginBottom: 8,
        marginRight: 8,
        width: 110,
        height: 'auto',
        padding: 4,
        boxSizing: 'border-box',
        position: 'relative',
        "& .delButton": {
          display: "none"
        },
        "&:hover .delButton": {
          display: "flex",
          width:'30px',
          height:'30px',
          position: 'absolute',
          top: '-14px',
          right: '-14px',
          zIndex: 100,
        },
    }
}));

const baseStyle = {
    flex: 1,
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    padding: '20px',
    borderWidth: 2,
    borderRadius: 2,
    borderColor: '#eeeeee',
    borderStyle: 'dashed',
    backgroundColor: '#fafafa',
    color: '#bdbdbd',
    outline: 'none',
    transition: 'border .24s ease-in-out'
};

  
const activeStyle = {
    borderColor: '#2196f3'
};
  
const acceptStyle = {
    borderColor: '#00e676'
};
  
const rejectStyle = {
    borderColor: '#ff1744'
};
  

const thumbsContainer = {
  display: 'flex',
  flexDirection: 'row',
  flexWrap: 'nowrap',
  overflowX: 'auto',
  paddingTop: 16
};

const thumbInner = {
  display: 'flex',
  position: 'relative',
  width: 100,
  height: 100,
  overflow: 'hidden'
};

const img = {
  display: 'block',
  width: 'auto',
  height: '100%',
  position: 'absolute',
  left: '50%',
  top: '50%',
  '-webkit-transform': 'translate(-50%,-50%)',
  '-ms-transform': 'translate(-50%,-50%)',
  'transform' : 'translate(-50%,-50%)',
};


function Previews(props) {
  const classes = useStyles();
  
  const {getUrl, revoke} = props;

  const [files, setFiles] = useState([]);
  const [urls, setUrls] = useState([]);

  var newarray = [];
  var array = [];
  
  const {getRootProps, getInputProps} = useDropzone({
    accept: 'image/*,text/plain',
    onDrop: (acceptedFiles, fileRejections) => {
        array = acceptedFiles.map(file => Object.assign(file, {
            preview: URL.createObjectURL(file)
          }));
      setFiles(prevFiles => [...prevFiles, ...array]);  
    //   acceptedFiles.forEach((file) => {
    //     const reader = new FileReader()
  
    //     reader.onabort = () => console.log('file reading was aborted')
    //     reader.onerror = () => console.log('file reading has failed')
    //     reader.onload = () => {
    //     // Do whatever you want with the file contents
    //       const binaryStr = reader.result;
    //       setUrls(prevUrls => [...prevUrls, binaryStr]);
    //     }
    //     reader.readAsDataURL(file);
    //   })
    }
  });

  useEffect(() => {
    tobase64Handler(files).then(result => {setUrls(result); getUrls(files, result);}).then(() => getUrl(newarray));
  },[files])


  var newarray = [], thing;

  const getUrls = (files, urls) => {
    for(var y = 0; y < urls.length; y++){
      thing = {};
      for(var i = 0; i < files.length; i++){
          thing['name'] = files[y].name;
          thing['content'] = urls[y];
      }
      newarray.push(thing)
    }
  }

  const toBase64 = (file) => {
    return new Promise((resolve, reject) => {
      const reader = new FileReader();
      reader.onload = () => resolve(reader.result); 
      reader.onerror = error => reject(error);
      reader.readAsDataURL(file);
    });
  };

  const tobase64Handler = async (files) => {
    const filePathsPromises = [];
    files.forEach(file => {
      filePathsPromises.push(toBase64(file));
    });
    const filePaths = await Promise.all(filePathsPromises);
    //const mappedFiles = filePaths.map((base64File) => ({ selectedFile: base64File }));
    const mappedFiles = filePaths.map((base64File) => (base64File));    
    return mappedFiles;
  }

  const style = useMemo(() => ({
    ...baseStyle,
  }), []);

  function formatBytes(bytes, decimals = 2) {
    if (bytes === 0) return '0 Bytes';

    const k = 1024;
    const dm = decimals < 0 ? 0 : decimals;
    const sizes = ['Bytes', 'KB', 'MB', 'GB', 'TB', 'PB', 'EB', 'ZB', 'YB'];

    const i = Math.floor(Math.log(bytes) / Math.log(k));

    return parseFloat((bytes / Math.pow(k, i)).toFixed(dm)) + ' ' + sizes[i];
  }
  
  const thumbs = files.map((file, i) => {
    if(file.type !== 'text/plain')
    return (
    <div className={classes.thumb} key={file.i}>
        <IconButton className="delButton" onClick={() => removeItem(i)}>
          <CancelIcon /> 
        </IconButton>
      <div style={thumbInner}>
        <img
          src={file.preview}
          style={img}
        />
      </div>
      <span style={{marginTop: 8}}>{formatBytes(file.size)}</span>
    </div>
  )});

  const filesPrev = files.map(file => {
      if(file.type === 'text/plain')
      return(
        <li key={file.path}>
            {file.path} - {formatBytes(file.size)}
        </li>
  )});

/*   useEffect(() => () => {
    // Make sure to revoke the data uris to avoid memory leaks
    files.forEach(file => URL.revokeObjectURL(file.preview));
  }, [files]); */

  useEffect(() => {
    // Make sure to revoke the data uris to avoid memory leaks
    files.forEach(file => URL.revokeObjectURL(file.preview));
  }, [revoke]);

  const removeItem = (index) => {
    URL.revokeObjectURL(files[index].preview);
    setFiles(files.filter((value, i) => i !== index));
  }

  return (
    <section className="container">
      <div {...getRootProps({style})}>
        <input {...getInputProps()} />
        <p>Drag 'n' drop some files here, or click to select files</p>
        <em>(Only images and text *.txt will be accepted)</em>
      </div>
      {files?.length > 0 && 
      <div><h4>Images</h4>
      <aside style={thumbsContainer}>
        {thumbs}        
      </aside></div>}
      {files?.length > 0 && <aside>
        <h4>Files</h4>
        <ul style={{maxHeight: 100, overflow: 'auto'}}>{filesPrev}</ul>
      </aside>}
    </section>
  );
};

export default (Previews);

