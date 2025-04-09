
import { AQICategory, AQIData, CityRanking, CountryData, HotspotData } from './types';

// Helper function to get AQI category based on value
export const getAQICategory = (aqi: number): AQICategory => {
  if (aqi <= 50) return 'Good';
  if (aqi <= 100) return 'Moderate';
  if (aqi <= 150) return 'Unhealthy for Sensitive Groups';
  if (aqi <= 200) return 'Unhealthy';
  if (aqi <= 300) return 'Very Unhealthy';
  return 'Hazardous';
};

// Helper function to get color based on AQI category
export const getAQIColor = (category: AQICategory): string => {
  switch(category) {
    case 'Good': return 'bg-aqi-good text-white';
    case 'Moderate': return 'bg-aqi-moderate text-gray-800';
    case 'Unhealthy for Sensitive Groups': return 'bg-aqi-unhealthySensitive text-white';
    case 'Unhealthy': return 'bg-aqi-unhealthy text-white';
    case 'Very Unhealthy': return 'bg-aqi-veryUnhealthy text-white';
    case 'Hazardous': return 'bg-aqi-hazardous text-white';
    default: return 'bg-gray-500 text-white';
  }
};

// Generate mock AQI data for Indian cities
export const indiaAQIData: AQIData[] = [
  {
    id: '1',
    city: 'Delhi',
    state: 'Delhi',
    country: 'India',
    aqi: 215,
    pm25: 168,
    pm10: 143,
    no2: 45,
    so2: 12,
    o3: 28,
    co: 1.2,
    timestamp: new Date().toISOString(),
    category: 'Unhealthy'
  },
  {
    id: '2',
    city: 'Mumbai',
    state: 'Maharashtra',
    country: 'India',
    aqi: 125,
    pm25: 78,
    pm10: 92,
    no2: 32,
    so2: 8,
    o3: 18,
    co: 0.8,
    timestamp: new Date().toISOString(),
    category: 'Unhealthy for Sensitive Groups'
  },
  {
    id: '3',
    city: 'Bengaluru',
    state: 'Karnataka',
    country: 'India',
    aqi: 76,
    pm25: 45,
    pm10: 52,
    no2: 24,
    so2: 5,
    o3: 15,
    co: 0.6,
    timestamp: new Date().toISOString(),
    category: 'Moderate'
  },
  {
    id: '4',
    city: 'Kolkata',
    state: 'West Bengal',
    country: 'India',
    aqi: 158,
    pm25: 92,
    pm10: 121,
    no2: 38,
    so2: 11,
    o3: 25,
    co: 1.0,
    timestamp: new Date().toISOString(),
    category: 'Unhealthy'
  },
  {
    id: '5',
    city: 'Chennai',
    state: 'Tamil Nadu',
    country: 'India',
    aqi: 89,
    pm25: 56,
    pm10: 72,
    no2: 26,
    so2: 7,
    o3: 17,
    co: 0.7,
    timestamp: new Date().toISOString(),
    category: 'Moderate'
  },
  {
    id: '6',
    city: 'Hyderabad',
    state: 'Telangana',
    country: 'India',
    aqi: 105,
    pm25: 68,
    pm10: 82,
    no2: 28,
    so2: 9,
    o3: 19,
    co: 0.8,
    timestamp: new Date().toISOString(),
    category: 'Unhealthy for Sensitive Groups'
  },
  {
    id: '7',
    city: 'Lucknow',
    state: 'Uttar Pradesh',
    country: 'India',
    aqi: 178,
    pm25: 115,
    pm10: 138,
    no2: 42,
    so2: 14,
    o3: 24,
    co: 1.1,
    timestamp: new Date().toISOString(),
    category: 'Unhealthy'
  },
  {
    id: '8',
    city: 'Jaipur',
    state: 'Rajasthan',
    country: 'India',
    aqi: 156,
    pm25: 96,
    pm10: 124,
    no2: 35,
    so2: 12,
    o3: 22,
    co: 0.9,
    timestamp: new Date().toISOString(),
    category: 'Unhealthy'
  },
  {
    id: '9',
    city: 'Chandigarh',
    state: 'Chandigarh',
    country: 'India',
    aqi: 88,
    pm25: 54,
    pm10: 68,
    no2: 25,
    so2: 6,
    o3: 16,
    co: 0.7,
    timestamp: new Date().toISOString(),
    category: 'Moderate'
  },
  {
    id: '10',
    city: 'Patna',
    state: 'Bihar',
    country: 'India',
    aqi: 168,
    pm25: 105,
    pm10: 132,
    no2: 39,
    so2: 13,
    o3: 23,
    co: 1.0,
    timestamp: new Date().toISOString(),
    category: 'Unhealthy'
  },
  {
    id: '11',
    city: 'Thiruvananthapuram',
    state: 'Kerala',
    country: 'India',
    aqi: 42,
    pm25: 22,
    pm10: 34,
    no2: 15,
    so2: 3,
    o3: 12,
    co: 0.4,
    timestamp: new Date().toISOString(),
    category: 'Good'
  },
  {
    id: '12',
    city: 'Shimla',
    state: 'Himachal Pradesh',
    country: 'India',
    aqi: 38,
    pm25: 18,
    pm10: 28,
    no2: 12,
    so2: 2,
    o3: 10,
    co: 0.3,
    timestamp: new Date().toISOString(),
    category: 'Good'
  },
  {
    id: '13',
    city: 'Ahmedabad',
    state: 'Gujarat',
    country: 'India',
    aqi: 145,
    pm25: 85,
    pm10: 112,
    no2: 34,
    so2: 11,
    o3: 21,
    co: 0.9,
    timestamp: new Date().toISOString(),
    category: 'Unhealthy for Sensitive Groups'
  },
  {
    id: '14',
    city: 'Guwahati',
    state: 'Assam',
    country: 'India',
    aqi: 98,
    pm25: 62,
    pm10: 78,
    no2: 27,
    so2: 8,
    o3: 18,
    co: 0.7,
    timestamp: new Date().toISOString(),
    category: 'Moderate'
  },
  {
    id: '15',
    city: 'Bhopal',
    state: 'Madhya Pradesh',
    country: 'India',
    aqi: 112,
    pm25: 72,
    pm10: 86,
    no2: 30,
    so2: 9,
    o3: 20,
    co: 0.8,
    timestamp: new Date().toISOString(),
    category: 'Unhealthy for Sensitive Groups'
  }
];

