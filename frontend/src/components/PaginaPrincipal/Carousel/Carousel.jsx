import "./Carousel.css";
import Carousel from "react-material-ui-carousel";
import { Paper } from "@mui/material";

function CarrouselComponent() {
  var items = [
    {
      name: "Universidad de Las Palmas de Gran Canaria",
      description:
        "Una institución de educación superior comprometida con la excelencia académica y la investigación innovadora.",
      img: "./src/assets/imgCarousel/img.png",
    },
    {
      name: "Universidad de La Laguna",
      description:
        "Una universidad con una rica historia y una comunidad académica diversa que promueve el conocimiento y la cultura.",
      img: "./src/assets/imgCarousel/img1.webp",
    },
    {
      name: "Universidad Europea de Canarias",
      description:
        "Una institución internacional que ofrece programas académicos de alta calidad con un enfoque en la preparación para el mundo laboral.",
      img: "./src/assets/imgCarousel/img2.jpg",
    },
    {
      name: "Universidad de La Palmas",
      description:
        "Una institución centrada en la investigación y la enseñanza de calidad, contribuyendo al desarrollo socioeconómico de la región.",
      img: "./src/assets/imgCarousel/img3.jpeg",
    },
    {
      name: "Universidad César Manrique",
      description:
        "Una institución comprometida con la sostenibilidad y la preservación del entorno, integrando la cultura y la tecnología.",
      img: "./src/assets/imgCarousel/img4.jpg",
    },
    {
      name: "Universidad de Canarias Occidentales",
      description:
        "Una universidad que celebra la diversidad cultural y promueve la colaboración internacional en la investigación y la enseñanza.",
      img: "./src/assets/imgCarousel/img5.jpg",
    },
    {
      name: "Universidad del Hierro",
      description:
        "Una institución enraizada en la comunidad, dedicada a proporcionar oportunidades educativas en la isla de El Hierro.",
      img: "./src/assets/imgCarousel/img6.jpg",
    },
    {
      name: "Universidad del Teide",
      description:
        "Una universidad que ofrece programas académicos innovadores y oportunidades de investigación en un entorno inspirador.",
      img: "./src/assets/imgCarousel/img7.jpg",
    },
  ];
  return (
    <Carousel>
      {items.map((item, i) => (
        <Item key={i} item={item} />
      ))}
    </Carousel>
  );

  function Item(props) {
    return (
      <div className="container-background">
        <Paper className="container-carousel">
          <h2 className="h2header">{props.item.name}</h2>
          <p>{props.item.description}</p>
          <div className="container-image">
            <img className="image" src={props.item.img} alt="img" />
          </div>
        </Paper>
      </div>
    );
  }
}

export default CarrouselComponent;
