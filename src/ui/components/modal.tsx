'use client';

import type { PropsWithChildren, ReactElement } from 'react';
import { cloneElement, forwardRef, useEffect, useRef } from 'react';

import { useUiProvider } from '../providers/ui.provider';
import useClickOutside from '../hooks/useClickOutside';

export const Modal = () => {
  const modalShowing = useUiProvider((state) => state.modal.show);
  const modalContent = useUiProvider((state) => state.modal.content);
  const hideModal = useUiProvider((state) => state.hideModal);

  const modalRef = useRef<HTMLDivElement>(null);
  const modalContentRef = useRef<HTMLDivElement>(null);

  useClickOutside(modalContentRef, () => hideModal());

  const escapeKeyUpListener = (e: KeyboardEvent) => {
    if (modalShowing && (e.key === 'Escape' || e.keyCode === 27)) {
      hideModal();
    }
  };

  useEffect(() => {
    document.addEventListener('keyup', escapeKeyUpListener);

    return () => {
      document.removeEventListener('keyup', escapeKeyUpListener);
    };
  }, [modalShowing]);

  return (
    <div ref={modalRef}>
      {modalContent && cloneElement(modalContent as ReactElement, { ref: modalContentRef })}
    </div>
  );
};

export const ModalContent = forwardRef<HTMLDivElement, PropsWithChildren<{ className?: string }>>(
  ({ children, className }, ref) => {
    return (
      <div
        ref={ref}
        className={[
          'fixed top-6 w-full px-4 md:w-auto md:left-20 z-10 h-full pb-4',
          className,
        ].join(' ')}
      >
        <div className="bg-white shadow-md relative rounded-md overflow-auto max-h-[calc(100%_-_32px)]">
          {children}
        </div>
      </div>
    );
  },
);
