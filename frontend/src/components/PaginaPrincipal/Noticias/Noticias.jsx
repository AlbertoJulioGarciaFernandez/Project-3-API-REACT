import React from "react";
import "./Noticias.css";

function Noticias() {
  return (
    <>
      <div className="cointainer">
        {/*     <h4>
        Especialidades de Formación en la Universidad de Las Palmas de Gran
        Canaria:
      </h4>
      <ul>
        <li>Ingeniería Informática y de Telecomunicaciones</li>
        <li>Ciencias del Mar</li>
        <li>Arquitectura y Diseño</li>
        <li>Medicina y Ciencias de la Salud</li>
        <li>Economía y Negocios Internacionales</li>
        <li>Derecho y Ciencias Políticas</li>
      </ul> */}

        <section className="seccion-noticias">
          <article className="articulo">
            <h2>Descubrimiento Científico</h2>
            <p>
              Un equipo de científicos ha anunciado un descubrimiento
              revolucionario que podría cambiar la forma en que entendemos el
              universo. Los detalles completos del descubrimiento y su impacto
              potencial aún están por conocerse.
            </p>
          </article>

          <article className="articulo">
            <h2>Nuevas Tendencias en Tecnología</h2>
            <p>
              Las últimas tendencias tecnológicas han llegado al mercado, desde
              dispositivos innovadores hasta avances en inteligencia artificial.
              Descubre cómo estas nuevas tecnologías están dando forma al futuro
              y cambiando la forma en que vivimos y trabajamos.
            </p>
          </article>
        </section>

        <section className="seccion-noticias">
          <article className="articulo">
            <h2>Avances en Medicina</h2>
            <p>
              Un nuevo tratamiento médico ha demostrado ser altamente efectivo
              en ensayos clínicos, ofreciendo esperanza a aquellos que sufren de
              enfermedades difíciles de tratar. Conoce los detalles de este
              emocionante avance en la medicina moderna.
            </p>
          </article>

          <article className="articulo">
            <h2>Eventos Globales en Economía</h2>
            <p>
              Los eventos económicos globales están impactando los mercados
              financieros. Analistas y expertos discuten las implicaciones de
              estos eventos y cómo podrían afectar a la economía mundial en los
              próximos meses.
            </p>
          </article>
        </section>

        
        <table className="tableHome">
        <h1>Fórmate para tu futuro</h1>
          <thead>
            <tr>
              <th>Especialidad</th>
              <th>Descripción</th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td className="especialidades">Ingeniería Informática y de Telecomunicaciones</td>
              <td>
                Prepárate para liderar la revolución digital con una formación
                integral en ingeniería informática y de telecomunicaciones.
                Aprenderás a desarrollar software, diseñar redes y sistemas, y
                afrontar los desafíos tecnológicos del futuro.
              </td>
            </tr>
            <tr>
              <td className="especialidades">Ciencias del Mar</td>
              <td>
                Sumérgete en el fascinante mundo de las ciencias marinas. Esta
                especialidad te proporcionará los conocimientos necesarios para
                comprender y conservar los ecosistemas marinos, abordando temas
                como la oceanografía, la biología marina y la gestión sostenible
                de los recursos marinos.
              </td>
            </tr>
            <tr>
              <td className="especialidades">Arquitectura y Diseño</td>
              <td>
                Explora tu creatividad y desarrolla habilidades técnicas en el
                campo de la arquitectura y el diseño. Esta especialidad te
                brindará las herramientas necesarias para concebir y
                materializar proyectos arquitectónicos innovadores y
                estéticamente impactantes.
              </td>
            </tr>
            <tr>
              <td className="especialidades">Medicina y Ciencias de la Salud</td>
              <td>
                Forma parte del sector de la salud con una especialidad en
                medicina y ciencias de la salud. Adquirirás conocimientos
                médicos avanzados y desarrollarás habilidades clínicas
                esenciales para contribuir al bienestar y la atención médica de
                la comunidad.
              </td>
            </tr>
            <tr>
              <td className="especialidades">Economía y Negocios Internacionales</td>
              <td>
                Sumérgete en el mundo de los negocios a nivel internacional.
                Esta especialidad te proporcionará una comprensión profunda de
                la economía global, las estrategias empresariales
                internacionales y las habilidades necesarias para enfrentar los
                retos del mercado globalizado.
              </td>
            </tr>
          </tbody>
        </table>
      </div>
    </>
  );
}

export default Noticias;
