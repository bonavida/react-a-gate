import * as React from 'react';
import { useState, useEffect, useRef, useCallback } from 'react';
import { createPortal } from 'react-dom';
/** Hooks */
import usePortal from '../../hooks/usePortal';
import useEscKeydown from '../../hooks/useEscKeydown';
import useLockScroll from '../../hooks/useLockScroll';
/** Styles */
import './ModalGate.scss';

export type ModalGateProps = {
  id: string;
  isOpen: boolean;
  rootId?: string;
  closeWhenClickOutside?: boolean;
  onClose: () => void;
};

const ModalGate: React.FC<ModalGateProps> = ({
  id,
  isOpen,
  rootId = 'portal-root',
  closeWhenClickOutside = true,
  onClose,
  children,
}) => {
  const [isActive, setIsActive] = useState<boolean>(false);
  const modalRef = useRef<HTMLDivElement>(null);
  const target = usePortal(rootId);
  useEscKeydown(onClose);
  useLockScroll(isActive);

  useEffect(() => {
    if (isOpen) {
      setIsActive(true);
    }
  }, [isOpen]);

  const handleCloseWhenClickOutside = useCallback(
    (e: React.MouseEvent<HTMLElement, MouseEvent>) => {
      if (closeWhenClickOutside && e.target === modalRef.current) {
        onClose && onClose();
      }
    },
    [closeWhenClickOutside, onClose]
  );

  const handleTransitionEnd = useCallback(() => {
    if (!isOpen) {
      setIsActive(false);
    }
  }, [isOpen]);

  return isOpen || isActive
    ? createPortal(
        <div
          id={id}
          ref={modalRef}
          data-testid="modal_backdrop"
          className={`modal__backdrop${
            isOpen && isActive ? ' modal__backdrop--active' : ''
          }`}
          role="dialog"
          aria-labelledby={`modal_gate_${id}`}
          aria-modal="true"
          onClick={handleCloseWhenClickOutside}
          onTransitionEnd={handleTransitionEnd}
        >
          <div className="modal__content">{children}</div>
        </div>,
        target
      )
    : null;
};

export default ModalGate;
