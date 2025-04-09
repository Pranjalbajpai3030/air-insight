
import React, { useState } from 'react';
import Navbar from '../components/Navbar';
import AQIMap from '../components/AQIMap';
import AQIChart from '../components/AQIChart';
import CityRankings from '../components/CityRankings';
import { topCities, bottomCities, indiaAQIData } from '../utils/mockData';
import { PollutantType, TimeFilter } from '../utils/types';
import { Clock, CloudRain, CloudSnow, Wind, Thermometer, Calendar } from 'lucide-react';

const Index = () => {
  const [selectedPollutant, setSelectedPollutant] = useState<PollutantType>('pm25');
  const [selectedTimeFilter, setSelectedTimeFilter] = useState<TimeFilter>('monthly');
  const [chartType, setChartType] = useState<'line' | 'bar'>('line');

  // Calculate average AQI
  const averageAQI = Math.round(
    indiaAQIData.reduce((sum, city) => sum + city.aqi, 0) / indiaAQIData.length
  );

  // Count cities by category
  const citiesByCategory = indiaAQIData.reduce((acc, city) => {
    const category = city.category;
    acc[category] = (acc[category] || 0) + 1;
    return acc;
  }, {} as Record<string, number>);

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900">
      <Navbar />
      
      <main className="container mx-auto px-4 py-6">
        <div className="mb-6">
          <h1 className="text-2xl md:text-3xl font-bold">India Air Quality Dashboard</h1>
          <p className="text-gray-600 dark:text-gray-400 mt-1">
            Real-time and historical air quality data analysis for cities across India.
          </p>
        </div>
        
        {/* Stats Overview */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 mb-6">
          <div className="stat-card card-hover">
            <div className="flex justify-between items-start">
              <span className="stat-label">Average AQI</span>
              <div className="p-2 bg-primary/10 rounded-full">
                <Wind className="h-5 w-5 text-primary" />
              </div>
            </div>
            <div className="stat-value">{averageAQI}</div>
            <div className="mt-2 text-sm">
              {averageAQI > 150 ? (
                <span className="text-red-500">Unhealthy</span>
              ) : averageAQI > 100 ? (
                <span className="text-orange-500">Moderate</span>
              ) : (
                <span className="text-green-500">Good</span>
              )}
            </div>
          </div>
          
          <div className="stat-card card-hover">
            <div className="flex justify-between items-start">
              <span className="stat-label">Cities Monitored</span>
              <div className="p-2 bg-theme-blue/10 rounded-full">
                <CloudRain className="h-5 w-5 text-theme-blue" />
              </div>
            </div>
            <div className="stat-value">{indiaAQIData.length}</div>
            <div className="mt-2 text-sm">Across {new Set(indiaAQIData.map(c => c.state)).size} states</div>
          </div>
          
          <div className="stat-card card-hover">
            <div className="flex justify-between items-start">
              <span className="stat-label">Last Updated</span>
              <div className="p-2 bg-theme-indigo/10 rounded-full">
                <Clock className="h-5 w-5 text-theme-indigo" />
              </div>
            </div>
            <div className="stat-value text-xl">
              {new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
            </div>
            <div className="mt-2 text-sm">
              {new Date().toLocaleDateString([], { month: 'short', day: 'numeric', year: 'numeric' })}
            </div>
          </div>
          
          <div className="stat-card card-hover">
            <div className="flex justify-between items-start">
              <span className="stat-label">Unhealthy Cities</span>
              <div className="p-2 bg-red-500/10 rounded-full">
                <Thermometer className="h-5 w-5 text-red-500" />
              </div>
            </div>
            <div className="stat-value">
              {(citiesByCategory['Unhealthy'] || 0) + 
                (citiesByCategory['Very Unhealthy'] || 0) + 
                (citiesByCategory['Hazardous'] || 0)}
            </div>
            <div className="mt-2 text-sm">
              {Math.round(((citiesByCategory['Unhealthy'] || 0) + 
                (citiesByCategory['Very Unhealthy'] || 0) + 
                (citiesByCategory['Hazardous'] || 0)) / indiaAQIData.length * 100)}% of monitored cities
            </div>
          </div>
        </div>
        
        {/* Main Map */}
        <div className="mb-6">
          <AQIMap />
        </div>
        
        {/* Filter Options */}
        <div className="flex flex-wrap items-center gap-3 mb-6 bg-white dark:bg-card p-3 rounded-lg shadow-sm">
          <div>
            <label className="text-sm font-medium text-gray-700 dark:text-gray-300 mr-2">Pollutant:</label>
            <select 
              className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-primary focus:border-primary p-2 dark:bg-gray-700 dark:border-gray-600 dark:text-white" 
              value={selectedPollutant}
              onChange={(e) => setSelectedPollutant(e.target.value as PollutantType)}
            >
              <option value="pm25">PM2.5</option>
              <option value="pm10">PM10</option>
              <option value="no2">NO₂</option>
              <option value="so2">SO₂</option>
              <option value="o3">O₃</option>
              <option value="co">CO</option>
            </select>
          </div>
          
          <div>
            <label className="text-sm font-medium text-gray-700 dark:text-gray-300 mr-2">Time Period:</label>
            <select 
              className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-primary focus:border-primary p-2 dark:bg-gray-700 dark:border-gray-600 dark:text-white" 
              value={selectedTimeFilter}
              onChange={(e) => setSelectedTimeFilter(e.target.value as TimeFilter)}
            >
              <option value="daily">Daily</option>
              <option value="weekly">Weekly</option>
              <option value="monthly">Monthly</option>
              <option value="yearly">Yearly</option>
            </select>
          </div>
          
          <div>
            <label className="text-sm font-medium text-gray-700 dark:text-gray-300 mr-2">Chart Type:</label>
            <div className="inline-flex rounded-md shadow-sm">
              <button
                type="button"
                className={`px-3 py-2 text-sm font-medium rounded-l-lg ${
                  chartType === 'line'
                    ? 'bg-primary text-white'
                    : 'bg-white dark:bg-gray-700 text-gray-700 dark:text-white hover:bg-gray-50 dark:hover:bg-gray-600'
                }`}
                onClick={() => setChartType('line')}
              >
                Line
              </button>
              <button
                type="button"
                className={`px-3 py-2 text-sm font-medium rounded-r-lg ${
                  chartType === 'bar'
                    ? 'bg-primary text-white'
                    : 'bg-white dark:bg-gray-700 text-gray-700 dark:text-white hover:bg-gray-50 dark:hover:bg-gray-600'
                }`}
                onClick={() => setChartType('bar')}
              >
                Bar
              </button>
            </div>
          </div>
          
          <div className="ml-auto flex items-center">
            <Calendar className="h-4 w-4 mr-1 text-gray-500 dark:text-gray-400" />
            <span className="text-sm text-gray-500 dark:text-gray-400">
              Data from January 2023 to Present
            </span>
          </div>
        </div>
        
        {/* Pollutant Chart */}
        <div className="mb-6">
          <AQIChart 
            chartType={chartType} 
            pollutant={selectedPollutant} 
            timeFilter={selectedTimeFilter} 
          />
        </div>
        
        {/* City Rankings */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-6">
          <CityRankings title="Cleanest Cities" cities={topCities} />
          <CityRankings title="Most Polluted Cities" cities={bottomCities} />
        </div>
        
        {/* Key Insights */}
        <div className="bg-white dark:bg-card rounded-lg shadow-sm p-4 mb-6">
          <h3 className="text-lg font-semibold mb-4">Key Insights</h3>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <div className="bg-theme-lightBlue dark:bg-accent/20 p-4 rounded-md">
              <h4 className="font-medium mb-2">Seasonal Patterns</h4>
              <p className="text-sm">Air quality significantly worsens during winter months (November-February) due to temperature inversions trapping pollutants closer to the ground.</p>
            </div>
            
            <div className="bg-theme-lightGreen dark:bg-accent/20 p-4 rounded-md">
              <h4 className="font-medium mb-2">Regional Variations</h4>
              <p className="text-sm">Northern India, particularly the Indo-Gangetic plains, consistently shows higher pollution levels than southern and coastal regions.</p>
            </div>
            
            <div className="bg-theme-lightBlue dark:bg-accent/20 p-4 rounded-md">
              <h4 className="font-medium mb-2">Pollution Sources</h4>
              <p className="text-sm">Major contributors include vehicular emissions (30%), industrial activity (27%), dust and construction (17%), and biomass burning (15%).</p>
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

export default Index;
