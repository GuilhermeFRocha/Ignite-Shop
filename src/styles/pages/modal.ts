import { styled } from "..";
import Modal from "react-modal";

export const ModalContainer = styled(Modal, {
  position: "absolute",
  right: "0px",
  transform: "translate(50%, 0%)",
  width: "480px",
  height: "100%",
  overflow: "auto",
  border: "none",
  borderRadius: "0.5rem",
  backgroundColor: "$gray800",
  outline: "none",
  transition: "transform 0.3s ease-out",
  "&.ReactModal__Content--after-open": {
    transform: "translateX(0%)",
  },
});

export const ModalContent = styled("div", {
  display: "flex",
  alignItems: "center",
  padding: "24px 48px",
  gap: "20px",
});

export const BackImage = styled("div", {
  width: "102",
  height: "94",
  background:
    "linear-gradient(90deg, rgba(30,164,131,1) 0%, rgba(116,101,212,1) 100%)",
  borderRadius: "8px",
});

export const DescProductModal = styled("div", {
  display: "grid",
  gridGap: "8px",

  strong: {
    color: "$gray300",
    fontWeight: "400",
    fontSize: "$md",
  },

  span: {
    color: "$gray100",
    fontWeight: "700",
    fontSize: "$md",
  },

  button: {
    color: "#00875F",
    fontWeight: "700",
    fontSize: "$md",
    background: "transparent",
    border: "none",
    cursor: "pointer",
    textAlign: "initial",
    width: "max-content",
  },
});

export const MsgErrorModal = styled("div", {
  display: "flex",
  justifyContent: "center",
  alignItems: "center",
  height: "80%",

  p: {
    textAlign: "center",
    fontSize: "$lg",
  },
});

export const ModalFooter = styled("div", {
  padding: "48px",

  div: {
    display: "flex",
    justifyContent: "space-between",
    padding: "5px",
  },

  button: {
    marginTop: "48px",
    backgroundColor: "$green500",
    border: 0,
    color: "$white",
    borderRadius: 8,
    padding: "1.25rem",
    cursor: "pointer",
    fontWeight: "bold",
    fontSize: "$md",
    display: "flex",
    justifyContent: "center",
    width: "100%",

    "&:disabled": {
      opacity: 0.6,
      cursor: "not-allowed",
    },

    "&:not(:disabled):hover": {
      backgroundColor: "$green300",
    },
  },
});
