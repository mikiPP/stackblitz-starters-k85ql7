import type { ReactElement, ReactNode } from 'react';

export interface ModalContentState {
  show: boolean;
  content: ReactNode | ReactElement | null;
}

export interface UiStateViewModel {
  modal: ModalContentState;
  showModal(modalContent: ReactNode): void;
  hideModal(): void;
}
