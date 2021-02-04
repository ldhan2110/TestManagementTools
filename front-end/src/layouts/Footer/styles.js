const style = {
footer:{
    backgroundColor: "blue",
    display: "flex",
    justifyContent: "center",
    position: "absolute",
    bottom: 0,
    width: "100vw",
    "& > *":{
        color: "white"
    }
},

smallFooter:{
    marginTop: "100px",
    backgroundColor: "blue",
    display: "flex",
    justifyContent: "center",
    width: "100vw",
    "& > *":{
        color: "white"
    }
}
}

export default style;