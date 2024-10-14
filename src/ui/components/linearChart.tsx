'use client';

import React from 'react';
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend,
} from 'chart.js';
import { Line } from 'react-chartjs-2';
import faker from 'faker';
import { colors } from '../utils/colors';
import { getLabels, getMaximumValue, Time } from '../utils/timeRange';

ChartJS.register(CategoryScale, LinearScale, PointElement, LineElement, Title, Tooltip, Legend);

interface Props {
  chartTitle: string;
  time: Time;
  datasets: string[];
}

export default function LinearChart({ time, chartTitle, datasets }: Props) {
  const labels = getLabels(time);

  const options = {
    responsive: true,
    interaction: {
      mode: 'index' as const,
      intersect: false,
    },
    stacked: false,
    plugins: {
      title: {
        display: true,
        text: chartTitle,
      },
    },
    scales: {
      y: {
        type: 'linear' as const,
        display: true,
        position: 'left' as const,
      },
    },
  };

  const data = {
    labels,
    datasets: datasets.map((name, index) => ({
      label: name,
      data: labels.map(() => faker.datatype.number({ min: 0, max: getMaximumValue(time) })),
      borderColor: colors[index].borderColor,
      backgroundColor: colors[index].backgroundColor,
      yAxisID: 'y',
    })),
  };

  return <Line options={options} data={data} />;
}
