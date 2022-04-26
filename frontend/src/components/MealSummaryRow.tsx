import React, { ReactElement, FC} from "react";
import {Box, Button, Typography, Grid, Card, CardContent, Chip} from "@mui/material";
import Stack from '@mui/material/Stack';

interface Props {
    id: String;
    title: String
    address: String
    startTime: String
    endTime: String
    capacity: number;
    price: number;
    filters: string[];
  }

const MealSummaryRow: FC<Props> = ({ id, title, address, startTime, endTime, capacity, price, filters }): ReactElement => {
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
                    <Typography variant="h6" color="text.secondary" gutterBottom>{startTime} AM - {endTime} AM</Typography>
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
                        <Typography variant="h3" component="div" gutterBottom>${price}</Typography>
                        <Button variant="contained" href={`/viewpost/${id}`}>View Meal</Button>
                    </Box>
                </Grid>
            </Grid>
        </CardContent>
    </Card>
);
}
export default MealSummaryRow;