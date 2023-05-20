import React, { ReactNode } from "react";
interface ModalType {
  children?: ReactNode;
  isOpen: boolean;
  openModal: () => void;
}


export default function Modal(props: ModalType) {
 
  return (
    <>
      {props.isOpen && (
        <div className="modal-overlay"  onClick={props.openModal}>
          <div
            onClick={(e) => e.stopPropagation()}
            className="modal-box"
          >
            <div></div>
            <div></div>
          </div>
        </div>
      )}
    </>
  );
}
