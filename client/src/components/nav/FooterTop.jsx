import React from "react";
import Grid from "@material-ui/core/Grid";

function Card(props) {
  return (
    <div style={{ textAlign: "center", padding: "25px" }}>
      <img
        src={props.src}
        style={{ width: "50px", height: "50px" }}
        alt=""
      />
      <h2>{props.head}</h2>
      <p style={{ color: "#8f8f8f" }}>
        {props.body}
      </p>
    </div>
  );
}


const value = [
  {
    img: "./images/fashion.png",
    head: "Friendly Design",
    body: "Great designers have an understanding of the world around us.Everything is designed. Few things are designed well.."
  },
  {
    img: "./images/price.png",
    head: "Affortable Price",
    body: "Design adds value faster than it adds costs.Discount that helps make our products as affordable for our customers as possible"
  },
  {
    img: "./images/customercare.png",
    head: "Customer Care",
    body: "We are available for 24/7 to help solving queries.Every single shirt order is very important to us – as are the customers that place them"
  },
  {
    img: "./images/delivery.png",
    head: "Fast Delivery",
    body: "What good would an iconic set of shirts be if you couldn’t lay eyes on them for weeks? As soon as your garments are ready, we’ll have them sent your way in no time"
  }
]





export default function () {
  return (
    <Grid container direction="row" justify="center" alignItems="center">
      {value.map((value, ind) => {
        return (<Grid item xs={12} sm={6} md={3}>
          <Card key={ind} src={value.img} head={value.head} body={value.body} />
        </Grid>)
      })}
    </Grid>
  );
}

