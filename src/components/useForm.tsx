import { Button, TextField } from '@mui/material/';
import * as React from 'react';
import {Formik, Form} from 'formik';
import { json } from 'stream/consumers';

interface Values {
    username: string
    password: string
}

interface Props {
    onSubmit: (values: Values) => void;
}

export const UseForm: React.FC<Props> = ({onSubmit}) => {
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
                <TextField 
                    placeholder='Username'
                    name="username"
                    value={values.username}
                    onChange={handleChange}
                    onBlur={handleBlur} 
                /></div>
                <div>
                <TextField 
                    placeholder='password'
                    name="password"
                    value={values.password}
                    onChange={handleChange}
                    onBlur={handleBlur} 
                /></div>
                <Button type="submit">submit</Button>
            </Form>
            )}
        </Formik>
    );
};