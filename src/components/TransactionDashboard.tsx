import { Line } from 'react-chartjs-2';
import { Chart as ChartJS, LineElement, PointElement, LinearScale, CategoryScale, Title, Tooltip, Legend } from 'chart.js';
import { TokenTransfer } from '../types/noditTypes';

ChartJS.register(LineElement, PointElement, LinearScale, CategoryScale, Title, Tooltip, Legend);

interface TransactionDashboardProps {
  transfers: TokenTransfer[];
}

const TransactionDashboard = ({ transfers }: TransactionDashboardProps) => {
  const data = {
    labels: transfers.map((tx) => new Date(tx.timestamp).toLocaleDateString()),
    datasets: [
      {
        label: 'Transaction Values (ETH)',
        data: transfers.map((tx) => parseFloat(tx.value) / 1e18),
        borderColor: '#06B6D4',
        backgroundColor: 'rgba(6, 182, 212, 0.2)',
        fill: true,
      },
    ],
  };

  return (
    <div className="p-4 bg-gray-700 rounded-lg m-4">
      <h2 className="text-lg font-bold text-cyan-400">Transaction History</h2>
      <Line data={data} options={{ responsive: true, scales: { y: { beginAtZero: true } } }} />
    </div>
  );
};

export default TransactionDashboard;