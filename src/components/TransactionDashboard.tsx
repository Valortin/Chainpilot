import { Line } from 'react-chartjs-2';
import { Chart as ChartJS, LineElement, PointElement, LinearScale, CategoryScale, Title, Tooltip, Legend } from 'chart.js';
import { TokenTransfer } from '../types/noditTypes';

ChartJS.register(LineElement, PointElement, LinearScale, CategoryScale, Title, Tooltip, Legend);

interface TransactionDashboardProps {
  transfers: TokenTransfer[];
  balance: string;
}

const TransactionDashboard = ({ transfers, balance }: TransactionDashboardProps) => {
  const data = {
    labels: transfers.map((t) => new Date(t.timestamp * 1000).toLocaleDateString()),
    datasets: [
      {
        label: 'Token Value (ETH)',
        data: transfers.map((t) => parseInt(t.value) / 10 ** (t.contract.decimals || 18)),
        borderColor: '#06b6d4',
        backgroundColor: 'rgba(6, 182, 212, 0.2)',
        fill: true,
        tension: 0.4,
      },
    ],
  };

  return (
    <div className="p-4 bg-gray-800 rounded-lg m-4 border-2 border-cyan-400/30">
      <h2 className="text-lg font-bold text-cyan-400">Transaction Trends</h2>
      <p className="text-sm text-gray-300">Current Balance: {balance} ETH</p>
      <div className="mt-2 h-64">
        <Line data={data} options={{ responsive: true, scales: { y: { beginAtZero: true } } }} />
      </div>
    </div>
  );
};

export default TransactionDashboard;