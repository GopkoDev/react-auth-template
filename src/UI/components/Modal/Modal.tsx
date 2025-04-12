import { JSX, ReactNode, useEffect, useRef } from 'react';
import { Portal } from '../../Portals/Portal';
import './Modal.scss';
import { useClickOutside } from '../../../hooks/useClickOutSide';
import { useScrollLock } from '../../../hooks/useScrollLock';

interface ModalProps {
  isOpen: boolean;
  onClose: () => void;
  children: ReactNode;
}

interface ModalHeaderProps {
  children: ReactNode;
}

interface ModalBodyProps {
  children: ReactNode;
}

interface ModalFooterProps {
  children: ReactNode;
}

export const Modal = ({
  isOpen,
  onClose,
  children,
}: ModalProps): JSX.Element | null => {
  const modalRef = useRef<HTMLDivElement | null>(null);

  useClickOutside(modalRef, onClose);
  useScrollLock(isOpen);

  useEffect(() => {
    const handleKeyDown = (event: KeyboardEvent) => {
      if (event.key === 'Escape') {
        onClose();
      }
    };

    if (isOpen) {
      document.addEventListener('keydown', handleKeyDown);
    }

    return () => {
      document.removeEventListener('keydown', handleKeyDown);
    };
  }, [isOpen, onClose]);

  if (!isOpen) return null;

  return (
    <Portal containerId="modal-root">
      <div className="modal">
        <div className="modal--overlay" />
        <div className="modal--content" ref={modalRef}>
          {children}
        </div>
      </div>
    </Portal>
  );
};

export const ModalHeader = ({ children }: ModalHeaderProps): JSX.Element => (
  <div className="modal--header">{children}</div>
);

export const ModalBody = ({ children }: ModalBodyProps): JSX.Element => (
  <div className="modal--body">{children}</div>
);

export const ModalFooter = ({ children }: ModalFooterProps): JSX.Element => (
  <div className="modal--footer">{children}</div>
);
