import { toast } from "sonner";
import { AQIData, AQICategory, CityRanking, CountryData, HotspotData } from "./types";
import { getAQICategory } from "./mockData";

const API_KEY = "AIzaSyCAVwsants4jEMp-rt2nUf47QIEZ5n-CR4";
const API_URL = "https://generativelanguage.googleapis.com/v1beta/models/gemini-pro:generateContent";

interface GeminiResponse {
  candidates: {
    content: {
      parts: {
        text: string;
      }[];
    };
  }[];
}

const fetchFromGemini = async (prompt: string): Promise<string> => {
  try {
    const response = await fetch(`${API_URL}?key=${API_KEY}`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        contents: [
          {
            parts: [
              {
                text: prompt,
              },
            ],
          },
        ],
      }),
    });

    if (!response.ok) {
      const errorData = await response.json();
      console.error("Gemini API error:", errorData);
      throw new Error(`API Error: ${errorData.error?.message || "Unknown error"}`);
    }

    const data: GeminiResponse = await response.json();
    return data.candidates[0].content.parts[0].text;
  } catch (error) {
    console.error("Error fetching from Gemini:", error);
    toast.error("Failed to fetch data. Using cached data instead.");
    throw error;
  }
};

export const fetchAQIData = async (): Promise<AQIData[]> => {
  try {
    const prompt = `Provide real-time air quality data for major Indian cities in this exact JSON format:
[{
  "id": "string",
  "city": "string",
  "state": "string",
  "country": "India",
  "aqi": number,
  "pm25": number,
  "pm10": number,
  "no2": number,
  "so2": number,
  "o3": number,
  "co": number,
  "timestamp": "ISO string",
}]
Include data for at least 15 cities across different states, with realistic AQI values. Only return the JSON, no explanations.`;

    const responseText = await fetchFromGemini(prompt);
    
    const parsedData = JSON.parse(responseText) as Omit<AQIData, "category">[];
    
    return parsedData.map(city => ({
      ...city,
      category: getAQICategory(city.aqi)
    }));
  } catch (error) {
    console.error("Error fetching AQI data:", error);
    const { indiaAQIData } = await import("./mockData");
    return indiaAQIData;
  }
};

export const fetchCityRankings = async (): Promise<{ topCities: CityRanking[], bottomCities: CityRanking[] }> => {
  try {
    const prompt = `Provide rankings of Indian cities based on air quality in this exact JSON format:
{
  "topCities": [
    { "city": "string", "state": "string", "aqi": number, "change": number }
  ],
  "bottomCities": [
    { "city": "string", "state": "string", "aqi": number, "change": number }
  ]
}
Include 10 cities for each category. Top cities should have the best (lowest) AQI, bottom cities should have the worst (highest) AQI. The change field should be the change from previous day (negative means improvement). Only return the JSON, no explanations.`;

    const responseText = await fetchFromGemini(prompt);
    const parsedData = JSON.parse(responseText) as { 
      topCities: Omit<CityRanking, "category">[],
      bottomCities: Omit<CityRanking, "category">[]
    };
    
    return {
      topCities: parsedData.topCities.map(city => ({
        ...city,
        category: getAQICategory(city.aqi)
      })),
      bottomCities: parsedData.bottomCities.map(city => ({
        ...city,
        category: getAQICategory(city.aqi)
      }))
    };
  } catch (error) {
    console.error("Error fetching city rankings:", error);
    const { topCities, bottomCities } = await import("./mockData");
    return { topCities, bottomCities };
  }
};

export const fetchCountriesData = async (): Promise<CountryData[]> => {
  try {
    const prompt = `Provide air quality comparison data for India, China, USA, UK, and Germany in this exact JSON format:
[
  {
    "id": "string",
    "name": "string",
    "data": [
      { "year": number, "aqi": number, "pm25": number, "pm10": number, "no2": number, "so2": number, "o3": number, "co": number }
    ]
  }
]
Include data for years 2018 through 2023 for each country with realistic pollution values. Only return the JSON, no explanations.`;

    const responseText = await fetchFromGemini(prompt);
    const parsedData = JSON.parse(responseText) as CountryData[];
    return parsedData;
  } catch (error) {
    console.error("Error fetching countries data:", error);
    const { countriesData } = await import("./mockData");
    return countriesData;
  }
};

