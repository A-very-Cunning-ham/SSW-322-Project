import { Button, TextField } from '@mui/material/';
import * as React from 'react';
import {Formik, Form} from 'formik';
import OutlinedInput from '@mui/material/OutlinedInput';
import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import ListItemText from '@mui/material/ListItemText';
import Select, { SelectChangeEvent } from '@mui/material/Select';
import InputAdornment from '@mui/material/InputAdornment';
import Checkbox from '@mui/material/Checkbox';
import {Box} from "@mui/material";
import Link from '@mui/material/Link';


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
    price: number
    capacity: number
    startTime: string
    endTime: string
    courses: string
    tagNames: string[]
}

interface Props {
    onSubmit: (values: Values) => void;
}

const hours = ['00','01','02','03','04','05','06','07','08','09','10','11','12']    //could simplify start/end time by making it a dropdown
const mins = ['00','15','30','45']

const dietaryRestrictionTags = [
    'Vegan',
    'Vegetarian',
    'Kosher',
    'Halal',
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
            initialValues={{ mealName:'', description:'',address:'',price:0,capacity:0,startTime:'',endTime:'', tagNames:[''],courses:''}} 
            onSubmit={values => {
                values['tagNames'] = tagNames
                
                onSubmit(values);
            }}
            >
            {({values, handleChange, handleBlur}) => (
            <Form>
                <div>
                <Box>
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
                <TextField sx={{ m:2 }}
                    required
                    placeholder='Meal Name'
                    label="Meal Name"
                    name="mealName"
                    value={values.mealName}
                    onChange={handleChange}
                    onBlur={handleBlur} 
                />
                <div>
                <TextField
                    required
                    placeholder='Description'
                    label="Description"
                    name="description"
                    value={values.description}
                    onChange={handleChange}
                    onBlur={handleBlur} 
                /></div>
                <div>
                <TextField sx={{ m:2 }}
                    required
                    placeholder='Address'
                    label="Address"
                    name="address"
                    value={values.address}
                    onChange={handleChange}
                    onBlur={handleBlur} 
                /></div>
                <div>
                <Box>
                <TextField 
                    label="Appetizer"
                    name="Appetizer"
                    onChange={handleChange}
                    onBlur={handleBlur} 
                />
                <TextField 
                    required
                    label="Main Course"
                    placeholder='Main Course'
                    name="Main Course"
                    defaultValue={values.courses}
                    onChange={handleChange}
                    onBlur={handleBlur} 
                />
                <TextField 
                    label="Dessert"
                    name="Dessert"
                    onChange={handleChange}
                    onBlur={handleBlur} 
                />
                </Box>
                </div>
                <div>
                <FormControl sx={{ m: 2, width: 250 }}>
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
                <Box>
                <TextField 
                    placeholder='Capacity'
                    label="Capacity"
                    name="capacity"
                    style = {{width: 100}}
                    value={values.capacity}
                    onChange={handleChange}
                    onBlur={handleBlur} 
                />
                <TextField
                    required
                    placeholder='Price'
                    label="Price"
                    name="price"
                    style = {{width: 100}}
                    value={values.price}
                    InputProps={{
                        startAdornment: <InputAdornment position="start">$</InputAdornment>
                    }}
                    onChange={handleChange}
                    onBlur={handleBlur} 
                /></Box></div>
                
                <div>
                <Box sx={{m:2}}>
                <TextField 
                    required
                    label="Month"
                    name="Month"
                    style = {{width: 100}}
                    //value={values.Month}
                    // onChange={handleChange}
                    // onBlur={handleBlur} 
                />
                <TextField
                    required
                    label="Day"
                    name="Day"
                    style = {{width: 100}}
                    //value={values.Month}
                    // onChange={handleChange}
                    // onBlur={handleBlur} 
                />
                <TextField
                    required
                    label="Year"
                    name="Year"
                    style = {{width: 100}}
                    //value={values.Month}
                    // onChange={handleChange}
                    // onBlur={handleBlur} 
                />
                </Box>
                </div>
                <div>
                <Box sx={{m:2}}>
                <TextField
                    required
                    placeholder='Start Time'
                    label="Start Time"
                    name="startTime"
                    value={values.startTime}
                    onChange={handleChange}
                    onBlur={handleBlur} 
                />
                {/* <InputLabel>Start Hour</InputLabel>
                    <Select onChange={handleChange}>
                        {hours.map((hour) => (
                        <MenuItem key={hour} value={hour}>
                        {hour}
                        </MenuItem>))}
                    </Select> */}
                <Select
                    required
                    onChange={handleChange}
                    defaultValue = "AM"
                >
                    <MenuItem value={'AM'}>AM</MenuItem>
                    <MenuItem value={'PM'}>PM</MenuItem>
                </Select>
                <TextField
                    required
                    placeholder='End Time'
                    label="End Time"
                    name="endTime"
                    value={values.endTime}
                    onChange={handleChange}
                    onBlur={handleBlur} 
                />
                <Select
                    required
                    defaultValue = "AM"
                    onChange={handleChange}
                    >
                    <MenuItem value={'AM'}>AM</MenuItem>
                    <MenuItem value={'PM'}>PM</MenuItem>
                </Select></Box></div>
                <div>
                <TextField 
                    label="Additional Comments"
                    name="Additional Comments"
                    //value={values.Month}
                    // onChange={handleChange}
                    // onBlur={handleBlur} 
                />
                </div>        
                <Button sx={{ m:2 }} type="submit"><Link href='/' color="inherit" underline="none">Create Post</Link></Button>
            </Form>
            )}
        </Formik>
    );
};