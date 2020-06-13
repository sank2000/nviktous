import React, { useEffect, useState } from 'react';
import Grid from '@material-ui/core/Grid';
import { makeStyles } from '@material-ui/core/styles';
import { Typography } from '@material-ui/core';

import axios from "axios";
import Footer from '../nav/Footer';
import FlexContainer from '../containers/FlexContainer';
import SyncLoader from "react-spinners/SyncLoader";
import { useTheme } from '@material-ui/core/styles';
import ItemCard from '../cards/ItemCard';
import Container from '@material-ui/core/Container';


function Loading() {
  const theme = useTheme();
  return (
    <FlexContainer withAppBar>
      <SyncLoader
        size={25}
        margin={10}
        color={theme.palette.primary.main}
        loading={true}
      />
    </FlexContainer>
  );
}

function Empty() {
  return (
    <FlexContainer withAppBar>
      <img src='../images/nodata.png' style={{ maxWidth: '80vw', maxHeight: '50vh', padding: '1rem' }} alt='kfjngdf' />
      <Typography variant="h2">No search result!</Typography>
    </FlexContainer>
  );
}


const useStyles = makeStyles((theme) => ({
  cardGrid: {
    paddingTop: theme.spacing(8),
    paddingBottom: theme.spacing(8),
  }
}));



export default function ({ match }) {
  const [product, setProduct] = useState([]);
  const [loading, setloading] = useState(true);
  const [empty, setEmpty] = useState(true);
  const classes = useStyles();

  useEffect(() => {
    let prms = new URLSearchParams({ search: match.params.search });
    axios.post("/posts/search", prms)
      .then(function (response) {
        setProduct(response.data);
        if (response.data.length !== 0) {
          setEmpty(false);
        }
        setloading(false);
      })
      .catch(function (error) {
        console.log(error);
      });
  }, [match.params.search])



  return (
    <>
      {
        loading ? <Loading /> : empty ? <Empty /> :
          <>
            <Container className={classes.cardGrid} maxWidth="lg">
              <Grid container spacing={4}>
                {product.map((item) => (
                  <ItemCard key={item._id} item={item} />
                ))}
              </Grid>
            </Container>
            <Footer route={true} />
          </ >
      }
    </>
  );
}

