import React, {ReactElement, FC} from "react";
import {Box, Button, Typography, Grid, Card, CardContent, Chip} from "@mui/material";

const ViewPostDemo: FC<any> = (): ReactElement => {
    return (
        <Box sx={{ m:3 }}>
        <Grid container spacing={3}>
            <Grid item xs={4}>
                {/* <Avatar src={host.imageUrl} /> */}
                <Box component="img" sx={{ maxWidth: "100%" }} src="https://www.lactaid.com/sites/lactaid_us/files/recipe-images/mac-and-cheese-website.png" />
                <Box sx={{ m:3, textAlign: 'center' }}>
                <Button variant="contained">Join Meal</Button>
                </Box>
            </Grid>
            <Grid item xs={8}>
                <Typography variant="h6" gutterBottom>Title</Typography>
                <Typography variant="body1" gutterBottom>Lorem ipsum dolor sit amet, consectetur adipiscing elit. Etiam fringilla eros tempus lorem aliquet, nec ornare dui euismod. Duis consequat maximus fermentum. Sed pulvinar ipsum turpis, vitae scelerisque odio gravida eget.</Typography>
                <Card sx={{ minWidth: 275 }}>
                    <CardContent>
                        {/* Use Box */}
                        <Grid container> 
                        <Grid item xs>
                        <Typography variant="h5" component="div">
                            $56.50
                        </Typography>
                        <Typography sx={{ mb: 1.5 }} color="text.secondary">
                            1 Castle Pt
                        </Typography>
                        <Box component="img" sx={{ maxWidth: "50%" }} src="https://www.400capital.com/wp-content/uploads/2014/02/map-placeholder.png" alt="map placeholder image" />
                        </Grid>
                        <Grid item xs>
                            <Typography variant="h5" component="div">
                                Date
                            </Typography>
                            <Typography sx={{ mb: 1.5 }} color="text.secondary">
                                8:00 AM - 10:00 AM
                            </Typography>
                            <Chip label='Vegan' color="primary"/>
                        </Grid>
                        </Grid>
                    </CardContent>
                </Card>
            </Grid>
        </Grid>
        </Box>
    );
};

export default ViewPostDemo;
