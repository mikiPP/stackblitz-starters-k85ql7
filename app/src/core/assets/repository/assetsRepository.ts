const BASE_PATH = '/api/assets';

export async function getAssetsByFilter(search: string) {
  try {
    const dataWithoutBeingParsed = await fetch(BASE_PATH + '?name=' + search);
    const data = await dataWithoutBeingParsed.json();

    if (dataWithoutBeingParsed.status === 200) {
      return data.assets;
    } else {
      throw new Error('Error fetching assets');
    }
  } catch (error) {
    console.error(error);
    return [];
  }
}

export async function getAssetById(id: number) {
  try {
    const dataWithoutBeingParsed = await fetch('/api/assets' + '?id=' + id);
    const data = await dataWithoutBeingParsed.json();

    if (dataWithoutBeingParsed.status === 200) {
      return data.asset;
    }
  } catch (error) {
    console.error(error);
    return [];
  }
}
