import SearchBarWrapper from './components/searchbar';
import Tabs from './components/tabs';
import Featured from './components/tabs/featured';
import Kpi from './components/tabs/kpi';
import Layout from './components/tabs/layout';
import Storyboards from './components/tabs/storyboards';

const featuredCards = Array.from({ length: 4 }, (_, index) => {
  return {
    id: index,
    name: 'Item Name',
    description: 'Short description of the item goes nicely here.',
    date: Math.random() > 0.5 ? '06/27/24' : '',
  };
});

const trendingCards = Array.from({ length: 4 }, (_, index) => {
  return {
    id: index,
    name: 'Item Name',
    description: 'Short description of the item goes nicely here.',
    date: Math.random() > 0.5 ? '06/27/24' : '',
  };
});

const tabs = [
  {
    title: 'Featured',
    element: <Featured featuredCards={featuredCards} trendingCards={trendingCards} />,
  },
  {
    title: 'KPI',
    element: <Kpi />,
  },
  {
    title: 'Layouts',
    element: <Layout />,
  },
  {
    title: 'Storyboards',
    element: <Storyboards />,
  },
];

export default function Library() {
  return (
    <div className="bg-backgroud-color-400">
      <main className="wrapper">
        <div className="py-6 text-center">
          <h1 className="text-5xl font-bold pb-6">Library</h1>
          <p>Browse for assets needed to report and present analysis.</p>
        </div>
        <SearchBarWrapper />
      </main>
      <div className="pt-10 wrapper">
        <Tabs tabs={tabs} />
      </div>
    </div>
  );
}
