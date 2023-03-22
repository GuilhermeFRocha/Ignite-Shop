import Image from "next/image";
import { HomeContainer, Product } from "../styles/pages/home";

import {useKeenSlider} from 'keen-slider/react'

import camiseta1 from "../assets/1.png";
import camiseta2 from "../assets/2.png";
import camiseta3 from "../assets/3.png";

import 'keen-slider/keen-slider.min.css'

export default function Home() {
  const [sliderRef] = useKeenSlider({
    slides : {
      perView: 3,
      spacing: 48,
    }
  })

  return (
    <HomeContainer ref={sliderRef} className="keen-slider">
      <Product className="keen-slider__slide">
        <Image src={camiseta1} alt="camiseta" width={520} height={480} />
        <footer>
          <strong>Camiseta 1</strong>
          <span>R$79,90</span>
        </footer>
      </Product>

      <Product className="keen-slider__slide">
        <Image src={camiseta2} alt="camiseta" width={520} height={480} />
        <footer>
          <strong>Camiseta 2</strong>
          <span>R$89,90</span>
        </footer>
      </Product>

       <Product className="keen-slider__slide">
        <Image src={camiseta2} alt="camiseta" width={520} height={480} />
        <footer>
          <strong>Camiseta 2</strong>
          <span>R$89,90</span>
        </footer>
      </Product>

      <Product className="keen-slider__slide">
        <Image src={camiseta3} alt="camiseta" width={520} height={480} />
        <footer>
          <strong>Camiseta 3</strong>
          <span>R$89,90</span>
        </footer>
      </Product>
    </HomeContainer>
  );
}
