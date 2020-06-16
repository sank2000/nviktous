import React, { useContext, useState } from 'react';

import AppBar from '@material-ui/core/AppBar';
import Badge from '@material-ui/core/Badge';
import IconButton from '@material-ui/core/IconButton';
import Menu from '@material-ui/core/Menu';
import MenuItem from '@material-ui/core/MenuItem';
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';
import { fade, makeStyles } from '@material-ui/core/styles';
import FavoriteTwoToneIcon from '@material-ui/icons/FavoriteTwoTone';
import AccountCircle from '@material-ui/icons/AccountCircleTwoTone';
import MoreIcon from '@material-ui/icons/MoreVert';
import AddShoppingCartTwoToneIcon from '@material-ui/icons/AddShoppingCartTwoTone';
import axios from "axios";
import Drawer from './Drawer';
import Authapi from "../auth/AuthApi";
import Sign from "../auth/SignIn";
import PermIdentityTwoToneIcon from '@material-ui/icons/PermIdentityTwoTone';
import ExitToAppTwoToneIcon from '@material-ui/icons/ExitToAppTwoTone';
import LockOpenTwoToneIcon from '@material-ui/icons/LockOpenTwoTone';
import LocalMallTwoToneIcon from '@material-ui/icons/LocalMallTwoTone';
import { Link } from 'react-router-dom';

const useStyles = makeStyles((theme) => ({
  grow: {
    flexGrow: 1,
  },
  menuButton: {
    marginRight: theme.spacing(2),
  },
  title: {
    display: 'none',
    [theme.breakpoints.up('sm')]: {
      display: 'block',
    },
  },
  search: {
    position: 'relative',
    borderRadius: theme.shape.borderRadius,
    backgroundColor: fade(theme.palette.common.white, 0.15),
    '&:hover': {
      backgroundColor: fade(theme.palette.common.white, 0.25),
    },
    marginRight: theme.spacing(2),
    marginLeft: 0,
    width: '100%',
    [theme.breakpoints.up('sm')]: {
      marginLeft: theme.spacing(3),
      width: 'auto',
    },
  },
  searchIcon: {
    padding: theme.spacing(0, 2),
    height: '100%',
    position: 'absolute',
    pointerEvents: 'none',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
  },
  inputRoot: {
    color: 'inherit',
  },
  inputInput: {
    padding: theme.spacing(1, 1, 1, 0),
    // vertical padding + font size from searchIcon
    paddingLeft: `calc(1em + ${theme.spacing(4)}px)`,
    transition: theme.transitions.create('width'),
    width: '100%',
    [theme.breakpoints.up('md')]: {
      width: '20ch',
    },
  },
  sectionDesktop: {
    display: 'none',
    [theme.breakpoints.up('md')]: {
      display: 'flex',
    },
  },
  sectionMobile: {
    display: 'flex',
    [theme.breakpoints.up('md')]: {
      display: 'none',
    },
  },
}));


