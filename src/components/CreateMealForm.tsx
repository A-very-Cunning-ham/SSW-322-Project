import { Button, TextField } from '@mui/material/';
import * as React from 'react';
import {Formik, Form} from 'formik';
import { json } from 'stream/consumers';

interface Values {
    mealName: string
    description: string
    price: any
    dietaryRestrictions: string
    startTime: any
    endTime: any
    comments: string
}

interface Props {
    onSubmit: (values: Values) => void;
}

export const CreateMealForm: React.FC<Props> = ({onSubmit}) => {
    return (
        <Formik 
            initialValues={{ mealName:'', description:'',price:'',dietaryRestrictions:'',startTime:'',endTime:'',comments:''}} 
            onSubmit={values => {
                onSubmit(values);
            }}
            >
            {({values, handleChange, handleBlur}) => (
            <Form>
                <div>
                <TextField 
                    placeholder='Meal Name'
                    name="mealName"
                    value={values.mealName}
                    onChange={handleChange}
                    onBlur={handleBlur} 
                /></div>
                <div>
                <TextField 
                    placeholder='Description'
                    name="description"
                    value={values.description}
                    onChange={handleChange}
                    onBlur={handleBlur} 
                /></div>
                <div>
                <TextField 
                    placeholder='Price'
                    name="price"
                    value={values.price}
                    onChange={handleChange}
                    onBlur={handleBlur} 
                /></div>
                <div>
                <TextField 
                    placeholder='Dietary Restrictions'
                    name="dietaryRestrictions"
                    value={values.dietaryRestrictions}
                    onChange={handleChange}
                    onBlur={handleBlur} 
                /></div>
                <div>
                <TextField 
                    placeholder='Start Time'
                    name="startTime"
                    value={values.startTime}
                    onChange={handleChange}
                    onBlur={handleBlur} 
                />
                <TextField 
                    placeholder='End Time'
                    name="endTime"
                    value={values.endTime}
                    onChange={handleChange}
                    onBlur={handleBlur} 
                /></div>
                <Button type="submit">submit</Button>
            </Form>
            )}
        </Formik>
    );
};