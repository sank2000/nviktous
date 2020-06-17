import React, { useState } from 'react';
import { makeStyles, useTheme } from '@material-ui/core/styles';
import { Grid, Container, Typography } from '@material-ui/core';
import Button from "@material-ui/core/Button";

import Buy from "../Buy/main";

function CartFoot(props) {
  const theme = useTheme();
  const [detail] = useState(props.detail);
  const [buy, setBuy] = useState(false);

  const useStyles = makeStyles({
    root: {
      position: 'fixed',
      left: '0',
      bottom: '0',
      width: '100%',
      backgroundColor: theme.palette.grey[200],
      padding: theme.spacing(2),
    },
    footContainer: {
      padding: theme.spacing(2)
    },
    grow: {
      flexGrow: 1,
    }
  });
  const classes = useStyles();
  return (
    <div className={classes.root}>
      {buy && <Buy setState={setBuy} data={props} />}
      <Container maxWidth="md" classes={classes.footContainer}>
        <Grid container
          direction="column"
          justify="center"
          alignItems="stretch"
        >
          <Grid item>
            <Grid container
              direction="row"
              justify="space-evenly"
              alignItems="baseline">
              <Grid item>
                <Typography variant="h5">Grand Total</Typography>
              </Grid>
              <Grid item>
                <Typography variant="h5" style={{ marginRight: "10px" }}>₹{detail.price}</Typography>
              </Grid>
              <Grid item>
                <Button variant="contained" color="primary" size="medium" onClick={() => setBuy(true)}>
                  Buy Now
                </Button>
              </Grid>
            </Grid>
          </Grid>
        </Grid>
      </Container>
    </div>
  );
}

export default CartFoot;
