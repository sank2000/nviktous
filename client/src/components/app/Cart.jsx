import React, { Fragment } from 'react';
import { Link } from 'react-dom';
import { Container } from '@material-ui/core';
import { makeStyles, useTheme } from '@material-ui/core/styles';

import CartItem from '../cards/CartItem';
import CartFoot from './CartFoot';

function Cart(props) {
  const theme = useTheme();
  const useStyles = makeStyles({
    root: {
      padding: theme.spacing(2),
    }
  });
  const classes = useStyles();
  return (
    <Fragment>
      <Container className={classes.root} maxWidth="md">
        <CartItem />
      </Container>
      <CartFoot />
    </Fragment>
  );
}

export default Cart;
