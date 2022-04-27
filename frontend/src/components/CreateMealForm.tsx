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
interface Values {
    mealName: string
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
    courses: string     //TO DO: figure out how to store key:value pairs for dish:course name (e.g. {['appetizer':'breadsticks'],['entree':'chicken']} )
    tagNames: string[]
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

    const [tabvalue, setValue] = React.useState(0);
    const handleTabChange = (event: React.SyntheticEvent, newValue: number) => {
    setValue(newValue);
    };


    return (
        <Box>
        <Grid container spacing={2}>
        <Grid item xs={4}></Grid>
        <Grid item xs={4}>
        <Formik 
            initialValues={{ mealName:'', description:'',address:'',price:0,capacity:0, startHour:'',startMin:'',startPeriod:'AM',endHour:'',endMin:'',endPeriod:'AM',tagNames:[''],courses:''}} 
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
                    placeholder='Meal Name'
                    label="Meal Name"
                    name="mealName"
                    value={values.mealName}
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
                <Stack direction="row" spacing={2}>
                <Box sx={{ flexGrow: 1, bgcolor: 'background.paper', display: 'flex', }}>
                <Tabs
                    orientation="vertical"
                    variant="scrollable"
                    value={tabvalue}
                    onChange={handleTabChange}
                    sx={{ borderRight: 1, borderColor: 'divider' }}>

                    <Tab label="Appetizer" {...a11yProps(0)} />
                    <Tab label="Main Course *" {...a11yProps(1)} />
                    <Tab label="Dessert" {...a11yProps(2)} />
                </Tabs>
                </Box>
                <TabPanel value={tabvalue} index={0}>
                    <TextField 
                        label="Appetizer"
                        name="Appetizer"
                        onChange={handleChange}
                        onBlur={handleBlur} 
                    />
                </TabPanel>
                <TabPanel value={tabvalue} index={1}>
                    <TextField 
                        required
                        label="Main Course"
                        placeholder='Main Course'
                        name="Main Course"
                        
                        onChange={handleChange}
                        onBlur={handleBlur} 
                    />
                </TabPanel>
                <TabPanel value={tabvalue} index={2}>
                    <TextField 
                        label="Dessert"
                        name="Dessert"
                        onChange={handleChange}
                        onBlur={handleBlur} 
                    />
                </TabPanel>
                </Stack>
                
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
        <Grid item xs={4}></Grid>
        </Grid>
        </Box>
    );
};