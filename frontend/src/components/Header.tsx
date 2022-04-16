import React, { ReactElement, FC } from "react";
import { AppBar, Box, Toolbar, IconButton, Typography, Button } from "@mui/material"
import MenuIcon from '@mui/icons-material/Menu';

import Menu from '@mui/material/Menu';
import MenuItem from '@mui/material/MenuItem';
import AccountCircleIcon from '@mui/icons-material/AccountCircle';
//import { Link, useNavigate, Navigate } from 'react-router-dom';
import Link from '@mui/material/Link';

interface Props {
  title: String
}

const settings = ['Profile', 'Account', 'Logout'];

const Header: FC<Props> = ({ title }): ReactElement => {
  
  const [anchorEl, setAnchorEl] = React.useState<null | HTMLElement>(null); //hooks for displaying menu items
  const open = Boolean(anchorEl);
  const [anchorEl2, setAnchorEl2] = React.useState<null | HTMLElement>(null); //duplicate hook for account icon menu
  const open2 = Boolean(anchorEl2);

  const handleClick = (event: React.MouseEvent<HTMLButtonElement>) => {
    setAnchorEl(event.currentTarget);
  };
  const handleClose = () => {
    setAnchorEl(null);
  };
  
  //separate event handlers required to have two menus on the same component, otherwise both menus open on the same click
  //other option is to extract the code for menu buttons to a separate component
  const handleClick2 = (event: React.MouseEvent<HTMLButtonElement>) => {
    setAnchorEl2(event.currentTarget);
  };
  const handleClose2 = () => {
    setAnchorEl2(null);
  };


  return (
    <Box sx={{ flexGrow: 1 }}>
      <AppBar position="static">
        <Toolbar>
          <IconButton
            size="large"
            edge="start"
            color="inherit"
            aria-label="menu"
            sx={{ mr: 2 }}
            aria-controls={open ? 'basic-menu' : undefined}
            aria-haspopup="true"
            aria-expanded={open ? 'true' : undefined}
            onClick={handleClick}
          >
            <MenuIcon />
          </IconButton>
          <Menu
            id="basic-menu"
            anchorEl={anchorEl} 
            open={open}
            onClose={handleClose}
            MenuListProps={{
              'aria-labelledby': 'basic-button',
            }}
          >
            <MenuItem onClick={handleClose}><Link href='/' color="inherit" underline="none">Home</Link></MenuItem>
            <MenuItem onClick={handleClose}><Link href='/login' color="inherit" underline="none">Login</Link></MenuItem>
            <MenuItem onClick={handleClose}><Link href='/register' color="inherit" underline="none">Register</Link></MenuItem>
            <MenuItem onClick={handleClose}><Link href='/createpost' color="inherit" underline="none">Create Post</Link></MenuItem>
            <MenuItem onClick={handleClose}><Link href='/viewpost/1' color="inherit" underline="none">View Meal</Link></MenuItem>
          </Menu>

          <Typography variant="h6" component="div" sx={{ flexGrow: 1 }}>
            {title}
          </Typography>
          <IconButton
            size="large"
            edge="start"
            color="inherit"
            aria-label="menu"
            sx={{ mr: 2 }}
            aria-controls={open2 ? 'account-menu' : undefined}
            aria-haspopup="true"
            aria-expanded={open2 ? 'true' : undefined}
            onClick={handleClick2}
          >
            <AccountCircleIcon />
          </IconButton>
          <Menu
            id="account-menu"
            anchorEl={anchorEl2}
            open={open2}
            onClose={handleClose2}
            MenuListProps={{
              'aria-labelledby': 'basic-button',
            }}>
            {settings.map((setting) => (
                <MenuItem key={setting} onClick={handleClose2}>
                  <Typography textAlign="center">{setting}</Typography>
                </MenuItem>
              ))}
          </Menu>

        </Toolbar>
      </AppBar>
    </Box>
  );
};

export default Header;