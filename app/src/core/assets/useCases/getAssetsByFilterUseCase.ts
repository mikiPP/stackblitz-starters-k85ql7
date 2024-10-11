import { getAssetsByFilter } from '../repository/assetsRepository';

export default async function getAssetsUseCase(search: string) {
  return await getAssetsByFilter(search);
}
