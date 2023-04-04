import {
  Dispatch,
  SetStateAction,
  useContext,
  useEffect,
  useState,
} from "react";
import { GetStaticPaths, GetStaticProps } from "next";
import Head from "next/head";
import Image from "next/image";
import Stripe from "stripe";

import { stripe } from "../../lib/stripe";
import {
  ImageContainer,
  ProductContainer,
  ProductDetails,
} from "../../styles/pages/product";
import { Cart } from "../../components/Cart";
import { Contexto } from "../../contexts/Context";

interface ProductProps {
  product: {
    id: string;
    name: string;
    imageUrl: string;
    price: string;
    description: string;
    defaultPriceId: string;
  };
}

export default function Product({ product }: ProductProps) {
  const { setState, selectedProducts, setSelectedProducts } =
    useContext(Contexto);
  const [isCreatingCheckoutSession, setIsCreatingCheckoutSession] =
    useState(false);

  const idsProducts = selectedProducts.map((ids) => {
    return ids.id;
  });

  const [addedProducts, setAddedProducts] = useState<{
    [key: string]: boolean;
  }>({});
  const setSelectedProductsState: Dispatch<SetStateAction<ProductProps[]>> =
    setSelectedProducts;

  async function handleBuyButton(event: any, product: any) {
    event.preventDefault();

    if (!idsProducts.includes(product.id)) {
      if (!selectedProducts.includes(product)) {
        setSelectedProductsState([...selectedProducts, product]);
        setAddedProducts({ ...addedProducts, [product.id]: true });
      }
    }
  }

  useEffect(() => {
    setState(selectedProducts.length);
  }, [selectedProducts, setState]);

  return (
    <>
      <Head>
        <title>{product.name} | Ignite Shop</title>
      </Head>

      <ProductContainer>
        <ImageContainer>
          <Image src={product.imageUrl} width={520} height={480} alt="" />
        </ImageContainer>

        <ProductDetails>
          <h1>{product.name}</h1>
          <span>{product.price}</span>

          <p>{product.description}</p>

          <button
            onClick={(event) => handleBuyButton(event, product)}
            disabled={idsProducts.includes(product.id)}
          >
            Comprar agora
          </button>
        </ProductDetails>
      </ProductContainer>
      <Cart
        selectedProducts={selectedProducts}
        setSelectedProducts={setSelectedProducts}
      />
    </>
  );
}

export const getStaticPaths: GetStaticPaths = async () => {
  return {
    paths: [{ params: { id: "prod_MLH5Wy0Y97hDAC" } }],
    fallback: "blocking",
  };
};

export const getStaticProps: GetStaticProps<any, { id: string }> = async ({
  params,
}) => {
  const productId = params.id;

  const product = await stripe.products.retrieve(productId, {
    expand: ["default_price"],
  });

  const price = product.default_price as Stripe.Price;

  return {
    props: {
      product: {
        id: product.id,
        name: product.name,
        imageUrl: product.images[0],
        price: new Intl.NumberFormat("pt-BR", {
          style: "currency",
          currency: "BRL",
        }).format(price.unit_amount / 100),
        description: product.description,
        defaultPriceId: price.id,
      },
    },
    revalidate: 60 * 60 * 1, // 1 hours
  };
};
