import { NextResponse } from 'next/server';

const assets = [
  { id: 1, name: 'random image', description: 'An image from my vacations in 2023' },
  { id: 2, name: 'an amazing video', description: 'My video when i was graduated in 2020' },
  { id: 3, name: 'my favourite song', description: 'This song remembers me when i was young ' },
  { id: 4, name: 'my cv', description: 'This is an important document that helps me to get a job' },
  {
    id: 5,
    name: 'birthday image',
    description: 'An image for my 25 birthday, what an amazing day!',
  },
];

export async function GET(request: Request) {
  const params = new URL(request.url).searchParams;

  const id = params.get('id');

  if (id) {
    const asset = assets.find((asset) => asset.id === parseInt(id));

    if (asset) {
      return NextResponse.json({ asset }, { status: 200 });
    }
    return NextResponse.json({ message: 'Asset not found' }, { status: 404 });
  }

  const name = params.get('name');
  const filteredAssets = assets.filter((asset) => asset.name.includes(name ?? ''));

  if (filteredAssets.length === 0) {
    return NextResponse.json({ message: 'No assets found' }, { status: 404 });
  }

  return NextResponse.json({ assets: filteredAssets }, { status: 200 });
}
