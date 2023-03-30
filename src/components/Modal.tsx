import ReactModal from "react-modal";

const customStyles = {
  content: {
    top: "50%",
    left: "50%",
    right: "auto",
    bottom: "auto",
    marginRight: "-50%",
    transform: "translate(-50%, -50%)",
  },
};

const Modal = ({ isOpen, onClose, children }) => {
  return (
    <ReactModal isOpen={isOpen} onRequestClose={onClose} style={customStyles}>
      {children}
      <button onClick={onClose}>Fechar</button>
    </ReactModal>
  );
};

export default Modal;
