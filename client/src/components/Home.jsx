import React from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import { Typography,Container, CssBaseline,Grid, Paper} from '@material-ui/core';
import { makeStyles } from '@material-ui/core';
import { NavLink } from 'react-router-dom';

//inline styles
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
  img_container:{
    display: 'flex',
    flexWrap: 'wrap',
    justifyContent: 'space-between'
  },
  img:{
    height: 'auto',
    maxWidth: '100%',
    maxHeight: '100%',
    objectFit: 'contain',
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
                      {/* <li class="nav-item">
                        <a class="nav-link" href="http://localhost:3000/signin">LOGIN</a>
                      </li>
                      <li class="nav-item">
                        <a class="nav-link" href="http://localhost:3000/signup">SIGN UP</a>
                      </li> */}
                      <li class="nav-item">
                        <NavLink class="nav-link" to="/videochat">VIDEO CALL</NavLink>
                      </li>
                  </ul>
              </div>
        </nav>
        <div>
          <CssBaseline/>
          <Container maxWidth="lg">
              <Typography component="div" style={{ backgroundColor: '#e9ecef', height: '100vh' }}>
                <Grid xs={12} className={classes.grid}>
                  <Paper elevation={5} className={classes.paper}>
                      <Typography gutterBottom variant="h3" style={{color:'#4b53bc',textAlign: 'center'}} fontWeight="fontWeightBold">Microsoft Teams</Typography>
                      <Typography gutterbottom variant="h4" style={{textAlign: 'center'}}>Meet, chat and call in just one place</Typography>
                      <div className={classes.img_container}>
                        <img src="./images/meet3.png" alt="ms-meet-img" className={classes.img} />
                        <img src="./images/img1.jpeg" alt="video" className={classes.img}/>
                      </div>
                      <Typography gutterBottom variant="h6" style={{textAlign: 'center'}} font>Login to experience the video call like never before</Typography>
                  </Paper>
                </Grid>
              </Typography>
          </Container>
        </div>
    </>
  )
}

export default Home;
