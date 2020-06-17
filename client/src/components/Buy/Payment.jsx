import React, { useState } from "react";
import Button from "@material-ui/core/Button";

import Radio from "@material-ui/core/Radio";
import RadioGroup from "@material-ui/core/RadioGroup";
import FormControlLabel from "@material-ui/core/FormControlLabel";
import FormControl from "@material-ui/core/FormControl";

import Typography from "@material-ui/core/Typography";

import BounceLoader from "react-spinners/BounceLoader";

export default function (props) {
  const [value, setValue] = useState("cashOnDelivery");
  const [load, setLoad] = useState(false);

  const handleChange = event => {
    setValue(event.target.value);
  };

  function handleClick() {
    setLoad(true);
    props.submit({
      method: value
    });
  }

  return (
    <>
      <Typography
        variant="h6"
        style={{ marginLeft: "5px", marginRight: "5px" }}
      >
        Select your Payment method
      </Typography>
      <FormControl
        component="fieldset"
        style={{ paddingTop: "20px", paddingBottom: "20px" }}
      >
        <RadioGroup name="option" value={value} onChange={handleChange}>
          <FormControlLabel
            value="cashOnDelivery"
            control={<Radio />}
            label="Cash on Delivery"
          />
        </RadioGroup>
      </FormControl>
      <br />
      <Button
        variant="contained"
        color="primary"
        style={{ float: "right" }}
        onClick={handleClick}
      >
        {" "}
        Done{" "} <BounceLoader size={15} color={"black"} loading={load} />
      </Button>
    </>
  );
}
