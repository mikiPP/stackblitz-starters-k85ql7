import SearchBarWrapper from '../components/searchbar';
import NextLink from 'next/link';

export default function LibraryFilterView() {
  return (
    <div className="bg-backgroud-color-400 min-h-screen relative">
      <div className="absolute right-4 top-4">
        <NextLink href={'/request'}>
          <span className=" bg-gray-600  px-4 py-2 rounded-lg text-gray-200">Request</span>
        </NextLink>
      </div>
      <main className="wrapper">
        <div className="py-6 text-center">
          <h1 className="text-5xl font-bold pb-6">Library</h1>
          <p>Browse for assets needed to report and present analysis.</p>
        </div>
        <SearchBarWrapper />
      </main>
    </div>
  );
}
