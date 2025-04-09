
import React from 'react';
import { indiaAQIData } from '../utils/mockData';
import { getAQIColor } from '../utils/mockData';

const AQIMap: React.FC = () => {
  // In a real implementation, this would use an actual map library like Mapbox or Google Maps
  // For now, we'll create a placeholder map with city markers
  
  return (
    <div className="bg-white dark:bg-card rounded-lg shadow-sm p-4">
      <h3 className="text-lg font-semibold mb-4">Air Quality Index Map</h3>
      
      <div className="relative w-full h-[400px] bg-gray-100 dark:bg-gray-800 rounded-md overflow-hidden">
        {/* Map Placeholder - In production, replace with actual map integration */}
        <div className="absolute inset-0 flex items-center justify-center">
          <div className="text-gray-400 dark:text-gray-600 text-center">
            <p>Interactive India AQI Map</p>
            <p className="text-sm">Production version would use Mapbox/Google Maps integration</p>
          </div>
        </div>
        
        {/* City Markers - These would be positioned correctly on a real map */}
        <div className="absolute inset-0 p-4">
          {indiaAQIData.map((city) => (
            <div 
              key={city.id}
              className="absolute inline-flex flex-col items-center"
              style={{ 
                top: `${Math.random() * 80}%`, 
                left: `${Math.random() * 80}%`
              }}
            >
              <div 
                className={`w-8 h-8 rounded-full flex items-center justify-center ${getAQIColor(city.category)}`}
              >
                {city.aqi}
              </div>
              <div className="mt-1 text-xs font-medium bg-white dark:bg-gray-900 px-1 py-0.5 rounded shadow-sm">
                {city.city}
              </div>
            </div>
          ))}
        </div>
        
        {/* Legend */}
        <div className="absolute bottom-3 right-3 bg-white dark:bg-gray-900 p-2 rounded-md shadow-md text-xs">
          <h4 className="font-medium mb-1">AQI Legend</h4>
          <div className="flex flex-col space-y-1">
            <div className="flex items-center">
              <div className="w-3 h-3 rounded-full bg-aqi-good mr-1"></div>
              <span>Good (0-50)</span>
            </div>
            <div className="flex items-center">
              <div className="w-3 h-3 rounded-full bg-aqi-moderate mr-1"></div>
              <span>Moderate (51-100)</span>
            </div>
            <div className="flex items-center">
              <div className="w-3 h-3 rounded-full bg-aqi-unhealthySensitive mr-1"></div>
              <span>Unhealthy for Sensitive Groups (101-150)</span>
            </div>
            <div className="flex items-center">
              <div className="w-3 h-3 rounded-full bg-aqi-unhealthy mr-1"></div>
              <span>Unhealthy (151-200)</span>
            </div>
            <div className="flex items-center">
              <div className="w-3 h-3 rounded-full bg-aqi-veryUnhealthy mr-1"></div>
              <span>Very Unhealthy (201-300)</span>
            </div>
            <div className="flex items-center">
              <div className="w-3 h-3 rounded-full bg-aqi-hazardous mr-1"></div>
              <span>Hazardous (301+)</span>
            </div>
          </div>
        </div>
      </div>
      
      <div className="mt-4 text-sm bg-muted dark:bg-muted p-3 rounded-md">
        <p>Note: In the fully implemented version, this would be an interactive map showing real-time air quality data for cities across India, with color-coded markers for AQI levels and the ability to zoom into specific regions.</p>
      </div>
    </div>
  );
};

export default AQIMap;
