import React, { createContext, useContext, useState, useCallback, useEffect } from "react";

const ModalContext = createContext();

const ModalProvider = (props) => {
  const [modal, setModal] = useState();

  const unSetModal = useCallback(() => {
    setModal(null);
  }, [setModal]);

  useEffect(() => {
    const bind = (e) => {
      if (e.keyCode !== 27) {
        return;
      }

      if (document.activeElement && ["INPUT", "SELECT"].includes(document.activeElement.tagName)) {
        return;
      }

      unSetModal();
    };

    document.addEventListener("keyup", bind);
    return () => document.removeEventListener("keyup", bind);
  }, [unSetModal]);

  return (
    <ModalContext.Provider value={{ unSetModal, setModal }} {...props}>
      {props.children}
      {modal && <Modal modal={modal} unSetModal={unSetModal} />}
    </ModalContext.Provider>
  );
};

const useModal = () => {
  const context = useContext(ModalContext);
  if (context === undefined) {
    throw new Error("useModal must be used within a ModalProvider");
  }

  return context;
};

const Modal = ({ modal, unSetModal }) => {
  return (
    <div className="modal">
      <button className="modal__close" onClick={unSetModal} />
      <div className="modal__inner">
        <button className="modal__close-btn" onClick={unSetModal}>
        <i className="fa-solid fa-xmark"></i>
        </button>
        {modal}
      </div>
    </div>
  );
};

export { ModalProvider, useModal };
