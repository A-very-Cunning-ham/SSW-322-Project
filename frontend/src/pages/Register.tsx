import * as React from 'react';
import {useNavigate} from 'react-router-dom';
import {useEffect} from 'react';
import axios from "axios";

import Avatar from '@mui/material/Avatar';
import Button from '@mui/material/Button';
import CssBaseline from '@mui/material/CssBaseline';
import TextField from '@mui/material/TextField';
import FormControlLabel from '@mui/material/FormControlLabel';
import Checkbox from '@mui/material/Checkbox';
import { Link } from 'react-router-dom';
import Grid from '@mui/material/Grid';
import Box from '@mui/material/Box';
import LockOutlinedIcon from '@mui/icons-material/LockOutlined';
import Typography from '@mui/material/Typography';
import Container from '@mui/material/Container';

interface Error {
  error: string;
}

export default function SignUp() {
  const navigate = useNavigate()

  const [error, setError] = React.useState<Error>({
    error: "BANANA"
  });

  const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const data = new FormData(event.currentTarget);

    const user = {
      username: data.get('username'),
      email: data.get('email'),
      password: data.get('password'),
    }

    axios.post(`api/users/register`, user)
    .then((response) => {
      if (response.status === 200) {
        navigate("/");
      }
    })
    .catch((error) => {
      setError({error: error.response.message});
      console.log("Registration failed.")
    });
  };

  return (
      <Container component="main" maxWidth="xs">
        <CssBaseline />
        <Box
          sx={{
            marginTop: 8,
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
          }}
        >
          <Avatar sx={{ m: 1, bgcolor: 'secondary.main' }}>
            <LockOutlinedIcon />
          </Avatar>
          <Typography component="h1" variant="h5">
            Sign up
          </Typography>
          <Box sx={{
              flexGrow: 1,
              flexDirection: 'column',
              display: 'flex',
              justifyContent: 'center',
              alignItems: 'center',
              padding: '10px'
          }}>
              <Typography variant="body2">
                Usernames should be at least 4 chars, only letters and numbers. Passwords should be 
                at least 6 chars, no whitespaces. 
              </Typography>
              <Typography variant="body2" style={{color:"#c00000"}}> {error.error} </Typography>
          </Box>
          <Box component="form" noValidate onSubmit={handleSubmit} sx={{ mt: 3 }}>
            <Grid container spacing={2}>
              <Grid item xs={12}>
                <TextField
                  required
                  fullWidth
                  id="username"
                  label="Username"
                  name="username"
                  autoComplete="username"
                  autoFocus
                />
              </Grid>
              <Grid item xs={12}>
                <TextField
                  required
                  fullWidth
                  id="email"
                  label="Email Address"
                  name="email"
                  autoComplete="email"
                />
              </Grid>
              <Grid item xs={12}>
                <TextField
                  required
                  fullWidth
                  name="password"
                  label="Password"
                  type="password"
                  id="password"
                  autoComplete="new-password"
                />
              </Grid>
            </Grid>
            <Button
              type="submit"
              fullWidth
              variant="contained"
              sx={{ mt: 3, mb: 2 }}
            >
              Sign Up
            </Button>
            <Grid container justifyContent="flex-end">
              <Grid item component={Link} to={'/login'}>
                  Already have an account? Sign in
              </Grid>
            </Grid>
          </Box>
        </Box>
        {/* <Copyright sx={{ mt: 5 }} /> */}
      </Container>
  );
}
