
import React from 'react';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, Cell } from 'recharts';
import { RiskData, getBoxPlotData } from '../../services/mockDataService';

interface RiskDistributionChartProps {
  data: RiskData[];
}

const RiskDistributionChart: React.FC<RiskDistributionChartProps> = ({ data }) => {
  const boxPlotData = getBoxPlotData(data);

  // Transform box plot data into stacked bar chart data
  const chartData = boxPlotData.map(item => ({
    specialty: item.specialty,
    min: item.min,
    q1: item.q1 - item.min,
    median: item.median - item.q1,
    q3: item.q3 - item.median,
    max: item.max - item.q3,
    actualMin: item.min,
    actualQ1: item.q1,
    actualMedian: item.median,
    actualQ3: item.q3,
    actualMax: item.max
  }));

  const colors = ['#fecaca', '#fed7aa', '#3b82f6', '#86efac', '#c084fc'];

  const CustomTooltip = ({ active, payload, label }: any) => {
    if (active && payload && payload.length) {
      const data = payload[0].payload;
      return (
        <div className="bg-white p-3 border border-gray-200 rounded-lg shadow-lg">
          <p className="text-sm font-medium text-gray-600 mb-2">{label}</p>
          <div className="space-y-1 text-xs">
            <p><span className="w-3 h-3 inline-block bg-red-300 mr-2"></span>Min: {data.actualMin}</p>
            <p><span className="w-3 h-3 inline-block bg-orange-300 mr-2"></span>Q1: {data.actualQ1}</p>
            <p><span className="w-3 h-3 inline-block bg-blue-500 mr-2"></span>Median: {data.actualMedian}</p>
            <p><span className="w-3 h-3 inline-block bg-green-300 mr-2"></span>Q3: {data.actualQ3}</p>
            <p><span className="w-3 h-3 inline-block bg-purple-300 mr-2"></span>Max: {data.actualMax}</p>
          </div>
        </div>
      );
    }
    return null;
  };

  const Legend = () => (
    <div className="flex justify-center space-x-6 mb-4 text-sm">
      <div className="flex items-center">
        <div className="w-4 h-4 bg-red-300 mr-2"></div>
        <span>Min</span>
      </div>
      <div className="flex items-center">
        <div className="w-4 h-4 bg-orange-300 mr-2"></div>
        <span>Q1</span>
      </div>
      <div className="flex items-center">
        <div className="w-4 h-4 bg-blue-500 mr-2"></div>
        <span>Median</span>
      </div>
      <div className="flex items-center">
        <div className="w-4 h-4 bg-green-300 mr-2"></div>
        <span>Q3</span>
      </div>
      <div className="flex items-center">
        <div className="w-4 h-4 bg-purple-300 mr-2"></div>
        <span>Max</span>
      </div>
    </div>
  );

  return (
    <div className="h-96">
      <Legend />
      <ResponsiveContainer width="100%" height="100%">
        <BarChart data={chartData} margin={{ top: 5, right: 30, left: 20, bottom: 60 }}>
          <CartesianGrid strokeDasharray="3 3" stroke="#f0f0f0" />
          <XAxis 
            dataKey="specialty" 
            stroke="#64748b"
            fontSize={12}
            angle={-45}
            textAnchor="end"
            height={80}
          />
          <YAxis stroke="#64748b" fontSize={12} />
          <Tooltip content={<CustomTooltip />} />
          <Bar dataKey="min" stackId="a" fill={colors[0]} />
          <Bar dataKey="q1" stackId="a" fill={colors[1]} />
          <Bar dataKey="median" stackId="a" fill={colors[2]} />
          <Bar dataKey="q3" stackId="a" fill={colors[3]} />
          <Bar dataKey="max" stackId="a" fill={colors[4]} />
        </BarChart>
      </ResponsiveContainer>
    </div>
  );
};

export default RiskDistributionChart;
