import React from "react";
import { Grid, Typography, Paper, Button } from "@material-ui/core";
import { makeStyles, useTheme } from "@material-ui/core/styles";
import RemoveShoppingCartTwoToneIcon from '@material-ui/icons/RemoveShoppingCartTwoTone';

export default function MediaCard() {
  const theme = useTheme();
  const useStyles = makeStyles({
    root: {
      transition: 'box-shadow .3s ease-in-out',
      '&:hover': {
        boxShadow: theme.shadows[8],
      }
    },
    paddingContent: {
      padding: theme.spacing(1)
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

  return (
    <Paper elevation={3} className={classes.root}>
      <Grid container justify="space-between">
        <Grid className={classes.imageWrapper} item>
          <img
            src="https://thumbor.forbes.com/thumbor/2441x2240/filters%3Aformat%28jpg%29/https%3A%2F%2Fspecials-images.forbesimg.com%2Fimageserve%2F1176382466%2F0x0.jpg%3FcropX1%3D2439%26cropX2%3D4880%26cropY1%3D307%26cropY2%3D2547"
            alt="fuck"
            className={classes.image}
          />
        </Grid>
        <Grid item className={classes.itemDesc}>
          <Grid container className={classes.paddingContent} direction="column">
            <Grid item>
              <Typography variant="h4">Item name</Typography>
            </Grid>
            <Grid item>
              <Grid container direction="row">
                <Grid item xs={4}>
                  <Typography variant="h6">Variant</Typography>
                </Grid>
                <Grid item xs={4}>
                  <Typography variant="h6">Variant</Typography>
                </Grid>
                <Grid item xs={4}>
                  <Typography variant="h6">Variant</Typography>
                </Grid>
              </Grid>
            </Grid>
            <Grid item xs={12}>
              <Typography variant="body1">
                Fine jersey Knit,100% bio washnteed
              </Typography>
            </Grid>
          </Grid>
        </Grid>
        <Grid className={classes.paddingContent} item>
          <Grid container direction="column"
            justify="space-between"
            alignItems="flex-end">
            <Grid item>
              <Typography variant="h5">$400</Typography>
            </Grid>
            <Grid item>
              <Button variant="outlined" color="primary" size="medium" startIcon={<RemoveShoppingCartTwoToneIcon />}>
                Remove
              </Button>
            </Grid>
            <Grid item>
              <Button variant="outlined" color="primary" size="medium" startIcon={<RemoveShoppingCartTwoToneIcon />}>
                Buy Now
              </Button>
            </Grid>
          </Grid>
        </Grid>
      </Grid>
    </Paper>
  );
}
