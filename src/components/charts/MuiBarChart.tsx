
import React from 'react';
import { BarChart } from '@mui/x-charts/BarChart';
import { RiskData, getCategoryData } from '../../services/mockDataService';

interface MuiBarChartProps {
  data: RiskData[];
}

const MuiBarChart: React.FC<MuiBarChartProps> = ({ data }) => {
  const categoryData = getCategoryData(data);

  // Transform data for MUI BarChart
  const chartData = categoryData.map(item => ({
    category: item.category,
    riskScore: item.riskScore
  }));

  const chartSetting = {
    yAxis: [
      {
        label: 'Risk Score',
        width: 60,
      },
    ],
    series: [{ 
      dataKey: 'riskScore', 
      label: 'Risk Score',
      color: '#3b82f6'
    }],
    height: 280,
  };

  return (
    <div style={{ width: '100%' }}>
      <BarChart
        dataset={chartData}
        xAxis={[{ 
          dataKey: 'category', 
          tickPlacement: 'middle',
          tickLabelPlacement: 'middle'
        }]}
        {...chartSetting}
      />
    </div>
  );
};

export default MuiBarChart;
