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
        maxHeight:'568px', width:'480px', overflow: "auto", wordWrap: 'break-word', paddingTop:0,

        '&::-webkit-scrollbar': {
            width: '10px'
        },

        '&::-webkit-scrollbar-track': {
            backgroundColor: '#f1f1f1',
        },
        "&::-webkit-scrollbar-thumb": {
            backgroundColor: '#555',
        },
        "&::-webkit-scrollbar-thumb:hover": {
            backgroundColor: '#888',
        },
        
    },

    unreadNotif:{
        width: 7, height: 7, color:'#3EA6FF', margin: '18px 6px 0px'
    },
    
    listItemStyle:{
        paddingLeft: '5px', display: 'flex',
        "&:hover $iconBtn": {
            visibility: "inherit"
        },        
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
        height:'568px', display:'flex', flexDirection:'column', justifyContent: 'center', alignItems: 'center'
    },
    
};

export default styles;