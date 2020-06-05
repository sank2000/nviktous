import React, { useState } from 'react';
import clsx from 'clsx';
import { makeStyles, useTheme } from '@material-ui/core/styles';
import Drawer from '@material-ui/core/Drawer';
import List from '@material-ui/core/List';
import Divider from '@material-ui/core/Divider';
import ListItem from '@material-ui/core/ListItem';
import ListItemIcon from '@material-ui/core/ListItemIcon';
import ListItemText from '@material-ui/core/ListItemText';
import InboxIcon from '@material-ui/icons/MoveToInbox';
import IconButton from '@material-ui/core/IconButton';
import MenuIcon from '@material-ui/icons/Menu';
import HomeWorkTwoToneIcon from '@material-ui/icons/HomeWorkTwoTone';
import { Link } from 'react-router-dom';

export default function TemporaryDrawer() {
  const theme = useTheme();

  const useStyles = makeStyles({
    list: {
      [theme.breakpoints.up('xs')]: {
        width: '75vw',
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
    if (event.type === 'keydown' && (event.key === 'Tab' || event.key === 'Shift')) {
      return;
    }

    setDrawerOpen(open);
  };

  const list = () => (
    <div
      className={clsx(classes.list)}
      role="presentation"
      onClick={toggleDrawer(false)}
      onKeyDown={toggleDrawer(false)}
    >
      <List>
        <Link className="styled-link" to='/'>
          <ListItem button>
            <ListItemIcon><HomeWorkTwoToneIcon /></ListItemIcon>
            <ListItemText primary={'Home'} />
          </ListItem>
        </Link>
        <Link className="styled-link" to='/auth/signin'>
          <ListItem button>
            <ListItemIcon><InboxIcon /></ListItemIcon>
            <ListItemText primary={'Sign In'} />
          </ListItem>
        </Link>
      </List>
      <Divider />
      <List>
        <ListItem button>
          <ListItemIcon><InboxIcon /></ListItemIcon>
          <ListItemText primary={'Home'} />
        </ListItem>
        <ListItem button>
          <ListItemIcon><InboxIcon /></ListItemIcon>
          <ListItemText primary={'Sign In'} />
        </ListItem>
      </List>
    </div>
  );

  return (
    <div>
      <React.Fragment>
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
