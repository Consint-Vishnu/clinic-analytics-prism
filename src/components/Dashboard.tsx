
import React, { useState, useMemo } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import RiskTrendChart from './charts/RiskTrendChart';
import MuiBarChart from './charts/MuiBarChart';
import ApexBoxPlotChart from './charts/ApexBoxPlotChart';
import { getMockData, getUniqueValues, filterData } from '../services/mockDataService';

const Dashboard = () => {
  const [selectedHospital, setSelectedHospital] = useState<string>('all');
  const [selectedLocation, setSelectedLocation] = useState<string>('all');
  const [selectedSpecialty, setSelectedSpecialty] = useState<string>('all');

  const mockData = getMockData();
  
  const filteredData = useMemo(() => {
    return filterData(mockData, {
      hospital: selectedHospital === 'all' ? undefined : selectedHospital,
      location: selectedLocation === 'all' ? undefined : selectedLocation,
      specialty: selectedSpecialty === 'all' ? undefined : selectedSpecialty,
    });
  }, [selectedHospital, selectedLocation, selectedSpecialty, mockData]);

  const uniqueHospitals = getUniqueValues(mockData, 'hospital');
  const uniqueLocations = getUniqueValues(mockData, 'location');
  const uniqueSpecialties = getUniqueValues(mockData, 'specialty');

  return (
    <div className="p-4 space-y-4">
      {/* Header */}
      <div className="text-center py-4">
        <h1 className="text-2xl font-bold text-slate-800 mb-1">
          Fraud Risk Dashboard
        </h1>
        <p className="text-sm text-slate-600">Monitor and analyze healthcare fraud risk patterns</p>
      </div>

      {/* Filters */}
      <Card className="shadow-sm border-0 bg-white/70 backdrop-blur-sm">
        <CardHeader className="pb-3">
          <CardTitle className="text-lg text-slate-700">Filters</CardTitle>
        </CardHeader>
        <CardContent className="pt-0">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <div className="space-y-1">
              <label className="text-xs font-medium text-slate-600">Hospital Name</label>
              <Select value={selectedHospital} onValueChange={setSelectedHospital}>
                <SelectTrigger className="bg-white h-8">
                  <SelectValue placeholder="Select Hospital" />
                </SelectTrigger>
                <SelectContent className="bg-white z-50">
                  <SelectItem value="all">All Hospitals</SelectItem>
                  {uniqueHospitals.map((hospital) => (
                    <SelectItem key={hospital} value={hospital}>
                      {hospital}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>

            <div className="space-y-1">
              <label className="text-xs font-medium text-slate-600">Location</label>
              <Select value={selectedLocation} onValueChange={setSelectedLocation}>
                <SelectTrigger className="bg-white h-8">
                  <SelectValue placeholder="Select Location" />
                </SelectTrigger>
                <SelectContent className="bg-white z-50">
                  <SelectItem value="all">All Locations</SelectItem>
                  {uniqueLocations.map((location) => (
                    <SelectItem key={location} value={location}>
                      {location}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>

            <div className="space-y-1">
              <label className="text-xs font-medium text-slate-600">Specialty</label>
              <Select value={selectedSpecialty} onValueChange={setSelectedSpecialty}>
                <SelectTrigger className="bg-white h-8">
                  <SelectValue placeholder="Select Specialty" />
                </SelectTrigger>
                <SelectContent className="bg-white z-50">
                  <SelectItem value="all">All Specialties</SelectItem>
                  {uniqueSpecialties.map((specialty) => (
                    <SelectItem key={specialty} value={specialty}>
                      {specialty}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Charts Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
        {/* Risk Trend Chart */}
        <Card className="shadow-sm border-0 bg-white/70 backdrop-blur-sm">
          <CardHeader className="pb-2">
            <CardTitle className="text-lg text-slate-700">Risk Score Trend</CardTitle>
          </CardHeader>
          <CardContent className="pt-0">
            <RiskTrendChart data={filteredData} />
          </CardContent>
        </Card>

        {/* MUI Bar Chart */}
        <Card className="shadow-sm border-0 bg-white/70 backdrop-blur-sm">
          <CardHeader className="pb-2">
            <CardTitle className="text-lg text-slate-700">Risk Score by Category</CardTitle>
          </CardHeader>
          <CardContent className="pt-0">
            <MuiBarChart data={filteredData} />
          </CardContent>
        </Card>
      </div>

      {/* Risk Distribution Chart - Full Width */}
      <Card className="shadow-sm border-0 bg-white/70 backdrop-blur-sm">
        <CardHeader className="pb-2">
          <CardTitle className="text-lg text-slate-700">Risk Distribution Analysis</CardTitle>
        </CardHeader>
        <CardContent className="pt-0">
          <ApexBoxPlotChart data={filteredData} />
        </CardContent>
      </Card>
    </div>
  );
};

export default Dashboard;
