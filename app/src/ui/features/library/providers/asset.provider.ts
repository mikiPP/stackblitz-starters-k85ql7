import { enableMapSet } from 'immer';
import { createStore, useStore } from 'zustand';
import { immer } from 'zustand/middleware/immer';
import { AssetsStateViewModel } from '../viewModels/assetState';

enableMapSet();

export const assetsProvider = createStore<AssetsStateViewModel>()(
  immer((set) => ({
    assets: [],
    recentSearches: new Set<string>(),
    search: '',
    setAssets(assets: Asset[]) {
      set((state) => {
        state.assets = assets;
      });
    },
    clearAssets() {
      set((state) => {
        state.assets = [];
      });
    },
    setRecentSearches(recentSearches: string) {
      set((state) => {
        state.recentSearches.add(recentSearches);
      });
    },
    setSearch(search: string) {
      set((state) => {
        state.search = search;
      });
    },
    clearSearch() {
      set((state) => {
        state.search = '';
      });
    },
  })),
);

export function useAssetsProvider(): AssetsStateViewModel;
export function useAssetsProvider<T>(
  selector: (state: AssetsStateViewModel) => T,
  equals?: (a: T, b: T) => boolean,
): T;
export function useAssetsProvider(selector?: any) {
  return useStore(assetsProvider, selector);
}
