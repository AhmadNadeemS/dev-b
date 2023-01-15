import { FC, ReactNode, useCallback, useEffect, useId } from "react";

export interface ModalProps {
  visible?: boolean;
  onClose?(): void;
}

interface Props extends ModalProps {
  children: ReactNode;
}

const ModalContainer: FC<Props> = ({
  visible,
  children,
  onClose,
}): JSX.Element | null => {
  const containerId = useId();
  const handleClose = useCallback(() => onClose && onClose(), [onClose]);

  const handleClick = ({ target }: any) => {
    if (containerId === target.id) handleClose();
  };

  useEffect(() => {
    const closeModal = ({ key }: any) => key === "Escape" && handleClose();
    document.addEventListener("keydown", closeModal);
    return () => document.removeEventListener("keydown", closeModal);
  }, []);
  if (!visible) return null;
  return (
    <div
      id={containerId}
      onClick={handleClick}
      className="fixed inset-0 z-50 flex items-center justify-center backdrop-blur-[2px] bg-primary bg-opacity-5"
    >
      {children}
    </div>
  );
};

export default ModalContainer;
