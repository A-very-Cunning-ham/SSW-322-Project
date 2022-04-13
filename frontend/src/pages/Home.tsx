import React, {ReactElement, FC} from "react";
import {Box, Typography} from "@mui/material";

//include pagination at the bottom: https://mui.com/material-ui/react-pagination/

const Home: FC<any> = (): ReactElement => {
    return (
        <Box sx={{
            flexGrow: 1,
            backgroundColor: 'whitesmoke',
            display: 'flex',
            justifyContent: 'center',
            alignItems: 'center'
        }}>
            <Typography variant="h3">Home</Typography>
        </Box>
    );
};

export default Home;