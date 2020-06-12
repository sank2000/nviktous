import React, { useEffect, useState } from 'react';
import CssBaseline from '@material-ui/core/CssBaseline';
import Grid from '@material-ui/core/Grid';
import { makeStyles, useTheme } from '@material-ui/core/styles';
import Container from '@material-ui/core/Container';
import axios from "axios";

import ShowCase from '../view/Carousel';
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

  useEffect(() => {
    axios.get("/posts")
      .then(function (response) {
        setPost([...response.data]);
        setLoad(false);
      })
      .catch(function (error) {
        console.log(error);
      });
  }, []);



  return (
    <React.Fragment>
      <CssBaseline />
      <ShowCase />
      {load ? <Loading /> : <>
        <Container className={classes.cardGrid} maxWidth="lg">
          <Grid container spacing={4}>
            {post.map((item) => (
              <ItemCard key={item._id} item={item} />
            ))}
          </Grid>
        </Container>
        <Footer />
      </>}
    </React.Fragment>
  );
}
