
export interface RiskData {
  id: string;
  hospital: string;
  location: string;
  specialty: string;
  date: string;
  riskScore: number;
  category: string;
}

export interface FilterOptions {
  hospital?: string;
  location?: string;
  specialty?: string;
}

const hospitals = [
  'Fortis Healthcare',
  'Apollo Hospitals',
  'Max Healthcare',
  'Manipal Hospitals',
  'AIIMS',
  'Medanta',
  'Narayana Health',
  'Columbia Asia'
];

const locations = [
  'Mumbai',
  'Delhi',
  'Bangalore',
  'Chennai',
  'Kolkata',
  'Hyderabad',
  'Pune',
  'Ahmedabad'
];

const specialties = [
  'Cardiology',
  'Neurology',
  'Orthopedics',
  'Oncology',
  'Pediatrics',
  'Surgery',
  'Emergency',
  'Internal Medicine'
];

const categories = [
  'Billing Irregularities',
  'Diagnostic Anomalies',
  'Treatment Patterns',
  'Medication Discrepancies',
  'Documentation Issues',
  'Provider Behavior',
  'Patient Demographics'
];

const generateMockData = (): RiskData[] => {
  const data: RiskData[] = [];
  const startDate = new Date('2024-01-01');
  
  for (let i = 0; i < 500; i++) {
    const date = new Date(startDate);
    date.setDate(date.getDate() + Math.floor(i / 20));
    
    data.push({
      id: `risk-${i}`,
      hospital: hospitals[Math.floor(Math.random() * hospitals.length)],
      location: locations[Math.floor(Math.random() * locations.length)],
      specialty: specialties[Math.floor(Math.random() * specialties.length)],
      date: date.toISOString().split('T')[0],
      riskScore: Math.floor(Math.random() * 100) + 1,
      category: categories[Math.floor(Math.random() * categories.length)]
    });
  }
  
  return data;
};

let mockData: RiskData[] | null = null;

export const getMockData = (): RiskData[] => {
  if (!mockData) {
    mockData = generateMockData();
  }
  return mockData;
};

export const getUniqueValues = (data: RiskData[], field: keyof RiskData): string[] => {
  const values = [...new Set(data.map(item => item[field] as string))];
  return values.sort();
};

export const filterData = (data: RiskData[], filters: FilterOptions): RiskData[] => {
  return data.filter(item => {
    if (filters.hospital && item.hospital !== filters.hospital) return false;
    if (filters.location && item.location !== filters.location) return false;
    if (filters.specialty && item.specialty !== filters.specialty) return false;
    return true;
  });
};

export const getTimeSeriesData = (data: RiskData[]) => {
  const grouped = data.reduce((acc, item) => {
    if (!acc[item.date]) {
      acc[item.date] = [];
    }
    acc[item.date].push(item.riskScore);
    return acc;
  }, {} as Record<string, number[]>);

  return Object.entries(grouped)
    .map(([date, scores]) => ({
      date,
      riskScore: Math.round(scores.reduce((sum, score) => sum + score, 0) / scores.length)
    }))
    .sort((a, b) => a.date.localeCompare(b.date));
};

export const getCategoryData = (data: RiskData[]) => {
  const grouped = data.reduce((acc, item) => {
    if (!acc[item.category]) {
      acc[item.category] = [];
    }
    acc[item.category].push(item.riskScore);
    return acc;
  }, {} as Record<string, number[]>);

  return Object.entries(grouped).map(([category, scores]) => ({
    category: category.length > 15 ? category.substring(0, 12) + '...' : category,
    fullCategory: category,
    riskScore: Math.round(scores.reduce((sum, score) => sum + score, 0) / scores.length)
  }));
};

export const getBoxPlotData = (data: RiskData[]) => {
  const specialtyGroups = data.reduce((acc, item) => {
    if (!acc[item.specialty]) {
      acc[item.specialty] = [];
    }
    acc[item.specialty].push(item.riskScore);
    return acc;
  }, {} as Record<string, number[]>);

  return Object.entries(specialtyGroups).map(([specialty, scores]) => {
    const sorted = scores.sort((a, b) => a - b);
    const q1Index = Math.floor(sorted.length * 0.25);
    const q3Index = Math.floor(sorted.length * 0.75);
    const medianIndex = Math.floor(sorted.length * 0.5);

    return {
      specialty,
      min: sorted[0],
      q1: sorted[q1Index],
      median: sorted[medianIndex],
      q3: sorted[q3Index],
      max: sorted[sorted.length - 1]
    };
  });
};
