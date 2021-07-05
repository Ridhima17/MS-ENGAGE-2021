import React from 'react';
import "bootstrap/dist/css/bootstrap.min.css";
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom';
import { makeStyles } from '@material-ui/core/styles';


//importing the components
import VideoPlayer from './components/VideoPlayer';
import Options from './components/Options';
import Notifications from './components/Notifications';
import { Fragment } from 'react';
import SignUp from './components/SignUp';
import LoginPage from './components/LoginPage';
import Home from './components/Home';


const useStyles = makeStyles((theme)=>({
    // appBar: {
    //     borderRadius: 15,
    //     margin: '30px 100px',
    //     display: 'flex',
    //     flexDirection: 'row',
    //     justifyContent: 'center',
    //     alignItems: 'center',
    //     width: '600px',
    //     border: '2px solid black',
    //     [theme.breakpoints.down('xs')]: {
    //       width: '90%',
    //     },
    //   },
      wrapper: {
        display: 'flex',
        flexDirection: 'column',
        width: '100%',
        alignItems: 'center'
      },
}));

const App = () => {
    const classes = useStyles();
    return(
        <>
            <Router>
                <Route path="/" exact component={Home}/>
            </Router>
            <div className={classes.wrapper}>
                {/*MS TEAMS CLONE*/}
                
                    {/* <AppBar className={classes.AppBar} position="static" color="inherit">
                        <Typography variant="h3" align="center">MICROSOFT</Typography>
                    </AppBar> */}
            
                <Router>
                    <Switch>
                        <Route path="/videochat" render={() => 
                            <Fragment>
                                <VideoPlayer/>
                                <Options>
                                    <Notifications/>
                                </Options>
                            </Fragment>
                        }/>
                        <Route path="/signin" exact component={LoginPage}/>
                        <Route path="/signup" exact component={SignUp}/>
                    </Switch>
                </Router>
            </div>
        </>
    )
}

export default App;