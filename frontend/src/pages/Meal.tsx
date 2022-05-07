import React, { ReactElement, FC, useState, useEffect } from "react";
import { Avatar, Box, Button, Card, CardActions, CardContent, Chip, Grid, Stack, Typography } from "@mui/material";
import { useParams } from 'react-router-dom';
import axios from "axios";
import { Link } from 'react-router-dom';

// TODO: can we store these types in a common location? 
// interface Tag {
//     text: string;
//     color: string;
// }

// interface Host {
//     firstName: string;
//     lastName: string;
//     username: string;
//     imageUrl: string;
// }

interface Meal{
    _id: string;
    title: string;
    course: string;
    description: string;
}

interface PostType {
    date: any;
    title: string;
    startTime: string;
    endTime: string;
    price: number;
    filters: string[];
    capacity: number;
    address: string;
    meals: Meal[];
    userHasApplied: boolean;
}


const Meal: FC<any> = (): ReactElement => {
    let { id } = useParams();
    const [postData, setPostData] = useState<PostType>({
        date: '',
        title: '',
        startTime: '',
        endTime: '',
        price: 0,
        filters: [''],
        capacity: 0,
        address: '',
        meals: [
            {
                _id: '',
                title: '',
                course: '',
                description: '',
            }
        ],
        userHasApplied: false,
        
    });
    // const [mealData, setMealData] = useState([])
    useEffect(() => {

        async function fetchData(){
            const post = await axios.get(`/api/posts/${id}`);
            setPostData(post.data);

            // const meal = await axios.get(`/api/meals/${post.data.meal}`);
        }
        fetchData();
    }, [id])

    var startTimeDate = new Date(postData.startTime);
    var endTimeDate = new Date(postData.endTime);

      const handleSearch = async() => {
        const hosting = await axios.get(`/api/posts/${id}`);
        if (!hosting){
            const post = await axios.patch(`/api/posts/${id}`);
            setPostData(post.data);
        }
    }
    console.log(postData.userHasApplied)

    return (
        <Box sx={{ backgroundColor:"whitesmoke" }}>
        <Box sx={{ m:6 }}>
        <Grid container spacing={6}>
            <Grid item xs={4}>
                {/* <Avatar src={host.imageUrl} /> */}
                <Box component="img" sx={{ maxWidth: "100%" }} src="https://www.lactaid.com/sites/lactaid_us/files/recipe-images/mac-and-cheese-website.png"/>
                <Box sx={{ m:3, textAlign: 'center' }}>
                    <Button variant="contained" onClick={handleSearch} component={Link} to={'/'}
                        sx={{ backgroundColor:postData.userHasApplied || postData.userHasApplied===undefined ? 'neutral': 'primary'}}>Join Meal</Button>
                </Box>
            </Grid>
            <Grid item xs={8}>
                <Stack spacing={3}>
                <Typography variant="h3">{postData.title}</Typography>
                <Typography variant="subtitle1">{postData.meals[0].description}</Typography>
                <Card sx={{ minWidth: 275 }}>
                    <CardContent>
                        <Grid container> 
                        <Grid item xs>
                        <Typography variant="h3" component="div">
                            ${postData.price}
                        </Typography>
                        <Typography sx={{ mt:2, mb: 2 }} color="text.secondary">
                            {postData.address}
                        </Typography>
                        <Box component="img" sx={{ maxWidth: "50%" }} src="https://www.400capital.com/wp-content/uploads/2014/02/map-placeholder.png" alt="map placeholder image" />
                        </Grid>
                        <Grid item xs>
                            <Typography variant="h4" component="div">
                                Date
                            </Typography>
                            <Typography sx={{ mt:2, mb: 2 }} color="text.secondary">
                                {startTimeDate.toLocaleString([], { year: 'numeric',
                                 month: 'numeric', day: 'numeric', hour: '2-digit', minute: '2-digit'})} - {endTimeDate.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
                            </Typography>
                            <Stack direction="row" spacing={1}>
                            {postData.filters.map((item, i)=> 
                                <React.Fragment key={i}>
                                    <Chip label={item} color="primary" />
                                </React.Fragment>)}
                            </Stack>
                            <Typography variant="h4" sx={{ mt:4, mb: 1 }}>
                                Capacity
                            </Typography>
                            <Typography variant="h5" color="text.secondary">
                                0/{postData.capacity}
                            </Typography>
                        </Grid>
                        </Grid>
                    </CardContent>
                </Card>
                </Stack>
                <Typography variant="h4" sx={{ mt:2 }}>Courses</Typography>
                <Box sx={{mt:2}}>
                <Stack direction="row" spacing={3}>
                    {postData.meals.map((item, i)=>
                        <Card sx={{ minWidth: 50 }}>
                            <CardContent>
                            <Stack spacing={1}>
                                <Typography variant="h6">{item.course}</Typography>
                                <Typography variant="h5">{item.title}</Typography>
                                <Typography variant="body1">{item.description}</Typography>
                            </Stack>
                            </CardContent>
                        </Card>
                    )}
                </Stack>
                </Box>
            </Grid>
        </Grid>
        <Box sx={{ padding: '40px'}}></Box>
        </Box>
        </Box>
    );
};

export default Meal;