import { CalculationModel } from './calculationModel';
import { QuestionModel } from './questionModel';

export class KpiModel {
  id: number;
  name: string;
  description: string;
  businesQuestions: QuestionModel[];
  metricIds: string[];
  calculations: CalculationModel[];
  affiliateApplicability: string[];
  visuals: string[];

  constructor(
    id: number,
    name: string,
    description: string,
    businesQuestions: QuestionModel[],
    metricIds: string[],
    calculations: CalculationModel[],
    affiliateApplicability: string[],
    visuals: string[],
  ) {
    this.id = id;
    this.name = name;
    this.description = description;
    this.businesQuestions = businesQuestions;
    this.metricIds = metricIds;
    this.calculations = calculations;
    this.affiliateApplicability = affiliateApplicability;
    this.visuals = visuals;
  }
}
