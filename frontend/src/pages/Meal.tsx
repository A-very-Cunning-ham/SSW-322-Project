import React, { ReactElement, FC, useState, useEffect } from "react";
import { Avatar, Box, Button, Card, CardActions, CardContent, Chip, Grid, Typography } from "@mui/material";
import { useParams } from 'react-router-dom';
import axios from "axios";


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

// interface Props {
//     name: string;
//     price: number;
//     location: string;
//     description: string;
//     tags?: Tag[];
// }


const Meal: FC<any> = (): ReactElement => {
    let { id } = useParams();
    const [postData, setPostData] = useState([])
    const [mealData, setMealData] = useState([])
    useEffect(() => {

        async function fetchData(){
            const post = await axios.get(`/api/posts/${id}`);
            // console.log(post.data._id)
            setPostData(post.data);

            const meal = await axios.get(`/api/meals/${post.data.meal}`);

        }
        

        fetchData();



            // .then((response) => {
            //     setAPIData(response.data);
            // })
    }, [id])
    
    return (
        // <Grid container spacing={2}>
        //     <Grid item container spacing={2}
        //         direction="row"
        //         justifyContent="space-between"
        //         alignItems="flex-start">
        //         <Grid item xs={2}>
        //             <Avatar src={host.imageUrl} />
        //         </Grid>
        //         <Grid item xs={5}>
        //             <Typography align="center">{name}</Typography>
        //         </Grid>
        //         <Grid item xs={2}>
        //             <Button>Join Meal</Button>
        //         </Grid>
        //     </Grid>

        //     <Grid item xs={5}>
        //         <Box component="img" sx={{ maxWidth: "100%" }} src="https://www.lactaid.com/sites/lactaid_us/files/recipe-images/mac-and-cheese-website.png" />
        //     </Grid>

        //     <Grid item xs="auto">
        //     {/* TODO: align this to the right side of the page */}
        //         <Card sx={{ minWidth: 275 }}> 
        //             <CardContent>
        //                 <Typography variant="h5" component="div">
        //                     {price}
        //                 </Typography>
        //                 <Typography sx={{ mb: 1.5 }} color="text.secondary">
        //                     {location}
        //                 </Typography>
        //                 <Box component="img" sx={{ maxWidth: "100%" }} src="https://www.400capital.com/wp-content/uploads/2014/02/map-placeholder.png" alt="map placeholder image" />
        //                 <br />
        //                 <Chip label="Vegan" color="success" />
        //                 <Chip label="Dairy free" color="primary" />
        //             </CardContent>
        //         </Card>


        //     </Grid>
        //     <Grid item xs={5}>
        //         <Typography variant="body1">{description}</Typography>
        //     </Grid>

        // </Grid>
        <div/>
    );
};

export default Meal;