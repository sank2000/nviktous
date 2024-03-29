import React, { useContext } from "react";
import { Grid, Typography, Paper } from "@material-ui/core";
import { makeStyles, useTheme } from "@material-ui/core/styles";
import RemoveShoppingCartTwoToneIcon from '@material-ui/icons/RemoveShoppingCartTwoTone';
import IconButton from '@material-ui/core/IconButton';
import Authapi from "../auth/AuthApi";
import axios from "axios";


export default function MediaCard(props) {
  const theme = useTheme();
  const { data, setData } = useContext(Authapi);
  const useStyles = makeStyles({
    root: {
      transition: 'box-shadow .3s ease-in-out',
      '&:hover': {
        boxShadow: theme.shadows[8],
      }
    },
    grow: {
      flexGrow: 1
    },
    imageWrapper: {
      padding: "0px",
      margin: "0px"
    },
    image: {
      [theme.breakpoints.down("sm")]: {
        maxWidth: "100%",
        minHeight: "20vh",
        maxHeight: "25vh",
        objectFit: "cover",
        marginTop: "10px",
        marginLeft: "0px"
      },
      [theme.breakpoints.between('sm', 'md')]: {
        maxWidth: "100%",
        minHeight: "20vh",
        maxHeight: "25vh",
        objectFit: "cover",
        marginTop: "10px",
        marginLeft: "50px"
      },
      [theme.breakpoints.between('md', 'lg')]: {
        maxWidth: "100%",
        minHeight: "20vh",
        maxHeight: "25vh",
        objectFit: "cover",
        marginTop: "10px",
        marginLeft: "20px"
      },
      [theme.breakpoints.up("lg")]: {
        maxWidth: "100%",
        minHeight: "20vh",
        maxHeight: "25vh",
        objectFit: "cover",
        marginTop: "10px",
        marginLeft: "10px"
      }
    },
    price: {
      textAlign: 'right',
    },
    priceTag: {
      paddingLeft: theme.spacing(1),
      color: theme.palette.primary.main
    },
    originalPrice: {
      textDecoration: 'line-through'
    },
    inner: {
      flexGrow: 1,
      padding: theme.spacing(1)
    }
  });
  const classes = useStyles();

  function handleRemove() {
    let prms = new URLSearchParams({ id: props.id });
    axios.post("/user/remCart", prms)
      .then(function (response) {
        console.log({ ...data, user: response.data });
        setData({ ...data, user: response.data });
      })
      .catch(function (error) {
        console.log(error);
      });
  }

  return (
    <Paper elevation={3} className={classes.root} style={{ position: "relative", marginBottom: "25px" }}>
      <div
        style={{
          position: "absolute",
          right: 0,
          paddingRight: "10px",
          paddingTop: "15px"
        }}
      >
        {
          props.discount > 0 &&
          <Typography className={classes.originalPrice} variant="p" component="p">
            ₹{props.price}
          </Typography>
        }
        <Typography className={classes.priceTag} variant="h5" component="h2">
          ₹{props.price - (props.price * (props.discount / 100))}
        </Typography>
      </div>
      <Grid container justify="space-between">
        <Grid className={classes.imageWrapper} item>
          <img
            src={props.img[0]}
            alt="img"
            className={classes.image}
          />
        </Grid>
        <Grid item className={classes.inner}>
          <Grid container alignItems="stretch">
            <Grid item className={classes.grow} >
              <Grid container direction="column">
                <Typography variant="h4">{props.name}</Typography>
                <Grid item>
                  <Grid container direction="row">
                    <Grid item xs={12}>
                      <Typography variant="h6" color="textSecondary">{props.category}</Typography>
                    </Grid>
                    <Grid item xs={6}>
                      <Typography variant="h6">Size : {props.size}</Typography>
                    </Grid>
                    <Grid item xs={6}>
                      <Typography variant="h6" color="secondary">Count : {props.count}</Typography>
                    </Grid>
                  </Grid>
                </Grid>
                <Grid item>
                  <Typography variant="body1" color="textSecondary">
                    {props.description}
                  </Typography>
                </Grid>
              </Grid>
            </Grid>
          </Grid>
        </Grid>
      </Grid>
      <br />
      <IconButton
        onClick={handleRemove}
        style={{
          position: "absolute",
          right: 0,
          bottom: "-10px",
          paddingRight: "10px",
          paddingBottom: "20px"
        }}
      >
        <RemoveShoppingCartTwoToneIcon style={{ color: "red" }} />
      </IconButton>
    </Paper>
  );
}
