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

  const getDataset = () => {
    const allDatasets = historicalTrendData.datasets;
    const colors = {
      pm25: '#6366f1',
      pm10: '#f59e0b',
      no2: '#10b981',
      so2: '#8b5cf6'
    };

    return allDatasets.map(dataset => ({
      ...dataset,
      borderColor: colors[pollutant as keyof typeof colors] || '#64748b',
      backgroundColor: `${colors[pollutant as keyof typeof colors]}30` || '#64748b30'
    }));
  };

  const chartData = historicalTrendData.labels.map((month, index) => {
    const dataPoint: Record<string, any> = { name: month };
    getDataset().forEach(dataset => {
      dataPoint[dataset.label] = dataset.data[index];
    });
    return dataPoint;
  });

  return (
    <div className="bg-white dark:bg-gray-900 rounded-xl shadow-md border border-gray-100 dark:border-gray-800 p-6">
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-6">
        <div className="space-y-1">
          <h3 className="text-xl font-semibold text-gray-800 dark:text-gray-200">
            Pollution Concentration Trends
          </h3>
          <p className="text-sm text-gray-500 dark:text-gray-400">
            {timeFilter === 'monthly' ? 'Monthly average' : 'Daily average'} measurements
          </p>
        </div>
        
        {activeInfo && (
          <div className="mt-2 md:mt-0 bg-gradient-to-r from-blue-50 to-cyan-50 dark:from-gray-800 dark:to-gray-700 px-3 py-1.5 rounded-full text-sm border border-blue-100 dark:border-gray-700">
            <span className="font-medium text-blue-600 dark:text-blue-400">{activeInfo.name}</span>
            <span className="text-gray-600 dark:text-gray-300 ml-2">{activeInfo.unit}</span>
          </div>
        )}
      </div>

      <div className="h-80 w-full">
        <ResponsiveContainer width="100%" height="100%">
          {chartType === 'line' ? (
            <LineChart data={chartData}>
              <CartesianGrid 
                strokeDasharray="3 3" 
                stroke="#e5e7eb" 
                strokeOpacity={0.5}
              />
              <XAxis 
                dataKey="name" 
                tick={{ fill: '#6b7280', fontSize: 12 }}
                axisLine={{ stroke: '#e5e7eb' }}
              />
              <YAxis 
                tick={{ fill: '#6b7280', fontSize: 12 }}
                axisLine={{ stroke: '#e5e7eb' }}
              />
              <Tooltip 
                content={({ payload }) => (
                  <div className="bg-white dark:bg-gray-800 p-3 rounded-lg shadow-xl border border-gray-100 dark:border-gray-700">
                    {payload?.map((entry, index) => (
                      <div key={index} className="flex items-center space-x-2 text-sm">
                        <div 
                          className="w-2.5 h-2.5 rounded-full"
                          style={{ backgroundColor: entry.color }}
                        />
                        <span className="font-medium text-gray-700 dark:text-gray-200">
                          {entry.name}:
                        </span>
                        <span className="text-gray-600 dark:text-gray-400">
                          {entry.value} μg/m³
                        </span>
                      </div>
                    ))}
                  </div>
                )}
              />
              <Legend 
                wrapperStyle={{ paddingTop: '10px' }}
                formatter={(value) => (
                  <span className="text-sm text-gray-600 dark:text-gray-300">{value}</span>
                )}
              />
              {getDataset().map((dataset, index) => (
                <Line 
                  key={index}
                  type="monotone" 
                  dataKey={dataset.label} 
                  stroke={dataset.borderColor}
                  strokeWidth={2}
                  dot={false}
                  activeDot={{
                    r: 6,
                    fill: dataset.borderColor,
                    stroke: '#fff',
                    strokeWidth: 2
                  }}
                />
              ))}
            </LineChart>
          ) : (
            <BarChart data={chartData}>
              <CartesianGrid 
                strokeDasharray="3 3" 
                stroke="#e5e7eb" 
                strokeOpacity={0.5}
              />
              <XAxis 
                dataKey="name" 
                tick={{ fill: '#6b7280', fontSize: 12 }}
                axisLine={{ stroke: '#e5e7eb' }}
              />
              <YAxis 
                tick={{ fill: '#6b7280', fontSize: 12 }}
                axisLine={{ stroke: '#e5e7eb' }}
              />
              <Tooltip 
                content={({ payload }) => (
                  <div className="bg-white dark:bg-gray-800 p-3 rounded-lg shadow-xl border border-gray-100 dark:border-gray-700">
                    {payload?.map((entry, index) => (
                      <div key={index} className="flex items-center space-x-2 text-sm">
                        <div 
                          className="w-2.5 h-2.5 rounded-full"
                          style={{ backgroundColor: entry.color }}
                        />
                        <span className="font-medium text-gray-700 dark:text-gray-200">
                          {entry.name}:
                        </span>
                        <span className="text-gray-600 dark:text-gray-400">
                          {entry.value} μg/m³
                        </span>
                      </div>
                    ))}
                  </div>
                )}
              />
              <Legend 
                wrapperStyle={{ paddingTop: '10px' }}
                formatter={(value) => (
                  <span className="text-sm text-gray-600 dark:text-gray-300">{value}</span>
                )}
              />
              {getDataset().map((dataset, index) => (
                <Bar 
                  key={index}
                  dataKey={dataset.label} 
                  fill={dataset.borderColor}
                  opacity={0.8}
                  radius={[4, 4, 0, 0]}
                />
              ))}
            </BarChart>
          )}
        </ResponsiveContainer>
      </div>

      {activeInfo && (
        <div className="mt-6 grid grid-cols-1 md:grid-cols-2 gap-4">
          <div className="bg-gradient-to-br from-blue-50 to-blue-100 dark:from-gray-800 dark:to-gray-900 p-4 rounded-xl border border-blue-100 dark:border-gray-700">
            <h4 className="font-semibold text-gray-700 dark:text-gray-300 mb-2 flex items-center">
              <span className="mr-2">⚠️</span>
              Health Impacts
            </h4>
            <p className="text-sm text-gray-600 dark:text-gray-400">{activeInfo.effects}</p>
          </div>
          
          <div className="bg-gradient-to-br from-green-50 to-green-100 dark:from-gray-800 dark:to-gray-900 p-4 rounded-xl border border-green-100 dark:border-gray-700">
            <h4 className="font-semibold text-gray-700 dark:text-gray-300 mb-2 flex items-center">
              <span className="mr-2">🏭</span>
              Primary Sources
            </h4>
            <p className="text-sm text-gray-600 dark:text-gray-400">{activeInfo.sources}</p>
          </div>
        </div>
      )}
    </div>
  );
};

export default AQIChart;