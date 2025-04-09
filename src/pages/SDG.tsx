
import React, { useEffect, useState } from 'react';
import Navbar from '../components/Navbar';
import { fetchSDGData } from '../utils/geminiAPI';
import { Progress } from '@/components/ui/progress';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { HeartPulse, Building2, CloudSun, Check, AlertTriangle, Trophy } from 'lucide-react';

const SDG = () => {
  const [sdgData, setSDGData] = useState<any>(null);
  const [loading, setLoading] = useState<boolean>(true);

  useEffect(() => {
    const loadData = async () => {
      setLoading(true);
      try {
        const data = await fetchSDGData();
        setSDGData(data);
      } catch (error) {
        console.error("Error loading SDG data:", error);
      } finally {
        setLoading(false);
      }
    };

    loadData();
  }, []);

  if (loading) {
    return (
      <div className="min-h-screen bg-gray-50 dark:bg-gray-950">
        <Navbar />
        <div className="container mx-auto px-4 py-8 max-w-7xl">
          <div className="flex items-center justify-center h-[70vh]">
            <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-theme-blue"></div>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-950">
      <Navbar />
      <div className="container mx-auto px-4 py-8 max-w-7xl">
        <h1 className="text-3xl md:text-4xl font-bold mb-8 text-center text-gray-800 dark:text-gray-100">
          SDG Alignment Tracker
        </h1>
        
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
          <SDGCard 
            number="3" 
            title={sdgData.sdg3.title} 
            progress={sdgData.sdg3.progress} 
            icon={<HeartPulse className="h-8 w-8 text-white" />} 
            color="bg-red-500"
          />
          <SDGCard 
            number="11" 
            title={sdgData.sdg11.title} 
            progress={sdgData.sdg11.progress} 
            icon={<Building2 className="h-8 w-8 text-white" />} 
            color="bg-amber-500"
          />
          <SDGCard 
            number="13" 
            title={sdgData.sdg13.title} 
            progress={sdgData.sdg13.progress} 
            icon={<CloudSun className="h-8 w-8 text-white" />} 
            color="bg-green-500"
          />
        </div>
        
        <Tabs defaultValue="sdg3" className="w-full">
          <TabsList className="grid w-full grid-cols-3 mb-8">
            <TabsTrigger value="sdg3">SDG 3</TabsTrigger>
            <TabsTrigger value="sdg11">SDG 11</TabsTrigger>
            <TabsTrigger value="sdg13">SDG 13</TabsTrigger>
          </TabsList>
          
          <TabsContent value="sdg3" className="bg-white dark:bg-gray-800 rounded-lg p-6 shadow-sm">
            <SDGDetail 
              sdg="3"
              title={sdgData.sdg3.title}
              achievements={sdgData.sdg3.achievements}
              challenges={sdgData.sdg3.challenges}
              recommendations={sdgData.sdg3.recommendations}
              color="text-red-500"
            />
          </TabsContent>
          
          <TabsContent value="sdg11" className="bg-white dark:bg-gray-800 rounded-lg p-6 shadow-sm">
            <SDGDetail 
              sdg="11"
              title={sdgData.sdg11.title}
              achievements={sdgData.sdg11.achievements}
              challenges={sdgData.sdg11.challenges}
              recommendations={sdgData.sdg11.recommendations}
              color="text-amber-500"
            />
          </TabsContent>
          
          <TabsContent value="sdg13" className="bg-white dark:bg-gray-800 rounded-lg p-6 shadow-sm">
            <SDGDetail 
              sdg="13"
              title={sdgData.sdg13.title}
              achievements={sdgData.sdg13.achievements}
              challenges={sdgData.sdg13.challenges}
              recommendations={sdgData.sdg13.recommendations}
              color="text-green-500"
            />
          </TabsContent>
        </Tabs>
        
        <div className="mt-10">
          <h2 className="text-2xl font-semibold mb-4 text-gray-800 dark:text-gray-100 flex items-center">
            <Trophy className="mr-2 h-6 w-6 text-amber-500" />
            Top Performing Cities
          </h2>
          
          <div className="bg-white dark:bg-gray-800 rounded-lg shadow-sm overflow-hidden">
            <div className="overflow-x-auto">
              <table className="min-w-full divide-y divide-gray-200 dark:divide-gray-700">
                <thead className="bg-gray-50 dark:bg-gray-700">
                  <tr>
                    <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-300 uppercase tracking-wider">Rank</th>
                    <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-300 uppercase tracking-wider">City</th>
                    <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-300 uppercase tracking-wider">State</th>
                    <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-300 uppercase tracking-wider">SDG Score</th>
                    <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-300 uppercase tracking-wider">Status</th>
                  </tr>
                </thead>
                <tbody className="bg-white dark:bg-gray-800 divide-y divide-gray-200 dark:divide-gray-700">
                  {sdgData.topPerformers.map((city: any, index: number) => (
                    <tr key={index} className="hover:bg-gray-50 dark:hover:bg-gray-700">
                      <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900 dark:text-gray-100">{index + 1}</td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500 dark:text-gray-300">{city.city}</td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500 dark:text-gray-300">{city.state}</td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500 dark:text-gray-300">{city.sdgScore}/100</td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        <span className={`px-2 inline-flex text-xs leading-5 font-semibold rounded-full ${
                          city.sdgScore >= 70 ? 'bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-200' : 
                          city.sdgScore >= 50 ? 'bg-yellow-100 text-yellow-800 dark:bg-yellow-900 dark:text-yellow-200' : 
                          'bg-red-100 text-red-800 dark:bg-red-900 dark:text-red-200'
                        }`}>
                          {city.sdgScore >= 70 ? 'Excellent' : city.sdgScore >= 50 ? 'Good' : 'Needs Improvement'}
                        </span>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

interface SDGCardProps {
  number: string;
  title: string;
  progress: number;
  icon: React.ReactNode;
  color: string;
}

const SDGCard = ({ number, title, progress, icon, color }: SDGCardProps) => {
  return (
    <div className="bg-white dark:bg-gray-800 rounded-lg shadow-sm p-6">
      <div className="flex items-center mb-4">
        <div className={`rounded-full p-3 mr-3 ${color}`}>
          {icon}
        </div>
        <div>
          <h3 className="font-bold text-lg text-gray-800 dark:text-gray-100">SDG {number}</h3>
          <p className="text-gray-500 dark:text-gray-400">{title}</p>
        </div>
      </div>
      
      <div className="mb-2 flex justify-between items-center">
        <span className="text-sm font-medium text-gray-700 dark:text-gray-300">Progress</span>
        <span className="text-sm font-medium text-gray-700 dark:text-gray-300">{progress}%</span>
      </div>
      <Progress value={progress} className="h-2" />
      
      <div className="mt-4 text-sm text-gray-500 dark:text-gray-400">
        {progress < 40 ? (
          <span className="flex items-center text-amber-500">
            <AlertTriangle className="h-4 w-4 mr-1" />
            Significant improvement needed
          </span>
        ) : progress < 70 ? (
          <span className="flex items-center text-amber-500">
            <AlertTriangle className="h-4 w-4 mr-1" />
            On track but requires attention
          </span>
        ) : (
          <span className="flex items-center text-green-500">
            <Check className="h-4 w-4 mr-1" />
            Good progress towards target
          </span>
        )}
      </div>
    </div>
  );
};

interface SDGDetailProps {
  sdg: string;
  title: string;
  achievements: string[];
  challenges: string[];
  recommendations: string[];
  color: string;
}

const SDGDetail = ({ sdg, title, achievements, challenges, recommendations, color }: SDGDetailProps) => {
  return (
    <div>
      <h2 className={`text-2xl font-bold mb-4 ${color}`}>
        SDG {sdg}: {title}
      </h2>
      
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mt-6">
        <div className="bg-green-50 dark:bg-green-900/20 p-4 rounded-lg">
          <h3 className="font-semibold text-gray-800 dark:text-gray-100 mb-3 flex items-center">
            <Check className="h-5 w-5 mr-2 text-green-500" />
            Achievements
          </h3>
          <ul className="space-y-2">
            {achievements.map((item, index) => (
              <li key={index} className="text-sm text-gray-600 dark:text-gray-300 flex items-start">
                <span className="text-green-500 mr-2">•</span>
                {item}
              </li>
            ))}
          </ul>
        </div>
        
        <div className="bg-red-50 dark:bg-red-900/20 p-4 rounded-lg">
          <h3 className="font-semibold text-gray-800 dark:text-gray-100 mb-3 flex items-center">
            <AlertTriangle className="h-5 w-5 mr-2 text-red-500" />
            Challenges
          </h3>
          <ul className="space-y-2">
            {challenges.map((item, index) => (
              <li key={index} className="text-sm text-gray-600 dark:text-gray-300 flex items-start">
                <span className="text-red-500 mr-2">•</span>
                {item}
              </li>
            ))}
          </ul>
        </div>
        
        <div className="bg-blue-50 dark:bg-blue-900/20 p-4 rounded-lg">
          <h3 className="font-semibold text-gray-800 dark:text-gray-100 mb-3 flex items-center">
            <HeartPulse className="h-5 w-5 mr-2 text-blue-500" />
            Recommendations
          </h3>
          <ul className="space-y-2">
            {recommendations.map((item, index) => (
              <li key={index} className="text-sm text-gray-600 dark:text-gray-300 flex items-start">
                <span className="text-blue-500 mr-2">•</span>
                {item}
              </li>
            ))}
          </ul>
        </div>
      </div>
    </div>
  );
};

export default SDG;
