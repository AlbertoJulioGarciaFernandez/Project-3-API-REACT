import React from 'react'
import './Carousel.css'
import Carousel from 'react-material-ui-carousel'
import { Paper } from '@mui/material'



function CarrouselComponent() {
  var items = [
    {
        name: "Random Name #1",
        description: "Probably the most random thing you have ever seen!",
        img: "./src/assets/imgCarousel/img.png"
        
    },
    {
        name: "Random Name #2",
        description: "Hello World!",
        img: "./src/assets/imgCarousel/img1.webp"
    },
    {
        name: "Random Name #2",
        description: "Hello World!",
        img: "./src/assets/imgCarousel/img2.jpg"
    },
    {
        name: "Random Name #2",
        description: "Hello World!",
        img: "./src/assets/imgCarousel/img3.jpeg"
    },
    {
        name: "Random Name #2",
        description: "Hello World!",
        img: "./src/assets/imgCarousel/img4.jpg"
    },
    {
        name: "Random Name #2",
        description: "Hello World!",
        img: "./src/assets/imgCarousel/img5.jpg"
    },
    {
        name: "Random Name #2",
        description: "Hello World!",
        img: "./src/assets/imgCarousel/img6.jpg"
    },
    {
        name: "Random Name #2",
        description: "Hello World!",
        img: "./src/assets/imgCarousel/img7.jpg"
    }
]
  return (

      <Carousel>
          {
              items.map( (item, i) => <Item key={i} item={item}/> )
          }
      </Carousel>
  )

  function Item(props)
{
    return (
        <Paper className='container-carousel'>
            <h2>{props.item.name}</h2>
            <p>{props.item.description}</p>
            <div className='image-container'>
                <img className='imagen' src={props.item.img} alt="img"/>
            </div>
        </Paper>
    )
}
}

export default CarrouselComponent