import React, { useState } from 'react';
import IconButton from '@material-ui/core/IconButton';
import FavoriteTwoToneIcon from '@material-ui/icons/FavoriteTwoTone';

import Authapi from "../auth/AuthApi";
import Sign from "../auth/SignIn";




export default function (props) {
  const { data } = React.useContext(Authapi);
  // let initial = data.user.favItem.includes(props.id);
  const [fav, setFav] = useState(false);
  const [enable, setEnable] = useState(false);
  function handleClick() {
    if (data.auth) {
      setFav(true);
    }
    else {
      setEnable(true);
    }
    console.log(data.user.favItem);
  }

  return (
    <>
      {enable && <Sign setState={setEnable} />}
      <IconButton onClick={handleClick} {...props}>
        <FavoriteTwoToneIcon style={fav ? { color: "#FF1493" } : { color: "primary" }} />
      </IconButton>
    </>
  )
}