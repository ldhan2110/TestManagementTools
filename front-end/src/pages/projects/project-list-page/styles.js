const styles = {
    headerSmall:{
        marginLeft: 90,
        marginRight: 50,
        marginTop: 20,
    },

    headerLarge:{
        marginLeft: 180,
        marginRight: 200,
        marginTop: 20,
    },

    item: {
       maxWidth: 300,
       width: 300,
       height: 175,
       maxHeight: 200,
       marginTop: 20
    },

    itemTitle:{
        paddingBottom: "5px",
    },

    itemContent: {
        paddingBottom: "5px",
    },


    statusFin:{
        backgroundColor: "#03c04a",
        color: "white",
        float: "right",
    },

    statusInProgress: {
        backgroundColor: "#e8a317",
        color: "white",
        float: "right"
    },

    statusPending: {
        backgroundColor: "red",
        color: "white",
        float: "right"
    },

    paging:{
        marginTop: "20vh",
        width: '100%',
        display: "flex",
        justifyContent: "flex-end",
        
    },

    itemRole:{
        marginTop: '2px',
        display: 'flex',
        justifyContent: 'flex-end'
    },

    rolePJmanager:{
        fontWeight:'500',
        borderColor: 'rgba(240, 71, 71, 0.6)',
        'font-family': 'Whitney,"Helvetica Neue",Helvetica,Arial,sans-serif'
    },

    roleTestLead:{
        fontWeight:'500',
        borderColor: 'rgba(245, 119, 49, 0.6)',
        'font-family': 'Whitney,"Helvetica Neue",Helvetica,Arial,sans-serif'
    },

    roleTester:{
        fontWeight:'500',
        borderColor: 'rgba(114, 137, 218, 0.6)',
        'font-family': 'Whitney,"Helvetica Neue",Helvetica,Arial,sans-serif'
    },
  };

export default styles;