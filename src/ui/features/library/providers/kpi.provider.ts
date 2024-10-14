import { createStore, useStore } from 'zustand';
import { immer } from 'zustand/middleware/immer';
import { KpisStateViewModel } from '../viewModels/kpiState';

export const kpisProvider = createStore<KpisStateViewModel>()(
  immer((set) => ({
    kpis: [],
    selectedKpi: null,
    setKpis(kpis) {
      set((state) => {
        state.kpis = kpis;
      });
    },
    clearKpis() {
      set((state) => {
        state.kpis = [];
      });
    },
    setSelectedKpi(kpi) {
      set((state) => {
        state.selectedKpi = kpi;
      });
    },
    clearSelectedKpi() {
      set((state) => {
        state.selectedKpi = null;
      });
    },
  })),
);

export function useKpisProvider(): KpisStateViewModel;
export function useKpisProvider<T>(
  selector: (state: KpisStateViewModel) => T,
  equals?: (a: T, b: T) => boolean,
): T;
export function useKpisProvider(selector?: any) {
  return useStore(kpisProvider, selector);
}
