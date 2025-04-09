
import React, { useEffect, useState } from 'react';
import { BarChart, Bar, LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from 'recharts';
import { historicalTrendData, pollutantInfo } from '../utils/mockData';
import { PollutantType, TimeFilter } from '../utils/types';

interface AQIChartProps {
  chartType?: 'line' | 'bar';
  pollutant?: PollutantType;
  timeFilter?: TimeFilter;
}

const AQIChart: React.FC<AQIChartProps> = ({ 
  chartType = 'line', 
  pollutant = 'pm25', 
  timeFilter = 'monthly' 
}) => {
  const [activeInfo, setActiveInfo] = useState<typeof pollutantInfo.pm25 | null>(null);
  
  useEffect(() => {
    if (pollutant && pollutantInfo[pollutant as keyof typeof pollutantInfo]) {
      setActiveInfo(pollutantInfo[pollutant as keyof typeof pollutantInfo]);
    } else {
      setActiveInfo(null);
    }
  }, [pollutant]);

  // Get dataset based on pollutant
  const getDataset = () => {
    const allDatasets = historicalTrendData.datasets;
    
    if (pollutant === 'pm25') {
      return [allDatasets[0]];
    } else if (pollutant === 'pm10') {
      return [allDatasets[1]];
    } else if (pollutant === 'no2') {
      return [allDatasets[2]];
    } else if (pollutant === 'so2') {
      return [allDatasets[3]];
    }
    
    // Return all by default
    return allDatasets;
  };

  const chartData = historicalTrendData.labels.map((month, index) => {
    const dataPoint: Record<string, any> = { name: month };
    
    getDataset().forEach(dataset => {
      dataPoint[dataset.label] = dataset.data[index];
    });
    
    return dataPoint;
  });

  return (
    <div className="bg-white dark:bg-card rounded-lg shadow-sm p-4">
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-4">
        <h3 className="text-lg font-semibold">Pollutant Trends</h3>
        
        {activeInfo && (
          <div className="mt-2 md:mt-0 bg-theme-lightBlue dark:bg-accent p-2 rounded-md text-sm">
            <span className="font-medium">{activeInfo.name}:</span> {activeInfo.description}
          </div>
        )}
      </div>

      <div className="h-80 w-full">
        <ResponsiveContainer width="100%" height="100%">
          {chartType === 'line' ? (
            <LineChart data={chartData}>
              <CartesianGrid strokeDasharray="3 3" stroke="#e0e0e0" />
              <XAxis dataKey="name" />
              <YAxis />
              <Tooltip 
                contentStyle={{ 
                  backgroundColor: 'rgba(255, 255, 255, 0.9)', 
                  borderRadius: '8px',
                  border: 'none',
                  boxShadow: '0 4px 6px -1px rgba(0, 0, 0, 0.1)'
                }} 
              />
              <Legend />
              {getDataset().map((dataset, index) => (
                <Line 
                  key={index}
                  type="monotone" 
                  dataKey={dataset.label} 
                  stroke={dataset.borderColor} 
                  fill={dataset.backgroundColor}
                  activeDot={{ r: 6 }}
                  strokeWidth={2}
                />
              ))}
            </LineChart>
          ) : (
            <BarChart data={chartData}>
              <CartesianGrid strokeDasharray="3 3" stroke="#e0e0e0" />
              <XAxis dataKey="name" />
              <YAxis />
              <Tooltip 
                contentStyle={{ 
                  backgroundColor: 'rgba(255, 255, 255, 0.9)', 
                  borderRadius: '8px',
                  border: 'none',
                  boxShadow: '0 4px 6px -1px rgba(0, 0, 0, 0.1)'
                }}
              />
              <Legend />
              {getDataset().map((dataset, index) => (
                <Bar 
                  key={index}
                  dataKey={dataset.label} 
                  fill={dataset.borderColor} 
                  barSize={20}
                  opacity={0.8}
                />
              ))}
            </BarChart>
          )}
        </ResponsiveContainer>
      </div>

      {activeInfo && (
        <div className="mt-4 grid grid-cols-1 md:grid-cols-2 gap-4 text-sm">
          <div className="bg-theme-lightBlue dark:bg-accent p-3 rounded-md">
            <h4 className="font-semibold mb-1">Health Effects</h4>
            <p>{activeInfo.effects}</p>
          </div>
          <div className="bg-theme-lightGreen dark:bg-accent p-3 rounded-md">
            <h4 className="font-semibold mb-1">Common Sources</h4>
            <p>{activeInfo.sources}</p>
          </div>
        </div>
      )}
    </div>
  );
};

export default AQIChart;
