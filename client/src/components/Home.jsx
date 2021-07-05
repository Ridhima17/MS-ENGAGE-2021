// import React from 'react';
// import { makeStyles } from '@material-ui/core/styles';
// import AppBar from '@material-ui/core/AppBar';
// import Toolbar from '@material-ui/core/Toolbar';
// import Typography from '@material-ui/core/Typography';
// import Button from '@material-ui/core/Button';
// import { Link } from '@material-ui/core';

// const useStyles = makeStyles((theme) => ({
//     root: {
//       flexGrow: 1,
//     },
//     menuButton: {
//       marginRight: theme.spacing(2),
//     },
//     title: {
//       flexGrow: 1,
//     },
//   }));

// const Home = () =>{
//     const classes = useStyles();
//     const appStyle = {backgroundColor: '#ffffff'}
//     const btStyle = {backgroundColor: '#6a55c8', margin: '20px'}
//     return(
//         <div className={classes.root}>
//             <AppBar position="static" style={appStyle}>
//                 <Toolbar>
//                 <Typography variant="h6" className={classes.title}>
//                 <img src = "https://img-prod-cms-rt-microsoft-com.akamaized.net/cms/api/am/imageFileData/RE1Mu3b?ver=5c31" />
//                     Microsoft
//                 </Typography>
//                 <Button style={btStyle} variant="contained">
//                   <Link href="http://localhost:3000/signin" style={{color:"#FFF"}}>Login</Link>
//                 </Button>
//                 <Button style={btStyle} variant="contained">
//                   <Link href="http://localhost:3000/signup" style={{color:"#FFF"}}>Sign Up</Link>
//                 </Button>
//                 </Toolbar>
//             </AppBar>
//             <div align="center">
//               Welcome, Please login to your account
//             </div>
//         </div>
//     )
// }

// export default Home;

import React from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import { Typography,Container, CssBaseline,Grid, Paper} from '@material-ui/core';
import { spacing } from '@material-ui/system';
import { makeStyles } from '@material-ui/core';

const useStyles = makeStyles((theme) => ({
  gridContainer:{
    alignItems: 'center',
    [theme.breakpoints.down('xs')]: {
      flexDirection: 'column'
    }
  },
  grid:{
    padding: '20px 20px 20px 20px',
    height: '100vh'
  },
  paper:{
    height: '93vh'
  },
  sgrid:{
    padding: 20,
    height: '100%',
    border: '2px solid black'
  }
}))

const Home = () => {
  const classes = useStyles();
  return (
    <>
        <nav class="navbar navbar-expand-lg navbar-light bg-light">
            <a class="navbar-brand"><img src = "https://img-prod-cms-rt-microsoft-com.akamaized.net/cms/api/am/imageFileData/RE1Mu3b?ver=5c31" /></a>
              <button class="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
                    <span class="navbar-toggler-icon"></span>
              </button>
              <div class="collapse navbar-collapse" id="navbarSupportedContent">
                  <ul class="navbar-nav ms-auto">
                      <li class="nav-item active">
                        <a class="nav-link" href="#">Home <span class="sr-only">(current)</span></a>
                      </li>
                      <li class="nav-item">
                        <a class="nav-link" href="http://localhost:3000/signin">LOGIN</a>
                      </li>
                      <li class="nav-item">
                        <a class="nav-link" href="http://localhost:3000/signup">SIGN UP</a>
                      </li>
                  </ul>
              </div>
        </nav>
        <div>
          <CssBaseline/>
          <Container maxWidth="lg">
            {/* <Typography component="div" style={{ backgroundColor: '#e9ecef', height: '100vh' }}>
              <Grid className={classes.gridContainer}>
                <Grid item xs={12} md={6} className={classes.padding}>
                  <Typography variant="h6">Microsoft Teams</Typography>
                </Grid>
                <Grid item xs={12} md={6} className={classes.padding}>
                  <Typography variant="h6">Picture Grid Here</Typography>
                </Grid>
              </Grid> 
            </Typography> */}
              <Typography component="div" style={{ backgroundColor: '#e9ecef', height: '100vh' }}>
                <Grid xs={12} className={classes.grid}>
                  <Paper elevation={5} className={classes.paper}>
                    <Grid xs={12} md={6} className={classes.sgrid}>
                      <Typography gutterBottom variant="h3" style={{color:'#4b53bc',textAlign: 'center',margin: '50px'}} fontWeight="fontWeightBold">Microsoft Teams</Typography>
                      <img src="./images/meet3.png" alt="ms-meet-img" />
                    </Grid>
                  </Paper>
                </Grid>
              </Typography>
          </Container>
        </div>
    </>
  )
}

export default Home;