export const fetchHotspotData = async (): Promise<HotspotData[]> => {
  try {
    const prompt = `Provide data for air pollution hotspots in India in this exact JSON format:
[
  {
    "id": "string",
    "name": "string",
    "latitude": number,
    "longitude": number,
    "aqi": number,
    "radius": number,
    "intensity": number
  }
]
Include data for at least 10 pollution hotspots with realistic coordinates in India, radius in km, and intensity between 0-1. Only return the JSON, no explanations.`;

    const responseText = await fetchFromGemini(prompt);
    const parsedData = JSON.parse(responseText) as Omit<HotspotData, "category">[];
    
    return parsedData.map(hotspot => ({
      ...hotspot,
      category: getAQICategory(hotspot.aqi)
    }));
  } catch (error) {
    console.error("Error fetching hotspot data:", error);
    const { hotspotData } = await import("./mockData");
    return hotspotData;
  }
};

export const fetchSDGData = async () => {
  try {
    const prompt = `Generate SDG alignment data for air quality in India in this exact JSON format:
{
  "sdg3": {
    "title": "Good Health and Well-being",
    "progress": number between 0-100,
    "achievements": ["string"],
    "challenges": ["string"],
    "recommendations": ["string"]
  },
  "sdg11": {
    "title": "Sustainable Cities and Communities",
    "progress": number between 0-100,
    "achievements": ["string"],
    "challenges": ["string"],
    "recommendations": ["string"]
  },
  "sdg13": {
    "title": "Climate Action",
    "progress": number between 0-100,
    "achievements": ["string"],
    "challenges": ["string"],
    "recommendations": ["string"]
  },
  "topPerformers": [
    {"city": "string", "state": "string", "sdgScore": number between 0-100}
  ]
}
Include 5 items in each achievements, challenges and recommendations list. Include 5 top performing cities. Only return the JSON, no explanations.`;

    const responseText = await fetchFromGemini(prompt);
    return JSON.parse(responseText);
  } catch (error) {
    console.error("Error fetching SDG data:", error);
    return {
      sdg3: {
        title: "Good Health and Well-being",
        progress: 42,
        achievements: [
          "Reduction in respiratory diseases in several urban areas",
          "Improved air quality monitoring systems in 20+ cities",
          "Implementation of health advisory systems for high pollution days",
          "Increased awareness of air pollution health effects",
          "Expansion of green spaces in urban environments"
        ],
        challenges: [
          "Persistent high pollution in major metropolitan areas",
          "Limited healthcare infrastructure for pollution-related illnesses",
          "Inadequate early warning systems for vulnerable populations",
          "Continued high rates of respiratory diseases in industrial zones",
          "Insufficient research on long-term health impacts"
        ],
        recommendations: [
          "Expand healthcare facilities in high pollution areas",
          "Develop targeted health interventions for vulnerable groups",
          "Implement mandatory health impact assessments for new developments",
          "Create specialized treatment protocols for pollution-related illnesses",
          "Establish mobile health units for pollution hotspots"
        ]
      },
      sdg11: {
        title: "Sustainable Cities and Communities",
        progress: 38,
        achievements: [
          "Expanded public transportation in 15 major cities",
          "Implementation of low emission zones in 5 cities",
          "Development of comprehensive city-level air action plans",
          "Increased adoption of construction dust control measures",
          "Growth in urban green cover and pollution sink areas"
        ],
        challenges: [
          "Rapid urbanization outpacing infrastructure development",
          "Insufficient integration of air quality in urban planning",
          "Limited enforcement of existing regulations",
          "Continued reliance on private transportation",
          "Slow transition to clean energy sources in urban areas"
        ],
        recommendations: [
          "Accelerate implementation of comprehensive mobility plans",
          "Increase density of air quality monitoring networks",
          "Promote transit-oriented development models",
          "Implement stricter construction and demolition waste management",
          "Expand urban forests and green corridors"
        ]
      },
      sdg13: {
        title: "Climate Action",
        progress: 45,
        achievements: [
          "Reduction in coal-based power generation in favor of renewables",
          "Implementation of emission standards for industrial sectors",
          "Increased adoption of clean cooking fuels in rural areas",
          "Development of climate action plans at state levels",
          "Growth in carbon sequestration projects"
        ],
        challenges: [
          "Continued heavy reliance on fossil fuels",
          "Agricultural stubble burning persisting in northern regions",
          "Limited progress in industrial decarbonization",
          "Slow adoption of cleaner technologies in small and medium enterprises",
          "Insufficient funding for climate mitigation measures"
        ],
        recommendations: [
          "Accelerate renewable energy transition across all sectors",
          "Implement comprehensive approaches to agricultural waste management",
          "Develop financial incentives for industrial emission reductions",
          "Strengthen monitoring and enforcement mechanisms",
          "Increase investments in climate-resilient infrastructure"
        ]
      },
      topPerformers: [
        { city: "Shillong", state: "Meghalaya", sdgScore: 78 },
        { city: "Shimla", state: "Himachal Pradesh", sdgScore: 75 },
        { city: "Thiruvananthapuram", state: "Kerala", sdgScore: 72 },
        { city: "Gangtok", state: "Sikkim", sdgScore: 70 },
        { city: "Mysore", state: "Karnataka", sdgScore: 68 }
      ]
    };
  }
};

