const BASE_PATH = '/api/kpis';

export async function getAllKpis() {
  try {
    const dataWithoutBeingParsed = await fetch(BASE_PATH);
    const data = await dataWithoutBeingParsed.json();

    if (dataWithoutBeingParsed.status > 400) {
      throw new Error('Error fetching kpis');
    }

    return data.kpis;
  } catch (error) {
    console.error(error);
    return [];
  }
}
