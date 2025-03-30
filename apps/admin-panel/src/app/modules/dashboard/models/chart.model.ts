export interface ChartDataSeries {
  name: string | Date;
  value: number;
}

export interface ChartData {
  name: string;
  series: ChartDataSeries[];
}
