import { Button, TextField } from '@mui/material/';
import * as React from 'react';
import {Formik, Form} from 'formik';
import { json } from 'stream/consumers';
import InputAdornment from '@mui/material/InputAdornment';
import Visibility from '@mui/icons-material/Visibility';
import VisibilityOff from '@mui/icons-material/VisibilityOff';
import IconButton from '@mui/material/IconButton';

interface Values {
    username: string
    password: string
}

interface State{
    password: string;
    showPassword: boolean;
}
interface Props {
    onSubmit: (values: Values) => void;
}

export const LoginForm: React.FC<Props> = ({onSubmit}) => {
    const [pwval, setValues] = React.useState<State>({
        password: '',
        showPassword: false,
      });
    
    const handleChange =
        (prop: keyof State) => (event: React.ChangeEvent<HTMLInputElement>) => {
          setValues({ ...pwval, [prop]: event.target.value });
        };
        
    const handleClickShowPassword = () => {
        setValues({
          ...pwval,
          showPassword: !pwval.showPassword,
        });
      };
    
      const handleMouseDownPassword = (event: React.MouseEvent<HTMLButtonElement>) => {
        event.preventDefault();
      };
    
    return (
        <Formik 
            initialValues={{ username: '', password: ''}} 
            onSubmit={values => {
                onSubmit(values);
            }}
            >
            {({values, handleChange, handleBlur}) => (
            <Form>
                <div>
                <TextField sx={{m:1, width:250}}
                    required
                    placeholder='Username'
                    label='Username'
                    name="username"
                    value={values.username}
                    onChange={handleChange}
                    onBlur={handleBlur} 
                /></div>
                <div>
                <TextField sx={{m:1, width:250}}
                    required
                    placeholder='Password'
                    label='Password'
                    name="password"
                    type={pwval.showPassword ? 'text' : 'password'}
                    value={values.password}
                    onChange={handleChange('password')}
                    InputProps={{
                        endAdornment: <InputAdornment position="end"><IconButton
                        aria-label="toggle password visibility"
                        onClick={handleClickShowPassword}
                        onMouseDown={handleMouseDownPassword}
                        edge="end"
                      >
                        {pwval.showPassword ? <VisibilityOff /> : <Visibility />}
                      </IconButton></InputAdornment>
                    }}
                /></div>
                <Button type="submit">submit</Button>
            </Form>
            )}
        </Formik>
    );
};