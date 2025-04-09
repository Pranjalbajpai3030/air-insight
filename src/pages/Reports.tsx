
import React, { useState } from 'react';
import Navbar from '../components/Navbar';
import { generateReportData } from '../utils/geminiAPI';
import { ChartContainer } from '@/components/ui/chart';
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from 'recharts';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Alert, AlertDescription, AlertTitle } from '@/components/ui/alert';
import { indiaAQIData } from '../utils/mockData';
import { toast } from 'sonner';
import { Download, FileText, TrendingDown, TrendingUp, Minus, AlertCircle, Share2, Calendar, MapPin, Atom } from 'lucide-react';

const Reports = () => {
  const [location, setLocation] = useState<string>('Delhi');
  const [pollutant, setPollutant] = useState<string>('aqi');
  const [timeframe, setTimeframe] = useState<string>('yearly');
  const [reportData, setReportData] = useState<any>(null);
  const [loading, setLoading] = useState<boolean>(false);
  const [generated, setGenerated] = useState<boolean>(false);
  
  // Get all unique states from AQI data
  const locations = Array.from(new Set(indiaAQIData.map(item => item.state)));
  
  const handleGenerateReport = async () => {
    setLoading(true);
    setGenerated(false);
    
    try {
      const data = await generateReportData(location, pollutant, timeframe);
      setReportData(data);
      setGenerated(true);
      toast.success('Report generated successfully');
    } catch (error) {
      console.error('Error generating report:', error);
      toast.error('Failed to generate report. Please try again.');
    } finally {
      setLoading(false);
    }
  };
  
  const handleDownloadPDF = () => {
    toast.success('PDF download started');
    // This would be implemented with a PDF generation library in a real application
  };
  
  const handleDownloadExcel = () => {
    toast.success('Excel download started');
    // This would be implemented with an Excel generation library in a real application
  };
  
  const handleShareReport = () => {
    toast.success('Report link copied to clipboard');
    // This would be implemented with a share functionality in a real application
  };
  
  const getPollutantName = (pollutantType: string) => {
    switch(pollutantType) {
      case 'pm25': return 'PM2.5';
      case 'pm10': return 'PM10';
      case 'no2': return 'NO₂';
      case 'so2': return 'SO₂';
      case 'o3': return 'O₃';
      case 'co': return 'CO';
      default: return 'AQI';
    }
  };
  
  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-950">
      <Navbar />
      <div className="container mx-auto px-4 py-8 max-w-7xl">
        <h1 className="text-3xl md:text-4xl font-bold mb-8 text-center text-gray-800 dark:text-gray-100">
          Generate & Download Reports
        </h1>
        
        <div className="grid grid-cols-1 lg:grid-cols-4 gap-6">
          {/* Form Section */}
          <div className="lg:col-span-1">
            <Card className="bg-white dark:bg-gray-800">
              <CardHeader>
                <CardTitle className="text-gray-800 dark:text-gray-100">Report Parameters</CardTitle>
                <CardDescription>Configure your custom report</CardDescription>
              </CardHeader>
              <CardContent>
                <form className="space-y-4">
                  <div className="space-y-2">
                    <Label htmlFor="location">Location</Label>
                    <Select value={location} onValueChange={setLocation}>
                      <SelectTrigger id="location" className="w-full">
                        <SelectValue placeholder="Select location" />
                      </SelectTrigger>
                      <SelectContent>
                        {locations.map((loc, index) => (
                          <SelectItem key={index} value={loc}>{loc}</SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                  </div>
                  
                  <div className="space-y-2">
                    <Label htmlFor="pollutant">Pollutant</Label>
                    <Select value={pollutant} onValueChange={setPollutant}>
                      <SelectTrigger id="pollutant" className="w-full">
                        <SelectValue placeholder="Select pollutant" />
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
                  
                  <div className="space-y-2">
                    <Label htmlFor="timeframe">Time Period</Label>
                    <Select value={timeframe} onValueChange={setTimeframe}>
                      <SelectTrigger id="timeframe" className="w-full">
                        <SelectValue placeholder="Select timeframe" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="monthly">Last Month</SelectItem>
                        <SelectItem value="quarterly">Last Quarter</SelectItem>
                        <SelectItem value="yearly">Last Year</SelectItem>
                        <SelectItem value="5year">Last 5 Years</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                  
                  <Button 
                    type="button" 
                    className="w-full" 
                    onClick={handleGenerateReport}
                    disabled={loading}
                  >
                    {loading ? (
                      <>
                        <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-white mr-2"></div>
                        Generating...
                      </>
                    ) : (
                      'Generate Report'
                    )}
                  </Button>
                </form>
              </CardContent>
            </Card>
            
            {generated && (
              <Card className="bg-white dark:bg-gray-800 mt-6">
                <CardHeader>
                  <CardTitle className="text-gray-800 dark:text-gray-100">Download Options</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-3">
                    <Button variant="outline" className="w-full flex items-center" onClick={handleDownloadPDF}>
                      <Download className="h-4 w-4 mr-2" />
                      Download as PDF
                    </Button>
                    <Button variant="outline" className="w-full flex items-center" onClick={handleDownloadExcel}>
                      <FileText className="h-4 w-4 mr-2" />
                      Download as Excel
                    </Button>
                    <Button variant="outline" className="w-full flex items-center" onClick={handleShareReport}>
                      <Share2 className="h-4 w-4 mr-2" />
                      Share Report
                    </Button>
                  </div>
                </CardContent>
              </Card>
            )}
          </div>
          
          {/* Report Content */}
          <div className="lg:col-span-3">
            {!generated ? (
              <div className="bg-white dark:bg-gray-800 rounded-lg shadow-sm p-8 flex flex-col items-center justify-center h-full">
                <FileText className="h-16 w-16 text-gray-300 dark:text-gray-600 mb-4" />
                <h3 className="text-xl font-medium text-gray-800 dark:text-gray-200 mb-2">
                  No Report Generated Yet
                </h3>
                <p className="text-gray-500 dark:text-gray-400 text-center">
                  Select parameters and click "Generate Report" to create a custom air quality report.
                </p>
              </div>
            ) : loading ? (
              <div className="bg-white dark:bg-gray-800 rounded-lg shadow-sm p-8 flex flex-col items-center justify-center h-full">
                <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-theme-blue mb-4"></div>
                <h3 className="text-xl font-medium text-gray-800 dark:text-gray-200 mb-2">
                  Generating Your Report
                </h3>
                <p className="text-gray-500 dark:text-gray-400 text-center">
                  Please wait while we analyze the data and generate your report...
                </p>
              </div>
            ) : (
              <div className="space-y-6">
                <Card className="bg-white dark:bg-gray-800">
                  <CardHeader>
                    <div className="flex justify-between items-start">
                      <div>
                        <CardTitle className="text-2xl text-gray-800 dark:text-gray-100">
                          {location} {getPollutantName(pollutant)} Report
                        </CardTitle>
                        <CardDescription className="flex items-center mt-1">
                          <Calendar className="h-4 w-4 mr-1" /> 
                          {timeframe.charAt(0).toUpperCase() + timeframe.slice(1)} analysis
                        </CardDescription>
                      </div>
                      <div className="flex space-x-2">
                        <div className="flex items-center text-sm bg-gray-100 dark:bg-gray-700 px-2 py-1 rounded-full">
                          <MapPin className="h-3 w-3 mr-1" /> 
                          {location}
                        </div>
                        <div className="flex items-center text-sm bg-gray-100 dark:bg-gray-700 px-2 py-1 rounded-full">
                          <Atom className="h-3 w-3 mr-1" /> 
                          {getPollutantName(pollutant)}
                        </div>
                      </div>
                    </div>
                  </CardHeader>
                  <CardContent>
                    <Alert className="mb-6">
                      <AlertCircle className="h-4 w-4" />
                      <AlertTitle>Summary</AlertTitle>
                      <AlertDescription>
                        {reportData.summary}
                      </AlertDescription>
                    </Alert>
                    
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6">
                      <div className="bg-blue-50 dark:bg-blue-900/20 p-4 rounded-lg">
                        <div className="text-sm text-gray-500 dark:text-gray-400">Average {getPollutantName(pollutant)}</div>
                        <div className="text-2xl font-bold text-gray-800 dark:text-gray-100">{reportData.averageAQI}</div>
                      </div>
                      
                      <div className="bg-gray-50 dark:bg-gray-900/20 p-4 rounded-lg">
                        <div className="text-sm text-gray-500 dark:text-gray-400">Trend</div>
                        <div className="text-2xl font-bold text-gray-800 dark:text-gray-100 flex items-center">
                          {reportData.trendDirection === 'Improving' ? (
                            <><TrendingDown className="h-5 w-5 mr-1 text-green-500" /> Improving</>
                          ) : reportData.trendDirection === 'Worsening' ? (
                            <><TrendingUp className="h-5 w-5 mr-1 text-red-500" /> Worsening</>
                          ) : (
                            <><Minus className="h-5 w-5 mr-1 text-yellow-500" /> Stable</>
                          )}
                        </div>
                      </div>
                      
                      <div className="bg-purple-50 dark:bg-purple-900/20 p-4 rounded-lg">
                        <div className="text-sm text-gray-500 dark:text-gray-400">Peak Value</div>
                        <div className="text-2xl font-bold text-gray-800 dark:text-gray-100">{reportData.peakValue}</div>
                        <div className="text-xs text-gray-500 dark:text-gray-400">on {reportData.peakDate}</div>
                      </div>
                    </div>
                    
                    <div className="mb-8">
                      <h3 className="text-lg font-medium mb-4 text-gray-800 dark:text-gray-100">Trend Analysis</h3>
                      <div className="h-72">
                        <ChartContainer config={{
                          data1: { color: "#3498db" },
                        }}>
                          <LineChart data={reportData.dataPoints}>
                            <CartesianGrid strokeDasharray="3 3" />
                            <XAxis dataKey="date" />
                            <YAxis />
                            <Tooltip />
                            <Legend />
                            <Line 
                              type="monotone" 
                              dataKey="value" 
                              name={getPollutantName(pollutant)} 
                              stroke="#3498db"
                              strokeWidth={2}
                              dot={{ r: 4 }}
                              activeDot={{ r: 6 }}
                            />
                          </LineChart>
                        </ChartContainer>
                      </div>
                    </div>
                    
                    <Tabs defaultValue="factors" className="w-full">
                      <TabsList className="grid w-full grid-cols-2">
                        <TabsTrigger value="factors">Key Factors</TabsTrigger>
                        <TabsTrigger value="recommendations">Recommendations</TabsTrigger>
                      </TabsList>
                      
                      <TabsContent value="factors" className="mt-4">
                        <div className="space-y-2">
                          {reportData.keyFactors.map((factor: string, index: number) => (
                            <div key={index} className="flex items-center bg-gray-50 dark:bg-gray-900/20 p-3 rounded-lg">
                              <div className="bg-blue-100 dark:bg-blue-900/30 text-blue-800 dark:text-blue-200 rounded-full h-6 w-6 flex items-center justify-center mr-3 flex-shrink-0">
                                {index + 1}
                              </div>
                              <p className="text-gray-700 dark:text-gray-300">{factor}</p>
                            </div>
                          ))}
                        </div>
                      </TabsContent>
                      
                      <TabsContent value="recommendations" className="mt-4">
                        <div className="space-y-2">
                          {reportData.recommendations.map((recommendation: string, index: number) => (
                            <div key={index} className="flex items-center bg-gray-50 dark:bg-gray-900/20 p-3 rounded-lg">
                              <div className="bg-green-100 dark:bg-green-900/30 text-green-800 dark:text-green-200 rounded-full h-6 w-6 flex items-center justify-center mr-3 flex-shrink-0">
                                {index + 1}
                              </div>
                              <p className="text-gray-700 dark:text-gray-300">{recommendation}</p>
                            </div>
                          ))}
                        </div>
                      </TabsContent>
                    </Tabs>
                  </CardContent>
                </Card>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Reports;
