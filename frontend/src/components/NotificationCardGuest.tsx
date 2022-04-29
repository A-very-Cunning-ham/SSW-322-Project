import React, { ReactElement, FC} from "react";
import {Box, Button, Typography, IconButton, Grid, Card, CardContent, Chip} from "@mui/material";
import AccountCircleIcon from '@mui/icons-material/AccountCircle';
import CheckBoxIcon from '@mui/icons-material/CheckBox';
import DisabledByDefaultIcon from '@mui/icons-material/DisabledByDefault';
import Stack from '@mui/material/Stack';
import { Link } from 'react-router-dom';

interface Props {
    hostId?: string,
    userId?: string,
    status: string,
}

const NotificationCardGuest: FC<Props> = ({ hostId, userId, status }): ReactElement => {

return (
    <Card sx={{ minWidth: 400 }}>
        <CardContent>
            <Grid container spacing={2} direction="row" justifyContent="center" alignItems="center">
                <Grid item>
                    <AccountCircleIcon/>
                </Grid>
                <Grid item>
                    <Typography component={'span'}>{hostId}</Typography>
                    <Typography component={'span'}>{userId}</Typography>
                </Grid>
                <Grid item> 
                    <Typography component={'span'}>Status: {status}</Typography>
                </Grid>
            </Grid>
        </CardContent>
    </Card>
);
}
export default NotificationCardGuest;