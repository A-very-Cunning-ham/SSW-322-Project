import React, { ReactElement, FC } from "react";
import { AppBar, Box, Toolbar, IconButton, Typography, Button } from "@mui/material"
import Menu from '@mui/material/Menu';
import MenuItem from '@mui/material/MenuItem';
import MenuIcon from '@mui/icons-material/Menu';
import AccountCircleIcon from '@mui/icons-material/AccountCircle';
import NotificationsIcon from '@mui/icons-material/Notifications';
//import { Link, useNavigate, Navigate } from 'react-router-dom';

// import Link from '@mui/material/Link';
import { Link } from 'react-router-dom';


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
            {/* <MenuItem component={Link} to={'/'} onClick={handleClose}>Home</MenuItem> */}
            <MenuItem component={Link} to={'/login'} onClick={handleClose}>Login</MenuItem>
            <MenuItem component={Link} to={'/register'} onClick={handleClose}>Register</MenuItem>
            <MenuItem component={Link} to={'/createpost'} onClick={handleClose}>Create Post</MenuItem>
            <MenuItem component={Link} to={'/viewpostdemo'} onClick={handleClose}>View Meal</MenuItem>
          </Menu>

          <Typography variant="h6" component={Link} to={'/'} style={{ textDecoration: 'none' }} sx={{ flexGrow: 1 }} color="textPrimary">
            {title}
          </Typography>
          <IconButton
            component={Link} to={'/notifications'}
            size="large"
            edge="start"
            color="inherit"
            sx={{ mr: 2 }}
          >
            <NotificationsIcon />
          </IconButton>
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
  );
};

export default Header;