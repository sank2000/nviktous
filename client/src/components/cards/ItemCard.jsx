import React from 'react';
import { Link } from 'react-router-dom';
import IconButton from '@material-ui/core/IconButton';
import Card from '@material-ui/core/Card';
import CardActions from '@material-ui/core/CardActions';
import CardContent from '@material-ui/core/CardContent';
import CardMedia from '@material-ui/core/CardMedia';
import Grid from '@material-ui/core/Grid';
import Typography from '@material-ui/core/Typography';
import { makeStyles } from '@material-ui/core/styles';
import FavoriteTwoToneIcon from '@material-ui/icons/FavoriteTwoTone';
import AddShoppingCartTwoToneIcon from '@material-ui/icons/AddShoppingCartTwoTone';
import CardActionArea from '@material-ui/core/CardActionArea';

const useStyles = makeStyles((theme) => ({
  cardGrid: {
    paddingTop: theme.spacing(8),
    paddingBottom: theme.spacing(8),
  },
  card: {
    height: '100%',
    display: 'flex',
    flexDirection: 'column',
    "&:hover": {
      boxShadow: theme.shadows[5]
    }
  },
  cardMedia: {
    paddingTop: '100%',
  },
  cardContent: {
    flexGrow: 1,
  },
  cardActions: {
    padding: theme.spacing(1),
  },
  priceTag: {
    paddingLeft: theme.spacing(1)
  }
}));


function ItemCard(props) {
  const classes = useStyles();
  return (
    <Grid item xs={6} sm={4} md={3} lg={3}>
      <Card elevation={2} className={classes.card}>
        <Link className="styled-link" to='/product'>
          <CardActionArea>
            <CardMedia
              className={classes.cardMedia}
              image="https://images.unsplash.com/photo-1583743814966-8936f5b7be1a?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=334&q=80"
              title="Image title"
            />
            <CardContent className={classes.cardContent}>
              <Typography gutterBottom variant="h5" component="h2">
                Item name
              </Typography>
              <Typography>
                About the product
          </Typography>
            </CardContent>
          </CardActionArea>
        </Link>
        <CardActions >
          <Grid container justify="space-between">
            <Grid item>
              <Typography className={classes.priceTag} variant="h6" component="h2">
                $3.99
              </Typography>
            </Grid>
            <Grid item>
              <Grid container id="quick actions">
                <IconButton className={classes.cardActions} size="small" color="primary">
                  <AddShoppingCartTwoToneIcon />
                </IconButton>
                <IconButton className={classes.cardActions} size="small" color="primary">
                  <FavoriteTwoToneIcon />
                </IconButton>
              </Grid>
            </Grid>
          </Grid>
        </CardActions>
      </Card>
    </Grid>
  );
}

export default ItemCard;