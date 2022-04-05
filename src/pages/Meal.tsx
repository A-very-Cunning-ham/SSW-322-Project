import React, { ReactElement, FC } from "react";
import { Avatar, Box, Button, Card, CardActions, CardContent, Chip, Grid, Typography } from "@mui/material";

const Meal: FC<any> = (): ReactElement => {
    return (
        <Grid container spacing={2}>
            <Grid item container spacing={2}
                direction="row"
                justifyContent="space-between"
                alignItems="flex-start">
                <Grid item xs={2}>
                    <Avatar src="https://pinchofyum.com/wp-content/uploads/Best-Instant-Pot-Mac-and-Cheese-1024x1536.jpg" />
                </Grid>
                <Grid item xs={5}>
                    <Typography align="center">Meal Name</Typography>
                </Grid>
                <Grid item xs={2}>
                    <Button>Join Meal</Button>
                </Grid>
            </Grid>

            <Grid item xs={5}>
                <Box component="img" sx={{ maxWidth: "100%" }} src="https://www.lactaid.com/sites/lactaid_us/files/recipe-images/mac-and-cheese-website.png" />
            </Grid>

            <Grid item xs="auto">
                <Card sx={{ minWidth: 275 }}>
                    <CardContent>
                        <Typography variant="h5" component="div">
                            $ 15.99
                        </Typography>
                        <Typography sx={{ mb: 1.5 }} color="text.secondary">
                            Hoboken, NJ
                        </Typography>
                        <Box component="img" sx={{ maxWidth: "100%" }} src="https://www.400capital.com/wp-content/uploads/2014/02/map-placeholder.png" alt="map placeholder image" />
                        <br />
                        <Chip label="Vegan" color="success" />
                        <Chip label="Dairy free" color="primary" />
                    </CardContent>
                </Card>

                
            </Grid>
            <Grid item xs={5}>
                    <Typography variant="body1">Lorem ipsum dolor sit amet, consectetur adipiscing elit. Aenean eget viverra ex, a maximus urna. Proin eget leo blandit, rutrum orci sed, congue ante. Donec a justo vitae arcu pellentesque placerat in in diam. Curabitur at magna vitae eros varius congue. Phasellus ornare lacus nec fringilla accumsan. Nunc nunc libero, efficitur eu imperdiet sit amet, vehicula interdum nibh. Sed tincidunt magna sed sem interdum imperdiet.</Typography>
                </Grid>

        </Grid>
    );
};

export default Meal;