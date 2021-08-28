import { makeStyles } from "@material-ui/styles"

export const useStyles = makeStyles({
    bar:{
      padding: '5px',
      background: '#266bff',
      boxShadow: 'none'
    },
    button:{
      position: 'absolute',
      right: '10px',
      color:'#fff',
      boxShadow: '0px 0px 3px #fff'
    },
    head:{
      fontSize: '25px'
    },
    formContainer:{
      position : 'absolute',
      bottom: '0px',
      width: '95%',
      padding:'10px',
      background:'#d6e6ff'
  },
  form:{
      width: '100%'
  },
  inputfield:{
      width: '100%',
      '&::placeholder':{
          color:'#fff'
      }
  },
  addBtn:{
      background: '#266bff',
      color:'#fff',
      marginTop: '10px',
      '&:hover':{
          background:'#003c99'
      }
  },
  closeBtn: {
    marginLeft: '90%',
    padding: '5px',
    borderRadius:'inherit',
    '&:hover':{
      background:'#fff',
    }
  },
  listItem:{
    width:'100%',
    fontSize: '16px',
    borderBottom: '1px solid #f0f0f0',
    padding: '20px'
},
editDelete:{
    position:'absolute',
    right:'10px'
},
icon:{
        '&:hover':{
            background: 'transparent',
            color: '#266bff'  // main color here
        }
},
waitMessage:{
    color: '#c7c7c7',
    fontSize : '16px',
    display: 'flex',
    alignItems:'center',
    justifyContent:'center',
  },
  container:{
    height:'100vh',
    width: '100%',
    display:'flex',
    flexDirection:'column',
    alignItems:'center',
    justifyContent:'center',
    gap:'30px',
    background: 'transparent',
    opacity:'1'
  }
  })
  

export const formStyles = makeStyles({
    formContainer:{
      position : 'absolute',
      bottom: '0px',
      width: '95%',
      padding:'10px',
      background:'#d6e6ff'
  },
  form:{
      width: '100%'
  },
  inputfield:{
      width: '100%',
      '&::placeholder':{
          color:'#fff'
      }
  },
  addBtn:{
      background: '#266bff',
      color:'#fff',
      marginTop: '10px',
      '&:hover':{
          background:'#003c99'
      }
  },
  closeBtn: {
    marginLeft: '90%',
    padding: '5px',
    borderRadius:'inherit',
    '&:hover':{
      background:'#fff',
    }
  },
  bar:{
    padding: '5px',
    background: '#266bff',
    boxShadow: 'none'
  },
  button:{
    position: 'absolute',
    right: '10px',
    color:'#fff',
    boxShadow: '0px 0px 3px #fff'
  },
  head:{
    fontSize: '25px'
  },
  waitMessage:{
    color: '#c7c7c7',
    fontSize : '16px',
    display: 'flex',
    alignItems:'center',
    justifyContent:'center'
}
})


export const listStyles = makeStyles({
  listItem:{
      width:'100%',
      fontSize: '16px',
      borderBottom: '1px solid #f0f0f0',
      padding: '20px'
  },
  editDelete:{
      position:'absolute',
      right:'10px'
  },
  icon:{
          '&:hover':{
              background: 'transparent',
              color: '#266bff'  // main color here
          }
  },
  waitMessage:{
      color: '#c7c7c7',
      fontSize : '16px',
      display: 'flex',
      alignItems:'center',
      justifyContent:'center',
  },
})

export const loadingStyles = makeStyles({
  container:{
    height:'100vh',
    width: '100%',
    display:'flex',
    flexDirection:'column',
    alignItems:'center',
    justifyContent:'center',
    gap:'30px',
    background: 'transparent',
    opacity:'1'
  }
})