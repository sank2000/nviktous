import React, { useContext } from "react";
import { Grid, Typography, Paper, Button } from "@material-ui/core";
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
      padding: theme.spacing(2),
      '&:hover': {
        boxShadow: theme.shadows[8],
      }
    },
    itemDesc: {
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
    }
  });
  const classes = useStyles();

  function hanldeRemove() {
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
      <Grid container justify="space-between" spacing={2}>
        <Grid className={classes.imageWrapper} item>
          <img
            src="https://thumbor.forbes.com/thumbor/2441x2240/filters%3Aformat%28jpg%29/https%3A%2F%2Fspecials-images.forbesimg.com%2Fimageserve%2F1176382466%2F0x0.jpg%3FcropX1%3D2439%26cropX2%3D4880%26cropY1%3D307%26cropY2%3D2547"
            alt="image"
            className={classes.image}
          />
        </Grid>
        <Grid item className={classes.itemDesc}>
          <Grid container>
            <Grid item className={classes.itemDesc} >
              <Grid container direction="column">
                <Grid item>
                  <Typography variant="h4">{props.name}</Typography>
                </Grid>
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
            <Grid item>
              <Typography variant="h5">${props.price}</Typography>
            </Grid>
            <Grid item>
              <IconButton onClick={hanldeRemove}>
                <RemoveShoppingCartTwoToneIcon style={{ color: "red" }} />
              </IconButton>
            </Grid>
          </Grid>
        </Grid>
      </Grid>
    </Paper>
  );
}