// Generate mock city rankings
export const topCities: CityRanking[] = [
  { city: 'Shimla', state: 'Himachal Pradesh', aqi: 38, category: 'Good', change: -5 },
  { city: 'Thiruvananthapuram', state: 'Kerala', aqi: 42, category: 'Good', change: -2 },
  { city: 'Shillong', state: 'Meghalaya', aqi: 45, category: 'Good', change: 3 },
  { city: 'Gangtok', state: 'Sikkim', aqi: 48, category: 'Good', change: 1 },
  { city: 'Ooty', state: 'Tamil Nadu', aqi: 52, category: 'Moderate', change: -3 },
  { city: 'Mangalore', state: 'Karnataka', aqi: 58, category: 'Moderate', change: 4 },
  { city: 'Mysore', state: 'Karnataka', aqi: 62, category: 'Moderate', change: -1 },
  { city: 'Pondicherry', state: 'Puducherry', aqi: 65, category: 'Moderate', change: 2 },
  { city: 'Kochi', state: 'Kerala', aqi: 68, category: 'Moderate', change: -4 },
  { city: 'Coimbatore', state: 'Tamil Nadu', aqi: 70, category: 'Moderate', change: 0 }
];

export const bottomCities: CityRanking[] = [
  { city: 'Delhi', state: 'Delhi', aqi: 215, category: 'Unhealthy', change: 15 },
  { city: 'Ghaziabad', state: 'Uttar Pradesh', aqi: 205, category: 'Unhealthy', change: 12 },
  { city: 'Gurugram', state: 'Haryana', aqi: 195, category: 'Unhealthy', change: 8 },
  { city: 'Noida', state: 'Uttar Pradesh', aqi: 188, category: 'Unhealthy', change: 10 },
  { city: 'Lucknow', state: 'Uttar Pradesh', aqi: 178, category: 'Unhealthy', change: 7 },
  { city: 'Patna', state: 'Bihar', aqi: 168, category: 'Unhealthy', change: 5 },
  { city: 'Jaipur', state: 'Rajasthan', aqi: 156, category: 'Unhealthy', change: 3 },
  { city: 'Kolkata', state: 'West Bengal', aqi: 158, category: 'Unhealthy', change: 6 },
  { city: 'Ahmedabad', state: 'Gujarat', aqi: 145, category: 'Unhealthy for Sensitive Groups', change: 4 },
  { city: 'Kanpur', state: 'Uttar Pradesh', aqi: 152, category: 'Unhealthy', change: 8 }
];

