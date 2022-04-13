import React, {ReactElement, FC} from "react";
import {Box, Typography} from "@mui/material";
import { LoginForm } from '../components/LoginForm';
import { useNavigate } from 'react-router-dom';

const Login: FC<any> = (): ReactElement => {
    const navigate = useNavigate();
             
    return (
        <div style={{textAlign: "center" }}>
            <div style={{textAlign: "center" }}>
                <Box sx={{
                    flexGrow: 1,
                    display: 'flex',
                    justifyContent: 'center',
                    alignItems: 'center',
                    padding: '30px'
                }}>
                    <Typography variant="h3">Login</Typography>
                </Box>
            </div>
        <div style={{textAlign: "center" }}>
        <LoginForm onSubmit={({ username, password }) => {
            //TO DO: Login Verification
            navigate('/');  //TO DO: use history instead of explicit redirect (ask adrian for clarification lol)
            console.log(username, password);
          }}
          />
      </div>
      </div>
    );
};

export default Login;