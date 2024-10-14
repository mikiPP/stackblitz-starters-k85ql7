import { KpiModel } from '@/src/core/kpi/models/kpiModel';
import { Time } from '../../../utils/timeRange';

export interface LayoutPage {
  time: Time;
  chart: string;
  kpi: KpiModel;
  graph: JSX.Element;
}
