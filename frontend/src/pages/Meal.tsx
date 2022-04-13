import React, { ReactElement, FC, useState, useEffect } from "react";
import { Avatar, Box, Button, Card, CardActions, CardContent, Chip, Grid, Typography } from "@mui/material";
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


const Meal: FC<any> = (): ReactElement => {
    let { id } = useParams();
    const [postData, setPostData] = useState<PostType>({
        startTime: '',
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
    
    return (
        <Grid container spacing={2}>
            <Grid item container spacing={2}
                direction="row"
                justifyContent="space-between"
                alignItems="flex-start">
                {/* <Grid item xs={2}>
                    <Avatar src={host.imageUrl} />
                </Grid> */}
                <Grid item xs={5}>
                    <Typography align="center">{postData.meals[0].title}</Typography>
                </Grid>
                <Grid item xs={2}>
                    <Button>Join Meal</Button>
                </Grid>
            </Grid>

            <Grid item xs={5}>
                <Box component="img" sx={{ maxWidth: "100%" }} src="https://www.lactaid.com/sites/lactaid_us/files/recipe-images/mac-and-cheese-website.png" />
            </Grid>

            <Grid item xs="auto">
            {/* TODO: align this to the right side of the page */}
                <Card sx={{ minWidth: 275 }}> 
                    <CardContent>
                        <Typography variant="h5" component="div">
                            {postData.meals[0].price}
                        </Typography>
                        <Typography sx={{ mb: 1.5 }} color="text.secondary">
                            {postData.address}
                        </Typography>
                        <Box component="img" sx={{ maxWidth: "100%" }} src="https://www.400capital.com/wp-content/uploads/2014/02/map-placeholder.png" alt="map placeholder image" />
                        <br />
                        {postData.meals[0].filters.map(item => <Chip label={item} color="success" />)}
                    </CardContent>
                </Card>
            </Grid>
            <Grid item xs={5}>
                <Typography variant="body1">{postData.meals[0].description}</Typography>
            </Grid>

        </Grid>
    );
};

export default Meal;