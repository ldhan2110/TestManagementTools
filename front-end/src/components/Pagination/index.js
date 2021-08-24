import React, {useState, useEffect} from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Pagination from '@material-ui/lab/Pagination';

const useStyles = makeStyles((theme) => ({
  root: {
    '& > *': {
      marginTop: theme.spacing(2),
    },
  },
}));

export default  function BasicPagination(props) {
  const classes = useStyles();

  const {selectedPage, selectMethod} = props;

  const [page,setPage] = useState(selectedPage);

  const {totalPage} = props; 

  useEffect(()=> {
    if (page !== selectedPage)
      setPage(selectedPage);
  },[selectedPage]);

  const handleChange = (event, value) => {
    selectMethod(value);
  };

  return (
    <div className={classes.root}>
      <Pagination count={totalPage}  page={page} onChange={handleChange} color="primary"/>
    </div>
  );
}