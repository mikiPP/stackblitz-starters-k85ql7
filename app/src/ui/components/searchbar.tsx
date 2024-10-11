'use client';

import Image from 'next/image';
import searchIcon from '@/public/images/search.png';
import removeIcon from '@/public/images/remove.png';
import { useState, useEffect } from 'react';

interface Props {
  search: string;
  setSearch: (search: string) => void;
  onSearch: (search: string) => void;
  onClickClear?: () => void;
  onFocus?: () => void;
  onBlur?: () => void;
}

export default function SearchBar({
  onSearch,
  onClickClear,
  search,
  setSearch,
  onBlur,
  onFocus,
}: Props) {
  useEffect(() => {
    const timmer = setTimeout(() => {
      if (search.length < 3) {
        return;
      }
      onSearch(search);
    }, 350);

    return () => clearTimeout(timmer);
  }, [search, onSearch]);

  return (
    <div className="relative flex items-center gap-x-4 w-full h-12 px-4 py-2 text-sm text-gray-900 bg-white border border-gray-300 rounded-lg shadow-sm">
      <span>
        <Image src={searchIcon} alt="search" width={18} height={18} />
      </span>
      <input
        value={search}
        onBlur={onBlur}
        onFocus={onFocus}
        onChange={(e) => setSearch(e.target.value)}
        type="text"
        placeholder="Type to search..."
        className="w-full focus:outline-none focus:ring-2 focus:ring-primary-500 focus:border-transparent"
      />
      {search ? (
        <button
          type="button"
          className="flex items-center justify-center text-gray-500 w-4"
          onClick={() => {
            setSearch('');
            onClickClear && onClickClear();
          }}
        >
          <span>
            <Image src={removeIcon} alt="search" sizes="cover" />
          </span>
        </button>
      ) : null}
    </div>
  );
}