// Generate mock comparative country data
export const countriesData: CountryData[] = [
  {
    id: '1',
    name: 'India',
    data: [
      { year: 2018, aqi: 168, pm25: 102, pm10: 138, no2: 38, so2: 12, o3: 22, co: 1.1 },
      { year: 2019, aqi: 172, pm25: 105, pm10: 142, no2: 40, so2: 13, o3: 23, co: 1.2 },
      { year: 2020, aqi: 132, pm25: 78, pm10: 108, no2: 30, so2: 10, o3: 18, co: 0.9 },
      { year: 2021, aqi: 152, pm25: 92, pm10: 125, no2: 36, so2: 12, o3: 21, co: 1.0 },
      { year: 2022, aqi: 158, pm25: 95, pm10: 132, no2: 38, so2: 12, o3: 22, co: 1.1 },
      { year: 2023, aqi: 155, pm25: 94, pm10: 128, no2: 37, so2: 12, o3: 21, co: 1.0 }
    ]
  },
  {
    id: '2',
    name: 'China',
    data: [
      { year: 2018, aqi: 145, pm25: 88, pm10: 118, no2: 34, so2: 11, o3: 20, co: 1.0 },
      { year: 2019, aqi: 138, pm25: 82, pm10: 112, no2: 32, so2: 10, o3: 19, co: 0.9 },
      { year: 2020, aqi: 112, pm25: 65, pm10: 92, no2: 25, so2: 8, o3: 16, co: 0.7 },
      { year: 2021, aqi: 122, pm25: 72, pm10: 98, no2: 28, so2: 9, o3: 17, co: 0.8 },
      { year: 2022, aqi: 118, pm25: 70, pm10: 95, no2: 27, so2: 9, o3: 17, co: 0.8 },
      { year: 2023, aqi: 105, pm25: 62, pm10: 85, no2: 24, so2: 8, o3: 15, co: 0.7 }
    ]
  },
  {
    id: '3',
    name: 'USA',
    data: [
      { year: 2018, aqi: 58, pm25: 32, pm10: 45, no2: 18, so2: 4, o3: 12, co: 0.5 },
      { year: 2019, aqi: 55, pm25: 30, pm10: 42, no2: 17, so2: 4, o3: 12, co: 0.5 },
      { year: 2020, aqi: 48, pm25: 26, pm10: 38, no2: 15, so2: 3, o3: 10, co: 0.4 },
      { year: 2021, aqi: 52, pm25: 28, pm10: 40, no2: 16, so2: 4, o3: 11, co: 0.4 },
      { year: 2022, aqi: 54, pm25: 29, pm10: 42, no2: 17, so2: 4, o3: 12, co: 0.5 },
      { year: 2023, aqi: 52, pm25: 28, pm10: 40, no2: 16, so2: 4, o3: 11, co: 0.4 }
    ]
  },
  {
    id: '4',
    name: 'UK',
    data: [
      { year: 2018, aqi: 45, pm25: 22, pm10: 35, no2: 15, so2: 3, o3: 10, co: 0.4 },
      { year: 2019, aqi: 42, pm25: 21, pm10: 32, no2: 14, so2: 3, o3: 9, co: 0.4 },
      { year: 2020, aqi: 38, pm25: 18, pm10: 28, no2: 12, so2: 2, o3: 8, co: 0.3 },
      { year: 2021, aqi: 40, pm25: 20, pm10: 30, no2: 13, so2: 3, o3: 9, co: 0.4 },
      { year: 2022, aqi: 42, pm25: 21, pm10: 32, no2: 14, so2: 3, o3: 9, co: 0.4 },
      { year: 2023, aqi: 41, pm25: 20, pm10: 31, no2: 13, so2: 3, o3: 9, co: 0.4 }
    ]
  },
  {
    id: '5',
    name: 'Germany',
    data: [
      { year: 2018, aqi: 42, pm25: 20, pm10: 32, no2: 14, so2: 3, o3: 9, co: 0.4 },
      { year: 2019, aqi: 40, pm25: 19, pm10: 30, no2: 13, so2: 3, o3: 9, co: 0.4 },
      { year: 2020, aqi: 35, pm25: 16, pm10: 26, no2: 11, so2: 2, o3: 8, co: 0.3 },
      { year: 2021, aqi: 38, pm25: 18, pm10: 28, no2: 12, so2: 2, o3: 8, co: 0.3 },
      { year: 2022, aqi: 39, pm25: 18, pm10: 29, no2: 12, so2: 3, o3: 8, co: 0.3 },
      { year: 2023, aqi: 38, pm25: 18, pm10: 28, no2: 12, so2: 2, o3: 8, co: 0.3 }
    ]
  }
];

