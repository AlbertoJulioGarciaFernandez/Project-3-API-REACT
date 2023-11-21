import React from 'react'
import Header from '../../components/PaginaPrincipal/Header/Header'
import CarrouselComponent from '../../components/PaginaPrincipal/Carousel/Carousel'
import Noticias from '../../components/PaginaPrincipal/Noticias/Noticias'

function Home() {
  return (
    <>
    <Header/>
    <CarrouselComponent/>
    <Noticias/>
    </>
  )
}

export default Home