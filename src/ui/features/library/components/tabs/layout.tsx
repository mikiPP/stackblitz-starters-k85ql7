'use client';
import { useUiProvider } from '@/src/ui/providers/ui.provider';
import { useState } from 'react';
import { DataVizModal } from '../dataVizModal';
import { LayoutPage } from '../../viewModels/page';

export default function Layout() {
  const [pages, setPages] = useState<Array<LayoutPage>>([]);
  const [currentPage, setCurrentPage] = useState<number>(0);

  const showModal = useUiProvider((state) => state.showModal);
  const pageToShow = pages.at(currentPage);
  const thereIsNextPage = currentPage < pages.length - 1;
  const thereIsPreviousPage = currentPage > 0;

  const openModal = () => {
    showModal(
      <DataVizModal
        onSubmit={(page: LayoutPage) => {
          setPages([...pages, page]);
        }}
      />,
    );
  };

  return (
    <>
      <div>
        <h3 className="subtitle">Layout</h3>
        <p className="description">Layout components are used to structure the layout of a page.</p>
      </div>
      <div className="flex justify-end mt-4">
        <button className="bg-black text-white py-2 px-4 rounded-md" onClick={() => openModal()}>
          <span>Create a new layout</span>
        </button>
      </div>
      <div>
        {pages.length ? (
          pageToShow && (
            <div className="py-4">
              <div className="flex gap-8 justify-center mb-4">
                <div className="border-r border-background-color-600 flex gap-4">
                  <span className="font-semibold text-sm">Kpi used:</span>
                  <span className="capitalize text-sm">{pageToShow.kpi.name}</span>
                </div>
                <div className="border-r border-background-color-600 flex gap-4">
                  <span className="font-semibold text-sm">Time used: </span>
                  <span className="capitalize text-sm">{pageToShow.time}</span>
                </div>
              </div>
              <div className="max-w-2xl mx-auto grid">{pageToShow.graph}</div>
              {thereIsNextPage || thereIsPreviousPage ? (
                <div className="mt-8 flex justify-center gap-4">
                  {thereIsPreviousPage ? (
                    <button className="outline-btn" onClick={() => setCurrentPage(currentPage - 1)}>
                      Previous
                    </button>
                  ) : null}
                  {thereIsNextPage ? (
                    <button className="outline-btn" onClick={() => setCurrentPage(currentPage + 1)}>
                      Next
                    </button>
                  ) : null}
                </div>
              ) : null}

              <div
                className="mt-8 w-full bg-black text-white rounded-md text-center py-2"
                onClick={() => {
                  navigator.clipboard.writeText(window.location.href);
                }}
              >
                <span className="w-full cursor-pointer">Share</span>
              </div>
            </div>
          )
        ) : (
          <p>There is not any layout at the moment, try to create one.</p>
        )}
      </div>
    </>
  );
}
