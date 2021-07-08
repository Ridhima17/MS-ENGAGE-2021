import React, {useState} from 'react';
import { useHistory, Redirect } from 'react-router-dom';
import Avatar from '@material-ui/core/Avatar';
import Button from '@material-ui/core/Button';
import CssBaseline from '@material-ui/core/CssBaseline';
import TextField from '@material-ui/core/TextField';
import Link from '@material-ui/core/Link';
import Grid from '@material-ui/core/Grid';
import Box from '@material-ui/core/Box';
import LockOutlinedIcon from '@material-ui/icons/LockOutlined';
import Typography from '@material-ui/core/Typography';
import { makeStyles } from '@material-ui/core/styles';
import Container from '@material-ui/core/Container';
import axios from 'axios';

const useStyles = makeStyles((theme) => ({
  paper: {
    marginTop: theme.spacing(8),
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
  },
  avatar: {
    margin: theme.spacing(1),
    backgroundColor: theme.palette.secondary.main,
  },
  form: {
    width: '100%', 
    marginTop: theme.spacing(3),
  },
  submit: {
    margin: theme.spacing(3, 0, 2),
  },
}));

const SignUp = () => {
    const history = useHistory();
    const classes = useStyles();
    const [user,setUser] = useState({
        name: '', email: '', phoneNumber: '', password: '', confirmPassword: ''
    });
    
    const handleInputs = (e) => {
        console.log(e);
        setUser({...user,[e.target.name]:e.target.value});
    }

    const PostData = async(e) =>{
        e.preventDefault();
        const {name,email,phoneNumber,password,confirmPassword} = user;
        const res = await fetch('/signup',{
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify({
                name,email,phoneNumber,password,confirmPassword
            })
        });
        const data = await res.json();
        console.log(data);
        if(res.status === 422|| !data){
            window.alert("Invalid Registeration");
        }else{
            window.alert("Registeration Successful");
            console.log("successful registeration");
            history.push("/signin");
        }
    }
  return (
    <Container component="main" maxWidth="xs">
      <CssBaseline />
      <div className={classes.paper}>
        <Avatar className={classes.avatar}>
          <LockOutlinedIcon />
        </Avatar>
        <Typography component="h1" variant="h5">
          Sign up
        </Typography>
        <form className={classes.form} noValidate method="POST">
          <Grid container spacing={2}>
            <Grid item xs={12} sm={6}>
              <TextField
                name="name"
                variant="outlined"
                required
                autoFocus
                fullWidth
                label="Name"
                value={user.name}
                onChange={handleInputs}
              />
            </Grid>
            <Grid item xs={12}>
              <TextField
                variant="outlined"
                required
                autoFocus
                fullWidth
                label="Email Address"
                name="email"
                value={user.email}
                onChange={handleInputs}
              />
            </Grid>
            <Grid item xs={12}>
                <TextField 
                 variant="outlined"
                 required
                 autoFocus
                 fullWidth
                 name="phoneNumber"
                 label="Phone Number"
                 value={user.phoneNumber}
                 onChange={handleInputs}
                />
            </Grid>
            <Grid item xs={12}>
              <TextField
                variant="outlined"
                required
                autoFocus
                fullWidth
                name="password"
                label="Password"
                type="password"
                value={user.password}
                onChange={handleInputs}
              />
            </Grid>
            <Grid item xs={12}>
              <TextField
                variant="outlined"
                required
                autoFocus
                fullWidth
                name="confirmPassword"
                label="Confirm Password"
                type="password"
                value={user.confirmPassword}
                onChange={handleInputs}
              />
            </Grid>
          </Grid>
          <Button
            type="submit"
            fullWidth
            variant="contained"
            color="primary"
            className={classes.submit}
            onClick={() => PostData}
          >
            Sign Up
          </Button>
          <Grid container justify="flex-end">
            <Grid item>
              <Link href="http://localhost:3000/signin" variant="body2">
                Already have an account? Sign in
              </Link>
            </Grid>
          </Grid>
        </form>
      </div>
    </Container>
  );
};

export default SignUp;