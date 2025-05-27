
import React, { useState, useMemo } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import RiskTrendChart from './charts/RiskTrendChart';
import RiskCategoryChart from './charts/RiskCategoryChart';
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
    <div className="p-6 space-y-6">
      {/* Header */}
      <div className="text-center py-8">
        <h1 className="text-4xl font-bold text-slate-800 mb-2">
          Fraud Risk Dashboard
        </h1>
        <p className="text-slate-600">Monitor and analyze healthcare fraud risk patterns</p>
      </div>

      {/* Filters */}
      <Card className="shadow-lg border-0 bg-white/70 backdrop-blur-sm">
        <CardHeader>
          <CardTitle className="text-xl text-slate-700">Filters</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div className="space-y-2">
              <label className="text-sm font-medium text-slate-600">Hospital Name</label>
              <Select value={selectedHospital} onValueChange={setSelectedHospital}>
                <SelectTrigger className="bg-white">
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

            <div className="space-y-2">
              <label className="text-sm font-medium text-slate-600">Location</label>
              <Select value={selectedLocation} onValueChange={setSelectedLocation}>
                <SelectTrigger className="bg-white">
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

            <div className="space-y-2">
              <label className="text-sm font-medium text-slate-600">Specialty</label>
              <Select value={selectedSpecialty} onValueChange={setSelectedSpecialty}>
                <SelectTrigger className="bg-white">
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
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Risk Trend Chart */}
        <Card className="shadow-lg border-0 bg-white/70 backdrop-blur-sm">
          <CardHeader>
            <CardTitle className="text-xl text-slate-700">Risk Score Trend</CardTitle>
          </CardHeader>
          <CardContent>
            <RiskTrendChart data={filteredData} />
          </CardContent>
        </Card>

        {/* Risk Category Chart */}
        <Card className="shadow-lg border-0 bg-white/70 backdrop-blur-sm">
          <CardHeader>
            <CardTitle className="text-xl text-slate-700">Risk Score by Category</CardTitle>
          </CardHeader>
          <CardContent>
            <RiskCategoryChart data={filteredData} />
          </CardContent>
        </Card>
      </div>

      {/* Risk Distribution Chart - Full Width */}
      <Card className="shadow-lg border-0 bg-white/70 backdrop-blur-sm">
        <CardHeader>
          <CardTitle className="text-xl text-slate-700">Risk Distribution Analysis</CardTitle>
        </CardHeader>
        <CardContent>
          <ApexBoxPlotChart data={filteredData} />
        </CardContent>
      </Card>
    </div>
  );
};

export default Dashboard;
