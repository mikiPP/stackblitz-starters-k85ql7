import Image from 'next/image';
import { ModalContent } from '@/app/src/ui/components/modal';
import { forwardRef } from 'react';
import gridIcon from '@/public/images/grid.png';
import bookMarkIcon from '@/public/images/bookmark.png';
import Chip from '@/app/src/ui/components/chip';
import QuestionCard from './components/questionCard';

interface AssetModalProps {
  asset: Asset;
}

const hastags = ['#comms', '#coverage', '#stakeholders'];

export const AssetModal = forwardRef<HTMLDivElement, AssetModalProps>(({ asset }, ref) => {
  return (
    <ModalContent className="max-w-3xl overflow-y-scroll" ref={ref}>
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

        <button className="mt-8 w-full bg-black text-white py-2 rounded-md flex gap-4 justify-center items-center">
          <span>
            <Image className="invert" src={bookMarkIcon} alt="chart icon" height={12} width={12} />
          </span>
          <span className="text-sm">Favourite Item</span>
        </button>
      </div>
    </ModalContent>
  );
});
