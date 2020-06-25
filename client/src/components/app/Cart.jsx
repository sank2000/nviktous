import React, { Fragment, useContext, useEffect, useState } from 'react';
import { Container, Typography } from '@material-ui/core';
import { makeStyles, useTheme } from '@material-ui/core/styles';

import CartItem from '../cards/CartItem';
import CartFoot from './CartFoot';
import Authapi from "../auth/AuthApi";
import axios from "axios";
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
      <img src='./images/emptyCart.png' style={{ maxWidth: '80vw', maxHeight: '50vh', padding: '1rem' }} alt='' />
      <Typography variant="h4">Your cart is Empty!</Typography>
    </FlexContainer>
  );
}

function Cart(props) {
  const theme = useTheme();
  const { data } = useContext(Authapi);
  const [value, setValue] = useState();
  const [load, setLoad] = useState(true);
  const [empty, setEmpty] = useState(true);

  const [detail, setDetail] = useState({
    count: 0,
    price: 0
  });

  const useStyles = makeStyles({
    root: {
      padding: theme.spacing(2),
    }
  });
  const classes = useStyles();

  useEffect(() => {
    axios.get("/posts/cart")
      .then(function (response) {
        let merged = [];

        for (let i = 0; i < response.data.length; i++) {
          merged.push({
            ...response.data[i],
            ...(data.user.card.find((itmInner) => itmInner._id === response.data[i]._id))
          }
          );
        }
        setValue(merged);
        let total = 0;
        // eslint-disable-next-line
        merged.map((value, ind) => {
          total = total + (value.count * (value.price - (value.price * (value.discount / 100))));
          setDetail({
            count: ind + 1,
            price: total
          });
        });

        if (merged.length !== 0) {
          setEmpty(false);
        }
        setLoad(false);
      })
      .catch(function (error) {
        console.log(error);
      });
  }, [data.user.card])

  return (
    <Fragment>
      {load ? <Loading /> : empty ? <Empty /> : <>
        <Container className={classes.root} maxWidth="md" style={{ marginBottom: "100px" }}>
          {value.map((value, ind) => {
            return <CartItem key={ind} id={value._id} category={value.category} name={value.name} description={value.description} price={value.price} img={value.img} count={value.count} size={value.size} discount={value.discount} />
          })}
        </Container>
        <CartFoot detail={detail} value={value} />
      </>
      }
    </Fragment>
  );
}

export default Cart;
