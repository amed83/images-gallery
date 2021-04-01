import { Modal } from "@material-ui/core";
import { FC } from "react";
import { useModalStyles } from "./Style";

interface ModalProps {
  fullWidthImgUrl?: string;
  handleCloseModal: () => void;
}

export const ModalWrapper: FC<ModalProps> = ({
  fullWidthImgUrl,
  handleCloseModal,
}) => {
  const modalClasses = useModalStyles();

  return (
    <Modal
      onClose={() => handleCloseModal()}
      open={!!fullWidthImgUrl}
      className={modalClasses.root}
    >
      <img src={fullWidthImgUrl} alt="" width="90%" height="90%" />
    </Modal>
  );
};
