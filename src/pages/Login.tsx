import React, {ReactElement, FC} from "react";
import {Box, Typography} from "@mui/material";
import { LoginForm } from '../components/LoginForm';

const Login: FC<any> = (): ReactElement => {
    return (
        <div style={{textAlign: "center" }}>
        <LoginForm onSubmit={({ username, password }) => {
            console.log(username, password);
          }}
          />
      </div>
    );
};

export default Login;