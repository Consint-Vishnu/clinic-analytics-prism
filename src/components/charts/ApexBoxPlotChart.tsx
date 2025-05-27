
import React from 'react';
import ReactApexChart from 'react-apexcharts';
import { RiskData, getBoxPlotData } from '../../services/mockDataService';

interface ApexBoxPlotChartProps {
  data: RiskData[];
}

const ApexBoxPlotChart: React.FC<ApexBoxPlotChartProps> = ({ data }) => {
  const boxPlotData = getBoxPlotData(data);

  const chartData = boxPlotData.map(item => ({
    x: item.specialty,
    y: [item.min, item.q1, item.median, item.q3, item.max]
  }));

  const options = {
    chart: {
      type: 'boxPlot' as const,
      height: 280,
      toolbar: {
        show: false
      },
      background: 'transparent'
    },
    title: {
      text: 'Risk Score Distribution by Specialty',
      align: 'left' as const,
      style: {
        fontSize: '14px',
        fontWeight: '600',
        color: '#334155'
      }
    },
    plotOptions: {
      boxPlot: {
        colors: {
          upper: '#3b82f6',
          lower: '#60a5fa'
        }
      }
    },
    xaxis: {
      type: 'category' as const,
      labels: {
        style: {
          colors: '#475569',
          fontSize: '10px',
          fontWeight: 500
        },
        rotate: -45
      },
      axisBorder: {
        color: '#cbd5e1'
      },
      axisTicks: {
        color: '#cbd5e1'
      }
    },
    yaxis: {
      title: {
        text: 'Risk Score',
        style: {
          color: '#475569',
          fontSize: '11px',
          fontWeight: 600
        }
      },
      labels: {
        style: {
          colors: '#475569',
          fontSize: '10px'
        }
      }
    },
    grid: {
      borderColor: '#e2e8f0',
      strokeDashArray: 3,
      opacity: 0.5
    },
    tooltip: {
      theme: 'light',
      style: {
        fontSize: '11px'
      }
    }
  };

  const series = [{
    type: 'boxPlot' as const,
    data: chartData
  }];

  return (
    <div className="h-72 overflow-hidden">
      <ReactApexChart 
        options={options} 
        series={series} 
        type="boxPlot" 
        height={280} 
      />
    </div>
  );
};

export default ApexBoxPlotChart;
