import React, {ReactElement, FC} from "react";
import {Box, Typography} from "@mui/material";
import { LoginForm } from '../components/LoginForm';
import { useNavigate } from 'react-router-dom';
import axios from "axios";

interface Error {
    error: string;
}

const Login: FC<any> = (): ReactElement => {
    const navigate = useNavigate();

    const [error, setError] = React.useState<Error>({
        error: ""
      });
             
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
                    async function login(username: any, password: any){
                        console.log(username, password)
                        await axios.post(`api/users/login`, {username: username, email: "dummy@dummy.com", password: password})
                        .then((response) => {
                            console.log(response.status)
                            if (response.status === 200) {
                                navigate(-1);
                                console.log(username, password);
                            }
                        })
                        .catch((error) => {
                            setError({error: error.response.message});
                            console.log("Login failed.");
                        })
                    }
                    login(username, password);
                }}/>
            </div>
            <div style={{textAlign: "center" }}>
                <Box sx={{
                    flexGrow: 1,
                    display: 'flex',
                    justifyContent: 'center',
                    alignItems: 'center',
                    padding: '10px'
                }}>
                    <Typography variant="body2" style={{color:"#c00000"}}> {error.error} </Typography>
                </Box>
            </div>
      </div>
    );
};

export default Login;