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

import {
  BackImage,
  DescProductModal,
  ModalContainer,
  ModalContent,
  ModalFooter,
  MsgErrorModal,
} from "../styles/pages/modal";

interface HomeProps {
  products: {
    id: string;
    name: string;
    imageUrl: string;
    price: string;
  }[];
}

export default function Home({ products }: HomeProps) {
  const { setState } = useContext(Contexto);
  const [selectedProducts, setSelectedProducts] = useState([]);
  const [sliderRef] = useKeenSlider({
    slides: {
      perView: 3,
      spacing: 48,
    },
  });

  useEffect(() => {
    setState(selectedProducts.length);
  }, [selectedProducts, setState]);

  function handleClick(product: any) {
    if (!selectedProducts.includes(product)) {
      setSelectedProducts([...selectedProducts, product]);
    }
  }

  const { isOpenModal, setOpenModal } = useContext(Contexto);

  function handleCloseModal() {
    setOpenModal(false);
  }

  const PriceTotal = selectedProducts
    .reduce((acc, curr) => {
      return acc + parseFloat(curr.price.replace(",", ".").replace("R$", ""));
    }, 0)
    .toLocaleString("pt-BR", { style: "currency", currency: "BRL" });

  return (
    <>
      <Head>
        <title>Home | Ignite Shop</title>
      </Head>
      <HomeContainer ref={sliderRef} className="keen-slider">
        {products.map((product) => {
          return (
            <>
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
                  <ButtonBuy onClick={() => handleClick(product)}>
                    <Image src={Bag} alt="" />
                  </ButtonBuy>
                </footer>
              </Product>
            </>
          );
        })}
      </HomeContainer>

      {isOpenModal && (
        <ModalContainer
          isOpen={isOpenModal}
          onRequestClose={handleCloseModal}
          style={{
            overlay: {
              backgroundColor: "rgba(0, 0, 0, 0.5)",
            },
          }}
        >
          <h2
            style={{
              textAlign: "center",
              paddingTop: "70px",
              paddingBottom: "8px",
            }}
          >
            Sacola de Compras
          </h2>

          {selectedProducts.length ? (
            selectedProducts.map((produc) => {
              return (
                <ModalContent key={produc.id}>
                  <BackImage>
                    <Image
                      src={produc.imageUrl}
                      alt="camiseta"
                      width={100}
                      height={90}
                    />
                  </BackImage>

                  <DescProductModal>
                    <strong>{produc.name}</strong>
                    <span>{produc.price}</span>
                    <button>Remover</button>
                  </DescProductModal>
                </ModalContent>
              );
            })
          ) : (
            <MsgErrorModal>
              <p>Você não possui produto no carrinho.</p>
            </MsgErrorModal>
          )}

          {selectedProducts.length > 0 && (
            <ModalFooter>
              <div>
                <p>Quantidade:</p>
                <span>{selectedProducts.length} itens</span>
              </div>
              <div>
                <p>Valor total:</p>
                <strong>{PriceTotal}</strong>
              </div>

              <button>Finalizar Compra</button>
            </ModalFooter>
          )}
        </ModalContainer>
      )}
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
    };
  });

  return {
    props: {
      products,
    },
    revalidate: 60 * 60 * 2,
  };
};
