// components/PopulationChart.js
import { Chart, registerables } from 'chart.js';
import { Bar } from 'react-chartjs-2';

// Registre todos os componentes necessários, incluindo escalas
Chart.register(...registerables);

const PopulationChart = ({ populationData }) => {
  // Certifique-se de que populationData é um array e não nulo
  const data = {
    labels: populationData ? populationData.map((item) => item.year) : [],
    datasets: [
      {
        label: 'Population',
        data: populationData ? populationData.map((item) => item.value) : [], // Mapeia o valor da população
        backgroundColor: 'rgba(75, 192, 192, 0.6)',
      },
    ],
  };

  return <Bar data={data} />;
};

export default PopulationChart;
