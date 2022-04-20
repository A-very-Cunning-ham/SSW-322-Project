import React, { ReactElement, FC, useState, useEffect } from "react";
import {Box, Button, Typography, Grid, Card, CardContent, Chip} from "@mui/material";
import { styled, alpha } from '@mui/material/styles';
import InputBase from '@mui/material/InputBase';
import SearchIcon from '@mui/icons-material/Search';
import Pagination from '@mui/material/Pagination';
import Stack from '@mui/material/Stack';
import { useParams } from 'react-router-dom';
import axios from "axios";

interface Meal{
    _id: string;
    title: string;
    course: string;
    price: number;
    description: string;
    filters: string[];
}

interface PostType {
    startTime: string;
    endTime: string;
    capacity: number;
    address: string;
    meals: Meal[];
}

interface Posts {
    allPosts: PostType[];
}

const Search = styled('div')(({ theme }) => ({
    position: 'relative',
    borderRadius: theme.shape.borderRadius,
    backgroundColor: alpha(theme.palette.common.white, 0.15),
    '&:hover': {
      backgroundColor: alpha(theme.palette.common.white, 0.25),
    },
    marginLeft: 0,
    width: '100%',
    [theme.breakpoints.up('sm')]: {
      marginLeft: theme.spacing(1),
      width: 'auto',
    },
  }));
  
  const SearchIconWrapper = styled('div')(({ theme }) => ({
    padding: theme.spacing(0, 2),
    height: '100%',
    position: 'absolute',
    pointerEvents: 'none',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
  }));

const StyledInputBase = styled(InputBase)(({ theme }) => ({
    color: 'inherit',
    '& .MuiInputBase-input': {
      padding: theme.spacing(1, 1, 1, 0),
      // vertical padding + font size from searchIcon
      paddingLeft: `calc(1em + ${theme.spacing(4)})`,
      transition: theme.transitions.create('width'),
      width: '100%',
      [theme.breakpoints.up('sm')]: {
        width: '12ch',
        '&:focus': {
          width: '20ch',
        },
      },
    },
  }));

