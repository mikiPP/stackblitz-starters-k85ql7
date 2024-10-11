import type { UiStateViewModel } from '../viewModels/uiState';
import type { ReactNode } from 'react';
import { createStore, useStore } from 'zustand';
import { immer } from 'zustand/middleware/immer';

export const uiProvider = createStore<UiStateViewModel>()(
  immer((set) => ({
    modal: {
      show: false,
      content: null as ReactNode,
    },
    showModal(modalContent: ReactNode) {
      set((state) => {
        state.modal.content = modalContent;
      });

      setTimeout(() => {
        set((state) => {
          state.modal.show = true;
          document.body.style.overflow = 'hidden';
        });
      }, 150);
    },
    hideModal() {
      set((state) => {
        state.modal.show = false;
      });

      setTimeout(() => {
        set((state) => {
          state.modal.content = null;
          document.body.style.overflow = 'auto';
        });
      }, 150);
    },
  })),
);

export function useUiProvider(): UiStateViewModel;
export function useUiProvider<T>(
  selector: (state: UiStateViewModel) => T,
  equals?: (a: T, b: T) => boolean,
): T;
export function useUiProvider(selector?: any) {
  return useStore(uiProvider, selector);
}
