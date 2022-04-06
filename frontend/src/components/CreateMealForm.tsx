import { Button, TextField } from '@mui/material/';
import * as React from 'react';
import {Formik, Form} from 'formik';
import OutlinedInput from '@mui/material/OutlinedInput';
import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import ListItemText from '@mui/material/ListItemText';
import Select, { SelectChangeEvent } from '@mui/material/Select';
import Checkbox from '@mui/material/Checkbox';

const ITEM_HEIGHT = 48;
const ITEM_PADDING_TOP = 8;
const MenuProps = {
    PaperProps: {
      style: {
        maxHeight: ITEM_HEIGHT * 4.5 + ITEM_PADDING_TOP,
        width: 250,
      },
    },
  };
interface Values {
    mealName: string
    description: string
    price: string
    startTime: string
    endTime: string
    comments: string
}

interface Props {
    onSubmit: (values: Values) => void;
}

const dietaryRestrictionTags = [
    'Vegan',
    'Vegetarian',
    'Kosher',
    'Low Carb',
    'Keto',
    'Dairy-Free',
    'Gluten-Free',
    'Allergy-Free'
  ];

export const CreateMealForm: React.FC<Props> = ({onSubmit}) => {
    const [tagName, setTagName] = React.useState<string[]>([]); //for dietary restriction tags

    return (
        <Formik 
            initialValues={{ mealName:'', description:'',price:'',startTime:'',endTime:'',comments:''}} 
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
                <FormControl sx={{ m: 1, width: 300 }}>
                <InputLabel>Dietary Restrictions</InputLabel>
                <Select
                    multiple
                    value={tagName}
                    name="restriction"
                    onChange={handleChange}
                    input={<OutlinedInput label="Tag" />}
                    renderValue={(selected) => selected.join(', ')}
                    MenuProps={MenuProps}
                >
                    {dietaryRestrictionTags.map((tag) => (
                    <MenuItem key={tag} value={tag}>
                        <Checkbox checked={tagName.indexOf(tag) > -1} />
                        <ListItemText primary={tag} />
                    </MenuItem>
                    ))}
                </Select>
                </FormControl>
                </div>
                <div>
                <TextField 
                    placeholder='Start Time'
                    name="startTime"
                    value={values.startTime}
                    onChange={handleChange}
                    onBlur={handleBlur} 
                />
                <Select
                    onChange={handleChange}
                    placeholder='AM'
                >
                    <MenuItem value={'AM'}>AM</MenuItem>
                    <MenuItem value={'PM'}>PM</MenuItem>
                </Select>
                <TextField 
                    placeholder='End Time'
                    name="endTime"
                    value={values.endTime}
                    onChange={handleChange}
                    onBlur={handleBlur} 
                />
                <Select
                   placeholder='AM'
                   onChange={handleChange}
                >
                    <MenuItem value={'AM'}>AM</MenuItem>
                    <MenuItem value={'PM'}>PM</MenuItem>
                </Select></div>
                <div>
                <Button
                    variant="contained"
                    component="label"
                    >
                    Upload Image
                    <input
                        type="file"
                        hidden
                    />
                </Button>
                </div>
                <Button type="submit">Save Changes</Button>
            </Form>
            )}
        </Formik>
    );
};