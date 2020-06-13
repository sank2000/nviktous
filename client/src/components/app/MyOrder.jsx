import React, { useContext, useEffect, useState } from 'react';
import FlexContainer from '../containers/FlexContainer';
import SyncLoader from "react-spinners/SyncLoader";
import Authapi from "../auth/AuthApi";
import Order from "./Order";
import Container from "@material-ui/core/Container";
import { useTheme } from '@material-ui/core/styles';
import { Typography } from '@material-ui/core';

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
      <img src='../images/empty.png' style={{ maxWidth: '80vw', maxHeight: '50vh', padding: '1rem' }} alt='kfjngdf' />
      <Typography variant="h2">No Orders!</Typography>
    </FlexContainer>
  );
}

export default () => {
  const [load, setLoad] = useState(true);
  const [card, setCard] = useState({});
  const { data } = useContext(Authapi);
  const [empty, setEmpty] = useState(true);

  useEffect(() => {
    if (data.user !== undefined) {
      setCard(data.user.items);
      if (data.user.items.length !== 0) {
        setEmpty(false);
      }
      setLoad(false);
    }
  }, [data])


  return (<>
    {load ? <Loading /> : empty ? <Empty /> : <>
      <Container maxWidth="sm">
        {card.map((value, ind) => {
          return <Order key={ind} items={value.item} price={value.amount} id={value._id} status={value.status} />
        })}
      </Container>
    </>
    }
  </>)
}
