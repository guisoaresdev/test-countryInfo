import { Chart, registerables } from 'chart.js';
import { Bar } from 'react-chartjs-2';

Chart.register(...registerables);

const PopulationChart = ({ populationData }) => {
  const chartData = {
    labels: populationData.map((data) => data.year),
    datasets: [
      {
        label: 'População',
        data: populationData.map((data) => data.value),
        backgroundColor: 'rgba(75, 192, 192, 0.6)',
      },
    ],
  };

  return (
    <div>
      <Bar data={chartData} />
    </div>
  );
};

export default PopulationChart;
