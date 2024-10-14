import { getAllKpis } from '../repository/kpiRepository';

export default async function getAllKpisUseCase() {
  return await getAllKpis();
}
