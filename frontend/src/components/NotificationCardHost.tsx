import React, { ReactElement, FC} from "react";
import {Box, Button, Typography, IconButton, Grid, Card, CardContent, Chip} from "@mui/material";
import AccountCircleIcon from '@mui/icons-material/AccountCircle';
import CheckBoxIcon from '@mui/icons-material/CheckBox';
import DisabledByDefaultIcon from '@mui/icons-material/DisabledByDefault';
import Stack from '@mui/material/Stack';
import axios from "axios";
import { Link } from 'react-router-dom';

interface Props {
    hostId?: string,
    userId?: string,
    status: string,
}

const NotificationCardHost: FC<Props> = ({ hostId, userId, status }): ReactElement => {
    
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
                    <Grid item>
                    <IconButton 
                        
                        onClick={() => {
                            async function patchData() {
                                // TO DO: const update = await axios.patch(`/api/notifs/host`);

                                const response = await fetch(`/api/notifs/host/`, {
                                    method: "POST",
                                    headers: {
                                        "Content-type": "application/json"
                                    },
                                    body: JSON.stringify({
                                        userId: userId,
                                        status: "accepted",
                                    })
                                });
                            }
                            patchData();
                            
                          }}
                          >
                        <CheckBoxIcon color="success"/>
                    </IconButton>
                    {/* </Grid>
                    <Grid item> */}
                    <IconButton 
                        
                        onClick={() => {
                            async function patchData() {
                                // TO DO: const update = await axios.patch(`/api/notifs/host`);

                                const response = await fetch(`/api/notifs/host/`, {
                                    method: "POST",
                                    headers: {
                                        "Content-type": "application/json"
                                    },
                                    body: JSON.stringify({
                                        userId: userId,
                                        status: "denied",
                                    })
                                });
                            }
                            patchData();
                          }}
                          >
                        <DisabledByDefaultIcon color="error"/>
                    </IconButton>
                    </Grid>
                </Grid>
            </CardContent>
        </Card>
    );
}

export default NotificationCardHost;