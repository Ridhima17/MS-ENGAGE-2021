// // import React, {useState} from 'react';
// // import { Grid, Paper, Avatar, TextField, Button, Typography, Link} from '@material-ui/core';
// // import AddCircleOutlineOutlinedIcon from '@material-ui/icons/AddCircleOutlineOutlined';
// // import { Formik,Field, Form,ErrorMessage } from 'formik';
// // import * as Yup from 'yup';
// // import axios from 'axios';

// // const SignUp = () => {
// //     const paperStyle={padding: 20,height: '83vh', width: 300, margin: 0}
// //     const avatarStyle={backgroundColor: '#6a55c8'}
// //     const headerStyle={margin: 0}
// //     const btStyle={margin: '8px 0', backgroundColor: '#6a55c8'}

// //     const [formData,setFormData] = useState({
// //         name: '',
// //         email: '',
// //         phoneNumber: '',
// //         password: '',
// //         confirmPassword: ''
// //     });

// //     // const initialValues={
// //     //     name:'',
// //     //     email:'',
// //     //     phoneNumber:'',
// //     //     password:'',
// //     //     confirmPassword:''
// //     // }
// //     // const validationSchema = Yup.object().shape({
// //     //     name: Yup.string().min(1, "It's too short").required("Required"),
// //     //     email: Yup.string().email("Enter valid email").required("Required"),
// //     //     phoneNumber: Yup.number().typeError("Enter valid Phone Number").required('Required'),
// //     //     password: Yup.string().min(8, "Password minimum length should be 8").required("Required"),
// //     //     confirmPassword: Yup.string().oneOf([Yup.ref('password')], "Password not matched").required("Required")
// //     // })
// //     const onSubmit = (event) =>{
// //         event.preventDefault();
// //         const registered = {
// //             name: formData.name,
// //             email: formData.email,
// //             phoneNumber: formData.phoneNumber,
// //             password: formData.password,
// //             confirmPassword: formData.confirmPassword
// //         }
// //         axios.post("http://localhost:5000/app/signup",registered)
// //             .then(response => console.log(response.data))
// //         window.location = '/signin'
// //         // console.log(values)
// //         // console.log(props)
// //         // setTimeout(() => {

// //         //     props.resetForm()
// //         //     props.setSubmitting(false)
// //         // }, 2000)
// //     }
// //     return(
// //         <Grid>
// //             <Paper style={paperStyle}>
// //                 <Grid align="center">
// //                     <Avatar style={avatarStyle}>
// //                         <AddCircleOutlineOutlinedIcon/>
// //                     </Avatar>
// //                     <h2 style={headerStyle}>Sign Up</h2>
// //                     <Typography variant='caption'>Please fill this form to create an account</Typography>
// //                 </Grid>
// //                         <form onSubmit={onSubmit}>
// //                             <TextField fullWidth name="name" label='Name' placeholder='Enter your name' value={formData.name} onChange={(e)=> setFormData({...formData, name: e.target.value})}/>
// //                             <TextField fullWidth name="email" label='E-mail' placeholder='Enter valid email-id' value={formData.email} onChange={(e)=> setFormData({...formData, email: e.target.value})}/>
// //                             <TextField fullWidth name="phoneNumber" label='Phone Number' placeholder='Enter your phone number' value={formData.phoneNumber} onChange={(e)=> setFormData({...formData, phoneNumber: e.target.value})}/>
// //                             <TextField fullWidth name="password" label='Password' placeholder='Enter your Password' value={formData.password} onChange={(e)=> setFormData({...formData, password: e.target.value})}/>
// //                             <TextField fullWidth name="confirmPassword" label='Confirm Password' value={formData.confirmPassword} onChange={(e)=> setFormData({...formData, confirmPassword: e.target.value})}/>
// //                             <Button type='submit' style={btStyle} variant='contained' color='primary' >Sign Up</Button>
// //                         </form>
// //             </Paper>
// //         </Grid>
// //     );
// // };

// // export default SignUp;


// import React, {Component} from 'react';
// import axios from 'axios';
// import "bootstrap/dist/css/bootstrap.min.css"

// class SignUp extends Component{
//     constructor(){
//         super()
//         this.state = {
//             name: '',
//             email: '',
//             phoneNumber: '',
//             password:'',
//             confirmPasssword: ''
//         }
//         this.changeName = this.changeName.bind(this)
//         this.changeEmail = this.changeEmail.bind(this)
//         this.changePhoneNumber = this.changePhoneNumber.bind(this)
//         this.changePassword = this.changePassword.bind(this)
//         this.changeConfirmPassword = this.changeConfirmPassword.bind(this)
//         this.onSubmit = this.onSubmit.bind(this)
//     }
//     changeName(event){
//         this.setState({
//             name: event.target.value
//         })
//     }
//     changeEmail(event){
//         this.setState({
//             email: event.target.value
//         })
//     }
//     changePhoneNumber(event){
//         this.setState({
//             phoneNumber: event.target.value
//         })
//     }
//     changePassword(event){
//         this.setState({
//             password: event.target.value
//         })
//     }
//     changeConfirmPassword(event){
//         this.setState({
//             confirmPassword: event.target.value
//         })
//     }
//     onSubmit(event){
//         event.preventDefault()
//         const registered = {
//             name: this.state.name,
//             email: this.state.email,
//             phoneNumber: this.state.phoneNumber,
//             password: this.state.password,
//             confirmPassword: this.state.confirmPassword,
//         }
//         axios.post('http://localhost:5000/app/signup',registered)
//             .then(response => console.log(response.data))

//         this.setState({
//             name: '',
//             email: '',
//             phoneNumber: '',
//             password: '',
//             confirmPassword: '',
//         })
//     }
//     render() {
//         return ( 
//             <div>
//                 <div className='container'>
//                     <div className='form-div'>
//                         <form onSubmit={this.onSubmit}>
//                             <input type = 'text' placeholder = 'Username' onChange={this.changeName} value={this.state.name} className='form-control form-group'/>
//                             <input type = 'text' placeholder = 'E-mail' onChange={this.changeEmail} value={this.state.email} className='form-control form-group'/>
//                             <input type = 'text' placeholder = 'Phone Number' onChange={this.changePhoneNumber} value={this.state.phoneNumber} className='form-control form-group'/>
//                             <input type = 'text' placeholder = 'Password' onChange={this.changePassword} value={this.state.password} className='form-control form-group'/>
//                             <input type = 'text' placeholder = 'Confirm Password' onChange={this.changeConfirmPassword} value={this.state.confirmPasssword} className='form-control form-group'/>
//                             <input type = 'submit' className = 'btn btn-danger btn-block' value = 'Submit' />
//                         </form>
//                     </div>
//                 </div>
//             </div>
//          );
//     }
// }

// export default SignUp;

import React, {useState} from 'react';
import { useHistory } from 'react-router-dom';
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

    // const onSubmit = (e) => {
    //     e.preventDefault();
    //     axios.post('http://localhost:5000/app/signup',user)
    //         .then(function(response) {
    //             console.log(response)
    //         })
    //         .catch(function(error){
    //             console.log(error)
    //         });
    //     setUser({name:'',email:'',phoneNumber:'',password:'',confirmPassword:''});
    // };

    
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
        if(!data){
            window.alert("Invalid");
        }else{
            window.alert("Registeration Successful");
            history.push("/signin");
        }
        window.location = '/signin';
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