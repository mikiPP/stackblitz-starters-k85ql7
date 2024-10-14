'use client';

import { useState } from 'react';

interface Tab {
  title: string;
  element: JSX.Element;
}

interface Props {
  tabs: Array<Tab>;
}

export default function Tabs({ tabs }: Props) {
  const [activeTab, setActiveTab] = useState(tabs[0]);

  const isActive = (tab: Tab) => {
    return tab.title === activeTab.title;
  };

  return (
    <div>
      <div className="flex p-1 bg-background-color-600 border rounded-lg">
        {tabs.map((tab, index) => (
          <div
            key={tab.title}
            className={`grow text-center transition-all duration-300 ${
              isActive(tab) ? 'bg-white shadow-sm font-bold border rounded-md' : 'text-gray-500'
            }`}
          >
            <button className="py-2 w-full" onClick={() => setActiveTab(tab)}>
              <span>{tab.title}</span>
            </button>
          </div>
        ))}
      </div>
      <div className="mt-10">{activeTab.element}</div>
    </div>
  );
}
