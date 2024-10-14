import { getAssetById } from '../repository/assetsRepository';

export default async function getAssetByIdUseCase(id: number) {
  return await getAssetById(id);
}
