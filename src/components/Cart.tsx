import Image from "next/image";
import {
  BackImage,
  DescProductModal,
  ModalContainer,
  ModalContent,
  ModalFooter,
  MsgErrorModal,
} from "../styles/pages/modal";
import { useContext, useState } from "react";
import { Contexto } from "../contexts/Context";
import { RingLoader } from "react-spinners";
import axios from "axios";

export const Cart = ({ selectedProducts, setSelectedProducts }) => {
  const { isOpenModal, setOpenModal } = useContext(Contexto);
  const [isCreatingCheckoutSession, setCreatingCheckoutSession] =
    useState(false);

  function handleCloseModal() {
    setOpenModal(false);
  }

  function handleDeleteProduct(produc) {
    const deleteProduct = selectedProducts.filter((allProduc) => {
      return allProduc !== produc;
    });
    setSelectedProducts(deleteProduct);
  }

  async function handleBuyProduct() {
    try {
      setCreatingCheckoutSession(true);
      const response = await axios.post("/api/checkout", {
        priceId: selectedProducts,
      });

      const { checkoutUrl } = response.data;
      window.location.href = checkoutUrl;
    } catch (err) {
      setCreatingCheckoutSession(false);

      alert("Falha ao redirecionar");
    }
  }

  const PriceTotal = selectedProducts
    .reduce((acc, curr) => {
      return acc + parseFloat(curr.price.replace(",", ".").replace("R$", ""));
    }, 0)
    .toLocaleString("pt-BR", { style: "currency", currency: "BRL" });

  return (
    <>
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
                    <button onClick={() => handleDeleteProduct(produc)}>
                      Remover
                    </button>
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

              {isCreatingCheckoutSession ? (
                <button>
                  <RingLoader color="black" size="24" />
                </button>
              ) : (
                <button onClick={handleBuyProduct}>Finalizar Compra</button>
              )}
            </ModalFooter>
          )}
        </ModalContainer>
      )}
    </>
  );
};
