
import React from 'react';
import { ArrowUpIcon, ArrowDownIcon } from 'lucide-react';
import { getAQIColor } from '../utils/mockData';
import { CityRanking } from '../utils/types';

interface CityRankingsProps {
  title: string;
  cities: CityRanking[];
}

const CityRankings: React.FC<CityRankingsProps> = ({ title, cities }) => {
  return (
    <div className="bg-white dark:bg-card rounded-lg shadow-sm p-4">
      <h3 className="text-lg font-semibold mb-4">{title}</h3>
      
      <div className="overflow-hidden">
        <div className="overflow-x-auto">
          <table className="min-w-full divide-y divide-gray-200 dark:divide-gray-700">
            <thead className="bg-gray-50 dark:bg-gray-800">
              <tr>
                <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider">
                  Rank
                </th>
                <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider">
                  City
                </th>
                <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider">
                  State
                </th>
                <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider">
                  AQI
                </th>
                <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider">
                  Change
                </th>
              </tr>
            </thead>
            <tbody className="bg-white dark:bg-gray-900 divide-y divide-gray-200 dark:divide-gray-800">
              {cities.map((city, index) => (
                <tr key={city.city} className="hover:bg-gray-50 dark:hover:bg-gray-800 transition-colors">
                  <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900 dark:text-white">
                    {index + 1}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900 dark:text-white">
                    {city.city}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500 dark:text-gray-400">
                    {city.state}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${getAQIColor(city.category)}`}>
                      {city.aqi}
                    </span>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm">
                    {city.change > 0 ? (
                      <span className="inline-flex items-center text-red-600 dark:text-red-400">
                        <ArrowUpIcon className="w-4 h-4 mr-1" />
                        {city.change}
                      </span>
                    ) : city.change < 0 ? (
                      <span className="inline-flex items-center text-green-600 dark:text-green-400">
                        <ArrowDownIcon className="w-4 h-4 mr-1" />
                        {Math.abs(city.change)}
                      </span>
                    ) : (
                      <span className="text-gray-500 dark:text-gray-400">0</span>
                    )}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

export default CityRankings;
