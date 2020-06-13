import React from "react";

export default function CarouselImage(props) {
  return (
    <div style={{ textAlign: "center" }}>
      <img
        src={props.src}
        alt={props.alt || "image"}
        style={{
          width: "100%",
          height: "20rem",
          objectFit: "cover",
          display: "inline-block"
        }}
      />
    </div>
  );
}
