
import React from 'react';
import { hotspotData } from '../utils/mockData';
import { getAQIColor } from '../utils/mockData';
import { HotspotData } from '../utils/types';

interface HotspotMapProps {
  hotspotData?: HotspotData[];
  onHotspotSelect?: (hotspot: HotspotData) => void;
  selectedHotspot?: HotspotData | null;
  timelapseActive?: boolean;
}

const HotspotMap: React.FC<HotspotMapProps> = ({ 
  hotspotData: propHotspotData, 
  onHotspotSelect, 
  selectedHotspot, 
  timelapseActive 
}) => {
  // Use the provided data or fallback to the mock data
  const displayData = propHotspotData || hotspotData;
  
  return (
    <div className="bg-white dark:bg-card rounded-lg shadow-sm p-4">
      <h3 className="text-lg font-semibold mb-4">Pollution Hotspots in India</h3>
      
      <div className="relative w-full h-[500px] bg-gray-100 dark:bg-gray-800 rounded-md overflow-hidden">
        {/* Map Placeholder - In production, replace with actual map integration */}
        <div className="absolute inset-0 flex items-center justify-center">
          <div className="text-gray-400 dark:text-gray-600 text-center">
            <p>Interactive Hotspot Map</p>
            <p className="text-sm">Production version would use heatmap visualization</p>
          </div>
        </div>
        
        {/* Hotspot Markers - These would be positioned correctly on a real map */}
        <div className="absolute inset-0 p-4">
          {displayData.map((hotspot) => {
            // Scale radius based on intensity
            const size = 20 + (hotspot.intensity * 60);
            
            return (
              <div 
                key={hotspot.id}
                className="absolute inline-flex flex-col items-center"
                style={{ 
                  top: `${Math.random() * 80}%`, 
                  left: `${Math.random() * 80}%`,
                }}
                onClick={() => onHotspotSelect && onHotspotSelect(hotspot)}
              >
                <div 
                  className={`rounded-full flex items-center justify-center animate-pulse-slow ${getAQIColor(hotspot.category)}`}
                  style={{
                    width: `${size}px`,
                    height: `${size}px`,
                    opacity: 0.7
                  }}
                >
                </div>
                <div className="mt-1 text-xs font-medium bg-white dark:bg-gray-900 px-1 py-0.5 rounded shadow-sm">
                  {hotspot.name} ({hotspot.aqi})
                </div>
              </div>
            );
          })}
        </div>
        
        {/* Legend */}
        <div className="absolute bottom-3 right-3 bg-white dark:bg-gray-900 p-2 rounded-md shadow-md text-xs">
          <h4 className="font-medium mb-1">Hotspot Intensity</h4>
          <div className="flex flex-col space-y-1">
            <div className="flex items-center">
              <div className="w-3 h-3 rounded-full bg-aqi-hazardous opacity-80 mr-1"></div>
              <span>High (AQI 200+)</span>
            </div>
            <div className="flex items-center">
              <div className="w-3 h-3 rounded-full bg-aqi-unhealthy opacity-80 mr-1"></div>
              <span>Medium (AQI 150-200)</span>
            </div>
            <div className="flex items-center">
              <div className="w-3 h-3 rounded-full bg-aqi-unhealthySensitive opacity-80 mr-1"></div>
              <span>Moderate (AQI 100-150)</span>
            </div>
            <div className="flex items-center">
              <div className="w-3 h-3 rounded-full bg-aqi-moderate opacity-80 mr-1"></div>
              <span>Low (AQI 50-100)</span>
            </div>
          </div>
        </div>
      </div>
      
      <div className="mt-4 grid grid-cols-1 md:grid-cols-2 gap-4">
        <div className="bg-theme-lightBlue dark:bg-accent p-3 rounded-md text-sm">
          <h4 className="font-medium mb-1">What are Hotspots?</h4>
          <p>Pollution hotspots are geographic areas with consistently high levels of air pollution. These regions often have concentrated industrial activity, high population density, or specific geographic features that trap pollutants.</p>
        </div>
        <div className="bg-theme-lightGreen dark:bg-accent p-3 rounded-md text-sm">
          <h4 className="font-medium mb-1">Hotspot Analysis</h4>
          <p>Our platform identifies hotspots using historical data patterns and clustering algorithms. The size of each hotspot indicator represents the area affected, while the color represents pollution severity.</p>
        </div>
      </div>
    </div>
  );
};

export default HotspotMap;
