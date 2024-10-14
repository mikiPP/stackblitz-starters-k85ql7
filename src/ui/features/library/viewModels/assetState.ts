import { AssetModel } from '@/src/core/assets/models/assetModel';

export interface AssetsStateViewModel {
  assets: AssetModel[];
  recentSearches: Set<string>;
  setAssets(assets: AssetModel[]): void;
  setRecentSearches(recentSearches: string): void;
  clearAssets(): void;
  search: string;
  setSearch(search: string): void;
  clearSearch(): void;
}
