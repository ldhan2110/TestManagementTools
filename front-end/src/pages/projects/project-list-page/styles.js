const styles = {
    headerSmall:{
        marginLeft: 90,
        marginRight: 50,
        marginTop: 15,
    },

    headerLarge:{
        marginLeft: 140,
        marginRight: 140,
        marginTop: 15,
    },

    item: {
       position: 'relative',
       maxWidth: "100%",
       width: "100%",
       height: 200,
       maxHeight: 225,
       marginTop: 15
    },

    itemTitle:{
        width: "100%", paddingBottom: "5px", display: "flex", justifyContent: "space-between",    
    },

    typoTitle:{
        fontFamily:"Roboto, Arial, sans-serif",
        fontSize: 15,
        fontWeight:'600',
        'word-wrap': 'break-word',
        lineHeight:"1.1rem",
        maxHeight: '2.4rem',
        display: '-webkit-box',
        '-webkit-box-orient': 'vertical',
        '-webkit-line-clamp': 2,
        'overflow': 'hidden',
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
        marginTop: "7vh",
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