// Generate mock hotspot data for India
export const hotspotData: HotspotData[] = [
  {
    id: '1',
    name: 'Delhi-NCR Cluster',
    latitude: 28.7041,
    longitude: 77.1025,
    aqi: 215,
    radius: 50,
    intensity: 0.92,
    category: 'Unhealthy'
  },
  {
    id: '2',
    name: 'Kanpur-Lucknow Belt',
    latitude: 26.8467,
    longitude: 80.9462,
    aqi: 178,
    radius: 40,
    intensity: 0.78,
    category: 'Unhealthy'
  },
  {
    id: '3',
    name: 'Kolkata Metropolitan',
    latitude: 22.5726,
    longitude: 88.3639,
    aqi: 158,
    radius: 35,
    intensity: 0.65,
    category: 'Unhealthy'
  },
  {
    id: '4',
    name: 'Mumbai-Thane Industrial',
    latitude: 19.0760,
    longitude: 72.8777,
    aqi: 125,
    radius: 30,
    intensity: 0.56,
    category: 'Unhealthy for Sensitive Groups'
  },
  {
    id: '5',
    name: 'Ahmedabad Zone',
    latitude: 23.0225,
    longitude: 72.5714,
    aqi: 145,
    radius: 35,
    intensity: 0.61,
    category: 'Unhealthy for Sensitive Groups'
  },
  {
    id: '6',
    name: 'Jaipur-Jodhpur Corridor',
    latitude: 26.9124,
    longitude: 75.7873,
    aqi: 156,
    radius: 35,
    intensity: 0.63,
    category: 'Unhealthy'
  },
  {
    id: '7',
    name: 'Patna Basin',
    latitude: 25.5941,
    longitude: 85.1376,
    aqi: 168,
    radius: 30,
    intensity: 0.72,
    category: 'Unhealthy'
  },
  {
    id: '8',
    name: 'Hyderabad Urban',
    latitude: 17.3850,
    longitude: 78.4867,
    aqi: 105,
    radius: 25,
    intensity: 0.48,
    category: 'Unhealthy for Sensitive Groups'
  },
  {
    id: '9',
    name: 'Chennai Metropolitan',
    latitude: 13.0827,
    longitude: 80.2707,
    aqi: 89,
    radius: 25,
    intensity: 0.38,
    category: 'Moderate'
  },
  {
    id: '10',
    name: 'Bangalore Urban',
    latitude: 12.9716,
    longitude: 77.5946,
    aqi: 76,
    radius: 20,
    intensity: 0.32,
    category: 'Moderate'
  }
];

// Historical trend data
export const historicalTrendData = {
  labels: ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'],
  datasets: [
    {
      label: 'PM2.5',
      data: [125, 138, 95, 82, 68, 58, 62, 75, 88, 105, 148, 168],
      borderColor: '#F44336',
      backgroundColor: 'rgba(244, 67, 54, 0.1)',
      tension: 0.4,
    },
    {
      label: 'PM10',
      data: [152, 165, 120, 105, 88, 75, 80, 95, 110, 132, 178, 195],
      borderColor: '#FF9800',
      backgroundColor: 'rgba(255, 152, 0, 0.1)',
      tension: 0.4,
    },
    {
      label: 'NO₂',
      data: [38, 42, 32, 28, 22, 18, 20, 25, 30, 35, 45, 48],
      borderColor: '#9C27B0',
      backgroundColor: 'rgba(156, 39, 176, 0.1)',
      tension: 0.4,
    },
    {
      label: 'SO₂',
      data: [12, 15, 10, 8, 6, 5, 5, 7, 9, 11, 14, 16],
      borderColor: '#2196F3',
      backgroundColor: 'rgba(33, 150, 243, 0.1)',
      tension: 0.4,
    }
  ]
};

export const pollutantInfo = {
  pm25: {
    name: 'PM2.5',
    description: 'Fine particles with diameter less than 2.5 μm that can penetrate deep into lungs.',
    effects: 'Respiratory issues, heart disease, lung cancer.',
    sources: 'Vehicle emissions, industrial processes, cooking, and biomass burning.'
  },
  pm10: {
    name: 'PM10',
    description: 'Particles with diameter less than 10 μm that can be inhaled into the respiratory system.',
    effects: 'Respiratory infections, asthma attacks, bronchitis.',
    sources: 'Dust, construction, agricultural activities, and road transport.'
  },
  no2: {
    name: 'NO₂',
    description: 'Nitrogen dioxide, a reddish-brown gas with a pungent odor.',
    effects: 'Respiratory inflammation, reduced lung function, increased susceptibility to infections.',
    sources: 'Fossil fuel combustion, especially from vehicles and power plants.'
  },
  so2: {
    name: 'SO₂',
    description: 'Sulfur dioxide, a colorless gas with a strong odor.',
    effects: 'Irritation to eyes and respiratory tract, aggravates asthma.',
    sources: 'Burning of fossil fuels, industrial processes, and volcanic eruptions.'
  },
  o3: {
    name: 'O₃',
    description: 'Ground-level ozone, a key component of smog.',
    effects: 'Reduced lung function, throat irritation, coughing, breathing difficulties.',
    sources: 'Created by chemical reactions between NOx and VOCs in sunlight.'
  },
  co: {
    name: 'CO',
    description: 'Carbon monoxide, a colorless, odorless gas.',
    effects: 'Reduces oxygen delivery to organs, can cause headaches, dizziness, and at high levels, death.',
    sources: 'Incomplete combustion of fuels in vehicles and machinery.'
  }
};
