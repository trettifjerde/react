import { forwardRef, MouseEvent, ReactNode, useImperativeHandle, useRef } from "react";
import { createPortal } from "react-dom";
import { ModalRef } from "../util/types";

type ModalProps = {
    children: ReactNode,
    closeModal: () => void
}

const Modal = forwardRef<ModalRef, ModalProps>(({children, closeModal}, ref) => {
    const modalRef = useRef<HTMLDialogElement>(null);

    const close = (e: MouseEvent<HTMLDialogElement>) => {
        if (e.target === e.currentTarget)
            closeModal();
    }

    useImperativeHandle(ref, () => {
        return {
            open() {
                modalRef.current?.showModal();
            }
        }
    });

    return createPortal(
        <dialog className="modal" ref={modalRef} onClick={close}>
            {children}
        </dialog>,
        document.getElementById('modal-root')!
    )
});

export default Modal;