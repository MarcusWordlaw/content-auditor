import React, { useState } from 'react';
import Avatar from '@material-ui/core/Avatar';
import Button from '@material-ui/core/Button';
import CssBaseline from '@material-ui/core/CssBaseline';
import TextField from '@material-ui/core/TextField';
import Link from '@material-ui/core/Link';
import Grid from '@material-ui/core/Grid';
// import Box from '@material-ui/core/Box';
import LockOutlinedIcon from '@material-ui/icons/LockOutlined';
import Typography from '@material-ui/core/Typography';
import { makeStyles } from '@material-ui/core/styles';
import Container from '@material-ui/core/Container';
import InputLabel from '@material-ui/core/InputLabel';
import FormControl from '@material-ui/core/FormControl';
import NativeSelect from '@material-ui/core/NativeSelect';
import axios from 'axios';

// function Copyright() {
//   return (
//     <Typography variant="body2" color="textSecondary" align="center">
//       {'Copyright © '}
//       <Link color="inherit" href="https://material-ui.com/">
//         Your Website
//       </Link>{' '}
//       {new Date().getFullYear()}
//       {'.'}
//     </Typography>
//   );
// }

const useStyles = makeStyles(theme => ({
  paper: {
    marginTop: theme.spacing(4),
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
  },
  avatar: {
    margin: theme.spacing(1),
    backgroundColor: theme.palette.secondary.main,
  },
  form: {
    width: '100%', // Fix IE 11 issue.
    marginTop: theme.spacing(3),
  },
  submit: {
    margin: theme.spacing(3, 0, 2),
  },
  formControl: {
    width: '100%', // Fix IE 11 issue.
    marginTop: theme.spacing(0),
    marginBottom: theme.spacing(2),
  },
}));

const Registration = (props) => {
  const classes = useStyles();
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [password_confirmation, setPasswordConfirmation] = useState('');
  const [organization_id, setOrganizationId] = useState('');
  const orgList = props.organizationData.map( (x) => 
    <option key={x.id} value={x.id}>{x.name}</option> 
  )

  function handleSubmit(event) {
  
      axios.post("http://172.16.1.100:3000/api/v1/registrations", {
          user: {
              name: name,
              email: email,
              password: password,
              password_confirmation: password_confirmation,
              admin: false,
              organization_id: organization_id
          }
      },
      { withCredentials: true } 
      )
      .then(response => {
          const history = props.history
          if (response.data.status === 'created')
          props.handleSuccesfulAuth(response.data, history)
          else
          console.log("Update registrationError State")
      })
      .catch(error => {
          console.log("registration error", error);
      })
      event.preventDefault();
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
        <form className={classes.form} onSubmit={handleSubmit} noValidate>
          <Grid container spacing={2}>
            <Grid item xs={12}>
              <TextField
                variant="outlined"
                required
                fullWidth
                id="name"
                label="Name"
                name="name"
                value={name}
                onInput={ e=>setName(e.target.value)}
                autoComplete="name"
              />
            </Grid>
            <Grid item xs={12}>
              <TextField
                variant="outlined"
                required
                fullWidth
                id="email"
                label="Email Address"
                name="email"
                value={email}
                onInput={ e=>setEmail(e.target.value)}
                autoComplete="email"
              />
            </Grid>
            <Grid item xs={12}>
              <TextField
                variant="outlined"
                required
                fullWidth
                name="password"
                label="Password"
                type="password"
                id="password"
                value={password}
                onInput={ e=>setPassword(e.target.value)}
              />
            </Grid>
            <Grid item xs={12}>
              <TextField
                variant="outlined"
                required
                fullWidth
                name="password_confirmation"
                label="Password Confirmation"
                type="password"
                id="password_confirmation"
                value={password_confirmation}
                onInput={ e=>setPasswordConfirmation(e.target.value)}
              />
            </Grid>
            <Grid item xs={12}>
              <FormControl className={classes.formControl}>
                <InputLabel>Select Organization</InputLabel>
                <NativeSelect
                  id="organization_id"
                  name="Registration"
                  value={organization_id}
                  onChange={e=>setOrganizationId(e.target.value)}
                  >
                  <option value="" />
                  {orgList}
                </NativeSelect>
              </FormControl>
            </Grid>
          </Grid>
          <Button
            type="submit"
            fullWidth
            variant="contained"
            color="primary"
            className={classes.button}
          >
            Sign Up
          </Button>
        </form>
        <Grid container justify="flex-end">
          <Grid item>
            <Link href="/login" variant="body2">
              Already have an account? Sign in
            </Link>
          </Grid>
        </Grid>
      </div>
      {/* <Box mt={5}>
        <Copyright />
      </Box> */}
    </Container>
  );
}
export default Registration