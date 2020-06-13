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
          <Grid
            container
            direction="row"
            justify="center"
            alignItems="center"
          >
            <Grid item>
              <Typography variant="body1">Contact</Typography>
            </Grid>
            <Grid item>
              <IconButton href="#" className={classes.btn}>
                <InstagramIcon />
              </IconButton>
              <IconButton href="#" className={classes.btn}>
                <FacebookIcon />
              </IconButton>
              <IconButton href="#" className={classes.btn}>
                <TwitterIcon />
              </IconButton>
              <IconButton href="#" className={classes.btn}>
                <MailOutlineIcon />
              </IconButton>
            </Grid>
          </Grid>
          <Copyright />
        </Container>
      </footer>
    </div>
  );
}


// href = {`mailto:${props.dev.email}`}