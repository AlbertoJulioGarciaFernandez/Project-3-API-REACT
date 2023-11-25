import Header from '../../components/PaginaPrincipal/Header/Header'
import CarrouselComponent from '../../components/PaginaPrincipal/Carousel/Carousel'
import Noticias from '../../components/PaginaPrincipal/Noticias/Noticias'
import Footer from '../../components/PaginaPrincipal/Footer/Footer'

function Home() {
  return (
    <>
      <Header />
      <CarrouselComponent />
      <Noticias />
      <Footer />
    </>
  )
}

export default Home