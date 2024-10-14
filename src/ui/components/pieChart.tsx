import { Pie as PieChartComponent } from 'react-chartjs-2';
import { Chart as ChartJs, ArcElement } from 'chart.js';
import { colors } from '../utils/colors';
import faker from 'faker';
import { getMaximumValue, Time } from '../utils/timeRange';

ChartJs.register(ArcElement);

interface Props {
  chartTitle: string;
  labels: string[];
  time: Time;
}

export default function PieChart({ chartTitle, labels, time }: Props) {
  const data = {
    labels: labels,
    datasets: [
      {
        label: chartTitle,
        data: labels.map(() => faker.datatype.number({ min: 0, max: getMaximumValue(time) })),
        backgroundColor: labels.map((_, index) => colors[index].backgroundColor),
        hoverOffset: 4,
      },
    ],
  };

  return (
    <div className="max-h-96 mx-auto grid">
      <PieChartComponent data={data} />
    </div>
  );
}