export default function NavBar() {
  const { data, setData } = useContext(Authapi);
  const classes = useStyles();
  const [anchorEl, setAnchorEl] = React.useState(null);
  const [mobileMoreAnchorEl, setMobileMoreAnchorEl] = React.useState(null);
  const [enable, setEnable] = useState(false);
  const isMenuOpen = Boolean(anchorEl);
  const isMobileMenuOpen = Boolean(mobileMoreAnchorEl);


  const handleProfileMenuOpen = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleMobileMenuClose = () => {
    setMobileMoreAnchorEl(null);
  };

  const handleMenuClose = () => {
    setAnchorEl(null);
    handleMobileMenuClose();
  };

  const handleMobileMenuOpen = (event) => {
    setMobileMoreAnchorEl(event.currentTarget);
  };


  const handleLogout = async () => {
    axios.get("/auth/logout")
      .then(function (response) {
        setData(response.data);
        window.open("/", "_self");
      })
      .catch(function (error) {
        console.log(error);
      });
  };


  const menuId = 'primary-search-account-menu';
  const renderMenu = (
    <Menu
      anchorEl={anchorEl}
      anchorOrigin={{ vertical: 'top', horizontal: 'right' }}
      id={menuId}
      keepMounted
      transformOrigin={{ vertical: 'top', horizontal: 'right' }}
      open={isMenuOpen}
      onClose={handleMenuClose}
    >
      {data.auth ? <MenuItem onClick={handleMenuClose}><PermIdentityTwoToneIcon />&nbsp;{data.user.name}</MenuItem> : <MenuItem onClick={handleMenuClose}><LocalMallTwoToneIcon />&nbsp;Welcome</MenuItem>}
      {data.auth ? <MenuItem onClick={handleLogout}><ExitToAppTwoToneIcon />&nbsp;Logout</MenuItem> : <MenuItem onClick={() => setEnable(true)}><LockOpenTwoToneIcon />&nbsp;Sign In / Up</MenuItem>}
    </Menu>
  );

  const mobileMenuId = 'primary-search-account-menu-mobile';
  const renderMobileMenu = (
    <Menu
      anchorEl={mobileMoreAnchorEl}
      anchorOrigin={{ vertical: 'top', horizontal: 'right' }}
      id={mobileMenuId}
      keepMounted
      transformOrigin={{ vertical: 'top', horizontal: 'right' }}
      open={isMobileMenuOpen}
      onClose={handleMobileMenuClose}
    >
      <Link className="styled-link" to='/favourite'>
        <MenuItem>
          <IconButton aria-label="Favorites" color="secondary">
            <FavoriteTwoToneIcon />
          </IconButton>
          <p>Favorites</p>
        </MenuItem>
      </Link>
      <Link className="styled-link" to='/cart'>
        <MenuItem>
          <IconButton aria-label="1 item in your cart" color="secondary">
            {data.auth ? <Badge badgeContent={data.user.card.length} color="secondary">
              <AddShoppingCartTwoToneIcon />
            </Badge> : <AddShoppingCartTwoToneIcon />}
          </IconButton>
          <p>My Cart</p>
        </MenuItem>
      </Link>
      <MenuItem onClick={handleProfileMenuOpen}>
        <IconButton
          aria-label="account of current user"
          aria-controls="primary-search-account-menu"
          aria-haspopup="true"
          color="secondary"
        >
          <AccountCircle />
        </IconButton>
        <p>Profile</p>
      </MenuItem>
    </Menu>
  );

  return (
    <div className={classes.grow}>
      <AppBar elevation={3} position="fixed" style={{ backgroundColor: "#212529", color: "white" }}>
        <Toolbar>
          <Drawer />
          <Typography variant="h6" noWrap>
            <span style={{ color: "#FF7315" }}>NVIK</span>TOUS
          </Typography>
          <div className={classes.grow} />
          <div className={classes.sectionDesktop}>
            <Link className="styled-link" to='/favourite'>
              <IconButton aria-label="My wishlist" color="inherit">
                <FavoriteTwoToneIcon />
              </IconButton>
            </Link>
            <Link className="styled-link" to='/cart'>
              <IconButton color="inherit">
                {data.auth ? <Badge badgeContent={data.user.card.length} color="secondary">
                  <AddShoppingCartTwoToneIcon />
                </Badge> : <AddShoppingCartTwoToneIcon />}
              </IconButton>
            </Link>
            <IconButton
              edge="end"
              aria-label="account of current user"
              aria-controls={menuId}
              aria-haspopup="true"
              onClick={handleProfileMenuOpen}
              color="inherit"
            >
              <AccountCircle />
            </IconButton>
          </div>
          <div className={classes.sectionMobile}>
            <IconButton
              aria-label="show more"
              aria-controls={mobileMenuId}
              aria-haspopup="true"
              onClick={handleMobileMenuOpen}
              color="inherit"
            >
              <MoreIcon />
            </IconButton>
          </div>
        </Toolbar>
      </AppBar>
      {renderMobileMenu}
      {renderMenu}
      <Toolbar />
      {enable && <Sign setState={setEnable} />}
    </div >
  );
}
