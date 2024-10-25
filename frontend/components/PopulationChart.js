import { Chart, registerables } from 'chart.js';
import { Bar } from 'react-chartjs-2';

// Registre todos os componentes necessários, incluindo escalas
Chart.register(...registerables);

const PopulationChart = ({ populationData }) => {
  const chartData = {
    labels: populationData.map((data) => data.year), // Extraindo os anos
    datasets: [
      {
        label: 'População',
        data: populationData.map((data) => data.value), // Extraindo os valores populacionais
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
