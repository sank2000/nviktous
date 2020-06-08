import React, { useEffect, useState } from 'react';
import Button from '@material-ui/core/Button';
import Grid from '@material-ui/core/Grid';
import Typography from '@material-ui/core/Typography';
import { makeStyles, useTheme } from '@material-ui/core/styles';
import Container from '@material-ui/core/Container';
import { deepPurple } from "@material-ui/core/colors";
import AddShoppingCartTwoToneIcon from '@material-ui/icons/AddShoppingCartTwoTone';
import ShareTwoToneIcon from '@material-ui/icons/ShareTwoTone';
import axios from "axios";
import Skeleton from "@material-ui/lab/Skeleton";
import Avatar from "@material-ui/core/Avatar";
import IconButton from '@material-ui/core/IconButton';

import ProductViewer from '../view/ProductViewer';
import Footer from '../nav/Footer';
import ButtonGroup from '@material-ui/core/ButtonGroup';
import AddtoFav from "../cards/AddtoFav";

const useStyles = makeStyles((theme) => ({
  heroContent: {
    backgroundColor: theme.palette.grey[100],
    padding: theme.spacing(6, 0, 6),
  },
  icon: {
    marginRight: theme.spacing(2),
  },
  heroButtons: {
    margin: theme.spacing(4),
  },
  avaRoot:
  {
    display: "flex",
    "& > *": {
      margin: theme.spacing(1)
    }
  },
  ava: {
    color: theme.palette.getContrastText(deepPurple[500]),
    backgroundColor: deepPurple[500],
    fontSize: "14px"
  }
}));

const productImages = [
  {
    small: 'https://images.unsplash.com/photo-1555445091-5a8b655e8a4a?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=500&q=60',
    large: 'https://images.unsplash.com/photo-1555445091-5a8b655e8a4a?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=1575&q=80'
  },
  {
    small: 'https://images.unsplash.com/photo-1555445091-5a8b655e8a4a?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=500&q=60',
    large: 'https://images.unsplash.com/photo-1555445091-5a8b655e8a4a?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=1575&q=80'
  },
  {
    small: 'https://images.unsplash.com/photo-1555445091-5a8b655e8a4a?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=500&q=60',
    large: 'https://images.unsplash.com/photo-1555445091-5a8b655e8a4a?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=1575&q=80'
  }
]

function Size(props) {
  const classes = useStyles();
  return <Avatar className={classes.ava}>{props.size}</Avatar>
}

function Product({ match }) {
  const theme = useTheme();
  const [product, setProduct] = useState({});
  const [loading, setloading] = useState(true);
  const classes = useStyles();


  useEffect(() => {
    let prms = new URLSearchParams({ id: match.params.itemId });
    axios.post("/posts/findone", prms)
      .then(function (response) {
        console.log(response.data);
        setProduct(response.data);
        setloading(false);
      })
      .catch(function (error) {
        console.log(error);
      });
  }, [match.params.itemId])

  return (
    <>
      {loading ? <Grid container>
        <Grid item xs={12} sm={12} md={9} lg={9}>
          <Typography component="h1" variant="h2" color="textPrimary">
            <Skeleton />
          </Typography>
          <Grid container justify="space-between">
            <Grid item xs={6}>
              <Typography variant="h6">
                <Skeleton />
              </Typography>
            </Grid>
            <Grid item xs={6}>
              <Typography variant="h6">
                <Skeleton />
              </Typography>
            </Grid>
            <Grid item xs={6}>
              <Typography variant="h6">
                <Skeleton />
              </Typography>
            </Grid>
            <Grid item xs={6}>
              <Typography variant="h6">
                <Skeleton />
              </Typography>
            </Grid>
          </Grid>
          <Typography variant="h5" color="textSecondary" paragraph>
            <Skeleton />
          </Typography>
        </Grid>
      </Grid>
        : <div className={classes.heroContent}>
          <Container maxWidth="lg">
            <Grid container>
              <Grid item xs={12} sm={12} md={9} lg={9}>
                <Typography component="h1" variant="h2" color="textPrimary">
                  {product.name}
                </Typography>
                <Grid container justify="space-between">
                  <Grid item xs={4}>
                    <Typography variant="h6">Material</Typography>
                  </Grid>
                  <Grid item xs={8}>
                    <Typography variant="h6">In stock</Typography>
                  </Grid>
                  <Grid item xs={4}>
                    <Typography variant="h3">₹{product.price}</Typography>
                  </Grid>
                  <Grid item xs={8}>
                    <Typography variant="h6">Available sizes</Typography>
                    <div className={classes.avaRoot}>
                      {product.size.map((value) => <Size size={value} />)}
                    </div>
                  </Grid>
                </Grid>
                <Typography variant="h5" color="textSecondary" paragraph>
                  {product.description}
                </Typography>
              </Grid>
              <Grid item xs={12} sm={12} md={3} lg={3}>
                <div className={classes.heroButtons}>
                  <Grid container direction={theme.breakpoints.up('sm') ? 'row' : 'column'} spacing={2} justify="center">
                    <Grid item md={12} sm={4} xs={6}>
                      <Button variant="outlined" color="primary" size="large" fullWidth startIcon={<AddShoppingCartTwoToneIcon />}>
                        Add to my cart
                      </Button>
                    </Grid>
                    <Grid item md={12} sm={4} xs={6}>
                      <ButtonGroup color="secondary">
                        <AddtoFav id={match.params.itemId} size="small" color="secondary" />
                        <IconButton><ShareTwoToneIcon /></IconButton>
                      </ButtonGroup>
                    </Grid>
                  </Grid>
                </div>
              </Grid>
            </Grid>
          </Container>
        </div>
      }
      <Container maxWidth="lg">
        <ProductViewer images={productImages} />
      </Container>
      <Footer />
    </>
  );
}

export default Product;
