import React, { useEffect, useState } from 'react';
import CssBaseline from '@material-ui/core/CssBaseline';
import Grid from '@material-ui/core/Grid';
import { makeStyles } from '@material-ui/core/styles';
import Container from '@material-ui/core/Container';
import axios from "axios";

import Footer from '../nav/Footer';
import ItemCard from '../cards/ItemCard';

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

  useEffect(() => {
    console.log("inside useEffect");
    axios.get("/posts/fav")
      .then(function (response) {
        console.log(response.data);
        setPost([...response.data]);
      })
      .catch(function (error) {
        console.log(error);
      });
  }, []);



  return (
    <React.Fragment>
      <CssBaseline />
      <main>
        <Container className={classes.cardGrid} maxWidth="lg">
          <Grid container spacing={4}>
            {post.map((item) => (
              <ItemCard key={item._id} item={item} />
            ))}
          </Grid>
        </Container>
      </main>
      <Footer />
    </React.Fragment>
  );
}