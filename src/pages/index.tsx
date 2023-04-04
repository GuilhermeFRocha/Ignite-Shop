import { useContext, useEffect, useState } from "react";
import { GetStaticProps } from "next";
import Head from "next/head";
import "keen-slider/keen-slider.min.css";
import { useKeenSlider } from "keen-slider/react";
import Stripe from "stripe";
import { Contexto } from "../contexts/Context";
import { ButtonBuy, HomeContainer, Product } from "../styles/pages/home";
import { stripe } from "../lib/stripe";
import Image from "next/image";
import Bag from "../assets/Bag.svg";
import Link from "next/link";
import { Cart } from "../components/Cart";

interface HomeProps {
  products: {
    id: string;
    name: string;
    imageUrl: string;
    price: string;
  }[];
}

interface ProductProps {
  id: string;
  name: string;
  imageUrl: string;
  price: string;
}

export default function Home({ products }: HomeProps) {
  const { setState } = useContext(Contexto);
  const [selectedProducts, setSelectedProducts] = useState([]);
  const [addedProducts, setAddedProducts] = useState<{
    [key: string]: boolean;
  }>({});

  const [sliderRef] = useKeenSlider({
    slides: {
      perView: 3,
      spacing: 48,
    },
  });

  useEffect(() => {
    setState(selectedProducts.length);
  }, [selectedProducts, setState]);

  function handleClick(event: any, product: ProductProps) {
    event.preventDefault();
    if (!selectedProducts.includes(product)) {
      setSelectedProducts([...selectedProducts, product]);
      setAddedProducts({ ...addedProducts, [product.id]: true });
    }
  }

  return (
    <>
      <Head>
        <title>Home | Ignite Shop</title>
      </Head>

      <HomeContainer ref={sliderRef} className="keen-slider">
        {products.map((product) => {
          return (
            <Link
              key={product.id}
              href={`/product/${product.id}`}
              prefetch={false}
            >
              <Product className="keen-slider__slide">
                <Image
                  src={product.imageUrl}
                  alt="camiseta"
                  width={520}
                  height={480}
                />
                <footer>
                  <div>
                    <strong>{product.name}</strong>
                    <span>{product.price}</span>
                  </div>
                  <ButtonBuy
                    disabled={addedProducts[product.id]}
                    onClick={(event) => handleClick(event, product)}
                  >
                    <Image src={Bag} alt="" />
                  </ButtonBuy>
                </footer>
              </Product>
            </Link>
          );
        })}
      </HomeContainer>

      <Cart
        selectedProducts={selectedProducts}
        setSelectedProducts={setSelectedProducts}
      />
    </>
  );
}

export const getStaticProps: GetStaticProps = async () => {
  const response = await stripe.products.list({
    expand: ["data.default_price"],
  });

  const products = response.data.map((product) => {
    const price = product.default_price as Stripe.Price;

    return {
      id: product.id,
      name: product.name,
      imageUrl: product.images[0],
      price: new Intl.NumberFormat("pt-BR", {
        style: "currency",
        currency: "BRL",
      }).format(price.unit_amount! / 100),
      priceNumber: price.unit_amount,
      defaultPriceId: price.id,
    };
  });

  return {
    props: {
      products,
    },
    revalidate: 60 * 60 * 2,
  };
};