const Home: FC<any> = (): ReactElement => {
    let { id } = useParams();
    const [postData, setPostData] = useState<Posts>({
        allPosts: [
        {   startTime: '',
            endTime: '',
            capacity: 0,
            address: '',
            meals: [
                {    _id: '',
                    title: '',
                    course: '',
                    price: 0,
                    description: '',
                    filters: ['']}
            ]}
        ]
    });
    
    useEffect(() => {
        async function fetchData(){
            const allPosts = await axios.get(`/api/posts/`);
            setPostData(allPosts.data);
            // console.log(allPosts.data);
        }
        fetchData();
    }, [id])
    
    
    return (
        <Box sx={{ m:3 }}>
            <Stack spacing={3} alignItems="center">
                <Box sx={{
                    flexGrow: 1,
                    backgroundColor: 'gainsboro',
                    display: 'flex',
                    justifyContent: 'center',
                    alignItems: 'center'
                }}>
                    <Search>
                        <SearchIconWrapper>
                            <SearchIcon />
                        </SearchIconWrapper>
                        <StyledInputBase
                            placeholder="Search…"
                            inputProps={{ 'aria-label': 'search' }}
                        />
                    </Search>
                </Box>
                <Typography variant="h3">Home</Typography>
                <Card>
                    <CardContent>
                        <Grid container spacing={2}>
                            <Grid item xs={2}>
                            <Box component="img" sx={{ maxWidth: "100%" }} src="https://www.lactaid.com/sites/lactaid_us/files/recipe-images/mac-and-cheese-website.png" />
                            </Grid>
                            <Grid item xs={2}>
                                <Typography variant="h4" gutterBottom>Meal Name</Typography>
                                <Typography sx={{ mb: 1.5 }} color="text.secondary">
                                    1 Castle Pt
                                </Typography>
                            </Grid>
                            <Grid item xs={2}>
                                <Typography variant="h4" gutterBottom>Start Time</Typography>
                                <Typography variant="h5" gutterBottom>08:00 AM</Typography>
                            </Grid>
                            <Grid item xs={2}>
                                <Typography variant="h4" gutterBottom>End Time</Typography>
                                <Typography variant="h5" gutterBottom>10:00 AM</Typography>
                            </Grid>
                            <Grid item xs={2}>
                                <Typography variant="h4" gutterBottom>Dietary Tags</Typography>
                                <Chip label='Vegan' color="primary"/>
                            </Grid>
                            <Grid item xs={2}>
                                <Box sx={{ textAlign: 'center' }}>
                                    <Typography variant="h4" component="div" gutterBottom> $56.50 </Typography>
                                    <Button variant="contained">View Meal</Button>
                                </Box>
                            </Grid>
                        </Grid>
                    </CardContent>
                </Card>
                <Card>
                    <CardContent>
                        <Grid container spacing={2}>
                            <Grid item xs={2}>
                            <Box component="img" sx={{ maxWidth: "100%" }} src="https://www.lactaid.com/sites/lactaid_us/files/recipe-images/mac-and-cheese-website.png" />
                            </Grid>
                            <Grid item xs={2}>
                                <Typography variant="h4" gutterBottom>Meal Name</Typography>
                                <Typography sx={{ mb: 1.5 }} color="text.secondary">
                                    1 Castle Pt
                                </Typography>
                            </Grid>
                            <Grid item xs={2}>
                                <Typography variant="h4" gutterBottom>Start Time</Typography>
                                <Typography variant="h5" gutterBottom>09:00 AM</Typography>
                            </Grid>
                            <Grid item xs={2}>
                                <Typography variant="h4" gutterBottom>End Time</Typography>
                                <Typography variant="h5" gutterBottom>11:00 AM</Typography>
                            </Grid>
                            <Grid item xs={2}>
                                <Typography variant="h4" gutterBottom>Dietary Tags</Typography>
                            </Grid>
                            <Grid item xs={2}>
                                <Box sx={{ textAlign: 'center' }}>
                                    <Typography variant="h4" component="div" gutterBottom> $55.00 </Typography>
                                    <Button variant="contained">View Meal</Button>
                                </Box>
                            </Grid>
                        </Grid>
                    </CardContent>
                </Card>
                <Card>
                    <CardContent>
                        <Grid container spacing={2}>
                            <Grid item xs={2}>
                            <Box component="img" sx={{ maxWidth: "100%" }} src="https://www.lactaid.com/sites/lactaid_us/files/recipe-images/mac-and-cheese-website.png" />
                            </Grid>
                            <Grid item xs={2}>
                                <Typography variant="h4" gutterBottom>Meal Name</Typography>
                                <Typography sx={{ mb: 1.5 }} color="text.secondary">
                                    1 Castle Pt
                                </Typography>
                            </Grid>
                            <Grid item xs={2}>
                                <Typography variant="h4" gutterBottom>Start Time</Typography>
                                <Typography variant="h5" gutterBottom>01:00 PM</Typography>
                            </Grid>
                            <Grid item xs={2}>
                                <Typography variant="h4" gutterBottom>End Time</Typography>
                                <Typography variant="h5" gutterBottom>02:00 PM</Typography>
                            </Grid>
                            <Grid item xs={2}>
                                <Typography variant="h4" gutterBottom>Dietary Tags</Typography>
                                <Chip label='Kosher' color="primary"/>
                                <Chip label='Vegetarian' color="primary"/>
                            </Grid>
                            <Grid item xs={2}>
                                <Box sx={{ textAlign: 'center' }}>
                                    <Typography variant="h4" component="div" gutterBottom> $20.50 </Typography>
                                    <Button variant="contained">View Meal</Button>
                                </Box>
                            </Grid>
                        </Grid>
                    </CardContent>
                </Card>
                <Pagination count={5} />
            </Stack>
        </Box>
    );
};

export default Home;