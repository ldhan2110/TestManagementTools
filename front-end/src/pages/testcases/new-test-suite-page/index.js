import React, {useEffect, useState} from 'react';
import styles from "./styles";
import { withStyles } from '@material-ui/core/styles';
import { connect } from 'react-redux';

const NewTestSuitePopup = (props) => {
    const {isOpen, setOpen} = props;  
    const [open, setOpenPopup] = React.useState(isOpen);

    const handleClose = () =>{
      setOpen(false);
      setTestplanInfo({
        nam:'',
        description:''
      }) 
    }

    const [testSuiteInfo, setTestSuite] = useState({
      name:'',
      description:''
    });

  useEffect(()=>{
      setOpenPopup(isOpen);
  },[isOpen, open])


  
    const handleChange = (prop) => (event) => {
      setTestSuite({ ...testSuiteInfo, [prop]: event.target.value });
    };

    return (
      <Dialog open={open} onClose={handleClose} aria-labelledby="form-dialog-title">
        <DialogTitle id="form-dialog-title">New Test Suite</DialogTitle>
        <DialogContent dividers>
          <TextField id="name" label="Test Suite Name" variant="outlined"  fullWidth required  value={testSuiteInfo.name || ''} onChange={handleChange('name')} inputProps={{maxLength : 16}} />
          <TextField id="descriptions" label="Description" variant="outlined"  fullWidth required multiline rows={10}  value={testSuiteInfo.description || ''} onChange={handleChange('description')}/>
        </DialogContent>

        <DialogActions>
          <Button onClick={handleClose} color="primary">
            Cancel
          </Button>
          <Button color="primary">
            Create
          </Button>
        </DialogActions>
      </Dialog>
    );
  }
  
export default withStyles(styles)(NewTestSuitePopup);
  
