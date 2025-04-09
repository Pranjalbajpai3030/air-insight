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
  const displayData = propHotspotData || hotspotData;
  
  return (
    <div className="bg-white dark:bg-gray-900 rounded-xl shadow-md border border-gray-100 dark:border-gray-800 p-6">
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-6">
        <div className="space-y-1">
          <h3 className="text-xl font-semibold text-gray-800 dark:text-gray-200">
            Pollution Hotspots in India
          </h3>
          <p className="text-sm text-gray-500 dark:text-gray-400">
            Real-time air quality monitoring and analysis
          </p>
        </div>
        <span className="mt-2 md:mt-0 text-xs font-medium bg-gray-100 dark:bg-gray-800 text-gray-600 dark:text-gray-300 px-3 py-1 rounded-full">
          Live Updates
        </span>
      </div>

      <div className="relative w-full h-[500px] bg-gray-50 dark:bg-gray-950 rounded-xl border border-gray-100 dark:border-gray-800 overflow-hidden">
        {/* Map Placeholder */}
        <div className="absolute inset-0 flex items-center justify-center">
          <div className="text-center space-y-2">
            <div className="text-gray-400 dark:text-gray-700 text-4xl">🌍</div>
            <p className="text-gray-400 dark:text-gray-600 font-medium">Interactive Heatmap</p>
            <p className="text-xs text-gray-400 dark:text-gray-600">Map integration placeholder</p>
          </div>
        </div>

        {/* Hotspot Markers */}
        <div className="absolute inset-0 p-4">
          {displayData.map((hotspot) => {
            const size = 24 + (hotspot.intensity * 80);
            const isSelected = selectedHotspot?.id === hotspot.id;
            
            return (
              <div 
                key={hotspot.id}
                className="absolute inline-flex flex-col items-center transition-transform duration-200 hover:scale-110 cursor-pointer"
                style={{ 
                  top: `${Math.random() * 80}%`, 
                  left: `${Math.random() * 80}%`,
                }}
                onClick={() => onHotspotSelect?.(hotspot)}
              >
                <div 
                  className={`rounded-full flex items-center justify-center 
                    ${isSelected ? 'animate-pulse' : 'animate-pulse-slow'}
                    ${getAQIColor(hotspot.category)}`}
                  style={{
                    width: `${size}px`,
                    height: `${size}px`,
                    opacity: isSelected ? 0.9 : 0.6
                  }}
                >
                  {isSelected && (
                    <div className="absolute inset-0 border-2 border-white/30 rounded-full"></div>
                  )}
                </div>
                <div className={`mt-1 text-xs font-semibold ${
                  isSelected 
                    ? 'bg-blue-600 dark:bg-blue-800 text-white' 
                    : 'bg-white dark:bg-gray-900 text-gray-700 dark:text-gray-300'
                  } px-2 py-1 rounded-full shadow-sm border ${
                    isSelected 
                      ? 'border-blue-700' 
                      : 'border-gray-200 dark:border-gray-700'
                  }`}>
                  {hotspot.name} ({hotspot.aqi})
                </div>
              </div>
            );
          })}
        </div>

        {/* Legend */}
        <div className="absolute bottom-4 right-4 bg-white dark:bg-gray-900 p-3 rounded-xl shadow-lg border border-gray-100 dark:border-gray-800 text-sm">
          <h4 className="font-semibold mb-2 text-gray-700 dark:text-gray-300">AQI Legend</h4>
          <div className="grid grid-cols-2 gap-2">
            {(['Hazardous', 'Unhealthy', 'Sensitive', 'Moderate'] as AQICategory[]).map((category) => (
              <div key={category} className="flex items-center space-x-2">
                <div 
                  className={`w-3 h-3 rounded-full ${getAQIColor(category)}`}
                />
                <span className="text-gray-600 dark:text-gray-400">{category}</span>
              </div>
            ))}
          </div>
        </div>
      </div>

      <div className="mt-6 grid grid-cols-1 md:grid-cols-2 gap-4">
        <div className="bg-gradient-to-br from-blue-50 to-blue-100 dark:from-gray-800 dark:to-gray-900 p-4 rounded-xl border border-blue-100 dark:border-gray-700">
          <h4 className="font-semibold text-gray-700 dark:text-gray-300 mb-2 flex items-center">
            <span className="mr-2">📌</span>
            Understanding Hotspots
          </h4>
          <p className="text-sm text-gray-600 dark:text-gray-400">
            Areas with persistent high pollution levels due to industrial clusters, 
            traffic congestion, or geographical factors that trap pollutants.
          </p>
        </div>
        
        <div className="bg-gradient-to-br from-green-50 to-green-100 dark:from-gray-800 dark:to-gray-900 p-4 rounded-xl border border-green-100 dark:border-gray-700">
          <h4 className="font-semibold text-gray-700 dark:text-gray-300 mb-2 flex items-center">
            <span className="mr-2">🔍</span>
            Detection Methodology
          </h4>
          <p className="text-sm text-gray-600 dark:text-gray-400">
            Combining satellite data, ground sensors, and machine learning to 
            identify patterns. Size indicates affected area, color shows severity.
          </p>
        </div>
      </div>
    </div>
  );
};

export default HotspotMap;