export const fetchPolicyRecommendations = async () => {
  try {
    const prompt = `Generate policy recommendations for improving air quality in India in this exact JSON format:
{
  "shortTerm": [
    {"title": "string", "description": "string", "impact": "High/Medium/Low", "feasibility": "High/Medium/Low", "sector": "string"}
  ],
  "mediumTerm": [
    {"title": "string", "description": "string", "impact": "High/Medium/Low", "feasibility": "High/Medium/Low", "sector": "string"}
  ],
  "longTerm": [
    {"title": "string", "description": "string", "impact": "High/Medium/Low", "feasibility": "High/Medium/Low", "sector": "string"}
  ],
  "successStories": [
    {"city": "string", "country": "string", "policy": "string", "outcome": "string"}
  ],
  "keyInsights": ["string"]
}
Include 5 policies in each timeframe, 4 success stories, and 5 key insights. Only return the JSON, no explanations.`;

    const responseText = await fetchFromGemini(prompt);
    return JSON.parse(responseText);
  } catch (error) {
    console.error("Error fetching policy recommendations:", error);
    return {
      shortTerm: [
        {
          title: "Enhanced Public Transport Frequency",
          description: "Increase frequency of buses and trains during peak hours to reduce private vehicle usage",
          impact: "Medium",
          feasibility: "High",
          sector: "Transportation"
        },
        {
          title: "Construction Dust Guidelines",
          description: "Strict enforcement of dust control measures at all construction sites",
          impact: "Medium",
          feasibility: "High",
          sector: "Construction"
        },
        {
          title: "Odd-Even Vehicle Scheme",
          description: "Implement odd-even vehicle restrictions during high pollution episodes",
          impact: "Medium",
          feasibility: "Medium",
          sector: "Transportation"
        },
        {
          title: "Improved Waste Management",
          description: "Enhance collection systems and ban open burning of waste",
          impact: "Medium",
          feasibility: "Medium",
          sector: "Waste Management"
        },
        {
          title: "Emergency Response Protocol",
          description: "Develop clear protocols for schools, businesses during severe pollution events",
          impact: "Medium",
          feasibility: "High",
          sector: "Public Health"
        }
      ],
      mediumTerm: [
        {
          title: "Electric Vehicle Incentives",
          description: "Expand subsidies and infrastructure for electric vehicles",
          impact: "High",
          feasibility: "Medium",
          sector: "Transportation"
        },
        {
          title: "Industrial Emission Standards",
          description: "Implement stricter emission norms for industrial units",
          impact: "High",
          feasibility: "Medium",
          sector: "Industry"
        },
        {
          title: "Crop Residue Management",
          description: "Provide affordable alternatives to stubble burning",
          impact: "High",
          feasibility: "Medium",
          sector: "Agriculture"
        },
        {
          title: "Clean Fuel Transition",
          description: "Accelerate transition to cleaner cooking and heating fuels",
          impact: "High",
          feasibility: "Medium",
          sector: "Residential"
        },
        {
          title: "Urban Forest Development",
          description: "Create and maintain green corridors in urban areas",
          impact: "Medium",
          feasibility: "Medium",
          sector: "Urban Planning"
        }
      ],
      longTerm: [
        {
          title: "Comprehensive Land Use Planning",
          description: "Redesign cities for reduced travel distances and improved ventilation",
          impact: "High",
          feasibility: "Low",
          sector: "Urban Planning"
        },
        {
          title: "Energy Transition",
          description: "Phase out coal power plants and transition to renewable energy",
          impact: "High",
          feasibility: "Low",
          sector: "Energy"
        },
        {
          title: "Integrated Public Transport",
          description: "Develop interconnected multi-modal transport systems",
          impact: "High",
          feasibility: "Medium",
          sector: "Transportation"
        },
        {
          title: "Industrial Relocation",
          description: "Relocate heavy industries away from dense population centers",
          impact: "High",
          feasibility: "Low",
          sector: "Industry"
        },
        {
          title: "National Clean Air Fund",
          description: "Establish dedicated fund for air quality improvement initiatives",
          impact: "High",
          feasibility: "Medium",
          sector: "Governance"
        }
      ],
      successStories: [
        {
          city: "Seoul",
          country: "South Korea",
          policy: "Comprehensive air quality improvement plan",
          outcome: "45% reduction in PM2.5 levels over 5 years"
        },
        {
          city: "Beijing",
          country: "China",
          policy: "Industrial emission controls and coal restrictions",
          outcome: "33% reduction in annual PM2.5 concentrations"
        },
        {
          city: "London",
          country: "UK",
          policy: "Ultra Low Emission Zone",
          outcome: "37% reduction in NO2 in central London"
        },
        {
          city: "Mexico City",
          country: "Mexico",
          policy: "Multi-sector emissions reduction strategy",
          outcome: "Significant improvement in ozone and PM10 levels"
        }
      ],
      keyInsights: [
        "Multi-sectoral approaches yield better results than isolated interventions",
        "Public participation is crucial for sustainable air quality improvements",
        "Economic incentives are more effective than punitive measures alone",
        "Source-specific strategies address pollution more effectively than general measures",
        "Data-driven policy formulation leads to more targeted and effective interventions"
      ]
    };
  }
};

