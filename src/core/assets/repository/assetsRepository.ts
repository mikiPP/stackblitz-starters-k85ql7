const BASE_PATH = '/api/assets';

export async function getAssetsByFilter(search: string) {
  try {
    const dataWithoutBeingParsed = await fetch(BASE_PATH + '?name=' + search);
    const data = await dataWithoutBeingParsed.json();

    if (dataWithoutBeingParsed.status > 400) {
      throw new Error('Error fetching assets');
    }

    return data.assets;
  } catch (error) {
    console.error(error);
    return [];
  }
}

export async function getAssetById(id: number) {
  try {
    const dataWithoutBeingParsed = await fetch('/api/assets' + '?id=' + id);
    const data = await dataWithoutBeingParsed.json();

    if (dataWithoutBeingParsed.status > 400) {
      throw new Error('Error fetching asset');
    }

    return data.asset;
  } catch (error) {
    console.error(error);
    return [];
  }
}
