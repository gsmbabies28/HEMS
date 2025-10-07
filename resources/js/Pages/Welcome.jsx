import { useState, useEffect } from 'react';
import { PieChart, Pie, Cell, ResponsiveContainer, Legend, Tooltip } from 'recharts';
import { Activity, Ambulance, Users, Clock, AlertCircle, TrendingUp } from 'lucide-react';

export default function Welcome({ auth, laravelVersion, phpVersion }) {
    const [demographics, setDemographics] = useState(null);

    useEffect(() => {
        // Simulate fetching data - replace with actual API call
        // fetch('/api/dashboard-data').then(res => res.json()).then(setDemographics);
        
        const mockData = {
            total_patients: 1247,
            active_emergencies: 23,
            available_ambulances: 15,
            response_time_avg: '8.5 min',
            
            age_distribution: [
                { name: '0-17', value: 156, color: '#ef4444' },
                { name: '18-35', value: 342, color: '#f59e0b' },
                { name: '36-50', value: 298, color: '#10b981' },
                { name: '51-65', value: 267, color: '#3b82f6' },
                { name: '65+', value: 184, color: '#8b5cf6' },
            ],
            
            emergency_types: [
                { name: 'Cardiac', value: 187, color: '#dc2626' },
                { name: 'Trauma', value: 243, color: '#ea580c' },
                { name: 'Respiratory', value: 156, color: '#ca8a04' },
                { name: 'Neurological', value: 134, color: '#16a34a' },
                { name: 'Other', value: 527, color: '#2563eb' },
            ],
            
            gender_distribution: [
                { name: 'Male', value: 653, color: '#3b82f6' },
                { name: 'Female', value: 594, color: '#ec4899' },
            ],
            
            priority_levels: [
                { name: 'Critical', value: 89, color: '#dc2626' },
                { name: 'High', value: 234, color: '#f59e0b' },
                { name: 'Medium', value: 456, color: '#10b981' },
                { name: 'Low', value: 468, color: '#6366f1' },
            ],
            
            recent_emergencies: [
                {
                    id: 'EMG-2025-001',
                    type: 'Cardiac Arrest',
                    location: 'Makati Medical Center',
                    priority: 'Critical',
                    status: 'In Progress',
                    time: '5 min ago'
                },
                {
                    id: 'EMG-2025-002',
                    type: 'Motor Accident',
                    location: 'EDSA Ayala',
                    priority: 'High',
                    status: 'Dispatched',
                    time: '12 min ago'
                },
                {
                    id: 'EMG-2025-003',
                    type: 'Respiratory Distress',
                    location: 'BGC Taguig',
                    priority: 'High',
                    status: 'En Route',
                    time: '18 min ago'
                },
            ]
        };
        
        setDemographics(mockData);
    }, []);

    const StatCard = ({ title, value, icon: Icon, trend, color }) => (
        <div className="bg-white rounded-lg shadow-md p-6 border-l-4" style={{ borderLeftColor: color }}>
            <div className="flex items-center justify-between">
                <div>
                    <p className="text-sm text-gray-600 font-medium">{title}</p>
                    <p className="text-3xl font-bold text-gray-900 mt-2">{value}</p>
                    {trend && (
                        <div className="flex items-center mt-2 text-sm text-green-600">
                            <TrendingUp className="w-4 h-4 mr-1" />
                            <span>{trend}</span>
                        </div>
                    )}
                </div>
                <div className="p-3 rounded-full" style={{ backgroundColor: color + '20' }}>
                    <Icon className="w-8 h-8" style={{ color }} />
                </div>
            </div>
        </div>
    );

    const PieChartCard = ({ title, data, description }) => {
        const RADIAN = Math.PI / 180;
        const renderCustomizedLabel = ({ cx, cy, midAngle, innerRadius, outerRadius, percent }) => {
            const radius = innerRadius + (outerRadius - innerRadius) * 0.5;
            const x = cx + radius * Math.cos(-midAngle * RADIAN);
            const y = cy + radius * Math.sin(-midAngle * RADIAN);

            return (
                <text 
                    x={x} 
                    y={y} 
                    fill="white" 
                    textAnchor={x > cx ? 'start' : 'end'} 
                    dominantBaseline="central"
                    className="font-semibold text-sm"
                >
                    {`${(percent * 100).toFixed(0)}%`}
                </text>
            );
        };

        return (
            <div className="bg-white rounded-lg shadow-md p-6">
                <h3 className="text-lg font-bold text-gray-900 mb-2">{title}</h3>
                <p className="text-sm text-gray-600 mb-4">{description}</p>
                <ResponsiveContainer width="100%" height={300}>
                    <PieChart>
                        <Pie
                            data={data}
                            cx="50%"
                            cy="50%"
                            labelLine={false}
                            label={renderCustomizedLabel}
                            outerRadius={100}
                            fill="#8884d8"
                            dataKey="value"
                        >
                            {data.map((entry, index) => (
                                <Cell key={`cell-${index}`} fill={entry.color} />
                            ))}
                        </Pie>
                        <Tooltip 
                            contentStyle={{ backgroundColor: '#1f2937', border: 'none', borderRadius: '8px', color: 'white' }}
                            formatter={(value) => [`${value} patients`, 'Count']}
                        />
                        <Legend 
                            verticalAlign="bottom" 
                            height={36}
                            formatter={(value, entry) => `${value}: ${entry.payload.value}`}
                        />
                    </PieChart>
                </ResponsiveContainer>
            </div>
        );
    };

    const getPriorityColor = (priority) => {
        const colors = {
            'Critical': 'bg-red-100 text-red-800 border-red-200',
            'High': 'bg-orange-100 text-orange-800 border-orange-200',
            'Medium': 'bg-yellow-100 text-yellow-800 border-yellow-200',
            'Low': 'bg-green-100 text-green-800 border-green-200'
        };
        return colors[priority] || 'bg-gray-100 text-gray-800';
    };

    const getStatusColor = (status) => {
        const colors = {
            'In Progress': 'bg-blue-100 text-blue-800',
            'Dispatched': 'bg-purple-100 text-purple-800',
            'En Route': 'bg-indigo-100 text-indigo-800',
            'Completed': 'bg-green-100 text-green-800'
        };
        return colors[status] || 'bg-gray-100 text-gray-800';
    };

    if (!demographics) {
        return (
            <div className="min-h-screen bg-gradient-to-br from-red-50 via-white to-blue-50 flex items-center justify-center">
                <div className="text-center">
                    <div className="animate-spin rounded-full h-16 w-16 border-b-4 border-red-600 mx-auto"></div>
                    <p className="mt-4 text-gray-600 font-semibold">Loading Emergency Dashboard...</p>
                </div>
            </div>
        );
    }

    return (
        <div className="min-h-screen bg-gradient-to-br from-red-50 via-white to-blue-50">
            {/* Header */}
            <div className="bg-gradient-to-r from-red-600 to-red-700 text-white shadow-lg">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
                    <div className="flex items-center justify-between">
                        <div className="flex items-center space-x-3">
                            <div className="p-2 bg-white bg-opacity-20 rounded-lg">
                                <Activity className="w-8 h-8" />
                            </div>
                            <div>
                                <h1 className="text-3xl font-bold">Health Emergency Services</h1>
                                <p className="text-red-100 mt-1">Real-time Emergency Response Dashboard</p>
                            </div>
                        </div>
                        <div className="flex items-center space-x-2 bg-white bg-opacity-20 px-4 py-2 rounded-lg">
                            <div className="w-3 h-3 bg-green-400 rounded-full animate-pulse"></div>
                            <span className="font-semibold">System Active</span>
                        </div>
                    </div>
                </div>
            </div>

            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
                {/* Stats Grid */}
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
                    <StatCard
                        title="Total Patients"
                        value={demographics.total_patients.toLocaleString()}
                        icon={Users}
                        trend="+12% this month"
                        color="#3b82f6"
                    />
                    <StatCard
                        title="Active Emergencies"
                        value={demographics.active_emergencies}
                        icon={AlertCircle}
                        color="#ef4444"
                    />
                    <StatCard
                        title="Available Ambulances"
                        value={demographics.available_ambulances}
                        icon={Ambulance}
                        trend="85% capacity"
                        color="#10b981"
                    />
                    <StatCard
                        title="Avg Response Time"
                        value={demographics.response_time_avg}
                        icon={Clock}
                        trend="-2 min improved"
                        color="#f59e0b"
                    />
                </div>

                {/* Charts Grid */}
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-8">
                    <PieChartCard
                        title="Age Distribution"
                        description="Patient demographics by age group"
                        data={demographics.age_distribution}
                    />
                    <PieChartCard
                        title="Emergency Types"
                        description="Distribution of emergency cases"
                        data={demographics.emergency_types}
                    />
                    <PieChartCard
                        title="Gender Distribution"
                        description="Patient gender breakdown"
                        data={demographics.gender_distribution}
                    />
                    <PieChartCard
                        title="Priority Levels"
                        description="Emergency priority classification"
                        data={demographics.priority_levels}
                    />
                </div>

                {/* Recent Emergencies */}
                <div className="bg-white rounded-lg shadow-md overflow-hidden">
                    <div className="bg-gradient-to-r from-red-600 to-red-700 px-6 py-4">
                        <h3 className="text-xl font-bold text-white flex items-center">
                            <AlertCircle className="w-5 h-5 mr-2" />
                            Recent Emergency Calls
                        </h3>
                    </div>
                    <div className="overflow-x-auto">
                        <table className="w-full">
                            <thead className="bg-gray-50">
                                <tr>
                                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                                        Emergency ID
                                    </th>
                                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                                        Type
                                    </th>
                                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                                        Location
                                    </th>
                                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                                        Priority
                                    </th>
                                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                                        Status
                                    </th>
                                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                                        Time
                                    </th>
                                </tr>
                            </thead>
                            <tbody className="bg-white divide-y divide-gray-200">
                                {demographics.recent_emergencies.map((emergency, index) => (
                                    <tr key={index} className="hover:bg-gray-50 transition-colors">
                                        <td className="px-6 py-4 whitespace-nowrap">
                                            <span className="font-mono text-sm font-semibold text-gray-900">
                                                {emergency.id}
                                            </span>
                                        </td>
                                        <td className="px-6 py-4 whitespace-nowrap">
                                            <span className="text-sm text-gray-900 font-medium">
                                                {emergency.type}
                                            </span>
                                        </td>
                                        <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-600">
                                            {emergency.location}
                                        </td>
                                        <td className="px-6 py-4 whitespace-nowrap">
                                            <span className={`px-3 py-1 inline-flex text-xs leading-5 font-semibold rounded-full border ${getPriorityColor(emergency.priority)}`}>
                                                {emergency.priority}
                                            </span>
                                        </td>
                                        <td className="px-6 py-4 whitespace-nowrap">
                                            <span className={`px-3 py-1 inline-flex text-xs leading-5 font-semibold rounded-full ${getStatusColor(emergency.status)}`}>
                                                {emergency.status}
                                            </span>
                                        </td>
                                        <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                                            {emergency.time}
                                        </td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    </div>
                </div>
            </div>
        </div>
    );
}