export const fetchHealthImpactData = async () => {
  try {
    const prompt = `Generate data about air pollution health impacts in India in this exact JSON format:
{
  "healthImpacts": [
    {"condition": "string", "affectedPopulation": "string", "pollutants": ["string"], "riskLevel": "High/Medium/Low"}
  ],
  "vulnerableGroups": [
    {"group": "string", "risks": "string", "recommendations": "string"}
  ],
  "aqiHealthMatrix": [
    {"category": "string", "range": "string", "healthEffects": "string", "precautions": "string"}
  ],
  "stateHealthMetrics": [
    {"state": "string", "respiratoryDisease": number, "cardiovascularDisease": number, "aqiAverage": number}
  ],
  "safetyTips": {
    "indoor": ["string"],
    "outdoor": ["string"],
    "longTerm": ["string"]
  }
}
Include 5 health impacts, 4 vulnerable groups, all 6 AQI categories, 5 states, and 4 tips in each safety category. Only return the JSON, no explanations.`;

    const responseText = await fetchFromGemini(prompt);
    return JSON.parse(responseText);
  } catch (error) {
    console.error("Error fetching health impact data:", error);
    return {
      healthImpacts: [
        {
          condition: "Asthma and Respiratory Infections",
          affectedPopulation: "55+ million people",
          pollutants: ["PM2.5", "PM10", "NO2", "O3"],
          riskLevel: "High"
        },
        {
          condition: "Chronic Obstructive Pulmonary Disease (COPD)",
          affectedPopulation: "40+ million people",
          pollutants: ["PM2.5", "PM10", "SO2"],
          riskLevel: "High"
        },
        {
          condition: "Cardiovascular Diseases",
          affectedPopulation: "65+ million people",
          pollutants: ["PM2.5", "CO", "NO2"],
          riskLevel: "High"
        },
        {
          condition: "Reduced Lung Function",
          affectedPopulation: "100+ million people",
          pollutants: ["PM2.5", "O3", "NO2"],
          riskLevel: "Medium"
        },
        {
          condition: "Premature Mortality",
          affectedPopulation: "1.7 million annual deaths",
          pollutants: ["PM2.5", "PM10", "O3", "NO2", "SO2"],
          riskLevel: "High"
        }
      ],
      vulnerableGroups: [
        {
          group: "Children (0-14 years)",
          risks: "Developing lungs, higher breathing rates, more outdoor activity",
          recommendations: "Limit outdoor activities during high pollution, ensure schools have air purifiers, regular health check-ups"
        },
        {
          group: "Elderly (65+ years)",
          risks: "Weakened immune systems, pre-existing conditions, reduced lung capacity",
          recommendations: "Stay indoors during pollution peaks, use air purifiers, maintain medication regimens, regular medical monitoring"
        },
        {
          group: "Pregnant Women",
          risks: "Increased risk of low birth weight, premature birth, developmental issues",
          recommendations: "Limit outdoor exposure, use N95 masks when necessary, ensure adequate indoor air quality, prenatal monitoring"
        },
        {
          group: "People with Pre-existing Conditions",
          risks: "Exacerbation of asthma, COPD, heart disease, diabetes",
          recommendations: "Adhere to medication schedules, keep emergency medications accessible, minimize exertion during high pollution"
        }
      ],
      aqiHealthMatrix: [
        {
          category: "Good",
          range: "0-50",
          healthEffects: "Little to no risk for the general population",
          precautions: "Normal activities can be continued"
        },
        {
          category: "Moderate",
          range: "51-100",
          healthEffects: "Possible respiratory symptoms for highly sensitive individuals",
          precautions: "Unusually sensitive people should consider reducing prolonged or heavy exertion"
        },
        {
          category: "Unhealthy for Sensitive Groups",
          range: "101-150",
          healthEffects: "Increasing likelihood of respiratory symptoms in sensitive groups",
          precautions: "People with respiratory or heart disease, the elderly and children should limit prolonged outdoor exertion"
        },
        {
          category: "Unhealthy",
          range: "151-200",
          healthEffects: "Increased aggravation of heart or lung disease and premature mortality in persons with cardiopulmonary disease and the elderly",
          precautions: "Everyone should avoid prolonged or heavy exertion; sensitive groups should remain indoors"
        },
        {
          category: "Very Unhealthy",
          range: "201-300",
          healthEffects: "Significant aggravation of heart or lung disease and premature mortality in persons with cardiopulmonary disease and the elderly",
          precautions: "Everyone should avoid all outdoor physical activity; sensitive groups should remain indoors and keep activity levels low"
        },
        {
          category: "Hazardous",
          range: "301+",
          healthEffects: "Serious aggravation of heart or lung disease and premature mortality in persons with cardiopulmonary disease and the elderly; serious risk of respiratory effects in general population",
          precautions: "Everyone should avoid all outdoor exertion; sensitive groups should remain indoors and keep activity levels low"
        }
      ],
      stateHealthMetrics: [
        {
          state: "Delhi",
          respiratoryDisease: 18.5,
          cardiovascularDisease: 12.3,
          aqiAverage: 195
        },
        {
          state: "Maharashtra",
          respiratoryDisease: 12.8,
          cardiovascularDisease: 10.5,
          aqiAverage: 125
        },
        {
          state: "Uttar Pradesh",
          respiratoryDisease: 15.6,
          cardiovascularDisease: 11.2,
          aqiAverage: 168
        },
        {
          state: "Tamil Nadu",
          respiratoryDisease: 9.2,
          cardiovascularDisease: 8.7,
          aqiAverage: 89
        },
        {
          state: "Kerala",
          respiratoryDisease: 6.8,
          cardiovascularDisease: 7.2,
          aqiAverage: 52
        }
      ],
      safetyTips: {
        indoor: [
          "Use air purifiers with HEPA filters in main living areas",
          "Keep windows closed during high pollution episodes",
          "Regularly clean and replace air conditioner filters",
          "Use exhaust fans while cooking to remove particulate matter"
        ],
        outdoor: [
          "Check daily AQI before planning outdoor activities",
          "Wear N95/N99 masks during high pollution days",
          "Avoid exercise near high traffic areas",
          "Schedule outdoor activities during times of day with better air quality"
        ],
        longTerm: [
          "Advocate for clean air policies in your community",
          "Support transition to cleaner transportation options",
          "Plant air-purifying plants indoors and trees outdoors",
          "Consider air quality when choosing housing location"
        ]
      }
    };
  }
};

