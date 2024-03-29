import React from 'react';
import { Link } from 'react-router-dom';
import Card from '@material-ui/core/Card';
import CardActions from '@material-ui/core/CardActions';
import CardContent from '@material-ui/core/CardContent';
import CardMedia from '@material-ui/core/CardMedia';
import Grid from '@material-ui/core/Grid';
import Typography from '@material-ui/core/Typography';
import { makeStyles } from '@material-ui/core/styles';
import CardActionArea from '@material-ui/core/CardActionArea';

import AddtoFav from "./AddtoFav";
import AddtoCart from "../app/AddtoCart"

const useStyles = makeStyles((theme) => ({
  cardGrid: {
    paddingTop: theme.spacing(8),
    paddingBottom: theme.spacing(8),
  },
  card: {
    height: '100%',
    display: 'flex',
    flexDirection: 'column',
    transition: 'box-shadow .3s ease-in-out',
    "&:hover": {
      boxShadow: theme.shadows[10]
    }
  },
  cardMedia: {
    paddingTop: '100%',
  },
  cardContent: {
    flexGrow: 1
  },
  priceTag: {
    paddingLeft: theme.spacing(1),
    color: theme.palette.primary.main
  },
  originalPrice: {
    margin: 0,
    marginTop: -theme.spacing(1),
    textDecoration: 'line-through'
  },
  offText: {
    position: 'absolute',
    top: '0px',
    padding: theme.spacing(1)
  }
}));


function ItemCard(props) {
  const classes = useStyles();
  return (
    <Card elevation={2} className={classes.card} style={props.style} >
      <Link className="styled-link" style={{ flexGrow: '1' }} to={`/product/${props.item._id}`}>
        <CardActionArea>
          <CardMedia
            className={classes.cardMedia}
            image={props.item.img[0]}
            title="Image title"
          >
            {
              props.item.discount.per > 0 &&
              <Typography className={classes.offText} component="span" variant="h6">{props.item.discount.per}% OFF</Typography>
            }
          </CardMedia>
          <CardContent className={classes.cardContent}>
            <Typography gutterBottom variant="h5" component="h2">
              {props.item.name.length > 10 ? props.item.name.substring(0, 10) + "..." : props.item.name}
            </Typography>
            <Typography color="textSecondary">
              {props.item.description.length > 25 ? props.item.description.substring(0, 25) + "..." : props.item.description}
            </Typography>
          </CardContent>
        </CardActionArea>
      </Link>
      <CardActions >
        <Grid container justify="space-between">
          <Grid item>
            {
              props.item.discount > 0 &&
              <Typography className={classes.originalPrice} variant="caption" component="p">
                ₹{props.item.price}
              </Typography>
            }
            <Typography className={classes.priceTag} variant="h6" component="h2">
              ₹{props.item.price - (props.item.price * (props.item.discount / 100))}
            </Typography>
          </Grid>
          <Grid item>
            <Grid container id="quick actions">
              {props.item.available && <AddtoCart ico data={props.item} />}
              <AddtoFav id={props.item._id} color="primary" />
            </Grid>
          </Grid>
        </Grid>
      </CardActions>
    </ Card>
  );
}

export default ItemCard;
