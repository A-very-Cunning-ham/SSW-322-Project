import React, { ReactElement, FC, useState, useEffect } from "react";
import {useNavigate} from 'react-router-dom';
import { Box, Button, Typography, Grid, Card, CardContent, Chip, StepIconClassKey } from "@mui/material";
import Stack from '@mui/material/Stack';
import Tabs from '@mui/material/Tabs';
import Tab from '@mui/material/Tab';
import axios from "axios";
import NotificationCardHost from '../components/NotificationCardHost';
import NotificationCardGuest from '../components/NotificationCardGuest';

interface TabPanelProps {
    children?: React.ReactNode;
    dir?: string;
    index: number;
    value: number;
}

function TabPanel(props: TabPanelProps) {
const { children, value, index, ...other } = props;

return (
    <div
    role="tabpanel"
    hidden={value !== index}
    id={`full-width-tabpanel-${index}`}
    aria-labelledby={`full-width-tab-${index}`}
    {...other}
    >
    {value === index && (
        <Box sx={{ p: 3 }}>
        <Typography>{children}</Typography>
        </Box>
    )}
    </div>
);
}

function a11yProps(index: number) {
return {
    id: `full-width-tab-${index}`,
    'aria-controls': `full-width-tabpanel-${index}`,
};
}

interface resData {
    _id: string
    status: string
}

interface hostNotifs {
    allHostData: resData[]
}

interface guestNotifs {
    allGuestData: resData[]
}

const Notifications: FC<any> = (): ReactElement | null => {
    const navigate = useNavigate();
    const [value, setValue] = React.useState(0);
    const [hostData, setHostData] = React.useState<hostNotifs>({allHostData:[]});
    const [guestData, setGuestData] = React.useState<guestNotifs>({allGuestData:[]});

    const handleChange = (event: React.SyntheticEvent, newValue: number) => {
        setValue(newValue);
    };

    useEffect(() => {
        async function fetchData() {
            const hostNotifs = await axios.get(`/api/notifs/host`);
            setHostData({ allHostData: hostNotifs.data});
        }
        fetchData();
    }, [])

    useEffect(() => {
        async function fetchData() {
            const guestNotifs = await axios.get(`/api/notifs/guest`);
            setGuestData({ allGuestData: guestNotifs.data });
        }
        fetchData();
    }, [])

    if (!axios.get(`api/users/loggedin`)){
        console.log("dolphin")
    }

    // axios.get(`api/users/loggedin`)
    //     .then((response) => {
    //         console.log(response.data);
    //         if (response.data){
    //             navigate("/login");
    //             return null;
    //         }
    //     })

    return(
        <Box sx={{ m:3 }}>
            <Stack spacing={3} alignItems="center">
                <Box sx={{
                    flexGrow: 1,
                    display: 'flex',
                    justifyContent: 'center',
                    alignItems: 'center'
                }}>
                </Box>
                <Typography variant="h3">Notifications</Typography>
                <Tabs value={value} onChange={handleChange} centered>
                    <Tab label="Host" {...a11yProps(0)} />
                    <Tab label="Guest" {...a11yProps(1)} />
                </Tabs>
                <TabPanel value={value} index={0}>
                    <NotificationCardHost userId="User ID" status="Pending"/>
                    {
                        hostData.allHostData.map((p) => (
                            <NotificationCardHost userId={p._id} status={p.status}/>
                        ))
                    }
                    
                </TabPanel>
                <TabPanel value={value} index={1}>
                    <NotificationCardGuest userId="Host ID" status="Pending"/>
                    {
                        guestData.allGuestData.map((p) => (
                            <NotificationCardGuest hostId={p._id} status={p.status}/>
                        ))
                    }
                </TabPanel>
            </Stack>
        </Box>
        );
};

export default Notifications;