export const generateReportData = async (location: string, pollutant: string, timeframe: string) => {
  try {
    const prompt = `Generate a detailed air quality report for ${location} focusing on ${pollutant} over the ${timeframe} timeframe in this JSON format:
{
  "summary": "string",
  "averageAQI": number,
  "trendDirection": "Improving/Worsening/Stable",
  "percentChange": number,
  "peakDate": "string (date)",
  "peakValue": number,
  "comparisonToNational": "Above/Below/At Average",
  "keyFactors": ["string"],
  "recommendations": ["string"],
  "dataPoints": [
    {"date": "string", "value": number}
  ]
}
Include realistic data with 12 data points. Only return the JSON, no explanations.`;

    const responseText = await fetchFromGemini(prompt);
    return JSON.parse(responseText);
  } catch (error) {
    console.error("Error generating report:", error);
    return {
      summary: "Air quality in Delhi shows concerning levels of PM2.5 over the past year with seasonal variations.",
      averageAQI: 156,
      trendDirection: "Worsening",
      percentChange: 12.5,
      peakDate: "2023-11-15",
      peakValue: 312,
      comparisonToNational: "Above Average",
      keyFactors: [
        "Vehicular emissions",
        "Industrial pollution",
        "Construction activities",
        "Meteorological conditions",
        "Stubble burning in neighboring states"
      ],
      recommendations: [
        "Implement stricter emission controls for vehicles",
        "Enhance public transportation systems",
        "Enforce dust control measures at construction sites",
        "Develop better waste management practices",
        "Promote use of clean energy for cooking and heating"
      ],
      dataPoints: [
        { date: "2023-01", value: 185 },
        { date: "2023-02", value: 162 },
        { date: "2023-03", value: 138 },
        { date: "2023-04", value: 98 },
        { date: "2023-05", value: 85 },
        { date: "2023-06", value: 76 },
        { date: "2023-07", value: 82 },
        { date: "2023-08", value: 95 },
        { date: "2023-09", value: 125 },
        { date: "2023-10", value: 178 },
        { date: "2023-11", value: 298 },
        { date: "2023-12", value: 245 }
      ]
    };
  }
};
