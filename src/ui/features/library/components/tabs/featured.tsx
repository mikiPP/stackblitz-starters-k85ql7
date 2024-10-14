'use client';

import Card from '@/src/ui/components/card';
import { useUiProvider } from '@/src/ui/providers/ui.provider';
import { AssetModal } from '../assetModal';
import { AssetModel } from '@/src/core/assets/models/assetModel';

interface FeaturedProps {
  featuredCards: AssetModel[];
  trendingCards: AssetModel[];
}

export default function Featured({ featuredCards, trendingCards }: FeaturedProps) {
  const showModal = useUiProvider((state) => state.showModal);

  const handleCardClick = () => {
    showModal(
      <AssetModal asset={{ id: 1, name: 'Asset Name', description: 'Asset Description' }} />,
    );
  };

  return (
    <>
      <div>
        <h1 className="subtitle">Featured</h1>
        <p className="description">Curated top picks from this week</p>
      </div>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-x-6 gap-y-4 py-10">
        {featuredCards.map((asset) => (
          <Card
            key={asset.id}
            onCardClick={handleCardClick}
            whiteBackground
            date={asset.date}
            title={asset.name}
            description={asset.description}
          />
        ))}
      </div>

      <div className="pt-4">
        <h1 className="subtitle">Trending</h1>
        <p className="description">Most popular by community</p>
      </div>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-x-6 gap-y-4 py-10">
        {trendingCards.map((asset) => (
          <Card
            key={asset.id}
            date={asset.date}
            title={asset.name}
            description={asset.description}
          />
        ))}
      </div>
    </>
  );
}
