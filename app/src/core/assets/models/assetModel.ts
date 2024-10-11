class Asset {
  id: number;
  name: string;
  description: string;
  date?: string;

  constructor({
    id,
    name,
    assetType,
    date,
  }: {
    id: number;
    name: string;
    assetType: string;
    date?: string;
  }) {
    this.id = id;
    this.name = name;
    this.description = assetType;
    this.date = date;
  }
}
