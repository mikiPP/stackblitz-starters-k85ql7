import Image from 'next/image';
import { ModalContent } from '@/src/ui/components/modal';
import { forwardRef } from 'react';
import gridIcon from '@/public/images/grid.png';
import bookMarkIcon from '@/public/images/bookmark.png';
import copyIcon from '@/public/images/copy.png';
import Chip from '@/src/ui/components/chip';
import QuestionCard from '../../../../components/questionCard';
import { useUiProvider } from '@/src/ui/providers/ui.provider';
import removeIcon from '@/public/images/remove.png';
import { AssetModel } from '@/src/core/assets/models/assetModel';
import { useState } from 'react';

interface AssetModalProps {
  asset: AssetModel;
}

const hastags = ['#comms', '#coverage', '#stakeholders'];

export const AssetModal = forwardRef<HTMLDivElement, AssetModalProps>(({ asset }, ref) => {
  const [isFavourite, setIsFavourite] = useState(false);
  const hideModal = useUiProvider((state) => state.hideModal);

  return (
    <ModalContent className="max-w-3xl overflow-y-scroll" ref={ref}>
      <div className="absolute flex gap-4 right-4 top-4">
        <button
          className="h-4 w-4"
          onClick={() => {
            navigator.clipboard.writeText(String(asset.id));
          }}
        >
          <span>
            <Image src={copyIcon} alt="add to clipboard" sizes="cover" />
          </span>
        </button>
        <button onClick={() => hideModal()} className="h-3 w-3">
          <span>
            <Image src={removeIcon} alt="close" sizes="cover" />
          </span>
        </button>
      </div>
      <div className="pt-10 pb-4 px-6">
        <div>
          <div className="h-14 w-14 bg-backgroud-color-500 rounded-md grid place-items-center mx-auto">
            <Image src={gridIcon} alt="chart icon" height={24} width={24} />
          </div>
          <div className="text-center pt-4">
            <div className="flex items-center justify-center gap-4">
              <h2 className="pb-1 font-semibold text-3xl">{asset.name}</h2>
              <span className="text-xs bg-backgroud-color-400 font-normal text-gray-400 border rounded-md p-1">
                Layout
              </span>
            </div>
            <p className="description">{asset.description}</p>
            <p className="mt-6">
              Those options are already baked in with this model shoot me an email clear blue water
              but we need distributors to evangelize the new line to local markets.
            </p>
          </div>
        </div>
        <div className="flex justify-center gap-1 mt-4">
          {hastags.map((tag) => (
            <Chip key={tag} text={tag} />
          ))}
        </div>

        <div className="mt-8 flex">
          <div className="flex grow flex-col border-r border-backgroud-color-600 py-4 items-center">
            <h4 className="text-sm font-bold">2485</h4>
            <p className="description text-xs">Used</p>
          </div>
          <div className="flex grow flex-col border-r border-backgroud-color-600 py-4 items-center">
            <h4 className="text-sm font-bold">Universal</h4>
            <p className="description text-xsd">Type</p>
          </div>
          <div className="flex grow flex-col border-r border-backgroud-color-600 py-4 items-center">
            <h4 className="text-sm font-bold">6</h4>
            <p className="description text-xs">Pages.No.</p>
          </div>
          <div className="flex grow flex-col py-4 items-center">
            <h4 className="text-sm font-bold">07/23/2024</h4>
            <p className="description text-xs">Last updated</p>
          </div>
        </div>

        <div className="w-full bg-background-color-600 h-80 mt-6 rounded-sm" />

        <div className="mt-8">
          <h3 className="subtitle">Business Questions</h3>
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-2 mt-2">
            {Array.from({ length: 4 }).map((_, index) => (
              <QuestionCard
                key={index}
                question={`Question ${index + 1}`}
                answer="Short answer of the question goes here."
              />
            ))}
          </div>
        </div>

        <button
          className="mt-8 w-full bg-black text-white py-2 rounded-md flex gap-4 justify-center items-center"
          onClick={() => {
            setIsFavourite((prevState) => !prevState);
          }}
        >
          <span>
            <Image className="invert" src={bookMarkIcon} alt="chart icon" height={12} width={12} />
          </span>
          <span className="text-sm">{!isFavourite ? 'Favourite Item' : 'Remove as Favourite'}</span>
        </button>
      </div>
    </ModalContent>
  );
});

AssetModal.displayName = 'AssetModal';
