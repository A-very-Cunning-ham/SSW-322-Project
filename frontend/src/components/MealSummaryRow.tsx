import React, { ReactElement, FC} from "react";
import {Box, Button, Typography, Grid, Card, CardContent, Chip} from "@mui/material";

interface Props {
    title: String
    address: String
    startTime: String
    endTime: String
    capacity: number;
    price: number;
    filters: string[];
  }

const MealSummaryRow: FC<Props> = ({ title, address, startTime, endTime, capacity, price, filters }): ReactElement => {
return (
    <Card>
        <CardContent>
            <Grid container spacing={2}>
                <Grid item xs={2}>
                    <Box
                        component="img"
                        sx={{ maxWidth: "100%" }}
                        src="https://www.lactaid.com/sites/lactaid_us/files/recipe-images/mac-and-cheese-website.png"
                    />
                </Grid>
                <Grid item xs={2}>
                    <Typography variant="h5" gutterBottom>{title}</Typography>
                    <Typography sx={{ mb: 1.5 }} color="text.secondary">{address}</Typography>
                </Grid>
                <Grid item xs={2}>
                    <Typography variant="h5" gutterBottom>Meal Time</Typography>
                    <Typography variant="h6" gutterBottom>{startTime} - {endTime}</Typography>
                </Grid>
                <Grid item xs={2}>
                    <Typography variant="h5" gutterBottom>Capacity</Typography>
                    <Typography variant="h6" gutterBottom>{capacity}</Typography>
                </Grid>
                <Grid item xs={2}>
                    <Typography variant="h5" gutterBottom>Dietary Tags</Typography>
                    {filters.map((item, i) => (
                        <React.Fragment key={i}>
                            <Chip label={item} color="primary" />
                        </React.Fragment>
                        ))}
                </Grid>
                <Grid item xs={2}>
                    <Box sx={{ textAlign: "center" }}>
                        <Typography variant="h5" component="div" gutterBottom>{price}</Typography>
                        <Button variant="contained">View Meal</Button>
                    </Box>
                </Grid>
            </Grid>
        </CardContent>
    </Card>
);
}
export default MealSummaryRow;