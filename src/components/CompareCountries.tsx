
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
    switch(poll) {
      case 'pm25': return 'PM2.5';
      case 'pm10': return 'PM10';
      case 'no2': return 'NO₂';
      case 'so2': return 'SO₂';
      case 'o3': return 'O₃';
      case 'co': return 'CO';
      default: return 'AQI';
    }
  };

  // Get color for country
  const getCountryColor = (country: string) => {
    switch(country) {
      case 'India': return '#F44336';
      case 'China': return '#FF9800';
      case 'USA': return '#2196F3';
      case 'UK': return '#4CAF50';
      case 'Germany': return '#9C27B0';
      default: return '#607D8B';
    }
  };

  // Handle year click
  const handleYearClick = (data: any) => {
    if (data && data.activePayload && data.activePayload.length > 0) {
      setSelectedYear(data.activePayload[0].payload.year);
    }
  };

  return (
    <div className="bg-white dark:bg-card rounded-lg shadow-sm p-4">
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-4">
        <h3 className="text-lg font-semibold">
          {getPollutantName(pollutant)} Comparison
        </h3>
        
        <div className="flex flex-wrap mt-2 md:mt-0 gap-2">
          {selectedCountries.map(country => (
            <div 
              key={country}
              className="flex items-center text-sm font-medium"
            >
              <div 
                className="w-3 h-3 rounded-full mr-1"
                style={{ backgroundColor: getCountryColor(country) }}
              ></div>
              {country}
            </div>
          ))}
        </div>
      </div>

      <div className="h-80 w-full">
        <ResponsiveContainer width="100%" height="100%">
          <LineChart 
            data={chartData}
            onClick={handleYearClick}
          >
            <CartesianGrid strokeDasharray="3 3" stroke="#e0e0e0" />
            <XAxis dataKey="year" />
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
            {selectedCountries.map(country => (
              <Line 
                key={country}
                type="monotone" 
                dataKey={country} 
                stroke={getCountryColor(country)}
                activeDot={{ r: 6 }}
                strokeWidth={2}
              />
            ))}
          </LineChart>
        </ResponsiveContainer>
      </div>

      {selectedYear && (
        <div className="mt-4 bg-theme-lightBlue dark:bg-accent p-3 rounded-md">
          <h4 className="font-semibold mb-2">
            {selectedYear} Comparison Insights
          </h4>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4 text-sm">
            {selectedCountries.map(country => {
              const countryData = countriesData.find(c => c.name === country);
              const yearData = countryData?.data.find(d => d.year === selectedYear);
              
              if (!yearData) return null;
              
              return (
                <div key={country} className="space-y-1">
                  <p className="font-medium">{country}</p>
                  <div className="flex justify-between">
                    <span>{getPollutantName(pollutant)}:</span>
                    <span className="font-medium">{yearData[pollutant as keyof typeof yearData]}</span>
                  </div>
                  
                  {pollutant === 'aqi' && (
                    <>
                      <div className="flex justify-between">
                        <span>PM2.5:</span>
                        <span>{yearData.pm25}</span>
                      </div>
                      <div className="flex justify-between">
                        <span>PM10:</span>
                        <span>{yearData.pm10}</span>
                      </div>
                    </>
                  )}
                </div>
              );
            })}
          </div>
        </div>
      )}
    </div>
  );
};

export default CompareCountries;
