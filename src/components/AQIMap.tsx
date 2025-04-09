
import React from 'react';
import { AQIData } from '../utils/types';

interface AQIMapProps {
  aqiData: AQIData[];
  onCitySelect: (city: AQIData) => void;
  selectedCity: AQIData | null;
}

const AQIMap: React.FC<AQIMapProps> = ({ aqiData, onCitySelect, selectedCity }) => {
  // This is a placeholder for the actual map implementation
  return (
    <div className="w-full h-full bg-slate-100 dark:bg-slate-800 relative">
      <div className="absolute inset-0 flex items-center justify-center">
        <div className="text-gray-500 dark:text-gray-400">
          <p className="text-center">Interactive AQI Map</p>
          <p className="text-sm text-center">(Placeholder for actual map implementation)</p>
        </div>
      </div>
      
      <div className="absolute inset-0 p-4">
        {aqiData.map((city) => (
          <div
            key={city.id}
            onClick={() => onCitySelect(city)}
            className={`
              absolute cursor-pointer transition-all 
              ${selectedCity?.id === city.id ? 'z-10 scale-110' : 'z-0 hover:scale-105'}
            `}
            style={{
              top: `${Math.random() * 80}%`,
              left: `${Math.random() * 80}%`,
            }}
          >
            <div 
              className={`
                w-4 h-4 rounded-full
                ${city.category === 'Good' ? 'bg-green-500' : 
                  city.category === 'Moderate' ? 'bg-yellow-500' : 
                  city.category === 'Unhealthy for Sensitive Groups' ? 'bg-orange-500' : 
                  city.category === 'Unhealthy' ? 'bg-red-500' : 
                  city.category === 'Very Unhealthy' ? 'bg-purple-500' :
                  'bg-gray-500'
                }
                ${selectedCity?.id === city.id ? 'ring-2 ring-white dark:ring-gray-800' : ''}
              `}
            />
            <div className={`
              mt-1 text-xs bg-white dark:bg-gray-900 px-1 py-0.5 rounded shadow-sm
              ${selectedCity?.id === city.id ? 'font-medium' : 'opacity-80'}
            `}>
              {city.city} ({city.aqi})
            </div>
          </div>
        ))}
      </div>
      
      <div className="absolute bottom-4 right-4 bg-white dark:bg-gray-900 p-2 rounded shadow-sm text-xs">
        <div className="font-medium mb-1">AQI Legend</div>
        <div className="space-y-1">
          <div className="flex items-center">
            <div className="w-3 h-3 bg-green-500 rounded-full mr-1" />
            <span>Good (0-50)</span>
          </div>
          <div className="flex items-center">
            <div className="w-3 h-3 bg-yellow-500 rounded-full mr-1" />
            <span>Moderate (51-100)</span>
          </div>
          <div className="flex items-center">
            <div className="w-3 h-3 bg-orange-500 rounded-full mr-1" />
            <span>Unhealthy for Sensitive Groups (101-150)</span>
          </div>
          <div className="flex items-center">
            <div className="w-3 h-3 bg-red-500 rounded-full mr-1" />
            <span>Unhealthy (151-200)</span>
          </div>
          <div className="flex items-center">
            <div className="w-3 h-3 bg-purple-500 rounded-full mr-1" />
            <span>Very Unhealthy (201-300)</span>
          </div>
          <div className="flex items-center">
            <div className="w-3 h-3 bg-gray-500 rounded-full mr-1" />
            <span>Hazardous (301+)</span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AQIMap;
