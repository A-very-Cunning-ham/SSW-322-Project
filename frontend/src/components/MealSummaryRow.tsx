import React, { ReactElement, FC} from "react";
import {Box, Button, Typography, Grid, Card, CardContent, Chip} from "@mui/material";
import Stack from '@mui/material/Stack';
import { Link } from 'react-router-dom';

interface Props {
    id: String;
    title: String;
    address: String;
    startTime: string;
    endTime: string;
    capacity: number;
    price: number;
    filters: string[];
  }

const MealSummaryRow: FC<Props> = ({ id, title, address, startTime, endTime, capacity, price, filters }): ReactElement => {

    var startTimeDate = new Date(startTime);
    var endTimeDate = new Date(endTime);

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
                    <Typography variant="h5" gutterBottom>Date</Typography>
                    <Typography variant="h6" color="text.secondary" gutterBottom>4/28/2022</Typography>
                    <Typography variant="h6" color="text.secondary" gutterBottom>{startTimeDate.toLocaleString([], { year: 'numeric',
                                 month: 'numeric', day: 'numeric', hour: '2-digit', minute: '2-digit'})} - {endTimeDate.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}</Typography>
                </Grid>
                <Grid item xs={2}>
                    <Typography variant="h5" gutterBottom>Capacity</Typography>
                    <Typography variant="h6" color="text.secondary" gutterBottom>{capacity}</Typography>
                </Grid>
                <Grid item xs={2}>
                    <Typography variant="h5" gutterBottom>Dietary Tags</Typography>
                    <Stack direction="row" spacing={1}>
                    {filters.map((item, i) => (
                        <React.Fragment key={i}>
                            <Chip label={item} color="primary" />
                        </React.Fragment>
                        ))}
                    </Stack>
                </Grid>
                <Grid item xs={2}>
                    <Box sx={{ textAlign: "center" }}>
                        <Typography variant="h3" component="div" gutterBottom>${Number(price).toFixed(2)}</Typography>
                        <Button variant="contained" component={Link} to={`/viewpost/${id}`}>View Meal</Button>
                    </Box>
                </Grid>
            </Grid>
        </CardContent>
    </Card>
);
}
export default MealSummaryRow;