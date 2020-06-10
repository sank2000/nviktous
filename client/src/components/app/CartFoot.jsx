import React, { useState } from 'react';
import { makeStyles, useTheme } from '@material-ui/core/styles';
import { Grid, Container, Typography } from '@material-ui/core';
import Button from "@material-ui/core/Button";

import Buy from "./Buy";

function CartFoot(props) {
  const theme = useTheme();

  const [detail, setDetail] = useState(props.detail);
  const [buy, setBuy] = useState(false);


  const useStyles = makeStyles({
    root: {
      position: 'fixed',
      left: '0',
      bottom: '0',
      width: '100%',
      backgroundColor: theme.palette.grey[200],
      padding: theme.spacing(2),
      textAlign: 'right'
    }
  });
  const classes = useStyles();
  return (
    <div className={classes.root}>
      {buy && <Buy setState={setBuy} data={props} />}
      <Container maxWidth="md">
        <Grid container>
          <Grid item xs={6}>
            <Typography variant="h4">Grand Total</Typography>
          </Grid>
          <Grid item xs={3}>
            <Typography variant="h4">₹{detail.price}</Typography>
          </Grid>
          <Grid item xs={3}>
            <Button variant="outlined" color="primary" size="medium" onClick={() => setBuy(true)}>
              Buy Now
              </Button>
          </Grid>
        </Grid>
      </Container>
    </div>
  );
}

export default CartFoot;
