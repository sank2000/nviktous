import React, { useEffect, useState } from 'react';
import CssBaseline from '@material-ui/core/CssBaseline';
import Grid from '@material-ui/core/Grid';
import { makeStyles, useTheme } from '@material-ui/core/styles';
import Container from '@material-ui/core/Container';
import axios from "axios";
import { Typography } from '@material-ui/core';

import Footer from '../nav/Footer';
import ItemCard from '../cards/ItemCard';

import FlexContainer from '../containers/FlexContainer';
import SyncLoader from "react-spinners/SyncLoader";

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
      <img src='../images/emptyCart.png' style={{ maxWidth: '80vw', maxHeight: '50vh', padding: '1rem' }} alt='kfjngdf' />
      <Typography variant="h4">No Favourite !</Typography>
    </FlexContainer>
  );
}



const useStyles = makeStyles((theme) => ({
  icon: {
    marginRight: theme.spacing(2),
  },
  heroContent: {
    backgroundColor: theme.palette.background.paper,
    padding: theme.spacing(8, 0, 6),
  },
  heroButtons: {
    marginTop: theme.spacing(4),
  },
  cardGrid: {
    paddingTop: theme.spacing(8),
    paddingBottom: theme.spacing(8),
  }
}));

export default function Home() {
  const classes = useStyles();
  const [post, setPost] = useState([]);
  const [load, setLoad] = useState(true);
  const [empty, setEmpty] = useState(true);

  useEffect(() => {
    console.log("inside useEffect");
    axios.get("/posts/fav")
      .then(function (response) {
        console.log(response.data);
        setPost([...response.data]);
        if (response.data.length !== 0) {
          setEmpty(false);
        }
        setLoad(false);
      })
      .catch(function (error) {
        console.log(error);
      });
  }, []);



  return (
    <React.Fragment>
      <CssBaseline />
      {load ? <Loading /> : empty ? <Empty /> : <>
        <main>
          <Typography variant="h4" style={{ color: "#FF7315", display: "inline-block", marginTop: "30px", marginLeft: "20px" }} >Favourite</Typography>
          <Container className={classes.cardGrid} maxWidth="lg">
            <Grid container spacing={4}>
              {post.map((item) => (
                <Grid item key={item._id} xs={6} sm={4} md={3} lg={3}>
                  <ItemCard key={item._id} item={item} />
                </Grid>
              ))}
            </Grid>
          </Container>
        </main>
        <Footer route={true} />
      </>}
    </React.Fragment>
  );
}
