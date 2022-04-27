import React, { ReactElement, FC, useState, useEffect } from "react";
import { Avatar, Box, Button, Card, CardActions, CardContent, Chip, Grid, Stack, Typography } from "@mui/material";
import { useParams } from 'react-router-dom';
import axios from "axios";

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
        ]
        
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

    return (
        <Box sx={{ m:3 }}>
        <Grid container spacing={3}>
            <Grid item xs={4}>
                {/* <Avatar src={host.imageUrl} /> */}
                <Box component="img" sx={{ maxWidth: "100%" }} src="https://www.lactaid.com/sites/lactaid_us/files/recipe-images/mac-and-cheese-website.png"/>
                <Box sx={{ m:3, textAlign: 'center' }}>
                <Button variant="contained">Join Meal</Button>
                </Box>
            </Grid>
            <Grid item xs={8}>
                <Stack spacing={3}>
                <Typography variant="h3">{postData.title}</Typography>
                <Typography variant="body1">{postData.meals[0].description}</Typography>
                <Card sx={{ minWidth: 275 }}>
                    <CardContent>
                        <Grid container> 
                        <Grid item xs>
                        <Typography variant="h3" component="div">
                            ${postData.price}
                        </Typography>
                        <Typography sx={{ mt:2, mb:2}} color="text.secondary">
                            {postData.address}
                        </Typography>
                        <Box component="img" sx={{ maxWidth: "50%" }} src="https://www.400capital.com/wp-content/uploads/2014/02/map-placeholder.png" alt="map placeholder image" />
                        </Grid>
                        <Grid item xs>
                            <Typography variant="h4" component="div">
                                {postData.date}
                            </Typography>
                            <Typography sx={{ mb: 1.5 }} color="text.secondary">
                                {startTimeDate.toLocaleString([], { year: 'numeric',
                                 month: 'numeric', day: 'numeric', hour: '2-digit', minute: '2-digit'})} - {endTimeDate.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
                            </Typography>
                            <Stack direction="row" spacing={1}>
                            {postData.filters.map((item, i)=> 
                                <React.Fragment key={i}>
                                    <Chip label={item} color="primary" />
                                </React.Fragment>)}
                            </Stack>
                        </Grid>
                        </Grid>
                    </CardContent>
                </Card>
                </Stack>
            </Grid>
        </Grid>
        </Box>
    );
};

export default Meal;