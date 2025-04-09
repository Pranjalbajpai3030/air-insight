import React, { useState } from 'react';
import Navbar from '../components/Navbar';
import HotspotMap from '../components/HotspotMap';
import { hotspotData } from '../utils/mockData';
import { HotspotData } from '../utils/types';
import { AlertTriangle, ThermometerSun, Factory, Car, Building, Wind, Info } from 'lucide-react';

const Hotspots = () => {
  const [timelapseActive, setTimelapseActive] = useState(false);
  const [selectedHotspot, setSelectedHotspot] = useState<HotspotData | null>(null);

  // Sort hotspots by intensity
  const sortedHotspots = [...hotspotData].sort((a, b) => b.intensity - a.intensity);

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900">
      <Navbar />
      
      <main className="container mx-auto px-4 py-6">
        <div className="mb-6">
          <h1 className="text-2xl md:text-3xl font-bold">Pollution Hotspot Detection</h1>
          <p className="text-gray-600 dark:text-gray-400 mt-1">
            Identifying regions with consistently high pollution levels in India.
          </p>
        </div>
        
        {/* Alert Banner */}
        <div className="flex p-4 mb-6 text-yellow-800 bg-yellow-50 dark:bg-gray-800 dark:text-yellow-300 rounded-lg" role="alert">
          <AlertTriangle className="h-5 w-5 mr-2" />
          <div>
            <span className="font-medium">Air Quality Alert:</span> Several major hotspots are showing unhealthy or very unhealthy AQI levels. If you're in these areas, consider wearing masks and limiting outdoor activities.
          </div>
        </div>
        
        {/* Hotspot Map */}
        <div className="mb-6">
          <HotspotMap />
        </div>
        
        {/* Time Control - this would be functional in a full implementation */}
        <div className="bg-white dark:bg-card rounded-lg shadow-sm p-4 mb-6">
          <div className="flex items-center justify-between mb-4">
            <h3 className="text-lg font-semibold">Time Evolution Visualization</h3>
            
            <button
              className={`px-4 py-2 rounded-md text-sm font-medium ${
                timelapseActive 
                  ? 'bg-red-500 hover:bg-red-600 text-white' 
                  : 'bg-primary hover:bg-primary/90 text-white'
              }`}
              onClick={() => setTimelapseActive(!timelapseActive)}
            >
              {timelapseActive ? 'Stop Timelapse' : 'Start Timelapse'}
            </button>
          </div>
          
          <div className="w-full bg-gray-200 dark:bg-gray-700 h-2 rounded-full mb-4">
            <div className="bg-primary h-2 rounded-full" style={{ width: '35%' }}></div>
          </div>
          
          <div className="flex justify-between text-xs text-gray-500 dark:text-gray-400">
            <span>Jan 2023</span>
            <span>Mar 2023</span>
            <span>Jun 2023</span>
            <span>Sep 2023</span>
            <span>Dec 2023</span>
            <span>Current</span>
          </div>
          
          <p className="mt-4 text-sm text-gray-700 dark:text-gray-300">
            The timelapse feature allows visualization of how pollution hotspots have evolved over time. In the full implementation, this would show the movement and intensity changes of pollution clusters throughout the year.
          </p>
        </div>
        
        {/* Top Hotspots List */}
        <div className="bg-white dark:bg-card rounded-lg shadow-sm p-4 mb-6">
          <h3 className="text-lg font-semibold mb-4">Top Pollution Hotspots</h3>
          
          <div className="overflow-x-auto">
            <table className="min-w-full divide-y divide-gray-200 dark:divide-gray-700">
              <thead className="bg-gray-50 dark:bg-gray-800">
                <tr>
                  <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider">
                    Rank
                  </th>
                  <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider">
                    Hotspot
                  </th>
                  <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider">
                    AQI Level
                  </th>
                  <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider">
                    Intensity
                  </th>
                  <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider">
                    Category
                  </th>
                </tr>
              </thead>
              <tbody className="bg-white dark:bg-gray-900 divide-y divide-gray-200 dark:divide-gray-800">
                {sortedHotspots.map((hotspot, index) => (
                  <tr 
                    key={hotspot.id}
                    className="hover:bg-gray-50 dark:hover:bg-gray-800 transition-colors cursor-pointer"
                    onClick={() => setSelectedHotspot(hotspot)}
                  >
                    <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900 dark:text-white">
                      {index + 1}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900 dark:text-white">
                      {hotspot.name}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500 dark:text-gray-400">
                      {hotspot.aqi}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div className="w-full bg-gray-200 dark:bg-gray-700 rounded-full h-2.5">
                        <div 
                          className="bg-gradient-to-r from-yellow-300 to-red-600 h-2.5 rounded-full" 
                          style={{ width: `${hotspot.intensity * 100}%` }}
                        ></div>
                      </div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <span 
                        className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium
                        ${hotspot.category === 'Unhealthy' 
                          ? 'bg-aqi-unhealthy text-white' 
                          : hotspot.category === 'Unhealthy for Sensitive Groups'
                            ? 'bg-aqi-unhealthySensitive text-white'
                            : 'bg-aqi-moderate text-gray-800'
                        }`}
                      >
                        {hotspot.category}
                      </span>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
        
        {/* Hotspot Details - would show when a hotspot is selected */}
        {selectedHotspot && (
          <div className="bg-white dark:bg-card rounded-lg shadow-sm p-4 mb-6 animate-fade-in">
            <div className="flex justify-between items-start mb-4">
              <h3 className="text-lg font-semibold">{selectedHotspot.name} Details</h3>
              <button 
                className="text-gray-500 hover:text-gray-700 dark:text-gray-400 dark:hover:text-gray-300"
                onClick={() => setSelectedHotspot(null)}
              >
                Close
              </button>
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <div className="grid grid-cols-2 gap-4 mb-4">
                  <div className="stat-card">
                    <div className="flex justify-between items-start">
                      <span className="stat-label">Current AQI</span>
                      <div className="p-2 bg-red-500/10 rounded-full">
                        <ThermometerSun className="h-5 w-5 text-red-500" />
                      </div>
                    </div>
                    <div className="stat-value">{selectedHotspot.aqi}</div>
                    <div className="mt-2 text-sm">{selectedHotspot.category}</div>
                  </div>
                  
                  <div className="stat-card">
                    <div className="flex justify-between items-start">
                      <span className="stat-label">Affected Area</span>
                      <div className="p-2 bg-theme-blue/10 rounded-full">
                        <Building className="h-5 w-5 text-theme-blue" />
                      </div>
                    </div>
                    <div className="stat-value">{selectedHotspot.radius} km</div>
                    <div className="mt-2 text-sm">Radius</div>
                  </div>
                </div>
                
                <div className="bg-theme-lightBlue dark:bg-accent p-4 rounded-md text-sm mb-4">
                  <h4 className="font-medium mb-2 flex items-center">
                    <Info className="h-4 w-4 mr-1" />
                    Hotspot Characteristics
                  </h4>
                  <ul className="space-y-2">
                    <li className="flex items-start">
                      <span className="text-theme-blue mr-2">•</span>
                      <span>This hotspot shows a consistent pattern over the past 12 months with peak pollution in winter.</span>
                    </li>
                    <li className="flex items-start">
                      <span className="text-theme-blue mr-2">•</span>
                      <span>Surrounded by high population density areas with approximately 3-5 million people affected.</span>
                    </li>
                    <li className="flex items-start">
                      <span className="text-theme-blue mr-2">•</span>
                      <span>Shows correlation with local industrial activity and traffic patterns.</span>
                    </li>
                  </ul>
                </div>
              </div>
              
              <div>
                <h4 className="font-medium mb-3">Primary Pollution Sources</h4>
                
                <div className="space-y-3">
                  <div className="flex items-center p-3 bg-gray-50 dark:bg-gray-800 rounded-md">
                    <Factory className="h-5 w-5 text-gray-500 mr-3" />
                    <div>
                      <div className="text-sm font-medium">Industrial Emissions</div>
                      <div className="text-xs text-gray-500 dark:text-gray-400">40% contribution</div>
                    </div>
                    <div className="ml-auto w-16 bg-gray-200 dark:bg-gray-700 rounded-full h-2">
                      <div className="bg-primary h-2 rounded-full" style={{ width: '40%' }}></div>
                    </div>
                  </div>
                  
                  <div className="flex items-center p-3 bg-gray-50 dark:bg-gray-800 rounded-md">
                    <Car className="h-5 w-5 text-gray-500 mr-3" />
                    <div>
                      <div className="text-sm font-medium">Vehicular Pollution</div>
                      <div className="text-xs text-gray-500 dark:text-gray-400">30% contribution</div>
                    </div>
                    <div className="ml-auto w-16 bg-gray-200 dark:bg-gray-700 rounded-full h-2">
                      <div className="bg-primary h-2 rounded-full" style={{ width: '30%' }}></div>
                    </div>
                  </div>
                  
                  <div className="flex items-center p-3 bg-gray-50 dark:bg-gray-800 rounded-md">
                    <Wind className="h-5 w-5 text-gray-500 mr-3" />
                    <div>
                      <div className="text-sm font-medium">Geographic Factors</div>
                      <div className="text-xs text-gray-500 dark:text-gray-400">20% contribution</div>
                    </div>
                    <div className="ml-auto w-16 bg-gray-200 dark:bg-gray-700 rounded-full h-2">
                      <div className="bg-primary h-2 rounded-full" style={{ width: '20%' }}></div>
                    </div>
                  </div>
                  
                  <div className="flex items-center p-3 bg-gray-50 dark:bg-gray-800 rounded-md">
                    <AlertTriangle className="h-5 w-5 text-gray-500 mr-3" />
                    <div>
                      <div className="text-sm font-medium">Other Sources</div>
                      <div className="text-xs text-gray-500 dark:text-gray-400">10% contribution</div>
                    </div>
                    <div className="ml-auto w-16 bg-gray-200 dark:bg-gray-700 rounded-full h-2">
                      <div className="bg-primary h-2 rounded-full" style={{ width: '10%' }}></div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        )}
        
        {/* Root Causes and Prevention */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
          <div className="bg-white dark:bg-card rounded-lg shadow-sm p-4">
            <h3 className="text-lg font-semibold mb-4">Common Causes of Hotspots</h3>
            
            <div className="space-y-3 text-sm text-gray-700 dark:text-gray-300">
              <p>
                Pollution hotspots typically form due to a combination of emissions sources and geographic/meteorological factors:
              </p>
              
              <div className="flex items-start mt-2">
                <div className="bg-theme-blue/10 p-1 rounded mr-2 mt-0.5">
                  <Factory className="h-4 w-4 text-theme-blue" />
                </div>
                <div>
                  <span className="font-medium">Industrial Clusters:</span> Areas with concentrated industrial activity, especially older facilities with inadequate emission controls.
                </div>
              </div>
              
              <div className="flex items-start">
                <div className="bg-theme-green/10 p-1 rounded mr-2 mt-0.5">
                  <Car className="h-4 w-4 text-theme-green" />
                </div>
                <div>
                  <span className="font-medium">Transportation Corridors:</span> High-traffic highways, congested urban centers, and major transportation hubs.
                </div>
              </div>
              
              <div className="flex items-start">
                <div className="bg-theme-indigo/10 p-1 rounded mr-2 mt-0.5">
                  <Building className="h-4 w-4 text-theme-indigo" />
                </div>
                <div>
                  <span className="font-medium">Urban Density:</span> Highly populated areas with concentrated emissions from residential, commercial, and transportation sources.
                </div>
              </div>
              
              <div className="flex items-start">
                <div className="bg-theme-purple/10 p-1 rounded mr-2 mt-0.5">
                  <Wind className="h-4 w-4 text-theme-purple" />
                </div>
                <div>
                  <span className="font-medium">Geographic Features:</span> Valleys, basins, and areas with poor air circulation that trap pollutants, especially during temperature inversions.
                </div>
              </div>
            </div>
          </div>
          
          <div className="bg-white dark:bg-card rounded-lg shadow-sm p-4">
            <h3 className="text-lg font-semibold mb-4">Mitigation Strategies</h3>
            
            <div className="space-y-3 text-sm text-gray-700 dark:text-gray-300">
              <p>
                Addressing pollution hotspots requires targeted interventions specific to each region's sources and conditions:
              </p>
              
              <div className="flex items-start mt-2">
                <div className="rounded-full bg-green-100 dark:bg-green-900 text-green-800 dark:text-green-300 h-5 w-5 flex items-center justify-center mr-2 mt-0.5">1</div>
                <div>
                  <span className="font-medium">Emissions Standards Enforcement:</span> Stricter monitoring and enforcement of industrial emissions standards in hotspot regions.
                </div>
              </div>
              
              <div className="flex items-start">
                <div className="rounded-full bg-green-100 dark:bg-green-900 text-green-800 dark:text-green-300 h-5 w-5 flex items-center justify-center mr-2 mt-0.5">2</div>
                <div>
                  <span className="font-medium">Smart Traffic Management:</span> Implementation of congestion pricing, low emission zones, and improved public transportation.
                </div>
              </div>
              
              <div className="flex items-start">
                <div className="rounded-full bg-green-100 dark:bg-green-900 text-green-800 dark:text-green-300 h-5 w-5 flex items-center justify-center mr-2 mt-0.5">3</div>
                <div>
                  <span className="font-medium">Green Infrastructure:</span> Urban forests, parks, and green belts that can help filter pollutants and improve air circulation.
                </div>
              </div>
              
              <div className="flex items-start">
                <div className="rounded-full bg-green-100 dark:bg-green-900 text-green-800 dark:text-green-300 h-5 w-5 flex items-center justify-center mr-2 mt-0.5">4</div>
                <div>
                  <span className="font-medium">Early Warning Systems:</span> Real-time monitoring networks that can alert residents when pollution levels become dangerous.
                </div>
              </div>
            </div>
          </div>
        </div>
      </main>
      
      <footer className="bg-white dark:bg-gray-950 border-t border-gray-200 dark:border-gray-800 py-6">
        <div className="container mx-auto px-4">
          <div className="flex flex-col md:flex-row justify-between items-center">
            <div className="mb-4 md:mb-0">
              <div className="flex items-center">
                <span className="text-theme-blue font-bold text-xl">Air</span>
                <span className="text-theme-green font-bold text-xl">Spark</span>
                <span className="ml-1 text-xs bg-theme-indigo text-white px-1.5 py-0.5 rounded-md">VISION</span>
              </div>
              <p className="text-sm text-gray-600 dark:text-gray-400 mt-1">
                Environmental Intelligence Platform for Air Quality Analytics
              </p>
            </div>
            
            <div className="text-sm text-gray-600 dark:text-gray-400">
              © {new Date().getFullYear()} AirSpark Vision. All rights reserved.
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default Hotspots;
