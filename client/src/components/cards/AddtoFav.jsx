import React, { useState, useContext, useEffect } from 'react';
import IconButton from '@material-ui/core/IconButton';
import FavoriteTwoToneIcon from '@material-ui/icons/FavoriteTwoTone';
import axios from "axios";
import Authapi from "../auth/AuthApi";
import Sign from "../auth/SignIn";




export default function (props) {
  const { data, setData } = useContext(Authapi);
  // let initial = data.user.favItem.includes(props.id);
  const [fav, setFav] = useState(false);
  const [enable, setEnable] = useState(false);
  function handleClick() {
    let prms = new URLSearchParams({ id: props.id });
    if (data.auth) {
      setFav(old => {
        if (old) {
          axios.post("/user/remfav", prms)
            .then(function (response) {
              setData({ ...data, user: response.data });
              return false;
            })
            .catch(function (error) {
              console.log(error);
            });
        }
        else {
          axios.post("/user/addfav", prms)
            .then(function (response) {
              setData({ ...data, user: response.data });
              return true;
            })
            .catch(function (error) {
              console.log(error);
            });
        }
      });
    }
    else {
      setEnable(true);
    }
  }

  useEffect(() => {
    if (data.user !== undefined) {
      setFav(data.user.favItem.includes(props.id));
    }
  }, [data])

  return (
    <>
      {enable && <Sign setState={setEnable} />}
      <IconButton onClick={handleClick} {...props}>
        <FavoriteTwoToneIcon style={fav ? { color: "#FF1493" } : {}} />
      </IconButton>
    </>
  )
}