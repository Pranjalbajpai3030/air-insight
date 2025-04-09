
import React, { useState, useEffect } from 'react';
import { useQuery } from '@tanstack/react-query';
import Navbar from '../components/Navbar';
import AQIMap from '../components/AQIMap';
import AQIChart from '../components/AQIChart';
import CityRankings from '../components/CityRankings';
import { fetchAQIData, fetchCityRankings } from '../utils/geminiAPI';
import { indiaAQIData } from '../utils/mockData';
import { AQIData, CityRanking, TimeFilter, PollutantType } from '../utils/types';
import { Card } from '@/components/ui/card';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';

const Index = () => {
  const [selectedCity, setSelectedCity] = useState<AQIData | null>(null);
  const [timeFilter, setTimeFilter] = useState<TimeFilter>('daily');
  const [pollutant, setPollutant] = useState<PollutantType>('aqi');

  // Fetch AQI data
  const { data: aqiData, isLoading: isLoadingAQI } = useQuery({
    queryKey: ['aqiData'],
    queryFn: fetchAQIData,
    refetchOnWindowFocus: false,
    staleTime: 1000 * 60 * 5, // 5 minutes
  });

  // Fetch city rankings
  const { data: rankings, isLoading: isLoadingRankings } = useQuery({
    queryKey: ['cityRankings'],
    queryFn: fetchCityRankings,
    refetchOnWindowFocus: false,
    staleTime: 1000 * 60 * 5, // 5 minutes
  });

  // Set a default selected city when data is loaded
  useEffect(() => {
    if (aqiData && aqiData.length > 0 && !selectedCity) {
      // Find Delhi or use the first city as default
      const delhi = aqiData.find(city => city.city === 'Delhi');
      setSelectedCity(delhi || aqiData[0]);
    }
  }, [aqiData, selectedCity]);

  // Handle city selection from the map
  const handleCitySelect = (city: AQIData) => {
    setSelectedCity(city);
  };

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-950">
      <Navbar />
      
      <div className="container mx-auto px-4 py-8 max-w-7xl">
        <h1 className="text-3xl md:text-4xl font-bold mb-8 text-center text-gray-800 dark:text-gray-100">
          India Air Quality Dashboard
        </h1>
        
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 mb-8">
          <div className="lg:col-span-2">
            <Card className="bg-white dark:bg-gray-800 shadow-sm overflow-hidden h-[500px]">
              {isLoadingAQI ? (
                <div className="flex items-center justify-center h-full">
                  <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-theme-blue"></div>
                </div>
              ) : (
                <AQIMap 
                  aqiData={aqiData || indiaAQIData} 
                  onCitySelect={handleCitySelect}
                  selectedCity={selectedCity}
                />
              )}
            </Card>
          </div>
          
          <div>
            <Card className="bg-white dark:bg-gray-800 shadow-sm p-4 h-[500px] overflow-y-auto">
              <h2 className="text-xl font-semibold mb-4 text-gray-800 dark:text-gray-100">
                City Details
              </h2>
              
              {selectedCity ? (
                <div className="space-y-4">
                  <div className="flex justify-between items-start">
                    <div>
                      <h3 className="text-lg font-medium text-gray-800 dark:text-gray-100">
                        {selectedCity.city}
                      </h3>
                      <p className="text-sm text-gray-500 dark:text-gray-400">
                        {selectedCity.state}, {selectedCity.country}
                      </p>
                    </div>
                    <div className={`px-3 py-1 rounded-full text-sm font-medium ${
                      selectedCity.category === 'Good' ? 'bg-green-100 text-green-800 dark:bg-green-900/30 dark:text-green-200' :
                      selectedCity.category === 'Moderate' ? 'bg-yellow-100 text-yellow-800 dark:bg-yellow-900/30 dark:text-yellow-200' :
                      selectedCity.category === 'Unhealthy for Sensitive Groups' ? 'bg-orange-100 text-orange-800 dark:bg-orange-900/30 dark:text-orange-200' :
                      selectedCity.category === 'Unhealthy' ? 'bg-red-100 text-red-800 dark:bg-red-900/30 dark:text-red-200' :
                      selectedCity.category === 'Very Unhealthy' ? 'bg-purple-100 text-purple-800 dark:bg-purple-900/30 dark:text-purple-200' :
                      'bg-gray-100 text-gray-800 dark:bg-gray-900/30 dark:text-gray-200'
                    }`}>
                      {selectedCity.category}
                    </div>
                  </div>
                  
                  <div className="grid grid-cols-2 gap-4">
                    <div className="bg-blue-50 dark:bg-blue-900/20 p-3 rounded-lg">
                      <p className="text-sm text-gray-500 dark:text-gray-400">AQI</p>
                      <p className="text-2xl font-bold text-gray-800 dark:text-gray-100">{selectedCity.aqi}</p>
                    </div>
                    <div className="bg-red-50 dark:bg-red-900/20 p-3 rounded-lg">
                      <p className="text-sm text-gray-500 dark:text-gray-400">PM2.5</p>
                      <p className="text-2xl font-bold text-gray-800 dark:text-gray-100">{selectedCity.pm25}</p>
                    </div>
                    <div className="bg-orange-50 dark:bg-orange-900/20 p-3 rounded-lg">
                      <p className="text-sm text-gray-500 dark:text-gray-400">PM10</p>
                      <p className="text-2xl font-bold text-gray-800 dark:text-gray-100">{selectedCity.pm10}</p>
                    </div>
                    <div className="bg-purple-50 dark:bg-purple-900/20 p-3 rounded-lg">
                      <p className="text-sm text-gray-500 dark:text-gray-400">NO₂</p>
                      <p className="text-2xl font-bold text-gray-800 dark:text-gray-100">{selectedCity.no2}</p>
                    </div>
                    <div className="bg-teal-50 dark:bg-teal-900/20 p-3 rounded-lg">
                      <p className="text-sm text-gray-500 dark:text-gray-400">SO₂</p>
                      <p className="text-2xl font-bold text-gray-800 dark:text-gray-100">{selectedCity.so2}</p>
                    </div>
                    <div className="bg-green-50 dark:bg-green-900/20 p-3 rounded-lg">
                      <p className="text-sm text-gray-500 dark:text-gray-400">O₃</p>
                      <p className="text-2xl font-bold text-gray-800 dark:text-gray-100">{selectedCity.o3}</p>
                    </div>
                    <div className="bg-gray-50 dark:bg-gray-900/20 p-3 rounded-lg col-span-2">
                      <p className="text-sm text-gray-500 dark:text-gray-400">CO</p>
                      <p className="text-2xl font-bold text-gray-800 dark:text-gray-100">{selectedCity.co}</p>
                    </div>
                  </div>
                  
                  <div className="mt-4">
                    <p className="text-sm text-gray-500 dark:text-gray-400">
                      Last Updated:
                    </p>
                    <p className="text-sm text-gray-700 dark:text-gray-300">
                      {new Date(selectedCity.timestamp).toLocaleString()}
                    </p>
                  </div>
                </div>
              ) : (
                <div className="flex items-center justify-center h-full">
                  <p className="text-gray-500 dark:text-gray-400">Select a city on the map to view details</p>
                </div>
              )}
            </Card>
          </div>
        </div>
        
        <div className="mb-8">
          <Card className="bg-white dark:bg-gray-800 shadow-sm p-4">
            <div className="flex justify-between items-center mb-4">
              <h2 className="text-xl font-semibold text-gray-800 dark:text-gray-100">
                Pollutant Trends
              </h2>
              
              <div className="flex space-x-2">
                <Tabs defaultValue="aqi" onValueChange={(value) => setPollutant(value as PollutantType)}>
                  <TabsList>
                    <TabsTrigger value="aqi">AQI</TabsTrigger>
                    <TabsTrigger value="pm25">PM2.5</TabsTrigger>
                    <TabsTrigger value="pm10">PM10</TabsTrigger>
                    <TabsTrigger value="no2">NO₂</TabsTrigger>
                    <TabsTrigger value="so2">SO₂</TabsTrigger>
                    <TabsTrigger value="o3">O₃</TabsTrigger>
                    <TabsTrigger value="co">CO</TabsTrigger>
                  </TabsList>
                </Tabs>
                
                <Tabs defaultValue="daily" onValueChange={(value) => setTimeFilter(value as TimeFilter)}>
                  <TabsList>
                    <TabsTrigger value="daily">Daily</TabsTrigger>
                    <TabsTrigger value="weekly">Weekly</TabsTrigger>
                    <TabsTrigger value="monthly">Monthly</TabsTrigger>
                    <TabsTrigger value="yearly">Yearly</TabsTrigger>
                  </TabsList>
                </Tabs>
              </div>
            </div>
            
            <div className="h-80">
              <AQIChart pollutant={pollutant} timeFilter={timeFilter} />
            </div>
          </Card>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {isLoadingRankings ? (
            Array(2).fill(0).map((_, i) => (
              <Card key={i} className="bg-white dark:bg-gray-800 shadow-sm p-4 h-[400px]">
                <div className="flex items-center justify-center h-full">
                  <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-theme-blue"></div>
                </div>
              </Card>
            ))
          ) : (
            <>
              <CityRankings
                title="Cleanest Cities"
                cities={rankings?.topCities || []}
                type="top"
              />
              <CityRankings
                title="Most Polluted Cities"
                cities={rankings?.bottomCities || []}
                type="bottom"
              />
            </>
          )}
        </div>
      </div>
    </div>
  );
};

export default Index;
