import React, { useState, useContext } from 'react';
import clsx from 'clsx';
import { makeStyles, useTheme } from '@material-ui/core/styles';
import Drawer from '@material-ui/core/Drawer';
import List from '@material-ui/core/List';
import Divider from '@material-ui/core/Divider';
import ListItem from '@material-ui/core/ListItem';
import ListItemIcon from '@material-ui/core/ListItemIcon';
import ListItemText from '@material-ui/core/ListItemText';
import IconButton from '@material-ui/core/IconButton';
import MenuIcon from '@material-ui/icons/Menu';
import HomeWorkTwoToneIcon from '@material-ui/icons/HomeWorkTwoTone';
import FavoriteTwoToneIcon from '@material-ui/icons/FavoriteTwoTone';
import AddShoppingCartTwoToneIcon from '@material-ui/icons/AddShoppingCartTwoTone';
import ExitToAppTwoToneIcon from '@material-ui/icons/ExitToAppTwoTone';
import LockOpenTwoToneIcon from '@material-ui/icons/LockOpenTwoTone';
import { Link } from 'react-router-dom';
import AssignmentIcon from '@material-ui/icons/Assignment';

import InputBase from '@material-ui/core/InputBase';
import InputAdornment from "@material-ui/core/InputAdornment";
import SearchOutlinedIcon from "@material-ui/icons/SearchOutlined";
import ClearOutlinedIcon from "@material-ui/icons/ClearOutlined";


import Sign from "../auth/SignIn";
import Authapi from "../auth/AuthApi";
import axios from "axios";

export default function TemporaryDrawer() {
  const theme = useTheme();
  const [enable, setEnable] = useState(false);
  const { data, setData } = useContext(Authapi);
  const [search, setSearch] = useState("");

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

  const useStyles = makeStyles({
    list: {
      [theme.breakpoints.up('xs')]: {
        width: '60vw',
      },
      [theme.breakpoints.up('sm')]: {
        width: '35vw',
      }, [theme.breakpoints.up('md')]: {
        width: '25vw',
      }, [theme.breakpoints.up('lg')]: {
        width: 250,
      },
    },
    fullList: {
      width: 'auto',
    },
  });
  const classes = useStyles();
  const [drawerOpen, setDrawerOpen] = useState(false);

  const toggleDrawer = (open) => (event) => {
    setSearch("");
    if (event.type === 'keydown' && (event.key === 'Tab' || event.key === 'Shift')) {
      return;
    }

    setDrawerOpen(open);
  };


  function SearchText(event) {
    setSearch(event.target.value);
  }

  const handleSearch = () => {
    window.open(`/search/${search}`, "_self");
  }

  function keyEntered(event) {
    if (event.which === 13 || event.keyCode === 13) {
      handleSearch();
      return false;
    }
    return true;
  };

  const list = () => (
    <>
      <List onClick={toggleDrawer(false)} onKeyDown={toggleDrawer(false)} role="presentation" className={clsx(classes.list)}>
        <Link className="styled-link" to='/'>
          <ListItem button>
            <ListItemIcon><HomeWorkTwoToneIcon /></ListItemIcon>
            <ListItemText primary={'Home'} />
          </ListItem>
        </Link>
      </List>
      <Divider />
      <InputBase
        placeholder="search ..."
        value={search}
        onChange={SearchText}
        onKeyPress={keyEntered}
        style={{ height: "50px", width: "300px" }}
        startAdornment={
          <InputAdornment position="start">
            <IconButton size="small" onClick={handleSearch}>
              <SearchOutlinedIcon />
            </IconButton>
          </InputAdornment>
        }
        endAdornment={
          <InputAdornment position="end">
            <IconButton size="small" onClick={toggleDrawer(false)}>
              <ClearOutlinedIcon />
            </IconButton>
          </InputAdornment>
        }
      />
      <Divider />
      <List onClick={toggleDrawer(false)} onKeyDown={toggleDrawer(false)} role="presentation" className={clsx(classes.list)}>
        <Link className="styled-link" to='/favourite'>
          <ListItem button>
            <ListItemIcon><FavoriteTwoToneIcon /></ListItemIcon>
            <ListItemText primary={'My Favourite'} />
          </ListItem>
        </Link>
        <Link className="styled-link" to='/cart'>
          <ListItem button>
            <ListItemIcon><AddShoppingCartTwoToneIcon /></ListItemIcon>
            <ListItemText primary={'My Cart'} />
          </ListItem>
        </Link>
        <Link className="styled-link" to='/myorder'>
          <ListItem button>
            <ListItemIcon><AssignmentIcon /></ListItemIcon>
            <ListItemText primary={'My Order'} />
          </ListItem>
        </Link>
      </List>
      <Divider />
      <List onClick={toggleDrawer(false)} onKeyDown={toggleDrawer(false)} role="presentation" className={clsx(classes.list)}>
        {!data.auth ? <ListItem button onClick={() => setEnable(true)}>
          <ListItemIcon><LockOpenTwoToneIcon /></ListItemIcon>
          <ListItemText primary={'Sign In / Up'} />
        </ListItem> : <ListItem button onClick={handleLogout}>
            <ListItemIcon><ExitToAppTwoToneIcon /></ListItemIcon>
            <ListItemText primary={'Log out'} />
          </ListItem>}
      </List>
    </>
  );

  return (
    <div>
      <React.Fragment>
        {enable && <Sign setState={setEnable} />}
        <IconButton
          edge="start"
          className={classes.menuButton}
          color="inherit"
          aria-label="open drawer"
          onClick={toggleDrawer(true)}
        >
          <MenuIcon />
        </IconButton>
        <Drawer anchor={'left'} open={drawerOpen} onClose={toggleDrawer(false)}>
          {list()}
        </Drawer>
      </React.Fragment>
    </div>
  );
}
