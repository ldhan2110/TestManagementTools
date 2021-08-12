const styles = {
    header: {
        backgroundColor: 'white',
        "& > *": {
            marginRight: '1%'
        }
    },

    loginHeader:{
        backgroundColor: 'white',
    },

    paperSty:{
        width: '480px', height: '50px', position: 'sticky', top:0, backgroundColor:'white',
    },
    

    listStyle:{
        maxHeight:'570px', width:'400px', overflow: "auto", wordWrap: 'break-word', paddingTop:0,
        
        '&:hover' : {
            "&::-webkit-scrollbar-thumb": {
                backgroundColor: '#555',
            },
            "&::-webkit-scrollbar-thumb:hover": {
                backgroundColor: '#888',
            },
        },

        '&::-webkit-scrollbar': {
            width: '10px'
        },

        '&::-webkit-scrollbar-track': {
            display:'none'
        },
        "&::-webkit-scrollbar-thumb": {
            opacity: '0%',
        },
        "&::-webkit-scrollbar-thumb:hover": {
            opacity: '0%',
        },
        
    },

    unreadNotif:{
        width: 9, height: 9, color:'#3EA6FF', margin: '18px 6px 0px'
    },
    
    listItemStyle:{
        paddingLeft: '2px', display: 'flex',
        "&:hover $iconBtn": {
            visibility: "inherit"
        },        
    },

    listItemSty:{
        marginTop: 0,
    },

    itemTextPrimary:{
        'font-family': 'Roboto, Arial, sans-serif',
        marginBottom: '8px'
    },

    itemTextSecondary:{
        'font-family': 'Roboto, Arial, sans-serif',
        fontSize: '12px',
    },

    itemTextPrimaryRead:{
        'font-family': 'Roboto, Arial, sans-serif',
        marginBottom: '8px',
        color: 'rgba(0, 0, 0, 0.54)'
    },

    itemTextSecondaryRead:{
        'font-family': 'Roboto, Arial, sans-serif',
        fontSize: '12px',
        color: 'rgba(0, 0, 0, 0.54)',
    },

    listItemDivText:{
        height:'100%', flex:'1', overflow: 'auto',wordWrap: 'break-word'
    },

    image:{
        width:'86px', height:'48px', marginLeft: '5px', objectFit:'cover', objectPosition:'50% 50%'
    },

    iconBtn:{
        opacity:'50%',
        visibility: "hidden",
    },

    emptyList:{
        height:'540px',
        width: '100%',
        display:'flex',
        flexDirection:'column',
        alignItems:"center",
        justifyContent: 'center',
    },

    root: {
        "&:hover" : {
            backgroundColor: "transparent"
        }
    },

    loginHeaderIcons: {
        display: 'flex',
        flexGrow: 1,
        alignItems:"center",
        justifyContent: 'flex-end',
        marginRight: 70
    }
    
};

export default styles;