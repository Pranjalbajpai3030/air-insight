
import React, { useState } from 'react';
import Navbar from '../components/Navbar';
import CompareCountries from '../components/CompareCountries';
import { countriesData } from '../utils/mockData';
import { PollutantType } from '../utils/types';
import { HelpCircle, Info, AlertTriangle, Globe } from 'lucide-react';

const Compare = () => {
  const [selectedCountries, setSelectedCountries] = useState<string[]>(['India', 'China', 'USA']);
  const [selectedPollutant, setSelectedPollutant] = useState<PollutantType>('aqi');

  const handleCountryToggle = (country: string) => {
    if (selectedCountries.includes(country)) {
      if (selectedCountries.length > 1) { // Ensure at least one country is selected
        setSelectedCountries(selectedCountries.filter(c => c !== country));
      }
    } else {
      setSelectedCountries([...selectedCountries, country]);
    }
  };

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900">
      <Navbar />
      
      <main className="container mx-auto px-4 py-6">
        <div className="mb-6">
          <h1 className="text-2xl md:text-3xl font-bold">Global Air Quality Comparison</h1>
          <p className="text-gray-600 dark:text-gray-400 mt-1">
            Compare air quality metrics between countries over time.
          </p>
        </div>
        
        {/* Filter Controls */}
        <div className="bg-white dark:bg-card rounded-lg shadow-sm p-4 mb-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <h3 className="text-lg font-semibold mb-3">Select Countries</h3>
              <div className="grid grid-cols-2 sm:grid-cols-3 gap-2">
                {countriesData.map(country => (
                  <div key={country.id} className="flex items-center">
                    <input
                      type="checkbox"
                      id={`country-${country.id}`}
                      checked={selectedCountries.includes(country.name)}
                      onChange={() => handleCountryToggle(country.name)}
                      className="w-4 h-4 text-primary bg-gray-100 border-gray-300 rounded focus:ring-primary"
                      disabled={selectedCountries.length === 1 && selectedCountries.includes(country.name)}
                    />
                    <label
                      htmlFor={`country-${country.id}`}
                      className="ml-2 text-sm font-medium text-gray-900 dark:text-gray-300"
                    >
                      {country.name}
                    </label>
                  </div>
                ))}
              </div>
            </div>
            
            <div>
              <h3 className="text-lg font-semibold mb-3">Select Pollutant</h3>
              <div className="grid grid-cols-2 sm:grid-cols-3 gap-2">
                <div className="flex items-center">
                  <input
                    type="radio"
                    id="pollutant-aqi"
                    name="pollutant"
                    value="aqi"
                    checked={selectedPollutant === 'aqi'}
                    onChange={() => setSelectedPollutant('aqi')}
                    className="w-4 h-4 text-primary bg-gray-100 border-gray-300 focus:ring-primary"
                  />
                  <label
                    htmlFor="pollutant-aqi"
                    className="ml-2 text-sm font-medium text-gray-900 dark:text-gray-300"
                  >
                    AQI
                  </label>
                </div>
                <div className="flex items-center">
                  <input
                    type="radio"
                    id="pollutant-pm25"
                    name="pollutant"
                    value="pm25"
                    checked={selectedPollutant === 'pm25'}
                    onChange={() => setSelectedPollutant('pm25')}
                    className="w-4 h-4 text-primary bg-gray-100 border-gray-300 focus:ring-primary"
                  />
                  <label
                    htmlFor="pollutant-pm25"
                    className="ml-2 text-sm font-medium text-gray-900 dark:text-gray-300"
                  >
                    PM2.5
                  </label>
                </div>
                <div className="flex items-center">
                  <input
                    type="radio"
                    id="pollutant-pm10"
                    name="pollutant"
                    value="pm10"
                    checked={selectedPollutant === 'pm10'}
                    onChange={() => setSelectedPollutant('pm10')}
                    className="w-4 h-4 text-primary bg-gray-100 border-gray-300 focus:ring-primary"
                  />
                  <label
                    htmlFor="pollutant-pm10"
                    className="ml-2 text-sm font-medium text-gray-900 dark:text-gray-300"
                  >
                    PM10
                  </label>
                </div>
                <div className="flex items-center">
                  <input
                    type="radio"
                    id="pollutant-no2"
                    name="pollutant"
                    value="no2"
                    checked={selectedPollutant === 'no2'}
                    onChange={() => setSelectedPollutant('no2')}
                    className="w-4 h-4 text-primary bg-gray-100 border-gray-300 focus:ring-primary"
                  />
                  <label
                    htmlFor="pollutant-no2"
                    className="ml-2 text-sm font-medium text-gray-900 dark:text-gray-300"
                  >
                    NO₂
                  </label>
                </div>
                <div className="flex items-center">
                  <input
                    type="radio"
                    id="pollutant-so2"
                    name="pollutant"
                    value="so2"
                    checked={selectedPollutant === 'so2'}
                    onChange={() => setSelectedPollutant('so2')}
                    className="w-4 h-4 text-primary bg-gray-100 border-gray-300 focus:ring-primary"
                  />
                  <label
                    htmlFor="pollutant-so2"
                    className="ml-2 text-sm font-medium text-gray-900 dark:text-gray-300"
                  >
                    SO₂
                  </label>
                </div>
                <div className="flex items-center">
                  <input
                    type="radio"
                    id="pollutant-o3"
                    name="pollutant"
                    value="o3"
                    checked={selectedPollutant === 'o3'}
                    onChange={() => setSelectedPollutant('o3')}
                    className="w-4 h-4 text-primary bg-gray-100 border-gray-300 focus:ring-primary"
                  />
                  <label
                    htmlFor="pollutant-o3"
                    className="ml-2 text-sm font-medium text-gray-900 dark:text-gray-300"
                  >
                    O₃
                  </label>
                </div>
              </div>
            </div>
          </div>
        </div>
        
        {/* Comparison Chart */}
        <div className="mb-6">
          <CompareCountries 
            selectedCountries={selectedCountries} 
            pollutant={selectedPollutant} 
          />
        </div>
        
        {/* Insights and Analysis */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-6">
          <div className="bg-white dark:bg-card rounded-lg shadow-sm p-4">
            <div className="flex items-center mb-3">
              <HelpCircle className="h-5 w-5 text-theme-indigo mr-2" />
              <h3 className="text-lg font-semibold">About This Comparison</h3>
            </div>
            <p className="text-sm text-gray-700 dark:text-gray-300">
              This tool enables comparison of air quality metrics across different countries over time. Data is 
              sourced from national monitoring networks and standardized for comparison. Click on specific years 
              in the chart to see detailed comparisons.
            </p>
          </div>
          
          <div className="bg-white dark:bg-card rounded-lg shadow-sm p-4">
            <div className="flex items-center mb-3">
              <Info className="h-5 w-5 text-theme-blue mr-2" />
              <h3 className="text-lg font-semibold">Key Takeaways</h3>
            </div>
            <ul className="text-sm text-gray-700 dark:text-gray-300 space-y-2">
              <li className="flex items-start">
                <span className="text-theme-blue mr-2">•</span>
                <span>Developing economies typically show higher pollution levels but are improving over time.</span>
              </li>
              <li className="flex items-start">
                <span className="text-theme-blue mr-2">•</span>
                <span>COVID-19 lockdowns in 2020 resulted in significant temporary air quality improvements globally.</span>
              </li>
              <li className="flex items-start">
                <span className="text-theme-blue mr-2">•</span>
                <span>Policy interventions in China have shown measurable progress in reducing pollution since 2018.</span>
              </li>
            </ul>
          </div>
          
          <div className="bg-white dark:bg-card rounded-lg shadow-sm p-4">
            <div className="flex items-center mb-3">
              <AlertTriangle className="h-5 w-5 text-theme-green mr-2" />
              <h3 className="text-lg font-semibold">Data Limitations</h3>
            </div>
            <ul className="text-sm text-gray-700 dark:text-gray-300 space-y-2">
              <li className="flex items-start">
                <span className="text-theme-green mr-2">•</span>
                <span>Monitoring station density varies widely between countries, affecting data quality.</span>
              </li>
              <li className="flex items-start">
                <span className="text-theme-green mr-2">•</span>
                <span>Different AQI calculation methods may be used in different regions, though we've standardized where possible.</span>
              </li>
              <li className="flex items-start">
                <span className="text-theme-green mr-2">•</span>
                <span>Data represents national averages and may not reflect specific urban or industrial hotspots.</span>
              </li>
            </ul>
          </div>
        </div>
        
        {/* Global Context */}
        <div className="bg-white dark:bg-card rounded-lg shadow-sm p-4 mb-6">
          <div className="flex items-center mb-4">
            <Globe className="h-6 w-6 text-primary mr-2" />
            <h3 className="text-lg font-semibold">Global Air Quality Context</h3>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="text-sm text-gray-700 dark:text-gray-300 space-y-3">
              <p>
                According to the WHO, air pollution is responsible for an estimated 7 million premature deaths worldwide every year. 
                Approximately 99% of the global population breathes air that exceeds WHO guideline limits.
              </p>
              <p>
                While developed nations have made significant progress in reducing air pollution since the 1970s, many developing 
                countries continue to struggle with poor air quality due to rapid industrialization, urbanization, and limited 
                regulatory enforcement.
              </p>
            </div>
            
            <div className="text-sm text-gray-700 dark:text-gray-300 space-y-3">
              <p>
                The most polluted regions globally include Northern India, parts of China, and areas in the Middle East and North Africa.
                Clean air initiatives, renewable energy adoption, and transportation reforms have proven effective in reducing pollution
                levels in many countries.
              </p>
              <p>
                International agreements and frameworks like the Paris Climate Accord indirectly contribute to air quality improvements 
                through reduced fossil fuel consumption and emissions controls.
              </p>
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

export default Compare;
