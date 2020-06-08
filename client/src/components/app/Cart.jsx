import React, { Fragment, useContext, useEffect, useState } from 'react';
import { Container } from '@material-ui/core';
import { makeStyles, useTheme } from '@material-ui/core/styles';

import CartItem from '../cards/CartItem';
import CartFoot from './CartFoot';
import Authapi from "../auth/AuthApi";
import axios from "axios";
import FlexContainer from '../containers/FlexContainer';
import SyncLoader from "react-spinners/SyncLoader";

function Loading() {
  return (
    <FlexContainer>
      <SyncLoader
        size={25}
        margin={10}
        color={"#123abc"}
        loading={true}
      />
    </FlexContainer>
  );
}

function Cart(props) {
  const theme = useTheme();
  const { data, setData } = useContext(Authapi);
  const [value, setValue] = useState();
  const [load, setLoad] = useState(true);

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
            ...(data.user.card.find((itmInner) => itmInner.id === response.data[i].id))
          }
          );
        }

        setValue(merged);
        setLoad(false);
      })
      .catch(function (error) {
        console.log(error);
      });
  }, [])



  return (
    <Fragment>
      {load ? <Loading /> : <>
        <Container className={classes.root} maxWidth="md" style={{ marginBottom: "100px" }}>
          {value.map((value, ind) => {
            return <CartItem key={ind} id={value._id} name={value.name} description={value.description} price={value.price} count={value.count} size={value.size} />
          })}
        </Container>
        <CartFoot />
      </>
      }
    </Fragment>
  );
}

export default Cart;
