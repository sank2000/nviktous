import React from 'react';
import Slider from 'react-animated-slider';
import "react-animated-slider/build/horizontal.css";

import '../../assets/styles/Carousel.css'
import { Typography, Button } from '@material-ui/core';
const content = [
  {
    image: 'https://images.unsplash.com/photo-1546884680-a1de22e94d50?ixlib=rb-1.2.1&auto=format&fit=crop&w=750&q=80',
    title: 'Title 1',
    description: 'Lorem Ipsum',
    button: 'Buy now',
    foot: '50% OFF'
  },
  {
    image: 'https://images.unsplash.com/photo-1546872863-e85d5c3e5159?ixlib=rb-1.2.1&auto=format&fit=crop&w=750&q=80',
    title: 'Title 2',
    description: 'Lorem Ipsum',
    button: 'Buy now',
    foot: 'BUY 1 GET 1'
  },
  {
    image: 'https://images.unsplash.com/photo-1545852528-fa22f7fcd63e?ixlib=rb-1.2.1&auto=format&fit=crop&w=751&q=80',
    title: 'Title 3',
    description: 'Lorem Ipsum',
    button: 'Buy now',
    foot: '25% CASHBACK!'
  }
]

function Carousel() {
  return (
    <div>
      <Slider className="slider-wrapper">
        {content.map((item, index) => (
          <div
            key={index}
            className="slider-content"
            style={{ background: `url('${item.image}') no-repeat center center` }}
          >
            <div className="inner">
              <Typography variant="h1" component="h1">{item.title}</Typography>
              <Typography variant="h4" component="h5">{item.description}</Typography>
              <Button>{item.button}</Button>
            </div>
            <section>
              <Typography variant="h3" component="h4">{item.foot}</Typography>
            </section>
          </div>
        ))}
      </Slider>
    </div >
  );
}

export default Carousel;
