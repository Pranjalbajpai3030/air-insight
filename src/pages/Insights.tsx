
import React, { useEffect, useState } from 'react';
import Navbar from '../components/Navbar';
import { fetchPolicyRecommendations } from '../utils/geminiAPI';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Clock, Lightbulb, AlertTriangle, CheckCircle, Award, Globe, FileText } from 'lucide-react';

const Insights = () => {
  const [policyData, setPolicyData] = useState<any>(null);
  const [loading, setLoading] = useState<boolean>(true);

  useEffect(() => {
    const loadData = async () => {
      setLoading(true);
      try {
        const data = await fetchPolicyRecommendations();
        setPolicyData(data);
      } catch (error) {
        console.error("Error loading policy data:", error);
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
          Insights & Policy Recommendations
        </h1>
        
        {/* Key Insights Section */}
        <section className="mb-10">
          <h2 className="text-2xl font-semibold mb-4 text-gray-800 dark:text-gray-100 flex items-center">
            <Lightbulb className="mr-2 h-6 w-6 text-yellow-500" /> 
            Key Insights
          </h2>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {policyData.keyInsights.map((insight: string, index: number) => (
              <Card key={index} className="bg-white dark:bg-gray-800">
                <CardContent className="pt-6">
                  <div className="flex items-start">
                    <div className="bg-yellow-100 dark:bg-yellow-900/30 text-yellow-800 dark:text-yellow-200 rounded-full h-8 w-8 flex items-center justify-center mr-3 flex-shrink-0">
                      {index + 1}
                    </div>
                    <p className="text-gray-700 dark:text-gray-300">{insight}</p>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </section>
        
        {/* Policy Recommendations Section */}
        <section className="mb-10">
          <h2 className="text-2xl font-semibold mb-4 text-gray-800 dark:text-gray-100 flex items-center">
            <FileText className="mr-2 h-6 w-6 text-blue-500" /> 
            Policy Recommendations
          </h2>
          
          <Tabs defaultValue="short" className="w-full">
            <TabsList className="grid w-full grid-cols-3 mb-6">
              <TabsTrigger value="short" className="flex items-center">
                <Clock className="h-4 w-4 mr-2" /> Short Term
              </TabsTrigger>
              <TabsTrigger value="medium" className="flex items-center">
                <Clock className="h-4 w-4 mr-2" /> Medium Term
              </TabsTrigger>
              <TabsTrigger value="long" className="flex items-center">
                <Clock className="h-4 w-4 mr-2" /> Long Term
              </TabsTrigger>
            </TabsList>
            
            {/* Short Term Policies */}
            <TabsContent value="short">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {policyData.shortTerm.map((policy: any, index: number) => (
                  <PolicyCard key={index} policy={policy} />
                ))}
              </div>
            </TabsContent>
            
            {/* Medium Term Policies */}
            <TabsContent value="medium">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {policyData.mediumTerm.map((policy: any, index: number) => (
                  <PolicyCard key={index} policy={policy} />
                ))}
              </div>
            </TabsContent>
            
            {/* Long Term Policies */}
            <TabsContent value="long">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {policyData.longTerm.map((policy: any, index: number) => (
                  <PolicyCard key={index} policy={policy} />
                ))}
              </div>
            </TabsContent>
          </Tabs>
        </section>
        
        {/* Success Stories Section */}
        <section>
          <h2 className="text-2xl font-semibold mb-4 text-gray-800 dark:text-gray-100 flex items-center">
            <Award className="mr-2 h-6 w-6 text-green-500" /> 
            Global Success Stories
          </h2>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {policyData.successStories.map((story: any, index: number) => (
              <Card key={index} className="bg-white dark:bg-gray-800">
                <CardHeader>
                  <div className="flex items-center justify-between">
                    <div>
                      <CardTitle className="text-lg text-gray-800 dark:text-gray-100">{story.city}</CardTitle>
                      <CardDescription className="flex items-center mt-1">
                        <Globe className="h-4 w-4 mr-1 text-gray-500 dark:text-gray-400" />
                        {story.country}
                      </CardDescription>
                    </div>
                    <div className="bg-green-100 dark:bg-green-900/30 p-2 rounded-full">
                      <CheckCircle className="h-6 w-6 text-green-600 dark:text-green-400" />
                    </div>
                  </div>
                </CardHeader>
                <CardContent>
                  <div className="mb-2">
                    <span className="text-sm font-medium text-gray-500 dark:text-gray-400">Policy Initiative:</span>
                    <p className="text-gray-700 dark:text-gray-300">{story.policy}</p>
                  </div>
                  <div>
                    <span className="text-sm font-medium text-gray-500 dark:text-gray-400">Outcome:</span>
                    <p className="text-gray-700 dark:text-gray-300">{story.outcome}</p>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </section>
      </div>
    </div>
  );
};

interface PolicyCardProps {
  policy: {
    title: string;
    description: string;
    impact: string;
    feasibility: string;
    sector: string;
  };
}

const PolicyCard = ({ policy }: PolicyCardProps) => {
  const getImpactColor = (impact: string) => {
    switch (impact) {
      case 'High': return 'bg-green-100 text-green-800 dark:bg-green-900/30 dark:text-green-300';
      case 'Medium': return 'bg-yellow-100 text-yellow-800 dark:bg-yellow-900/30 dark:text-yellow-300';
      case 'Low': return 'bg-red-100 text-red-800 dark:bg-red-900/30 dark:text-red-300';
      default: return 'bg-gray-100 text-gray-800 dark:bg-gray-900/30 dark:text-gray-300';
    }
  };

  const getFeasibilityColor = (feasibility: string) => {
    switch (feasibility) {
      case 'High': return 'bg-green-100 text-green-800 dark:bg-green-900/30 dark:text-green-300';
      case 'Medium': return 'bg-yellow-100 text-yellow-800 dark:bg-yellow-900/30 dark:text-yellow-300';
      case 'Low': return 'bg-red-100 text-red-800 dark:bg-red-900/30 dark:text-red-300';
      default: return 'bg-gray-100 text-gray-800 dark:bg-gray-900/30 dark:text-gray-300';
    }
  };

  return (
    <Card className="bg-white dark:bg-gray-800">
      <CardHeader>
        <CardTitle className="text-gray-800 dark:text-gray-100">{policy.title}</CardTitle>
        <CardDescription className="flex items-center bg-blue-100 dark:bg-blue-900/30 text-blue-800 dark:text-blue-300 px-2 py-1 rounded-full text-xs w-fit">
          {policy.sector}
        </CardDescription>
      </CardHeader>
      <CardContent>
        <p className="text-gray-700 dark:text-gray-300 mb-4">{policy.description}</p>
        <div className="flex space-x-2">
          <span className={`px-3 py-1 rounded-full text-xs font-medium ${getImpactColor(policy.impact)}`}>
            Impact: {policy.impact}
          </span>
          <span className={`px-3 py-1 rounded-full text-xs font-medium ${getFeasibilityColor(policy.feasibility)}`}>
            Feasibility: {policy.feasibility}
          </span>
        </div>
      </CardContent>
    </Card>
  );
};

export default Insights;
