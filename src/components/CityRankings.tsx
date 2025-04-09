import React from 'react';
import { ArrowUpIcon, ArrowDownIcon } from 'lucide-react';
import { getAQIColor } from '../utils/mockData';
import { CityRanking } from '../utils/types';

interface CityRankingsProps {
  title: string;
  cities: CityRanking[];
  type?: string;
}

const CityRankings: React.FC<CityRankingsProps> = ({ title, cities }) => {
  return (
    <div className="bg-white dark:bg-gray-900 rounded-xl shadow-md border border-gray-100 dark:border-gray-800 p-6">
      <div className="flex items-center justify-between mb-6">
        <h3 className="text-lg font-semibold text-gray-800 dark:text-gray-200">{title}</h3>
        <span className="text-xs font-medium bg-gray-100 dark:bg-gray-800 text-gray-600 dark:text-gray-300 px-3 py-1 rounded-full">
          Updated 1h ago
        </span>
      </div>

      <div className="overflow-hidden rounded-lg border border-gray-100 dark:border-gray-800">
        <table className="w-full">
          <thead className="bg-gray-50 dark:bg-gray-800">
            <tr className="text-left text-sm font-medium text-gray-500 dark:text-gray-400">
              <th className="p-4">Rank</th>
              <th className="p-4">City</th>
              <th className="p-4">State</th>
              <th className="p-4">AQI</th>
              <th className="p-4">Trend</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-gray-100 dark:divide-gray-800">
            {cities.map((city, index) => (
              <tr 
                key={city.city} 
                className="hover:bg-gray-50 dark:hover:bg-gray-800/50 transition-colors"
              >
                <td className="p-4 font-medium text-gray-700 dark:text-gray-300">
                  #{index + 1}
                </td>
                <td className="p-4 font-medium text-gray-900 dark:text-gray-100">
                  {city.city}
                </td>
                <td className="p-4 text-gray-600 dark:text-gray-400">
                  {city.state}
                </td>
                <td className="p-4">
                  <span className={`inline-flex items-center px-3 py-1 rounded-full text-sm ${getAQIColor(city.category)}`}>
                    {city.aqi}
                  </span>
                </td>
                <td className="p-4">
                  {city.change !== 0 ? (
                    <div className="inline-flex items-center gap-1">
                      {city.change > 0 ? (
                        <ArrowUpIcon className="w-4 h-4 text-red-600 dark:text-red-400" />
                      ) : (
                        <ArrowDownIcon className="w-4 h-4 text-green-600 dark:text-green-400" />
                      )}
                      <span className={`text-sm font-medium ${
                        city.change > 0 
                          ? 'text-red-600 dark:text-red-400'
                          : 'text-green-600 dark:text-green-400'
                      }`}>
                        {Math.abs(city.change)}%
                      </span>
                    </div>
                  ) : (
                    <span className="text-gray-400 dark:text-gray-600">-</span>
                  )}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default CityRankings;