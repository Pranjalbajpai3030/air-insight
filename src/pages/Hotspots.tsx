
import React, { useState, useEffect } from 'react';
import { useQuery } from '@tanstack/react-query';
import Navbar from '../components/Navbar';
import HotspotMap from '../components/HotspotMap';
import { fetchHotspotData } from '../utils/geminiAPI';
import { HotspotData } from '../utils/types';
import { AlertTriangle, ThermometerSun, Factory, Car, Building, Wind, Info } from 'lucide-react';

const Hotspots = () => {
  const [timelapseActive, setTimelapseActive] = useState(false);
  const [selectedHotspot, setSelectedHotspot] = useState<HotspotData | null>(null);
  
  // Fetch hotspot data
  const { data: hotspotData, isLoading } = useQuery({
    queryKey: ['hotspotData'],
    queryFn: fetchHotspotData,
    refetchOnWindowFocus: false,
    staleTime: 1000 * 60 * 10, // 10 minutes
  });
  
  // When data is loaded, select the first hotspot by default
  useEffect(() => {
    if (hotspotData && hotspotData.length > 0 && !selectedHotspot) {
      setSelectedHotspot(hotspotData[0]);
    }
  }, [hotspotData, selectedHotspot]);

  // Handle hotspot selection
  const handleHotspotSelect = (hotspot: HotspotData) => {
    setSelectedHotspot(hotspot);
  };

  // Toggle timelapse animation
  const toggleTimelapse = () => {
    setTimelapseActive(!timelapseActive);
  };

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-950">
      <Navbar />
      <div className="container mx-auto px-4 py-8 max-w-7xl">
        <h1 className="text-3xl md:text-4xl font-bold mb-8 text-center text-gray-800 dark:text-gray-100">
          Air Pollution Hotspots in India
        </h1>
        
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
          <div className="md:col-span-2 bg-white dark:bg-gray-800 rounded-lg shadow-sm p-4">
            <div className="flex justify-between items-center mb-4">
              <h2 className="text-xl font-semibold text-gray-800 dark:text-gray-100">
                Pollution Intensity Map
              </h2>
              
              <button
                onClick={toggleTimelapse}
                className={`px-3 py-1 rounded-full text-sm font-medium ${
                  timelapseActive 
                    ? 'bg-red-100 text-red-800 dark:bg-red-900/30 dark:text-red-200' 
                    : 'bg-blue-100 text-blue-800 dark:bg-blue-900/30 dark:text-blue-200'
                }`}
              >
                {timelapseActive ? 'Stop Animation' : 'Start Timelapse'}
              </button>
            </div>
            
            <div className="h-[500px] w-full relative">
              {isLoading ? (
                <div className="absolute inset-0 flex items-center justify-center">
                  <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-theme-blue"></div>
                </div>
              ) : (
                <HotspotMap 
                  hotspotData={hotspotData || []} 
                  onHotspotSelect={handleHotspotSelect}
                  selectedHotspot={selectedHotspot}
                  timelapseActive={timelapseActive}
                />
              )}
            </div>
          </div>
          
          <div className="bg-white dark:bg-gray-800 rounded-lg shadow-sm p-4">
            <h2 className="text-xl font-semibold mb-4 text-gray-800 dark:text-gray-100">
              Hotspot Details
            </h2>
            
            {selectedHotspot ? (
              <div>
                <div className="mb-4">
                  <h3 className="text-lg font-medium text-gray-800 dark:text-gray-100">
                    {selectedHotspot.name}
                  </h3>
                  
                  <div className="flex mt-1">
                    <span 
                      className={`px-2 py-0.5 rounded-full text-xs font-medium ${
                        selectedHotspot.category === 'Good' ? 'bg-green-100 text-green-800 dark:bg-green-900/30 dark:text-green-200' :
                        selectedHotspot.category === 'Moderate' ? 'bg-yellow-100 text-yellow-800 dark:bg-yellow-900/30 dark:text-yellow-200' :
                        selectedHotspot.category === 'Unhealthy for Sensitive Groups' ? 'bg-orange-100 text-orange-800 dark:bg-orange-900/30 dark:text-orange-200' :
                        selectedHotspot.category === 'Unhealthy' ? 'bg-red-100 text-red-800 dark:bg-red-900/30 dark:text-red-200' :
                        selectedHotspot.category === 'Very Unhealthy' ? 'bg-purple-100 text-purple-800 dark:bg-purple-900/30 dark:text-purple-200' :
                        'bg-gray-100 text-gray-800 dark:bg-gray-900/30 dark:text-gray-200'
                      }`}
                    >
                      {selectedHotspot.category}
                    </span>
                  </div>
                </div>
                
                <div className="grid grid-cols-2 gap-4 mb-6">
                  <div className="stat">
                    <div className="flex justify-between items-start">
                      <span className="stat-label">AQI</span>
                      <div className="p-2 bg-theme-red/10 rounded-full">
                        <AlertTriangle className="h-5 w-5 text-theme-red" />
                      </div>
                    </div>
                    <div className="stat-value">{selectedHotspot.aqi}</div>
                  </div>
                  
                  <div className="stat">
                    <div className="flex justify-between items-start">
                      <span className="stat-label">Intensity</span>
                      <div className="p-2 bg-theme-orange/10 rounded-full">
                        <ThermometerSun className="h-5 w-5 text-theme-orange" />
                      </div>
                    </div>
                    <div className="stat-value">{Math.round(selectedHotspot.intensity * 100)}%</div>
                  </div>
                  
                  <div className="stat">
                    <div className="flex justify-between items-start">
                      <span className="stat-label">Affected Area</span>
                      <div className="p-2 bg-theme-blue/10 rounded-full">
                        <Building className="h-5 w-5 text-theme-blue" />
                      </div>
                    </div>
                    <div className="stat-value">{selectedHotspot.radius} km</div>
                  </div>
                  
                  <div className="stat">
                    <div className="flex justify-between items-start">
                      <span className="stat-label">Coordinates</span>
                      <div className="p-2 bg-theme-purple/10 rounded-full">
                        <Info className="h-5 w-5 text-theme-purple" />
                      </div>
                    </div>
                    <div className="stat-value text-sm">
                      {selectedHotspot.latitude.toFixed(4)}, {selectedHotspot.longitude.toFixed(4)}
                    </div>
                  </div>
                </div>
                
                <div className="rounded-lg bg-gray-50 dark:bg-gray-700 p-4 mb-4">
                  <h4 className="font-medium text-gray-800 dark:text-gray-100 mb-2">
                    Primary Pollution Sources
                  </h4>
                  <div className="space-y-2">
                    <div className="flex items-center text-sm text-gray-600 dark:text-gray-300">
                      <div className="h-2 w-2 bg-red-500 rounded-full mr-2"></div>
                      <span>Industrial Emissions</span>
                      <div className="ml-auto font-medium">
                        {selectedHotspot.intensity > 0.7 ? 'High' : selectedHotspot.intensity > 0.4 ? 'Medium' : 'Low'}
                      </div>
                    </div>
                    <div className="flex items-center text-sm text-gray-600 dark:text-gray-300">
                      <div className="h-2 w-2 bg-blue-500 rounded-full mr-2"></div>
                      <span>Vehicular Pollution</span>
                      <div className="ml-auto font-medium">
                        {selectedHotspot.aqi > 200 ? 'High' : selectedHotspot.aqi > 100 ? 'Medium' : 'Low'}
                      </div>
                    </div>
                    <div className="flex items-center text-sm text-gray-600 dark:text-gray-300">
                      <div className="h-2 w-2 bg-green-500 rounded-full mr-2"></div>
                      <span>Construction Dust</span>
                      <div className="ml-auto font-medium">
                        {selectedHotspot.radius > 40 ? 'High' : selectedHotspot.radius > 20 ? 'Medium' : 'Low'}
                      </div>
                    </div>
                    <div className="flex items-center text-sm text-gray-600 dark:text-gray-300">
                      <div className="h-2 w-2 bg-yellow-500 rounded-full mr-2"></div>
                      <span>Power Generation</span>
                      <div className="ml-auto font-medium">
                        {selectedHotspot.aqi > 150 && selectedHotspot.intensity > 0.6 ? 'High' : 'Medium'}
                      </div>
                    </div>
                  </div>
                </div>
                
                <div>
                  <h4 className="font-medium text-gray-800 dark:text-gray-100 mb-2">
                    Recommendations
                  </h4>
                  <ul className="list-disc list-inside space-y-1 text-sm text-gray-600 dark:text-gray-300">
                    <li>Increase air quality monitoring stations in the area</li>
                    <li>Implement stricter emission controls for industries</li>
                    <li>Promote public transportation to reduce vehicular pollution</li>
                    <li>Develop green buffer zones around critical areas</li>
                    <li>Issue timely health advisories for local residents</li>
                  </ul>
                </div>
              </div>
            ) : (
              <div className="flex items-center justify-center h-[400px] text-gray-500 dark:text-gray-400">
                Select a hotspot on the map to view details
              </div>
            )}
          </div>
        </div>
        
        <div className="bg-white dark:bg-gray-800 rounded-lg shadow-sm p-6">
          <h2 className="text-xl font-semibold mb-4 text-gray-800 dark:text-gray-100">
            Understanding Pollution Hotspots
          </h2>
          
          <div className="space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              <div className="bg-gray-50 dark:bg-gray-700 p-4 rounded-lg">
                <div className="flex items-start">
                  <div className="bg-theme-red/10 p-1 rounded mr-2 mt-0.5">
                    <Factory className="h-4 w-4 text-theme-red" />
                  </div>
                  <div>
                    <span className="font-medium">Industrial Clusters:</span> Areas with high concentration of manufacturing, power generation, and processing facilities contributing to elevated levels of pollutants like SO₂, NO₂, and particulate matter.
                  </div>
                </div>
              </div>
              
              <div className="bg-gray-50 dark:bg-gray-700 p-4 rounded-lg">
                <div className="flex items-start">
                  <div className="bg-theme-blue/10 p-1 rounded mr-2 mt-0.5">
                    <Car className="h-4 w-4 text-theme-blue" />
                  </div>
                  <div>
                    <span className="font-medium">Transportation Corridors:</span> Major highways, urban intersections, and transportation hubs with high vehicular density contributing to NO₂, CO, and PM2.5 emissions.
                  </div>
                </div>
              </div>
              
              <div className="bg-gray-50 dark:bg-gray-700 p-4 rounded-lg">
                <div className="flex items-start">
                  <div className="bg-theme-indigo/10 p-1 rounded mr-2 mt-0.5">
                    <Building className="h-4 w-4 text-theme-indigo" />
                  </div>
                  <div>
                    <span className="font-medium">Urban Density:</span> Highly populated areas with concentrated emissions from residential, commercial, and transportation sources.
                  </div>
                </div>
              </div>
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="space-y-4">
                <h3 className="text-lg font-medium text-gray-800 dark:text-gray-100">
                  Hotspot Formation Factors
                </h3>
                <ul className="space-y-2 text-gray-600 dark:text-gray-300">
                  <li className="flex items-start">
                    <span className="text-theme-blue font-bold mr-2">•</span>
                    <span><strong>Emission Sources:</strong> Concentration of pollution-generating activities in specific areas</span>
                  </li>
                  <li className="flex items-start">
                    <span className="text-theme-blue font-bold mr-2">•</span>
                    <span><strong>Geographical Features:</strong> Valleys, basins, and areas with limited air circulation that trap pollutants</span>
                  </li>
                  <li className="flex items-start">
                    <span className="text-theme-blue font-bold mr-2">•</span>
                    <span><strong>Meteorological Conditions:</strong> Temperature inversions, low wind speeds, and humidity that concentrate pollutants</span>
                  </li>
                  <li className="flex items-start">
                    <span className="text-theme-blue font-bold mr-2">•</span>
                    <span><strong>Seasonal Variations:</strong> Agricultural burning, winter heating, and seasonal industrial activities</span>
                  </li>
                </ul>
              </div>
              
              <div className="space-y-4">
                <h3 className="text-lg font-medium text-gray-800 dark:text-gray-100">
                  Mitigation Approaches
                </h3>
                <ul className="space-y-2 text-gray-600 dark:text-gray-300">
                  <li className="flex items-start">
                    <span className="text-green-500 font-bold mr-2">•</span>
                    <span><strong>Source Control:</strong> Regulating emissions at their origin through improved technologies and standards</span>
                  </li>
                  <li className="flex items-start">
                    <span className="text-green-500 font-bold mr-2">•</span>
                    <span><strong>Urban Planning:</strong> Redesigning city layouts to improve ventilation and reduce concentrated emissions</span>
                  </li>
                  <li className="flex items-start">
                    <span className="text-green-500 font-bold mr-2">•</span>
                    <span><strong>Green Infrastructure:</strong> Developing vegetation barriers and urban forests to absorb pollutants</span>
                  </li>
                  <li className="flex items-start">
                    <span className="text-green-500 font-bold mr-2">•</span>
                    <span><strong>Early Warning Systems:</strong> Implementing monitoring networks to predict pollution episodes</span>
                  </li>
                </ul>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Hotspots;
