import React, { useContext } from "react";
import { Grid, Typography, Paper } from "@material-ui/core";
import { makeStyles, useTheme } from "@material-ui/core/styles";
import useMediaQuery from '@material-ui/core/useMediaQuery';
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
      maxWidth: "100%",
      minHeight: "20vh",
      maxHeight: "25vh",
      objectFit: "cover"
    },
    price: {
      textAlign: 'right',
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
    <Paper elevation={3} className={classes.root}>
      <Grid container justify="space-between">
        <Grid className={classes.imageWrapper} item>
          <img
            src="https://thumbor.forbes.com/thumbor/2441x2240/filters%3Aformat%28jpg%29/https%3A%2F%2Fspecials-images.forbesimg.com%2Fimageserve%2F1176382466%2F0x0.jpg%3FcropX1%3D2439%26cropX2%3D4880%26cropY1%3D307%26cropY2%3D2547"
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
                    <Grid item xs={4}>
                      <Typography variant="h6">Variant</Typography>
                    </Grid>
                    <Grid item xs={4}>
                      <Typography variant="h6">Size : {props.size}</Typography>
                    </Grid>
                    <Grid item xs={4}>
                      <Typography variant="h6">Count : {props.count}</Typography>
                    </Grid>
                  </Grid>
                </Grid>
                <Grid item>
                  <Typography variant="body1">
                    {props.description}
                  </Typography>
                </Grid>
              </Grid>
            </Grid>
            <Grid item className={classes.grow}>
              <Grid container className={classes.grow} direction={useMediaQuery(theme.breakpoints.up('sm')) ? "column" : "row"} justify="space-between" alignItems="stretch">
                <Grid item className={classes.grow}>
                  {
                    props.discount > 0 &&
                    <Typography className={classes.originalPrice} variant="caption" component="p">
                      ₹{props.price}
                    </Typography>
                  }
                  <Typography className={classes.priceTag} variant="h6" component="h2">
                    ₹{props.price - (props.price * (props.discount / 100))}
                  </Typography>
                </Grid>
                <Grid item>
                  <IconButton onClick={handleRemove}>
                    <RemoveShoppingCartTwoToneIcon style={{ color: "red" }} />
                  </IconButton>
                </Grid>
              </Grid>
            </Grid>
          </Grid>
        </Grid>
      </Grid>
    </Paper>
  );
}
