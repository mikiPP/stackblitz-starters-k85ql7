export interface AssetsStateViewModel {
  assets: Asset[];
  recentSearches: Set<string>;
  setAssets(assets: Asset[]): void;
  setRecentSearches(recentSearches: string): void;
  clearAssets(): void;
  search: string;
  setSearch(search: string): void;
  clearSearch(): void;
}
