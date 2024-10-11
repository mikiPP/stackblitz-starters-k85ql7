'use client';

import SearchBar from '@/app/src/ui/components/searchbar';
import getAssetsUseCase from '@/app/src/core/assets/useCases/getAssetsByFilterUseCase';
import { useAssetsProvider } from '../../providers/asset.provider';
import { useCallback, useState } from 'react';
import Card from '@/app/src/ui/components/card';
import { useUiProvider } from '@/app/src/ui/providers/ui.provider';
import { AssetModal } from '../assetModal/assetModal';

export default function SearchBarWrapper() {
  const [isFocused, setIsFocused] = useState(false);

  const assets = useAssetsProvider((state) => state.assets);
  const setAssets = useAssetsProvider((state) => state.setAssets);
  const clearAssets = useAssetsProvider((state) => state.clearAssets);
  const setRecentSearches = useAssetsProvider((state) => state.setRecentSearches);
  const recentSearches = useAssetsProvider((state) => state.recentSearches);
  const search = useAssetsProvider((state) => state.search);
  const setSearch = useAssetsProvider((state) => state.setSearch);

  const showModal = useUiProvider((state) => state.showModal);

  const onSearch = useCallback(
    async (search: string) => {
      const result = await getAssetsUseCase(search);
      setAssets(result);
      setRecentSearches(search.trim());
    },
    [setAssets, setRecentSearches],
  );

  const handleCardClick = (asset: Asset) => {
    showModal(<AssetModal asset={asset} />);
  };

  return (
    <div className="pt-4 relative">
      <SearchBar
        onSearch={onSearch}
        onClickClear={clearAssets}
        search={search}
        setSearch={setSearch}
        onFocus={() => setIsFocused(true)}
        onBlur={() => setIsFocused(false)}
      />
      <div className="absolute flex flex-col items-start px-5 top-20 bg-white w-full shadow-md border border-backgroud-color-500">
        {isFocused
          ? Array.from(recentSearches)
              .filter((recentSearch) => recentSearch.includes(search) && search !== recentSearch)
              .map((search) => (
                <button
                  className="py-2 border-gray-700 w-full text-left [&:not(:last-child)]:border-b"
                  key={search}
                  onClick={() => {
                    console.log('search', search);
                    setSearch(search);
                  }}
                >
                  {search}
                </button>
              ))
          : null}
      </div>

      <div className="mt-4">
        {!search && <p>Not seeeing... try search</p>}
        {search && assets.length === 0 && <p>No assets found</p>}
        <div className="flex gap-4">
          {assets.map((asset) => (
            <Card
              key={asset.id}
              title={asset.name}
              description={asset.description}
              onCardClick={() => handleCardClick(asset)}
              whiteBackground
            />
          ))}
        </div>
      </div>
    </div>
  );
}
