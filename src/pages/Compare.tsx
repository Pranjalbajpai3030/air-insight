
import React, { useState, useEffect } from 'react';
import { useQuery } from '@tanstack/react-query';
import Navbar from '../components/Navbar';
import CompareCountries from '../components/CompareCountries';
import { fetchCountriesData } from '../utils/geminiAPI';
import { PollutantType } from '../utils/types';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Badge } from '@/components/ui/badge';
import { Card, CardContent } from '@/components/ui/card';
import { X } from 'lucide-react';

const Compare = () => {
  const [selectedCountries, setSelectedCountries] = useState<string[]>(['India', 'China', 'USA']);
  const [pollutant, setPollutant] = useState<PollutantType>('aqi');
  const [availableCountries, setAvailableCountries] = useState<string[]>([]);

  // Fetch countries data
  const { data: countriesData, isLoading } = useQuery({
    queryKey: ['countriesData'],
    queryFn: fetchCountriesData,
    refetchOnWindowFocus: false,
    staleTime: 1000 * 60 * 10, // 10 minutes
  });

  // Update available countries when data is loaded
  useEffect(() => {
    if (countriesData) {
      setAvailableCountries(countriesData.map(country => country.name));
    }
  }, [countriesData]);

  // Handle adding a country to comparison
  const handleAddCountry = (country: string) => {
    if (!selectedCountries.includes(country) && selectedCountries.length < 5) {
      setSelectedCountries([...selectedCountries, country]);
    }
  };

  // Handle removing a country from comparison
  const handleRemoveCountry = (country: string) => {
    setSelectedCountries(selectedCountries.filter(c => c !== country));
  };

  // Handle pollutant change
  const handlePollutantChange = (value: string) => {
    setPollutant(value as PollutantType);
  };

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-950">
      <Navbar />
      <div className="container mx-auto px-4 py-8 max-w-7xl">
        <h1 className="text-3xl md:text-4xl font-bold mb-8 text-center text-gray-800 dark:text-gray-100">
          Compare Air Quality Across Countries
        </h1>
        
        <Card className="bg-white dark:bg-gray-800 shadow-sm mb-8">
          <CardContent className="p-6">
            <div className="flex flex-col md:flex-row md:items-center md:justify-between space-y-4 md:space-y-0">
              <div className="flex-1 max-w-xs">
                <p className="text-sm text-gray-500 dark:text-gray-400 mb-2">Add country to compare:</p>
                <Select onValueChange={handleAddCountry}>
                  <SelectTrigger>
                    <SelectValue placeholder="Select a country" />
                  </SelectTrigger>
                  <SelectContent>
                    {availableCountries
                      .filter(country => !selectedCountries.includes(country))
                      .map(country => (
                        <SelectItem key={country} value={country}>
                          {country}
                        </SelectItem>
                      ))}
                  </SelectContent>
                </Select>
              </div>
              
              <div>
                <p className="text-sm text-gray-500 dark:text-gray-400 mb-2">Selected countries:</p>
                <div className="flex flex-wrap gap-2">
                  {selectedCountries.map(country => (
                    <Badge key={country} variant="secondary" className="pl-2 pr-1 py-1 flex items-center">
                      {country}
                      <button 
                        onClick={() => handleRemoveCountry(country)}
                        className="ml-1 p-1 rounded-full hover:bg-gray-200 dark:hover:bg-gray-700"
                      >
                        <X className="h-3 w-3" />
                      </button>
                    </Badge>
                  ))}
                </div>
              </div>
              
              <div>
                <p className="text-sm text-gray-500 dark:text-gray-400 mb-2">Select pollutant:</p>
                <Select defaultValue="aqi" onValueChange={handlePollutantChange}>
                  <SelectTrigger className="w-[180px]">
                    <SelectValue placeholder="Pollutant" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="aqi">AQI (Overall)</SelectItem>
                    <SelectItem value="pm25">PM2.5</SelectItem>
                    <SelectItem value="pm10">PM10</SelectItem>
                    <SelectItem value="no2">NO₂</SelectItem>
                    <SelectItem value="so2">SO₂</SelectItem>
                    <SelectItem value="o3">O₃</SelectItem>
                    <SelectItem value="co">CO</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </div>
          </CardContent>
        </Card>
        
        {isLoading ? (
          <div className="flex items-center justify-center h-80">
            <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-theme-blue"></div>
          </div>
        ) : (
          <div className="space-y-6">
            <CompareCountries selectedCountries={selectedCountries} pollutant={pollutant} />
            
            {/* Additional information section */}
            <Card className="bg-white dark:bg-gray-800 shadow-sm p-6">
              <h2 className="text-xl font-semibold mb-4 text-gray-800 dark:text-gray-100">
                Understanding the Comparison
              </h2>
              <div className="space-y-4 text-gray-700 dark:text-gray-300">
                <p>
                  This chart visualizes historical air quality data across selected countries from 2018 to 2023. 
                  The trends reflect various factors including policy changes, economic development, 
                  industrialization levels, and environmental regulations specific to each country.
                </p>
                <p>
                  When comparing countries, consider factors such as:
                </p>
                <ul className="list-disc pl-5 space-y-2">
                  <li>Population density and urbanization levels</li>
                  <li>Industrial activity and energy generation sources</li>
                  <li>Geographic and meteorological conditions</li>
                  <li>Implementation of air quality policies and regulations</li>
                  <li>Economic development stage and priorities</li>
                </ul>
                <p>
                  Click on specific years in the chart to see detailed comparisons for that time period.
                  You can add up to 5 countries for comparison and switch between different pollutants to 
                  get a comprehensive understanding of air quality trends.
                </p>
              </div>
            </Card>
          </div>
        )}
      </div>
    </div>
  );
};

export default Compare;
