
import React, { useEffect, useState } from 'react';
import Navbar from '../components/Navbar';
import { fetchHealthImpactData } from '../utils/geminiAPI';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { TabsContent, TabsList, TabsTrigger, Tabs } from '@/components/ui/tabs';
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from '@/components/ui/accordion';
import { Separator } from '@/components/ui/separator';
import { HeartPulse, Users, ShieldAlert, AlertTriangle, Info, Home, Bike, Leaf, BadgeInfo } from 'lucide-react';
import { Progress } from '@/components/ui/progress';

const HealthImpact = () => {
  const [healthData, setHealthData] = useState<any>(null);
  const [loading, setLoading] = useState<boolean>(true);

  useEffect(() => {
    const loadData = async () => {
      setLoading(true);
      try {
        const data = await fetchHealthImpactData();
        setHealthData(data);
      } catch (error) {
        console.error("Error loading health data:", error);
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
          Health Impact of Air Pollution
        </h1>
        
        {/* Health Impacts Section */}
        <section className="mb-10">
          <h2 className="text-2xl font-semibold mb-4 text-gray-800 dark:text-gray-100 flex items-center">
            <HeartPulse className="mr-2 h-6 w-6 text-red-500" /> 
            Health Impacts
          </h2>
          
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            {healthData.healthImpacts.map((impact: any, index: number) => (
              <Card key={index} className="bg-white dark:bg-gray-800">
                <CardHeader>
                  <CardTitle className="text-gray-800 dark:text-gray-100">{impact.condition}</CardTitle>
                  <CardDescription>Affects {impact.affectedPopulation}</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="mb-4">
                    <span className="text-sm font-medium text-gray-500 dark:text-gray-400">Associated Pollutants:</span>
                    <div className="flex flex-wrap gap-2 mt-1">
                      {impact.pollutants.map((pollutant: string, i: number) => (
                        <span key={i} className="bg-gray-100 dark:bg-gray-700 px-2 py-1 rounded text-xs font-medium text-gray-800 dark:text-gray-200">
                          {pollutant}
                        </span>
                      ))}
                    </div>
                  </div>
                  
                  <div className="flex items-center">
                    <span className="text-sm font-medium text-gray-500 dark:text-gray-400 mr-2">Risk Level:</span>
                    <span className={`px-2 py-1 rounded text-xs font-medium ${
                      impact.riskLevel === 'High' ? 'bg-red-100 text-red-800 dark:bg-red-900/30 dark:text-red-300' :
                      impact.riskLevel === 'Medium' ? 'bg-yellow-100 text-yellow-800 dark:bg-yellow-900/30 dark:text-yellow-300' :
                      'bg-green-100 text-green-800 dark:bg-green-900/30 dark:text-green-300'
                    }`}>
                      {impact.riskLevel}
                    </span>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </section>
        
        {/* Vulnerable Groups Section */}
        <section className="mb-10">
          <h2 className="text-2xl font-semibold mb-4 text-gray-800 dark:text-gray-100 flex items-center">
            <Users className="mr-2 h-6 w-6 text-blue-500" /> 
            Vulnerable Groups
          </h2>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {healthData.vulnerableGroups.map((group: any, index: number) => (
              <Card key={index} className="bg-white dark:bg-gray-800">
                <CardHeader>
                  <CardTitle className="text-gray-800 dark:text-gray-100">{group.group}</CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div>
                    <span className="text-sm font-medium text-gray-500 dark:text-gray-400">Risk Factors:</span>
                    <p className="text-gray-700 dark:text-gray-300 mt-1">{group.risks}</p>
                  </div>
                  
                  <Separator />
                  
                  <div>
                    <span className="text-sm font-medium text-gray-500 dark:text-gray-400">Recommendations:</span>
                    <p className="text-gray-700 dark:text-gray-300 mt-1">{group.recommendations}</p>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </section>
        
        {/* AQI Health Matrix Section */}
        <section className="mb-10">
          <h2 className="text-2xl font-semibold mb-4 text-gray-800 dark:text-gray-100 flex items-center">
            <ShieldAlert className="mr-2 h-6 w-6 text-purple-500" /> 
            AQI Health Impact Guide
          </h2>
          
          <div className="bg-white dark:bg-gray-800 rounded-lg shadow-sm overflow-hidden">
            <div className="overflow-x-auto">
              <table className="min-w-full divide-y divide-gray-200 dark:divide-gray-700">
                <thead className="bg-gray-50 dark:bg-gray-700">
                  <tr>
                    <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-300 uppercase tracking-wider">Category</th>
                    <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-300 uppercase tracking-wider">AQI Range</th>
                    <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-300 uppercase tracking-wider">Health Effects</th>
                    <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-300 uppercase tracking-wider">Precautions</th>
                  </tr>
                </thead>
                <tbody className="bg-white dark:bg-gray-800 divide-y divide-gray-200 dark:divide-gray-700">
                  {healthData.aqiHealthMatrix.map((item: any, index: number) => {
                    let bgColor = '';
                    
                    switch(item.category) {
                      case 'Good':
                        bgColor = 'bg-green-50 dark:bg-green-900/10';
                        break;
                      case 'Moderate':
                        bgColor = 'bg-yellow-50 dark:bg-yellow-900/10';
                        break;
                      case 'Unhealthy for Sensitive Groups':
                        bgColor = 'bg-orange-50 dark:bg-orange-900/10';
                        break;
                      case 'Unhealthy':
                        bgColor = 'bg-red-50 dark:bg-red-900/10';
                        break;
                      case 'Very Unhealthy':
                        bgColor = 'bg-purple-50 dark:bg-purple-900/10';
                        break;
                      case 'Hazardous':
                        bgColor = 'bg-gray-50 dark:bg-gray-900/10';
                        break;
                      default:
                        bgColor = '';
                    }
                    
                    return (
                      <tr key={index} className={`${bgColor} hover:bg-opacity-80`}>
                        <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900 dark:text-gray-100">{item.category}</td>
                        <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500 dark:text-gray-300">{item.range}</td>
                        <td className="px-6 py-4 text-sm text-gray-500 dark:text-gray-300">{item.healthEffects}</td>
                        <td className="px-6 py-4 text-sm text-gray-500 dark:text-gray-300">{item.precautions}</td>
                      </tr>
                    );
                  })}
                </tbody>
              </table>
            </div>
          </div>
        </section>
        
        {/* State Health Metrics Section */}
        <section className="mb-10">
          <h2 className="text-2xl font-semibold mb-4 text-gray-800 dark:text-gray-100 flex items-center">
            <AlertTriangle className="mr-2 h-6 w-6 text-amber-500" /> 
            State Health Metrics
          </h2>
          
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            {healthData.stateHealthMetrics.map((state: any, index: number) => (
              <Card key={index} className="bg-white dark:bg-gray-800">
                <CardHeader>
                  <CardTitle className="text-gray-800 dark:text-gray-100">{state.state}</CardTitle>
                  <CardDescription>Average AQI: {state.aqiAverage}</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="space-y-3">
                    <div>
                      <div className="flex justify-between text-sm mb-1">
                        <span className="text-gray-600 dark:text-gray-400">Respiratory Disease Rate (%)</span>
                        <span className="font-medium text-gray-800 dark:text-gray-200">{state.respiratoryDisease}%</span>
                      </div>
                      <Progress value={state.respiratoryDisease} max={20} className="h-2" />
                    </div>
                    
                    <div>
                      <div className="flex justify-between text-sm mb-1">
                        <span className="text-gray-600 dark:text-gray-400">Cardiovascular Disease Rate (%)</span>
                        <span className="font-medium text-gray-800 dark:text-gray-200">{state.cardiovascularDisease}%</span>
                      </div>
                      <Progress value={state.cardiovascularDisease} max={20} className="h-2" />
                    </div>
                    
                    <div className="mt-4 text-sm text-gray-500 dark:text-gray-400">
                      <Info className="h-4 w-4 inline mr-1 text-blue-500" />
                      {state.aqiAverage > 150 ? 
                        "High pollution levels significantly impact public health." :
                        state.aqiAverage > 100 ?
                        "Moderate pollution levels affect sensitive groups." :
                        "Relatively low pollution levels with limited health impact."}
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </section>
        
        {/* Safety Tips Section */}
        <section>
          <h2 className="text-2xl font-semibold mb-4 text-gray-800 dark:text-gray-100 flex items-center">
            <BadgeInfo className="mr-2 h-6 w-6 text-green-500" /> 
            Air Pollution Safety Tips
          </h2>
          
          <Tabs defaultValue="indoor" className="w-full">
            <TabsList className="grid w-full grid-cols-3 mb-6">
              <TabsTrigger value="indoor" className="flex items-center">
                <Home className="h-4 w-4 mr-2" /> Indoor
              </TabsTrigger>
              <TabsTrigger value="outdoor" className="flex items-center">
                <Bike className="h-4 w-4 mr-2" /> Outdoor
              </TabsTrigger>
              <TabsTrigger value="longTerm" className="flex items-center">
                <Leaf className="h-4 w-4 mr-2" /> Long Term
              </TabsTrigger>
            </TabsList>
            
            <TabsContent value="indoor">
              <div className="bg-white dark:bg-gray-800 rounded-lg p-6 shadow-sm">
                <Accordion type="single" collapsible className="w-full">
                  {healthData.safetyTips.indoor.map((tip: string, index: number) => (
                    <AccordionItem key={index} value={`item-${index}`}>
                      <AccordionTrigger className="text-gray-800 dark:text-gray-100">
                        Tip #{index + 1}
                      </AccordionTrigger>
                      <AccordionContent className="text-gray-600 dark:text-gray-300">
                        {tip}
                      </AccordionContent>
                    </AccordionItem>
                  ))}
                </Accordion>
              </div>
            </TabsContent>
            
            <TabsContent value="outdoor">
              <div className="bg-white dark:bg-gray-800 rounded-lg p-6 shadow-sm">
                <Accordion type="single" collapsible className="w-full">
                  {healthData.safetyTips.outdoor.map((tip: string, index: number) => (
                    <AccordionItem key={index} value={`item-${index}`}>
                      <AccordionTrigger className="text-gray-800 dark:text-gray-100">
                        Tip #{index + 1}
                      </AccordionTrigger>
                      <AccordionContent className="text-gray-600 dark:text-gray-300">
                        {tip}
                      </AccordionContent>
                    </AccordionItem>
                  ))}
                </Accordion>
              </div>
            </TabsContent>
            
            <TabsContent value="longTerm">
              <div className="bg-white dark:bg-gray-800 rounded-lg p-6 shadow-sm">
                <Accordion type="single" collapsible className="w-full">
                  {healthData.safetyTips.longTerm.map((tip: string, index: number) => (
                    <AccordionItem key={index} value={`item-${index}`}>
                      <AccordionTrigger className="text-gray-800 dark:text-gray-100">
                        Tip #{index + 1}
                      </AccordionTrigger>
                      <AccordionContent className="text-gray-600 dark:text-gray-300">
                        {tip}
                      </AccordionContent>
                    </AccordionItem>
                  ))}
                </Accordion>
              </div>
            </TabsContent>
          </Tabs>
        </section>
      </div>
    </div>
  );
};

export default HealthImpact;
