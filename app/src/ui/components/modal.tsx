'use client';

import type { PropsWithChildren, ReactElement } from 'react';
import { cloneElement, forwardRef, useEffect, useRef } from 'react';
import Image from 'next/image';

import removeIcon from '@/public/images/remove.png';
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
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [modalShowing]);

  return (
    <div ref={modalRef}>
      {modalContent && cloneElement(modalContent as ReactElement, { ref: modalContentRef })}
    </div>
  );
};

export const ModalContent = forwardRef<HTMLDivElement, PropsWithChildren<{ className?: string }>>(
  ({ children, className }, ref) => {
    const hideModal = useUiProvider((state) => state.hideModal);

    return (
      <div
        ref={ref}
        className={[
          'fixed top-6 w-full px-4 md:w-auto md:left-20 z-10 h-full pb-4',
          className,
        ].join(' ')}
      >
        <div className="bg-white shadow-md relative rounded-md overflow-auto h-[calc(100%_-_32px)]">
          <div className="absolute right-4 top-4 h-3 w-3">
            <button onClick={() => hideModal()}>
              <span>
                <Image src={removeIcon} alt="close" sizes="cover" />
              </span>
            </button>
          </div>
          {children}
        </div>
      </div>
    );
  },
);
