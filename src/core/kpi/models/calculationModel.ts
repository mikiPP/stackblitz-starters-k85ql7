export class CalculationModel {
  name: string;
  description: string;
  formula: string;

  constructor(name: string, description: string, formula: string) {
    this.name = name;
    this.description = description;
    this.formula = formula;
  }
}
