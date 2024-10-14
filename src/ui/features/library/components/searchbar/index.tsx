'use client';

import SearchBar from '@/src/ui/components/searchbar';
import getAssetsUseCase from '@/src/core/assets/useCases/getAssetsByFilterUseCase';
import { useAssetsProvider } from '../../providers/asset.provider';
import { useCallback, useState } from 'react';
import Card from '@/src/ui/components/card';
import { useUiProvider } from '@/src/ui/providers/ui.provider';
import { AssetModal } from '../assetModal';
import { AssetModel } from '@/src/core/assets/models/assetModel';
import NextLink from 'next/link';

interface Props {
  maxResults?: number;
}

export default function SearchBarWrapper({ maxResults }: Props) {
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

  const handleCardClick = (asset: AssetModel) => {
    showModal(<AssetModal asset={asset} />);
  };

  const assetsToDisplay = maxResults ? assets.slice(0, maxResults) : assets;

  return (
    <div className="pt-4 relative">
      <SearchBar
        onSearch={onSearch}
        onClickClear={clearAssets}
        search={search}
        setSearch={setSearch}
        onFocus={() => setIsFocused(true)}
        onBlur={() => {
          setTimeout(() => {
            setIsFocused(false);
          }, 250);
        }}
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
                    setSearch(search);
                  }}
                >
                  {search}
                </button>
              ))
          : null}
      </div>

      <div className="mt-4">
        {!search && !maxResults && <p>Not seeeing... try search</p>}
        {search && assets.length === 0 && <p>No assets found</p>}
        <div className="flex gap-4">
          {assetsToDisplay.map((asset) => (
            <Card
              key={asset.id}
              title={asset.name}
              description={asset.description}
              onCardClick={() => handleCardClick(asset)}
              whiteBackground
            />
          ))}
        </div>
        {assets.length && maxResults ? (
          <div className="mt-4 text-center bg-black text-white py-2 px-4 rounded-md">
            <NextLink href={'/filter'}>
              <span className="w-full">See more</span>
            </NextLink>
          </div>
        ) : null}
      </div>
    </div>
  );
}
