import { Button, TextField } from '@mui/material/';
import * as React from 'react';
import {Formik, Form, FieldArray, getIn} from 'formik';
import OutlinedInput from '@mui/material/OutlinedInput';
import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import ListItemText from '@mui/material/ListItemText';
import Select, { SelectChangeEvent } from '@mui/material/Select';
import InputAdornment from '@mui/material/InputAdornment';
import Checkbox from '@mui/material/Checkbox';
import { Box, Typography } from "@mui/material";
import Grid from '@mui/material/Grid';
import Stack from '@mui/material/Stack'; 
import Tabs from '@mui/material/Tabs';
import Tab from '@mui/material/Tab';
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
interface Meal {
    course: string
    dishTitle: string
    dishDesc: string
}
interface Values {
    postTitle: string
    description: string
    address: string
    price: number
    capacity: number
    date?: any
    startHour: string
    startMin: string
    startPeriod: string
    endHour: string
    endMin: string
    endPeriod: string
    tagNames: string[]
    meals: Meal[]
}

interface Props {
    onSubmit: (values: Values) => void;
}

interface TabPanelProps {
    children?: React.ReactNode;
    index: number;
    value: number;
  }  

const hours = ['01','02','03','04','05','06','07','08','09','10','11','12']    //could simplify start/end time by making it a dropdown
const mins = ['00','15','30','45']
const courses = ['Appetizer','Entree','Dessert','Palate Cleanser','Hors D\'oeuvre','Soup','Salad']

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

function TabPanel(props: TabPanelProps) {
    const { children, value, index, ...other } = props;

    return (
        <div
        role="tabpanel"
        hidden={value !== index}
        id={`vertical-tabpanel-${index}`}
        aria-labelledby={`vertical-tab-${index}`}
        {...other}
        >
        {value === index && (
            <Box sx={{ p: 3 }}>
            <Typography component="span">{children}</Typography>
            </Box>
        )}
        </div>
    );
}

function a11yProps(index: number) {
    return {
      id: `vertical-tab-${index}`,
      'aria-controls': `vertical-tabpanel-${index}`,
    };
  }
  

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
        <Box>
        <Grid container spacing={2}>
        <Grid item xs={3}></Grid>
        <Grid item xs={6}>
        <Formik 
            initialValues={{ postTitle:'',  description:'',
            address:'',     price:0,        capacity:0, 
            startHour:'',   startMin:'',    startPeriod:'AM',
            endHour:'',     endMin:'',      endPeriod:'AM',
            tagNames:[''],  meals:[{course:'', dishTitle:'', dishDesc:''}] }} 
            onSubmit={values => {
                values['tagNames'] = tagNames
                onSubmit(values);
            }}
            >
            {({values, handleChange, handleBlur}) => (
            <Form>
                <Stack alignItems="center" spacing={2}>
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
                <TextField sx={{ m:2 }}
                    required
                    placeholder='Post Title'
                    label="Post Title"
                    name="postTitle"
                    value={values.postTitle}
                    onChange={handleChange}
                    onBlur={handleBlur} 
                />
                <TextField
                    required
                    placeholder='Description'
                    label="Description"
                    name="description"
                    value={values.description}
                    onChange={handleChange}
                    onBlur={handleBlur} 
                />
                <TextField sx={{ m:2 }}
                    required
                    placeholder='Address'
                    label="Address"
                    name="address"
                    value={values.address}
                    onChange={handleChange}
                    onBlur={handleBlur} 
                />
                <FieldArray name="meals">{({push, remove})=>(
                    <div>
                        {values.meals.map((p,index)=>{
                            const course = `meals[${index}].course`;
                            const dishTitle = `meals[${index}].dishTitle`;
                            const dishDesc = `meals[${index}].dishDesc`;
                            
                            return (
                                <div key={index}>
                                    <Select 
                                        required
                                        name={course}
                                        // defaultValue={course}
                                        value={p.course}
                                        onChange={handleChange}
                                        >
                                        {courses.map((dish) => (
                                        <MenuItem key={dish} value={dish}>{dish}</MenuItem>))}
                                    </Select>
                                    <TextField
                                        required
                                        label="Dish Title"
                                        name={dishTitle}
                                        // defaultValue={p.dishTitle}
                                        value={p.dishTitle}
                                        onChange={handleChange}
                                        onBlur={handleBlur} 
                                    />
                                    <TextField
                                        required
                                        label="Dish Description"
                                        name={dishDesc}
                                        // defaultValue={p.dishDesc}
                                        value={p.dishDesc}
                                        onChange={handleChange}
                                        onBlur={handleBlur} 
                                    />
            
                                    <Button type="button" onClick={() => remove(index)}>x</Button>
                                </div>
                                
                            );
                        })}
                        <Button type="button" variant="outlined" onClick={() => push({ course:"", dishTitle:"", dishDesc:"" })}>Add</Button>
                    </div>    
                )}
                </FieldArray>
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
                        <ListItemText primary={tag}/>
                    </MenuItem>
                    ))}
                </Select>
                </FormControl>
                <Stack direction="row" spacing={2}>
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
                />
                </Stack>
                <TextField 
                    required
                    label="Date"
                    type="date"
                    name='date'
                    InputLabelProps={{
                        shrink: true,
                      }}
                    onChange={handleChange}
                    onBlur={handleBlur} 
                />
                <Stack direction="row" spacing={2}>
                <Box>
                <InputLabel>Start Time</InputLabel>
                <Select 
                    required
                    name='startHour'
                    value={values.startHour}
                    onChange={handleChange}
                    >
                    {hours.map((hour) => (
                    <MenuItem key={hour} value={hour}>
                    {hour}
                    </MenuItem>))}
                </Select>
                <Select 
                    required
                    name='startMin'
                    value={values.startMin}
                    onChange={handleChange}
                    >
                    {mins.map((minute) => (
                    <MenuItem key={minute} value={minute}>
                    {minute}
                    </MenuItem>))}
                </Select>
                <Select
                    required
                    name='startPeriod'
                    onChange={handleChange}
                    defaultValue = "AM"
                >
                    <MenuItem value={'AM'}>AM</MenuItem>
                    <MenuItem value={'PM'}>PM</MenuItem>
                </Select>
                </Box>
                <Box>
                <InputLabel>End Time</InputLabel>
                <Select 
                    required
                    name='endHour'
                    value={values.endHour}
                    onChange={handleChange}
                    >
                    {hours.map((hour) => (
                    <MenuItem key={hour} value={hour}>
                    {hour}
                    </MenuItem>))}
                </Select>
                <Select 
                    required
                    name='endMin'
                    value={values.endMin}
                    onChange={handleChange}
                    >
                    {mins.map((minute) => (
                    <MenuItem key={minute} value={minute}>
                    {minute}
                    </MenuItem>))}
                </Select>
                <Select
                    required
                    name='endPeriod'
                    defaultValue = "AM"
                    onChange={handleChange}
                    >
                    <MenuItem value={'AM'}>AM</MenuItem>
                    <MenuItem value={'PM'}>PM</MenuItem>
                </Select>
                </Box>
                </Stack>
                <TextField 
                    label="Additional Comments"
                    name="Additional Comments"
                />       
                <Button sx={{ m:2 }} type="submit">Create Post</Button>
                </Stack>
            </Form>
            )}
        </Formik>
        </Grid>
        <Grid item xs={3}></Grid>
        </Grid>
        </Box>
    );
};