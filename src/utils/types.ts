
export interface AQIData {
  id: string;
  city: string;
  state: string;
  country: string;
  aqi: number;
  pm25: number;
  pm10: number;
  no2: number;
  so2: number;
  o3: number;
  co: number;
  timestamp: string;
  category: AQICategory;
}

export type AQICategory = 
  | 'Good' 
  | 'Moderate' 
  | 'Unhealthy for Sensitive Groups'
  | 'Unhealthy'
  | 'Very Unhealthy'
  | 'Hazardous';

export interface CityRanking {
  city: string;
  state: string;
  aqi: number;
  category: AQICategory;
  change: number; // change from previous day/period
}

export interface CountryData {
  id: string;
  name: string;
  data: {
    year: number;
    aqi: number;
    pm25: number;
    pm10: number;
    no2: number;
    so2: number;
    o3: number;
    co: number;
  }[];
}

export interface HotspotData {
  id: string;
  name: string;
  latitude: number;
  longitude: number;
  aqi: number;
  radius: number; // size of the hotspot 
  intensity: number; // 0-1 normalized intensity
  category: AQICategory;
}

export interface MapCoordinate {
  latitude: number;
  longitude: number;
}

export type TimeFilter = 'daily' | 'weekly' | 'monthly' | 'yearly';

export type PollutantType = 'aqi' | 'pm25' | 'pm10' | 'no2' | 'so2' | 'o3' | 'co';
