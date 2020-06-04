import React from 'react';
import Slider from 'react-animated-slider';
import '../../assets/styles/Carousel.css'

const content = [
  {
    image: 'https://source.unsplash.com/random',
    title: 'Title 1',
    description: 'Lorem Ipsum',
    button: 'Buy now'
  },
  {
    image: 'https://source.unsplash.com/random',
    title: 'Title 2',
    description: 'Lorem Ipsum',
    button: 'Buy now'
  },
  {
    image: 'https://source.unsplash.com/random',
    title: 'Title 3',
    description: 'Lorem Ipsum',
    button: 'Buy now'
  }
]

function Carousel() {
  return (
    <Slider className="slider-wrapper">
      {content.map((item, index) => (
        <div
          key={index}
          className="slider-content"
          style={{ background: `url('${item.image}') no-repeat center center` }}
        >
          <div className="inner">
            <h1>{item.title}</h1>
            <p>{item.description}</p>
            <button>{item.button}</button>
          </div>
          <section>
            <img src={item.userProfile} alt={item.user} />
            <span>
              Posted by <strong>{item.user}</strong>
            </span>
          </section>
        </div>
      ))}
    </Slider>
  );
}

export default Carousel;
