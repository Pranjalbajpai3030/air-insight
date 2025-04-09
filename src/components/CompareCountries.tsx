import React, { useState } from 'react';
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from 'recharts';
import { countriesData } from '../utils/mockData';
import { PollutantType } from '../utils/types';

interface CompareCountriesProps {
  selectedCountries?: string[];
  pollutant?: PollutantType;
}

const CompareCountries: React.FC<CompareCountriesProps> = ({ 
  selectedCountries = ['India', 'China', 'USA'], 
  pollutant = 'aqi' 
}) => {
  const [selectedYear, setSelectedYear] = useState<number | null>(null);

  // Format data for the chart
  const chartData = countriesData[0].data.map(yearData => {
    const dataPoint: Record<string, any> = { year: yearData.year };
    
    selectedCountries.forEach(countryName => {
      const country = countriesData.find(c => c.name === countryName);
      if (country) {
        const countryYearData = country.data.find(d => d.year === yearData.year);
        if (countryYearData) {
          dataPoint[countryName] = countryYearData[pollutant as keyof typeof countryYearData];
        }
      }
    });
    
    return dataPoint;
  });

  // Get pollutant name
  const getPollutantName = (poll: PollutantType) => {
    const names = {
      pm25: 'PM₂.₅',
      pm10: 'PM₁₀',
      no2: 'NO₂',
      so2: 'SO₂',
      o3: 'O₃',
      co: 'CO',
      aqi: 'AQI'
    };
    return names[poll] || 'AQI';
  };

  // Country color mapping
  const countryColors = {
    'India': '#6366f1',
    'China': '#f59e0b',
    'USA': '#3b82f6',
    'UK': '#10b981',
    'Germany': '#8b5cf6',
    'Default': '#64748b'
  };

  return (
    <div className="bg-white dark:bg-gray-900 rounded-xl shadow-md border border-gray-100 dark:border-gray-800 p-6">
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-6">
        <div className="space-y-1">
          <h3 className="text-xl font-semibold text-gray-800 dark:text-gray-200">
            {getPollutantName(pollutant)} Trends
          </h3>
          <p className="text-sm text-gray-500 dark:text-gray-400">
            Comparative analysis of selected countries
          </p>
        </div>
        
        <div className="flex flex-wrap gap-3 mt-4 md:mt-0">
          {selectedCountries.map(country => (
            <div 
              key={country}
              className="flex items-center px-3 py-1.5 rounded-full bg-gray-50 dark:bg-gray-800"
            >
              <div 
                className="w-2.5 h-2.5 rounded-full mr-2"
                style={{ backgroundColor: countryColors[country as keyof typeof countryColors] || countryColors.Default }}
              />
              <span className="text-sm font-medium text-gray-700 dark:text-gray-300">
                {country}
              </span>
            </div>
          ))}
        </div>
      </div>

      <div className="h-80 w-full">
        <ResponsiveContainer width="100%" height="100%">
          <LineChart data={chartData}>
            <CartesianGrid 
              strokeDasharray="3 3" 
              stroke="#e5e7eb" 
              strokeOpacity={0.5}
            />
            <XAxis 
              dataKey="year" 
              tick={{ fill: '#6b7280', fontSize: 12 }}
              axisLine={{ stroke: '#e5e7eb' }}
              tickMargin={8}
            />
            <YAxis 
              tick={{ fill: '#6b7280', fontSize: 12 }}
              axisLine={{ stroke: '#e5e7eb' }}
              tickMargin={8}
            />
            <Tooltip 
              content={({ payload }) => (
                <div className="bg-white dark:bg-gray-800 p-4 rounded-lg shadow-xl border border-gray-100 dark:border-gray-700">
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
                        {entry.value}
                      </span>
                    </div>
                  ))}
                </div>
              )}
            />
            {selectedCountries.map(country => (
              <Line 
                key={country}
                type="monotone"
                dataKey={country}
                stroke={countryColors[country as keyof typeof countryColors] || countryColors.Default}
                strokeWidth={2}
                dot={false}
                activeDot={{
                  r: 6,
                  fill: countryColors[country as keyof typeof countryColors] || countryColors.Default,
                  strokeWidth: 2,
                  stroke: '#fff'
                }}
              />
            ))}
          </LineChart>
        </ResponsiveContainer>
      </div>

      {selectedYear && (
        <div className="mt-6 bg-blue-50/50 dark:bg-gray-800 p-4 rounded-lg border border-blue-100 dark:border-gray-700">
          <div className="flex items-center justify-between mb-3">
            <h4 className="font-semibold text-gray-800 dark:text-gray-200">
              {selectedYear} Key Metrics
            </h4>
            <button 
              onClick={() => setSelectedYear(null)}
              className="text-gray-400 hover:text-gray-600 dark:hover:text-gray-300"
            >
              ✕
            </button>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4 text-sm">
            {selectedCountries.map(country => {
              const countryData = countriesData.find(c => c.name === country);
              const yearData = countryData?.data.find(d => d.year === selectedYear);
              
              return yearData ? (
                <div 
                  key={country}
                  className="p-3 rounded-lg bg-white dark:bg-gray-900 border border-gray-100 dark:border-gray-800"
                >
                  <div className="flex items-center space-x-2 mb-2">
                    <div 
                      className="w-2.5 h-2.5 rounded-full"
                      style={{ backgroundColor: countryColors[country as keyof typeof countryColors] || countryColors.Default }}
                    />
                    <span className="font-medium text-gray-700 dark:text-gray-300">
                      {country}
                    </span>
                  </div>
                  <div className="space-y-1.5">
                    <div className="flex justify-between">
                      <span className="text-gray-500 dark:text-gray-400">AQI</span>
                      <span className="font-medium">{yearData.aqi}</span>
                    </div>
                    {['pm25', 'pm10', 'no2'].map(metric => (
                      <div key={metric} className="flex justify-between">
                        <span className="text-gray-500 dark:text-gray-400">
                          {getPollutantName(metric as PollutantType)}
                        </span>
                        <span>{yearData[metric as keyof typeof yearData]}</span>
                      </div>
                    ))}
                  </div>
                </div>
              ) : null;
            })}
          </div>
        </div>
      )}
    </div>
  );
};

export default CompareCountries;