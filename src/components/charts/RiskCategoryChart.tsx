
import React from 'react';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts';
import { RiskData, getCategoryData } from '../../services/mockDataService';

interface RiskCategoryChartProps {
  data: RiskData[];
}

const RiskCategoryChart: React.FC<RiskCategoryChartProps> = ({ data }) => {
  const chartData = getCategoryData(data);

  const CustomTooltip = ({ active, payload, label }: any) => {
    if (active && payload && payload.length) {
      const data = payload[0].payload;
      return (
        <div className="bg-white p-4 border border-gray-200 rounded-xl shadow-xl">
          <p className="text-sm font-semibold text-gray-800 mb-1">{data.fullCategory}</p>
          <p className="text-sm text-blue-600 font-medium">
            {`Risk Score: ${payload[0].value}`}
          </p>
        </div>
      );
    }
    return null;
  };

  return (
    <div className="h-80">
      <ResponsiveContainer width="100%" height="100%">
        <BarChart data={chartData} margin={{ top: 20, right: 30, left: 20, bottom: 60 }}>
          <defs>
            <linearGradient id="barGradient" x1="0" y1="0" x2="0" y2="1">
              <stop offset="5%" stopColor="#3b82f6" stopOpacity={0.9}/>
              <stop offset="95%" stopColor="#1d4ed8" stopOpacity={0.7}/>
            </linearGradient>
          </defs>
          <CartesianGrid strokeDasharray="3 3" stroke="#e2e8f0" strokeOpacity={0.5} />
          <XAxis 
            dataKey="category" 
            stroke="#475569"
            fontSize={11}
            fontWeight={500}
            angle={-45}
            textAnchor="end"
            height={80}
            tick={{ fill: '#475569' }}
          />
          <YAxis 
            stroke="#475569" 
            fontSize={12}
            fontWeight={500}
            tick={{ fill: '#475569' }}
            axisLine={{ stroke: '#cbd5e1' }}
            tickLine={{ stroke: '#cbd5e1' }}
          />
          <Tooltip content={<CustomTooltip />} cursor={{ fill: 'rgba(59, 130, 246, 0.1)' }} />
          <Bar 
            dataKey="riskScore" 
            fill="url(#barGradient)"
            radius={[6, 6, 0, 0]}
            stroke="#2563eb"
            strokeWidth={1}
          />
        </BarChart>
      </ResponsiveContainer>
    </div>
  );
};

export default RiskCategoryChart;
