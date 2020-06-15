import React from 'react';
import CssBaseline from '@material-ui/core/CssBaseline';
import Typography from '@material-ui/core/Typography';
import { makeStyles } from '@material-ui/core/styles';
import Container from '@material-ui/core/Container';
import Grid from "@material-ui/core/Grid";

import Copyright from '../auxillary/CopyrightNote';

import FooterTop from "./FooterTop";

import IconButton from "@material-ui/core/IconButton";
import TwitterIcon from "@material-ui/icons/Twitter";
import MailOutlineIcon from '@material-ui/icons/MailOutline';
import InstagramIcon from '@material-ui/icons/Instagram';
import FacebookIcon from "@material-ui/icons/Facebook";

import FavoriteTwoToneIcon from '@material-ui/icons/FavoriteTwoTone';
import AddShoppingCartTwoToneIcon from '@material-ui/icons/AddShoppingCartTwoTone';
import AssignmentIcon from '@material-ui/icons/Assignment';

const useStyles = makeStyles((theme) => ({
  root: {
    display: 'flex',
    flexDirection: 'column'
  },
  main: {
    marginTop: theme.spacing(8),
    marginBottom: theme.spacing(2),
  },
  footer: {
    padding: theme.spacing(3, 2),
    marginTop: 'auto',
    backgroundColor:
      theme.palette.type === 'light' ? theme.palette.grey[200] : theme.palette.grey[800],
  },
  btn:
  {
    fontSize: "18px",
    "&:hover": {
      color: theme.palette.primary.main
    }
  },
  hvr:
  {
    "&:hover": {
      color: theme.palette.primary.main
    }
  }
}));

export default function StickyFooter(props) {
  const classes = useStyles();

  return (
    <div className={classes.root}>
      <CssBaseline />
      <FooterTop route={props.route} />
      <footer className={classes.footer}>
        <Container maxWidth="md">
          <Grid container>
            <Grid item xl={12} sm={4}>
              <Typography variant="h6" style={{ marginBottom: "20px", marginRight: "50px" }}>Category </Typography>
              <Grid container direction="column" style={{ marginLeft: "20px" }} spacing={5}>
                <Typography variant="subtitle1">Mens apparel </Typography>
                <Typography variant="subtitle1">Womens apparel </Typography>
                <Typography variant="subtitle1">Children apparel </Typography>
                <Typography variant="subtitle1">Laptop bags </Typography>
                <Typography variant="subtitle1" style={{ marginBottom: "20px" }}>other </Typography>
              </Grid>
            </Grid>
            <Grid item xl={12} sm={4}>
              <Typography variant="h6">Follow us : </Typography>
              <Grid container direction="column" justify="flex-start" alignItems="flex-start">
                <IconButton href="#" className={classes.btn}>
                  <InstagramIcon /> Instagram
                </IconButton>
                <IconButton href="#" className={classes.btn}>
                  <FacebookIcon /> Facebook
                </IconButton>
                <IconButton href="#" className={classes.btn}>
                  <TwitterIcon /> Twitter
                </IconButton>
                <IconButton href="#" className={classes.btn}>
                  <MailOutlineIcon /> Mail
                </IconButton>
              </Grid>
            </Grid>
            <Grid item xl={12} sm={4}>
              <Typography variant="h6">Follow us : </Typography>
              <Grid container direction="column" justify="flex-start" alignItems="flex-start">
                <IconButton href="/favourite" className={classes.btn} style={{ paddingTop: "10px" }}>
                  <FavoriteTwoToneIcon /> My Favourite
                </IconButton>
                <IconButton href="/cart" className={classes.btn}>
                  <AddShoppingCartTwoToneIcon /> My cart
                </IconButton>
                <IconButton href="/myorder" className={classes.btn}>
                  <AssignmentIcon /> My order
                </IconButton>
              </Grid>
            </Grid>
          </Grid>
          <Copyright />
        </Container>
      </footer>
    </div>
  );
}


// href = {`mailto:${props.dev.email}`}