import { Button, TextField } from '@mui/material/';
import * as React from 'react';
import {Formik, Form, validateYupSchema} from 'formik';
import OutlinedInput from '@mui/material/OutlinedInput';
import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import ListItemText from '@mui/material/ListItemText';
import Select, { SelectChangeEvent } from '@mui/material/Select';
import Checkbox from '@mui/material/Checkbox';
import {Box} from "@mui/material";

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
    address: string
    price: string
    capacity: number
    startTime: string
    endTime: string
    tagNames: string[]
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
    const [tagNames, setTagName] = React.useState<string[]>([]); //for dietary restriction tags
    const updateCheckboxValue = (event: SelectChangeEvent<string[]>) => {
        const {
          target: { value },
        } = event;
        setTagName(
          // On autofill we get a stringified value.
          typeof value === 'string' ? value.split(',') : value,
        );
      };

    return (
        <Formik 
            initialValues={{ mealName:'', description:'',address:'',price:'',capacity:0,startTime:'',endTime:'', tagNames:['']}} 
            onSubmit={values => {
                //do something
                values['tagNames'] = tagNames
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
                    placeholder='Address'
                    name="address"
                    value={values.address}
                    onChange={handleChange}
                    onBlur={handleBlur} 
                /></div>
                <div>
                <TextField 
                    placeholder='Capacity'
                    name="capacity"
                    value={values.capacity}
                    onChange={handleChange}
                    onBlur={handleBlur} 
                />
                <TextField 
                    placeholder='Price'
                    name="price"
                    value={values.price}
                    onChange={handleChange}
                    onBlur={handleBlur} 
                /></div>
                <div>
                <FormControl sx={{ m: 1, width: 300 }}>
                <InputLabel id="diet-restrictions-label">Dietary Restrictions</InputLabel>
                <Select
                    labelId="diet-restrictions-label"
                    id="diet-restrictions"
                    multiple
                    value={tagNames}
                    onChange={updateCheckboxValue}
                    input={<OutlinedInput label="Tag" />}
                    renderValue={(selected) => selected.join(', ')}
                    MenuProps={MenuProps}
                >
                    {dietaryRestrictionTags.map((tag) => (
                    <MenuItem key={tag} value={tag}>
                        <Checkbox checked = {tagNames.indexOf(tag) > -1} />
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
                    defaultValue = "AM"
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
                   defaultValue = "AM"
                   onChange={handleChange}
                >
                    <MenuItem value={'AM'}>AM</MenuItem>
                    <MenuItem value={'PM'}>PM</MenuItem>
                </Select></div>
                <div>
                <Box sx={{
                    padding: '10px'
                }}>
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
                </Box>
                </div>
                
                <Button type="submit">Save Changes</Button>
            </Form>
            )}
        </Formik>
    );
};