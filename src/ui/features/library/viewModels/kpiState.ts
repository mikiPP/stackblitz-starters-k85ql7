import { KpiModel } from '@/src/core/kpi/models/kpiModel';

export interface KpisStateViewModel {
  kpis: KpiModel[];
  selectedKpi: KpiModel | null;
  setKpis(kpis: KpiModel[]): void;
  clearKpis(): void;
  setSelectedKpi(kpi: KpiModel): void;
  clearSelectedKpi(): void;
}
