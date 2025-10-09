import React, { useMemo, useState } from 'react';
import { AlertTriangle, Users, Heart, Activity, Zap, Droplet, Home, Edit2, Save, Building2 } from 'lucide-react';
import { router, useForm, usePage } from '@inertiajs/react';

export default function Welcome({affectedDataProp, casualtiesProp, healthFacilitiesProp, deployedHRHProp, healthClusterTeamsProp, medicalServicesProvidedProp, bloodDataProp, mobilizedResourcesProp, hospitalCensusProp}) {
  console.log(mobilizedResourcesProp);
  const [selectedLGU, setSelectedLGU] = useState(null);
  const [editMode, setEditMode] = useState(false);
  
  const [affectedData, setAffectedData] = useState(...affectedDataProp);

  const [casualties, setCasualties] = useState(...casualtiesProp);

  const [healthFacilities, setHealthFacilities] = useState(healthFacilitiesProp.length ? healthFacilitiesProp : [] );

  const [deployedHRH, setDeployedHRH] = useState(
    deployedHRHProp ??
    {
      doctors: 0,
      nurses: 0,
      nursing_aid: 0,
      driver: 0,
      other: 0
    }
  );
  
  const handleChange = (key, value) => {
    setDeployedHRH(prev => ({
      ...prev,
      [key]: parseInt(value) || 0
    }));
  };

  // Role labels mapping
  const roleLabels = {
    doctors: 'Doctors',
    nurses: 'Nurses',
    nursing_aid: 'Nursing Aid',
    driver: 'Driver',
    other: 'Other'
  };
  const displayKeys = ['doctors', 'nurses', 'nursing_aid', 'driver', 'other'];

  const [healthClusterTeams, setHealthClusterTeams] = useState([
    { category: 'Medical and Public Health', teams: healthClusterTeamsProp.medical_public_health ?? 0, color: 'from-green-500 to-green-600' },
    { category: 'Nutrition in Emergencies', teams: healthClusterTeamsProp.nutrition_emergencies ?? 0, color: 'from-green-500 to-green-600' },
    { category: 'Water, Sanitation and Hygiene', teams: healthClusterTeamsProp.water_sanitation_hygiene ?? 0, color: 'from-green-500 to-green-600' },
    { category: 'Mental Health and Psychosocial Support', teams: healthClusterTeamsProp.mental_health_psychosocial_support ?? 0, color: 'from-green-500 to-green-600' }
  ]);

  const [hospitalCensus, setHospitalCensus] = useState(hospitalCensusProp ?? [
    {
      hospital_name: 'VSMMC',
      under_10: 5,
      age_10_20: 23,
      age_21_59: 40,
      age_60_above: 23,
      male: 41,
      female: 50,
      admitted: 46,
      discharged: 44,
      died: 1,
      operated: 27
    },
    {
      hospital_name: 'UCMED',
      under_10: 1,
      age_10_20: 3,
      age_21_59: 7,
      age_60_above: 3,
      male: 7,
      female: 7,
      admitted: 14,
      discharged: 0,
      died: 0,
      operated: 7
    },
    {
      hospital_name: 'CPH (Balamban)',
      under_10: 0,
      age_10_20: 0,
      age_21_59: 2,
      age_60_above: 1,
      male: 1,
      female: 2,
      admitted: 0,
      discharged: 0,
      died: 3,
      operated: 0
    },
    {
      hospital_name: 'Miller Hospital',
      under_10: 0,
      age_10_20: 0,
      age_21_59: 1,
      age_60_above: 0,
      male: 1,
      female: 0,
      admitted: 1,
      discharged: 0,
      died: 0,
      operated: 0
    }
  ]);

   const censusTotals = useMemo(() => {
    return hospitalCensus.reduce((acc, hospital) => ({
      under_10: acc.under_10 + hospital.under_10,
      age_10_20: acc.age_10_20 + hospital.age_10_20,
      age_21_59: acc.age_21_59 + hospital.age_21_59,
      age_60_above: acc.age_60_above + hospital.age_60_above,
      male: acc.male + hospital.male,
      female: acc.female + hospital.female,
      admitted: acc.admitted + hospital.admitted,
      discharged: acc.discharged + hospital.discharged,
      died: acc.died + hospital.died,
      operated: acc.operated + hospital.operated,
      total: acc.total + hospital.under_10 + hospital.age_10_20 + hospital.age_21_59 + hospital.age_60_above
    }), {
      under_10: 0,
      age_10_20: 0,
      age_21_59: 0,
      age_60_above: 0,
      male: 0,
      female: 0,
      admitted: 0,
      discharged: 0,
      died: 0,
      operated: 0,
      total: 0
    });
  }, [hospitalCensus]);

  const [medicalServicesProvided, setMedicalServicesProvided] = useState({...medicalServicesProvidedProp} );


  const [bloodData, setBloodData] = useState(bloodDataProp);

  const [mobilizedResources, setMobilizedResources] = useState(mobilizedResourcesProp);

  const hrhTotal = useMemo(() => {
    return displayKeys.reduce((sum, key) => sum + (deployedHRH[key] || 0), 0);
  }, [deployedHRH]);

  const clusterTeamsTotal = healthClusterTeams.reduce((sum, team) => sum + team.teams, 0);
  const facilitiesTotals = {
    total_number: healthFacilities.reduce((sum, f) => sum + f.total_number, 0),
    assessed: healthFacilities.reduce((sum, f) => sum + f.assessed, 0),
    damaged: healthFacilities.reduce((sum, f) => sum + f.damaged, 0),
    non_functional: healthFacilities.reduce((sum, f) => sum + f.non_functional, 0)
  };
  
  const excludedKeys = ['id', 'created_at', 'updated_at'];

  const resourcesTotal = Object.entries(mobilizedResources)
    .filter(([key]) => !excludedKeys.includes(key)) // skip unwanted keys
    .reduce((sum, [, val]) => sum + (Number(val) || 0), 0);

  const medicalServices = {
    medicalPublicHealth: {
      title: 'Medical and Public Health',
      consultations: [
        'FRACTURES',
        'WOUNDS',
        'HBP',
        'PSYCHOLOGICAL CONDITIONS',
        'MUSCULOSKELETAL (pain involving muscles, bones, or joints)'
      ],
      services: [
        'Provision of medicines',
        'BP Monitoring',
        'Patient Transport',
        'Hospital Referral'
      ]
    },
    nutrition: {
      title: 'Nutrition in Emergencies',
      services: [
        'Distribution of supplemental food to pregnant, lactating mother, newborn and children',
        'Provision of micronutrient',
        'Nutritional assessment and health education'
      ]
    },
    wash: {
      title: 'Water, Sanitation and Hygiene',
      services: [
        'Provision of aquatabs and water container',
        'Ensure safe drinking water',
        'Distribution of hygiene kits',
        'Conduct of hygiene education'
      ]
    },
    mentalHealth: {
      title: 'Mental Health and Psychosocial Support',
      services: [
        'Provision of Psychological First Aid',
        'Mental Health Counselling'
      ]
    }
  };

  const lifelinesData = [
    {
      lgu: 'Bago City',
      power: 'Fully Functional',
      water: 'Fully Functional',
      roads: 'Partly Functional (some areas still have difficulty in water access)',
      status: 'warning'
    },
    {
      lgu: 'Bonbon',
      power: 'Fully Functional',
      water: 'Fully Functional',
      roads: 'Partly Functional (some areas still have difficulty in water access; in case power supply occur, municipality will have no access to water)',
      status: 'warning'
    },
    {
      lgu: 'Daanbantayan',
      power: 'Fully Functional',
      water: 'Fully Functional',
      roads: 'Partly Functional (some water sources still needs repair)',
      status: 'warning'
    },
    {
      lgu: 'Medellin',
      power: 'Fully Functional',
      water: 'Fully Functional',
      roads: 'Fully Functional',
      status: 'good'
    },
    {
      lgu: 'San Remigio',
      power: 'Fully Functional',
      water: 'Partly Functional (96% Energized)',
      roads: 'Partly Functional (limited access especially to mountainous barangay)',
      status: 'warning'
    },
    {
      lgu: 'Tabogon',
      power: 'Fully Functional',
      water: 'Fully Functional',
      roads: 'Totally non-functional (still ongoing repair of water sources and pipes)',
      status: 'critical'
    },
    {
      lgu: 'Tabuelan',
      power: 'Fully Functional',
      water: 'Fully Functional',
      roads: 'Partly Functional (7 barangays have no access to water)',
      status: 'warning'
    }
  ];

  const getStatusColor = (status) => {
    switch(status) {
      case 'good': return 'bg-green-500';
      case 'warning': return 'bg-yellow-500';
      case 'critical': return 'bg-red-500';
      default: return 'bg-gray-500';
    }
  };

    
    const handleSubmit = (e) => {
      e.preventDefault();
      const convertHealthClusterData = Object.fromEntries(
        healthClusterTeams.map(item => [
          item.category
            .toLowerCase()
            .replace(/\s*and\s*/gi, ' ') // remove "and" + spaces
            .replace(/\s*in\s*/g, ' ')
            .replace(/,/g, '')
            .replace(/\s/g, '_'),          // remove commas if any                 // clean up ends
          item.teams
        ])
      );
      router.put(route('hems.update'), {
        affectedData:affectedData,
        casualties:casualties,
        healthFacilities:healthFacilities,
        deployedHRH:deployedHRH,
        healthClusterTeams: { id:healthClusterTeamsProp.id , ...convertHealthClusterData},
        medicalServicesProvided: medicalServicesProvided,
        bloodData: bloodData,
        mobilizedResources: mobilizedResources,
      },{preserveScroll:true});
    };

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-slate-800 to-slate-900 p-6">
      {/* Header */}
      <div className="mb-8 flex justify-between items-start sticky top-0 bg-slate-900/70 backdrop-blur-md p-4 rounded-lg shadow-lg z-10">
        <div>
          <div className="flex items-center gap-3 mb-2">
            <AlertTriangle className="text-red-500" size={32} />
            <h1 className="text-3xl font-bold text-white">Health Emergency Services System</h1>
          </div>
          <p className="text-slate-400 text-sm">Real-time monitoring and response coordination</p>
        </div>
        <button
          onClick={() => setEditMode(!editMode)}
          className={`flex items-center gap-2 px-4 py-2 rounded-lg font-semibold transition-colors ${
            editMode 
              ? 'bg-green-600 hover:bg-green-700 text-white' 
              : 'bg-blue-600 hover:bg-blue-700 text-white'
          }`}
        >
          {editMode ? (
            <div onClick={handleSubmit} className="flex items-center gap-2">
              <Save size={18} />
              Save Changes
            </div>
          ) : (
            <>
              <Edit2 size={18} />
              Edit Data
            </>
          )}
        </button>
      </div>

      {/* Top Stats Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-4 mb-6">
        {/* Affected Population Card */}
        <div className="lg:col-span-2 bg-gradient-to-br from-blue-600 to-blue-700 rounded-lg p-6 shadow-xl">
          <div className="flex items-start justify-between mb-4">
            <div>
              <h3 className="text-blue-100 text-sm font-semibold mb-1">AFFECTED AND DISPLACED</h3>
              <p className="text-blue-200 text-xs">POPULATION</p>
            </div>
            <Users className="text-blue-200" size={28} />
          </div>
          <div className="space-y-3">
            <div className="flex justify-between items-center">
              <span className="text-white text-sm">Barangay</span>
              {editMode ? (
                <input
                  type="number"
                  value={affectedData.barangay}
                  onChange={(e) => setAffectedData(prev => ({ ...prev, barangay: parseInt(e.target.value) || 0 }))}
                  className="bg-blue-800 text-white text-2xl font-bold px-2 py-1 rounded w-24 text-right"
                />
              ) : (
                <span className="text-white text-2xl font-bold">{affectedData.barangay}</span>
              )}
            </div>
            <div className="flex justify-between items-center">
              <span className="text-white text-sm">Families</span>
              {editMode ? (
                <input
                  type="number"
                  value={affectedData.families}
                  onChange={(e) => setAffectedData(prev => ({ ...prev, families: parseInt(e.target.value) || 0 }))}
                  className="bg-blue-800 text-white text-2xl font-bold px-2 py-1 rounded w-32 text-right"
                />
              ) : (
                <span className="text-white text-2xl font-bold">{affectedData.families.toLocaleString()}</span>
              )}
            </div>
            <div className="flex justify-between items-center">
              <span className="text-white text-sm">Individuals</span>
              {editMode ? (
                <input
                  type="number"
                  value={affectedData.individuals}
                  onChange={(e) => setAffectedData(prev => ({ ...prev, individuals: parseInt(e.target.value) || 0 }))}
                  className="bg-blue-800 text-white text-2xl font-bold px-2 py-1 rounded w-32 text-right"
                />
              ) : (
                <span className="text-white text-2xl font-bold">{affectedData.individuals.toLocaleString()}</span>
              )}
            </div>
          </div>
          <p className="text-blue-200 text-xs mt-4 italic">*From the DSWD Dromic</p>
        </div>

        {/* Casualties Card */}
        <div className="lg:col-span-2 bg-gradient-to-br from-red-600 to-red-700 rounded-lg p-6 shadow-xl">
          <div className="flex items-start justify-between mb-4">
            <div>
              <h3 className="text-red-100 text-sm font-semibold mb-1">CASUALTIES</h3>
              <p className="text-red-200 text-xs">Reported incidents</p>
            </div>
            <Heart className="text-red-200" size={28} />
          </div>
          <div className="space-y-3">
            <div className="flex justify-between items-center">
              <span className="text-white text-sm">Deaths</span>
              {editMode ? (
                <input
                  type="number"
                  value={casualties.deaths}
                  onChange={(e) => setCasualties(prev => ({ ...prev, deaths: parseInt(e.target.value) || 0 }))}
                  className="bg-red-800 text-white text-4xl font-bold px-2 py-1 rounded w-24 text-right"
                />
              ) : (
                <span className="text-white text-4xl font-bold">{casualties.deaths}</span>
              )}
            </div>
            <div className="flex justify-between items-center">
              <span className="text-white text-sm">Injured</span>
              {editMode ? (
                <input
                  type="number"
                  value={casualties.injured}
                  onChange={(e) => setCasualties(prev => ({ ...prev, injured: parseInt(e.target.value) || 0 }))}
                  className="bg-red-800 text-white text-4xl font-bold px-2 py-1 rounded w-24 text-right"
                />
              ) : (
                <span className="text-white text-4xl font-bold">{casualties.injured}</span>
              )}
            </div>
          </div>
          <p className="text-red-200 text-xs mt-4 italic">*From reports of CHD Central Visayas. Validation is still being conducted</p>
        </div>
        
        {/* Quick Status */}
        <div className="bg-slate-800 rounded-lg p-6 shadow-xl border border-slate-700">
          <h3 className="text-slate-300 text-sm font-semibold mb-4">QUICK STATUS</h3>
          <div className="space-y-3">
            <div className="flex items-center gap-2">
              <div className="w-3 h-3 bg-green-500 rounded-full"></div>
              <span className="text-slate-400 text-xs">1 LGU Operational</span>
            </div>
            <div className="flex items-center gap-2">
              <div className="w-3 h-3 bg-yellow-500 rounded-full"></div>
              <span className="text-slate-400 text-xs">5 LGUs Partial</span>
            </div>
            <div className="flex items-center gap-2">
              <div className="w-3 h-3 bg-red-500 rounded-full"></div>
              <span className="text-slate-400 text-xs">1 LGU Critical</span>
            </div>
          </div>
        </div>

        {/* Deployed Human Resources */}
        <div className="bg-gradient-to-br from-teal-600 to-teal-700 rounded-lg p-6 shadow-xl">
          <div className="flex items-start justify-between mb-4">
            <div>
              <h3 className="text-teal-100 text-sm font-semibold mb-1">DEPLOYED HUMAN</h3>
              <p className="text-teal-200 text-xs">RESOURCES FOR HEALTH</p>
            </div>
            <Activity className="text-teal-200" size={28} />
          </div>
          <div className="space-y-2">
            {displayKeys.map((key) => (
              <div key={key} className="flex justify-between items-center">
                <span className="text-white text-sm">{roleLabels[key]}</span>
                {editMode ? (
                  <input
                    type="number"
                    value={deployedHRH[key] || 0}
                    onChange={(e) => handleChange(key, e.target.value)}
                    className="bg-teal-800 text-white text-xl font-bold px-2 py-1 rounded w-16 text-right"
                    min="0"
                  />
                ) : (
                  <span className="text-white text-xl font-bold">{deployedHRH[key] || 0}</span>
                )}
              </div>
            ))}
          </div>
          <div className="mt-4 pt-4 border-t border-teal-500 flex justify-between items-center">
            <span className="text-white font-bold">Total:</span>
            <span className="text-white text-3xl font-bold">{hrhTotal}</span>
          </div>
        </div>
      </div>
      
      {/* Lifelines Status */}
      <div className="bg-slate-800 mb-6 rounded-lg shadow-xl border border-slate-700 overflow-hidden">
        <div className="bg-gradient-to-r from-teal-700 to-slate-800 p-4 border-b border-slate-600">
          <h2 className="text-white text-lg font-bold flex items-center gap-2">
            <Activity className="text-green-400" size={24} />
            STATUS OF LIFELINES
          </h2>
        </div>

        <div className="overflow-x-auto">
          <table className="w-full">
            <thead>
              <tr className="bg-slate-700">
                <th className="px-4 py-3 text-left text-xs font-semibold text-slate-300 uppercase">LGU</th>
                <th className="px-4 py-3 text-left text-xs font-semibold text-slate-300 uppercase">
                  <div className="flex items-center gap-2">
                    <Zap size={16} className="text-yellow-400" />
                    Electric Power
                  </div>
                </th>
                <th className="px-4 py-3 text-left text-xs font-semibold text-slate-300 uppercase">
                  <div className="flex items-center gap-2">
                    <Droplet size={16} className="text-blue-400" />
                    Water
                  </div>
                </th>
                <th className="px-4 py-3 text-left text-xs font-semibold text-slate-300 uppercase">
                  <div className="flex items-center gap-2">
                    <Home size={16} className="text-orange-400" />
                    Road/Bridges
                  </div>
                </th>
                <th className="px-4 py-3 text-center text-xs font-semibold text-slate-300 uppercase">Status</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-700">
              {lifelinesData.map((item, idx) => (
                <tr 
                  key={idx}
                  className={`hover:bg-slate-750 transition-colors cursor-pointer ${selectedLGU === idx ? 'bg-slate-750' : ''}`}
                  onClick={() => setSelectedLGU(selectedLGU === idx ? null : idx)}
                >
                  <td className="px-4 py-4">
                    <span className="text-white font-semibold">{item.lgu}</span>
                  </td>
                  <td className="px-4 py-4">
                    <span className={`text-xs px-3 py-1 rounded-full ${
                      item.power === 'Fully Functional' 
                        ? 'bg-green-900 text-green-300 border border-green-700' 
                        : 'bg-yellow-900 text-yellow-300 border border-yellow-700'
                    }`}>
                      {item.power}
                    </span>
                  </td>
                  <td className="px-4 py-4">
                    <span className={`text-xs px-3 py-1 rounded-full ${
                      item.water === 'Fully Functional' 
                        ? 'bg-green-900 text-green-300 border border-green-700' 
                        : 'bg-yellow-900 text-yellow-300 border border-yellow-700'
                    }`}>
                      {item.water}
                    </span>
                  </td>
                  <td className="px-4 py-4">
                    <div className="max-w-md">
                      <span className={`text-xs px-3 py-1 rounded-full ${
                        item.roads === 'Fully Functional' 
                          ? 'bg-green-900 text-green-300 border border-green-700' 
                          : item.roads.includes('Totally non-functional')
                          ? 'bg-red-900 text-red-300 border border-red-700'
                          : 'bg-yellow-900 text-yellow-300 border border-yellow-700'
                      }`}>
                        {item.roads.length > 50 ? 'Partly Functional' : item.roads}
                      </span>
                      {selectedLGU === idx && item.roads.length > 50 && (
                        <p className="text-slate-400 text-xs mt-2 italic">{item.roads}</p>
                      )}
                    </div>
                  </td>
                  <td className="px-4 py-4 text-center">
                    <div className={`w-4 h-4 rounded-full ${getStatusColor(item.status)} mx-auto shadow-lg`}></div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        <div className="bg-slate-750 p-4 border-t border-slate-700">
          <p className="text-slate-400 text-xs">
            <span className="font-semibold">Note:</span> Communications is FULLY FUNCTIONAL
          </p>
        </div>
      </div>

      {/* Damaged Health Facilities */}
      <div className="bg-slate-800 rounded-lg shadow-xl border border-slate-700 overflow-hidden mb-6">
        <div className="bg-gradient-to-r from-orange-700 to-orange-800 p-4 border-b border-orange-600">
          <h2 className="text-white text-lg font-bold flex items-center gap-2">
            <Activity className="text-orange-300" size={24} />
            DAMAGED HEALTH FACILITIES
          </h2>
        </div>

        <div className="overflow-x-auto">
          <table className="w-full">
            <thead>
              <tr className="bg-slate-700">
                <th className="px-4 py-3 text-left text-xs font-semibold text-slate-300 uppercase w-1/3">Facility Type</th>
                <th className="px-4 py-3 text-center text-xs font-semibold text-slate-300 uppercase">Total Number</th>
                <th className="px-4 py-3 text-center text-xs font-semibold text-slate-300 uppercase bg-green-900/30">Assessed</th>
                <th className="px-4 py-3 text-center text-xs font-semibold text-slate-300 uppercase bg-orange-900/30">Damaged</th>
                <th className="px-4 py-3 text-center text-xs font-semibold text-slate-300 uppercase bg-red-900/30">Non Functional</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-700">
              {healthFacilities.map((facility, idx) => (
                <tr key={idx} className="hover:bg-slate-750 transition-colors">
                  <td className="px-4 py-4">
                    <span className="text-white font-medium text-sm">{facility.facility_type}</span>
                  </td>
                  <td className="px-4 py-4 text-center">
                    {editMode ? (
                      <input
                        type="number"
                        value={facility.total_number}
                        onChange={(e) => setHealthFacilities(prev => prev.map((f, i) => 
                          i === idx ? { ...f, total_number: parseInt(e.target.value) || 0 } : f
                        ))}
                        className="bg-slate-700 text-slate-200 text-lg font-semibold px-2 py-1 rounded w-16 text-center mx-auto"
                      />
                    ) : (
                      <span className="text-slate-200 text-lg font-semibold">{facility.total_number}</span>
                    )}
                  </td>
                  <td className="px-4 py-4 text-center bg-green-900/10">
                    {editMode ? (
                      <input
                        type="number"
                        value={facility.assessed}
                        onChange={(e) => setHealthFacilities(prev => prev.map((f, i) => 
                          i === idx ? { ...f, assessed: parseInt(e.target.value) || 0 } : f
                        ))}
                        className="bg-green-900/30 text-green-400 text-lg font-semibold px-2 py-1 rounded w-16 text-center mx-auto"
                      />
                    ) : (
                      <span className="text-green-400 text-lg font-semibold">{facility.assessed}</span>
                    )}
                  </td>
                  <td className="px-4 py-4 text-center bg-orange-900/10">
                    {editMode ? (
                      <input
                        type="number"
                        value={facility.damaged}
                        onChange={(e) => setHealthFacilities(prev => prev.map((f, i) => 
                          i === idx ? { ...f, damaged: parseInt(e.target.value) || 0 } : f
                        ))}
                        className="bg-orange-900/30 text-orange-400 text-lg font-semibold px-2 py-1 rounded w-16 text-center mx-auto"
                      />
                    ) : (
                      <span className="text-orange-400 text-lg font-semibold">{facility.damaged}</span>
                    )}
                  </td>
                  <td className="px-4 py-4 text-center bg-red-900/10">
                    {editMode ? (
                      <input
                        type="number"
                        value={facility.non_functional}
                        onChange={(e) => setHealthFacilities(prev => prev.map((f, i) => 
                          i === idx ? { ...f, non_functional: parseInt(e.target.value) || 0 } : f
                        ))}
                        className="bg-red-900/30 text-red-400 text-lg font-semibold px-2 py-1 rounded w-16 text-center mx-auto"
                      />
                    ) : (
                      <span className="text-red-400 text-lg font-semibold">{facility.non_functional}</span>
                    )}
                  </td>
                </tr>
              ))}
              <tr className="bg-slate-750 font-bold border-t-2 border-slate-600">
                <td className="px-4 py-4">
                  <span className="text-white font-bold">Total:</span>
                </td>
                <td className="px-4 py-4 text-center">
                  <span className="text-white text-xl font-bold">{facilitiesTotals.total_number}</span>
                </td>
                <td className="px-4 py-4 text-center bg-green-900/20">
                  <span className="text-green-300 text-xl font-bold">{facilitiesTotals.assessed}</span>
                </td>
                <td className="px-4 py-4 text-center bg-orange-900/20">
                  <span className="text-orange-300 text-xl font-bold">{facilitiesTotals.damaged}</span>
                </td>
                <td className="px-4 py-4 text-center bg-red-900/20">
                  <span className="text-red-300 text-xl font-bold">{facilitiesTotals.non_functional}</span>
                </td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>

      {/* Health Cluster Teams Deployed */}
      <div className="bg-slate-800 rounded-lg shadow-xl border border-slate-700 overflow-hidden mb-6">
        <div className="bg-gradient-to-r from-emerald-700 to-emerald-800 p-4 border-b border-emerald-600">
          <h2 className="text-white text-lg font-bold flex items-center gap-2">
            <Users className="text-emerald-300" size={24} />
            HEALTH CLUSTER TEAMS DEPLOYED
          </h2>
        </div>

        <div className="p-6">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 mb-4">
            {healthClusterTeams.map((team, idx) => (
              <div key={idx} className={`bg-gradient-to-br ${team.color} rounded-lg p-6 shadow-lg`}>
                <div className="text-center">
                  {editMode ? (
                    <input
                      type="number"
                      value={team.teams}
                      onChange={(e) => setHealthClusterTeams(prev => prev.map((t, i) => 
                        i === idx ? { ...t, teams: parseInt(e.target.value) || 0 } : t
                      ))}
                      className="bg-green-700 text-white text-5xl font-bold mb-2 rounded px-2 py-1 w-24 text-center mx-auto block"
                    />
                  ) : (
                    <div className="text-5xl font-bold text-white mb-2">{team.teams}</div>
                  )}
                  <div className="text-sm font-semibold text-white mb-1">Teams</div>
                  <div className="text-xs text-white/90 leading-tight">{team.category}</div>
                </div>
              </div>
            ))}
          </div>
          <div className="bg-gradient-to-r from-slate-700 to-slate-800 rounded-lg p-4 border border-slate-600">
            <div className="flex justify-between items-center">
              <span className="text-white font-bold text-lg">Total Teams Deployed:</span>
              <span className="text-white text-3xl font-bold">{clusterTeamsTotal}</span>
            </div>
          </div>
        </div>
      </div>

      {/* Medical Services Provided */}
      <div className="bg-slate-800 rounded-lg shadow-xl border border-slate-700 overflow-hidden mb-6">
        <div className="bg-gradient-to-r from-green-700 to-green-800 p-4 border-b border-green-600">
          <h2 className="text-white text-lg font-bold flex items-center gap-2">
            <Heart className="text-green-300" size={24} />
            MEDICAL SERVICES PROVIDED
          </h2>
        </div>

        <div className="p-6">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            {/* Medical and Public Health */}
            <div className="bg-slate-750 rounded-lg border border-slate-600 overflow-hidden">
              <div className="bg-green-600 p-4">
                {editMode ? (
                  <input
                    type="number"
                    value={medicalServicesProvided.medical_public_health}
                    onChange={(e) => setMedicalServicesProvided(prev => ({ ...prev, medical_public_health: parseInt(e.target.value) || 0 }))}
                    className="bg-green-700 text-white text-2xl font-bold mb-2 rounded px-2 py-1 w-32 text-center mx-auto block"
                  />
                ) : (
                  <p className='text-center font-bold text-black text-2xl'>{medicalServicesProvided.medical_public_health}</p>
                )}
                <div className="text-white font-bold text-center">Individuals</div>
                <div className="text-white font-bold text-lg text-center mt-1">{medicalServices.medicalPublicHealth.title}</div>
              </div>
              <div className="p-4">
                <div className="mb-4">
                  <h4 className="text-green-400 font-semibold text-sm mb-2">TOP 5 CONSULTATION:</h4>
                  <ol className="list-decimal list-inside space-y-1">
                    {medicalServices.medicalPublicHealth.consultations.map((item, idx) => (
                      <li key={idx} className="text-slate-300 text-sm">{item}</li>
                    ))}
                  </ol>
                </div>
                <div className="border-t border-slate-600 pt-4">
                  <ul className="space-y-1">
                    {medicalServices.medicalPublicHealth.services.map((service, idx) => (
                      <li key={idx} className="text-slate-300 text-sm flex items-start">
                        <span className="text-green-400 mr-2">•</span>
                        {service}
                      </li>
                    ))}
                  </ul>
                </div>
              </div>
            </div>

            {/* Nutrition in Emergencies */}
            <div className="bg-slate-750 rounded-lg border border-slate-600 overflow-hidden">
              <div className="bg-green-600 p-4">
                {editMode ? (
                  <input
                    type="number"
                    value={medicalServicesProvided.nutrition_emergencies}
                    onChange={(e) => setMedicalServicesProvided(prev => ({ ...prev, nutrition_emergencies: parseInt(e.target.value) || 0 }))}
                    className="bg-green-700 text-white text-2xl font-bold mb-2 rounded px-2 py-1 w-32 text-center mx-auto block"
                  />
                ) : (
                  <p className='text-center font-bold text-black text-2xl'>{medicalServicesProvided.nutrition_emergencies}</p>
                )}
                <div className="text-white font-bold text-center">Individuals</div>
                <div className="text-white font-bold text-lg text-center mt-1">{medicalServices.nutrition.title}</div>
              </div>
              <div className="p-4">
                <ul className="space-y-2">
                  {medicalServices.nutrition.services.map((service, idx) => (
                    <li key={idx} className="text-slate-300 text-sm flex items-start">
                      <span className="text-green-400 mr-2">•</span>
                      {service}
                    </li>
                  ))}
                </ul>
              </div>
            </div>

            {/* Water, Sanitation and Hygiene */}
            <div className="bg-slate-750 rounded-lg border border-slate-600 overflow-hidden">
              <div className="bg-green-600 p-4">
                {editMode ? (
                  <input
                    type="number"
                    value={medicalServicesProvided.water_sanitation_hygiene}
                    onChange={(e) => setMedicalServicesProvided(prev => ({ ...prev, water_sanitation_hygiene: parseInt(e.target.value) || 0 }))}
                    className="bg-green-700 text-white text-2xl font-bold mb-2 rounded px-2 py-1 w-32 text-center mx-auto block"
                  />
                ) : (
                  <p className='text-center font-bold text-black text-2xl'>{medicalServicesProvided.water_sanitation_hygiene}</p>
                )}
                <div className="text-white font-bold text-center">Individuals</div>
                <div className="text-white font-bold text-lg text-center mt-1">{medicalServices.wash.title}</div>
              </div>
              <div className="p-4">
                <ul className="space-y-2">
                  {medicalServices.wash.services.map((service, idx) => (
                    <li key={idx} className="text-slate-300 text-sm flex items-start">
                      <span className="text-green-400 mr-2">•</span>
                      {service}
                    </li>
                  ))}
                </ul>
              </div>
            </div>

            {/* Mental Health and Psychosocial Support */}
            <div className="bg-slate-750 rounded-lg border border-slate-600 overflow-hidden">
              <div className="bg-green-600 p-4">
                {editMode ? (
                  <input
                    type="number"
                    value={medicalServicesProvided.mental_health_psychosocial_support}
                    onChange={(e) => setMedicalServicesProvided(prev => ({ ...prev, mental_health_psychosocial_support: parseInt(e.target.value) || 0 }))}
                    className="bg-green-700 text-white text-2xl font-bold mb-2 rounded px-2 py-1 w-32 text-center mx-auto block"
                  />
                ) : (
                  <p className='text-center font-bold text-black text-2xl'>{medicalServicesProvided.mental_health_psychosocial_support}</p>
                )}
                <div className="text-white font-bold text-center">Individuals</div>
                <div className="text-white font-bold text-lg text-center mt-1">{medicalServices.mentalHealth.title}</div>
              </div>
              <div className="p-4">
                <ul className="space-y-2">
                  {medicalServices.mentalHealth.services.map((service, idx) => (
                    <li key={idx} className="text-slate-300 text-sm flex items-start">
                      <span className="text-green-400 mr-2">•</span>
                      {service}
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Other Medical Services Provided */}
      <div className="bg-slate-800 rounded-lg shadow-xl border border-slate-700 overflow-hidden mb-6">
        <div className="bg-gradient-to-r from-emerald-700 to-emerald-800 p-4 border-b border-emerald-600">
          <h2 className="text-white text-lg font-bold flex items-center gap-2">
            <Heart className="text-emerald-300" size={24} />
            OTHER MEDICAL SERVICES PROVIDED
          </h2>
        </div>

        <div className="p-6">
          <div className="overflow-x-auto">
            <table className="w-full border-collapse">
              <thead>
                <tr>
                  <th  className="border-2 border-slate-600 bg-green-100 px-4 py-3 text-center align-middle">
                    <span className="text-slate-800 font-bold text-sm">BLOOD SERVICE FACILITY</span>
                  </th>
                  <th  className="border-2 border-slate-600 bg-green-100 px-4 py-3 text-center">
                    <span className="text-slate-800 font-bold text-sm">Number of blood units</span>
                  </th>
                  <th className="border-2 border-slate-600 bg-green-100 px-4 py-3 text-center align-middle">
                    <span className="text-slate-800 font-bold text-sm">Recipient</span>
                  </th>
                </tr>
                
               
              </thead>
              <tbody>
                {
                  bloodData.map((data, index) => (
                    <tr key={index}>
                      <td className="border-2 border-slate-600 bg-slate-700 px-4 py-3">
                        <span className="text-white text-sm">{data.blood_service_facility}</span>
                      </td>
                      <td className="border-2 border-slate-600 bg-slate-750 px-4 py-3">
                        {editMode ? (
                          <input
                            type="number"
                            value={data.no_of_blood_units}
                            onChange={(e) => {
                              const updatedBloodData = [...bloodData];
                              updatedBloodData[index].no_of_blood_units = parseInt(e.target.value) || 0;
                              setBloodData(updatedBloodData)
                            }}
                            className="bg-slate-700 text-slate-200 text-2xl font-bold px-2 py-1 rounded w-24 text-right"
                          />
                        ) : (
                          <span className="text-slate-200 text-2xl">{data.no_of_blood_units}</span>
                        )  
                      }
                      </td>
                      <td className="border-2 border-slate-600 bg-slate-750 px-4 py-3">
                        <span className="text-slate-300 text-xs">{data.recipient}</span>
                      </td>
                    </tr>
                  ))
                }               
              </tbody>
            </table>
          </div>
        </div>
      </div>

      {/* Hospital Census Section */}
      <div className="bg-slate-800 rounded-lg shadow-xl border border-slate-700 overflow-hidden mb-6">
        <div className="bg-gradient-to-r from-green-700 to-green-800 p-4 border-b border-green-600">
          <h2 className="text-white text-lg font-bold flex items-center gap-2">
            <Building2 className="text-green-300" size={24} />
            HOSPITAL CENSUS
          </h2>
        </div>

        <div className="overflow-x-auto">
          <table className="w-full">
            <thead>
              <tr className="bg-green-100">
                <th rowSpan="2" className="border-2 border-slate-600 px-4 py-3 text-center">
                  <span className="text-slate-800 font-bold text-sm">NAME OF HOSPITAL</span>
                </th>
                <th colSpan="5" className="border-2 border-slate-600 px-4 py-2 text-center">
                  <span className="text-slate-800 font-bold text-sm">TOTAL PATIENT SEEN</span>
                </th>
                <th colSpan="2" className="border-2 border-slate-600 px-4 py-2 text-center">
                  <span className="text-slate-800 font-bold text-sm">GENDER</span>
                </th>
                <th rowSpan="2" className="border-2 border-slate-600 px-4 py-3 text-center">
                  <span className="text-slate-800 font-bold text-sm">ADMITTED</span>
                </th>
                <th rowSpan="2" className="border-2 border-slate-600 px-4 py-3 text-center">
                  <span className="text-slate-800 font-bold text-sm">DISCHARGED</span>
                </th>
                <th rowSpan="2" className="border-2 border-slate-600 px-4 py-3 text-center">
                  <span className="text-slate-800 font-bold text-sm">DIED</span>
                </th>
                <th rowSpan="2" className="border-2 border-slate-600 px-4 py-3 text-center">
                  <span className="text-slate-800 font-bold text-sm">OPERATED</span>
                </th>
              </tr>
              <tr className="bg-green-100">
                <th className="border-2 border-slate-600 px-3 py-2 text-center">
                  <span className="text-slate-800 font-semibold text-xs">&lt;10 y/o</span>
                </th>
                <th className="border-2 border-slate-600 px-3 py-2 text-center">
                  <span className="text-slate-800 font-semibold text-xs">10-20 y/o</span>
                </th>
                <th className="border-2 border-slate-600 px-3 py-2 text-center">
                  <span className="text-slate-800 font-semibold text-xs">21-59 y/o</span>
                </th>
                <th className="border-2 border-slate-600 px-3 py-2 text-center">
                  <span className="text-slate-800 font-semibold text-xs">60 above</span>
                </th>
                <th className="border-2 border-slate-600 px-3 py-2 text-center">
                  <span className="text-slate-800 font-semibold text-xs">TOTAL</span>
                </th>
                <th className="border-2 border-slate-600 px-3 py-2 text-center">
                  <span className="text-slate-800 font-semibold text-xs">M</span>
                </th>
                <th className="border-2 border-slate-600 px-3 py-2 text-center">
                  <span className="text-slate-800 font-semibold text-xs">F</span>
                </th>
              </tr>
            </thead>
            <tbody>
              {hospitalCensus.map((hospital, idx) => {
                const total = hospital.under_10 + hospital.age_10_20 + hospital.age_21_59 + hospital.age_60_above;
                return (
                  <tr key={idx} className="hover:bg-slate-750 transition-colors">
                    <td className="border-2 border-slate-600 bg-slate-700 px-4 py-3">
                      <span className="text-white font-semibold text-sm">{hospital.hospital_name}</span>
                    </td>
                    <td className="border-2 border-slate-600 bg-slate-750 px-4 py-3 text-center">
                      {editMode ? (
                        <input
                          type="number"
                          value={hospital.under_10}
                          onChange={(e) => setHospitalCensus(prev => prev.map((h, i) => 
                            i === idx ? { ...h, under_10: parseInt(e.target.value) || 0 } : h
                          ))}
                          className="bg-slate-700 text-slate-200 text-lg font-semibold px-2 py-1 rounded w-16 text-center"
                        />
                      ) : (
                        <span className="text-slate-200 text-lg font-semibold">{hospital.under_10}</span>
                      )}
                    </td>
                    <td className="border-2 border-slate-600 bg-slate-750 px-4 py-3 text-center">
                      {editMode ? (
                        <input
                          type="number"
                          value={hospital.age_10_20}
                          onChange={(e) => setHospitalCensus(prev => prev.map((h, i) => 
                            i === idx ? { ...h, age_10_20: parseInt(e.target.value) || 0 } : h
                          ))}
                          className="bg-slate-700 text-slate-200 text-lg font-semibold px-2 py-1 rounded w-16 text-center"
                        />
                      ) : (
                        <span className="text-slate-200 text-lg font-semibold">{hospital.age_10_20}</span>
                      )}
                    </td>
                    <td className="border-2 border-slate-600 bg-slate-750 px-4 py-3 text-center">
                      {editMode ? (
                        <input
                          type="number"
                          value={hospital.age_21_59}
                          onChange={(e) => setHospitalCensus(prev => prev.map((h, i) => 
                            i === idx ? { ...h, age_21_59: parseInt(e.target.value) || 0 } : h
                          ))}
                          className="bg-slate-700 text-slate-200 text-lg font-semibold px-2 py-1 rounded w-16 text-center"
                        />
                      ) : (
                        <span className="text-slate-200 text-lg font-semibold">{hospital.age_21_59}</span>
                      )}
                    </td>
                    <td className="border-2 border-slate-600 bg-slate-750 px-4 py-3 text-center">
                      {editMode ? (
                        <input
                          type="number"
                          value={hospital.age_60_above}
                          onChange={(e) => setHospitalCensus(prev => prev.map((h, i) => 
                            i === idx ? { ...h, age_60_above: parseInt(e.target.value) || 0 } : h
                          ))}
                          className="bg-slate-700 text-slate-200 text-lg font-semibold px-2 py-1 rounded w-16 text-center"
                        />
                      ) : (
                        <span className="text-slate-200 text-lg font-semibold">{hospital.age_60_above}</span>
                      )}
                    </td>
                    <td className="border-2 border-slate-600 bg-green-900/20 px-4 py-3 text-center">
                      <span className="text-green-300 text-lg font-bold">{total}</span>
                    </td>
                    <td className="border-2 border-slate-600 bg-slate-750 px-4 py-3 text-center">
                      {editMode ? (
                        <input
                          type="number"
                          value={hospital.male}
                          onChange={(e) => setHospitalCensus(prev => prev.map((h, i) => 
                            i === idx ? { ...h, male: parseInt(e.target.value) || 0 } : h
                          ))}
                          className="bg-slate-700 text-slate-200 text-lg font-semibold px-2 py-1 rounded w-16 text-center"
                        />
                      ) : (
                        <span className="text-slate-200 text-lg font-semibold">{hospital.male}</span>
                      )}
                    </td>
                    <td className="border-2 border-slate-600 bg-slate-750 px-4 py-3 text-center">
                      {editMode ? (
                        <input
                          type="number"
                          value={hospital.female}
                          onChange={(e) => setHospitalCensus(prev => prev.map((h, i) => 
                            i === idx ? { ...h, female: parseInt(e.target.value) || 0 } : h
                          ))}
                          className="bg-slate-700 text-slate-200 text-lg font-semibold px-2 py-1 rounded w-16 text-center"
                        />
                      ) : (
                        <span className="text-slate-200 text-lg font-semibold">{hospital.female}</span>
                      )}
                    </td>
                    <td className="border-2 border-slate-600 bg-slate-750 px-4 py-3 text-center">
                      {editMode ? (
                        <input
                          type="number"
                          value={hospital.admitted}
                          onChange={(e) => setHospitalCensus(prev => prev.map((h, i) => 
                            i === idx ? { ...h, admitted: parseInt(e.target.value) || 0 } : h
                          ))}
                          className="bg-slate-700 text-slate-200 text-lg font-semibold px-2 py-1 rounded w-16 text-center"
                        />
                      ) : (
                        <span className="text-slate-200 text-lg font-semibold">{hospital.admitted}</span>
                      )}
                    </td>
                    <td className="border-2 border-slate-600 bg-slate-750 px-4 py-3 text-center">
                      {editMode ? (
                        <input
                          type="number"
                          value={hospital.discharged}
                          onChange={(e) => setHospitalCensus(prev => prev.map((h, i) => 
                            i === idx ? { ...h, discharged: parseInt(e.target.value) || 0 } : h
                          ))}
                          className="bg-slate-700 text-slate-200 text-lg font-semibold px-2 py-1 rounded w-16 text-center"
                        />
                      ) : (
                        <span className="text-slate-200 text-lg font-semibold">{hospital.discharged}</span>
                      )}
                    </td>
                    <td className="border-2 border-slate-600 bg-red-900/20 px-4 py-3 text-center">
                      {editMode ? (
                        <input
                          type="number"
                          value={hospital.died}
                          onChange={(e) => setHospitalCensus(prev => prev.map((h, i) => 
                            i === idx ? { ...h, died: parseInt(e.target.value) || 0 } : h
                          ))}
                          className="bg-red-900/30 text-red-300 text-lg font-semibold px-2 py-1 rounded w-16 text-center"
                        />
                      ) : (
                        <span className="text-red-300 text-lg font-semibold">{hospital.died}</span>
                      )}
                    </td>
                    <td className="border-2 border-slate-600 bg-slate-750 px-4 py-3 text-center">
                      {editMode ? (
                        <input
                          type="number"
                          value={hospital.operated}
                          onChange={(e) => setHospitalCensus(prev => prev.map((h, i) => 
                            i === idx ? { ...h, operated: parseInt(e.target.value) || 0 } : h
                          ))}
                          className="bg-slate-700 text-slate-200 text-lg font-semibold px-2 py-1 rounded w-16 text-center"
                        />
                      ) : (
                        <span className="text-slate-200 text-lg font-semibold">{hospital.operated}</span>
                      )}
                    </td>
                  </tr>
                );
              })}
              {/* Totals Row */}
              <tr className="bg-green-900/30 font-bold border-t-4 border-green-600">
                <td className="border-2 border-slate-600 px-4 py-4">
                  <span className="text-white font-bold text-base">TOTAL</span>
                </td>
                <td className="border-2 border-slate-600 px-4 py-4 text-center">
                  <span className="text-white text-xl font-bold">{censusTotals.under_10}</span>
                </td>
                <td className="border-2 border-slate-600 px-4 py-4 text-center">
                  <span className="text-white text-xl font-bold">{censusTotals.age_10_20}</span>
                </td>
                <td className="border-2 border-slate-600 px-4 py-4 text-center">
                  <span className="text-white text-xl font-bold">{censusTotals.age_21_59}</span>
                </td>
                <td className="border-2 border-slate-600 px-4 py-4 text-center">
                  <span className="text-white text-xl font-bold">{censusTotals.age_60_above}</span>
                </td>
                <td className="border-2 border-slate-600 bg-green-700 px-4 py-4 text-center">
                  <span className="text-white text-2xl font-bold">{censusTotals.total}</span>
                </td>
                <td className="border-2 border-slate-600 px-4 py-4 text-center">
                  <span className="text-white text-xl font-bold">{censusTotals.male}</span>
                </td>
                <td className="border-2 border-slate-600 px-4 py-4 text-center">
                  <span className="text-white text-xl font-bold">{censusTotals.female}</span>
                </td>
                <td className="border-2 border-slate-600 px-4 py-4 text-center">
                  <span className="text-white text-xl font-bold">{censusTotals.admitted}</span>
                </td>
                <td className="border-2 border-slate-600 px-4 py-4 text-center">
                  <span className="text-white text-xl font-bold">{censusTotals.discharged}</span>
                </td>
                <td className="border-2 border-slate-600 bg-red-900/30 px-4 py-4 text-center">
                  <span className="text-red-300 text-xl font-bold">{censusTotals.died}</span>
                </td>
                <td className="border-2 border-slate-600 px-4 py-4 text-center">
                  <span className="text-white text-xl font-bold">{censusTotals.operated}</span>
                </td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>

      {/* Logistical Support */}
      <div className="bg-slate-800 rounded-lg shadow-xl border border-slate-700 overflow-hidden mb-6">
        <div className="bg-gradient-to-r from-teal-700 to-teal-800 p-4 border-b border-teal-600">
          <h2 className="text-white text-lg font-bold flex items-center gap-2">
            <Activity className="text-teal-300" size={24} />
            LOGISTICAL SUPPORT
          </h2>
        </div>

        <div className="p-6">
          <div className="mb-6">
            <h3 className="text-teal-400 font-bold text-lg mb-4">MOBILIZED RESOURCES</h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {/* Medical and Public Health */}
              <div className="bg-gradient-to-br from-green-600 to-green-700 rounded-lg p-6 shadow-lg">
                <h4 className="text-white font-bold text-sm mb-2">Medical and Public Health</h4>
                {editMode ? (
                  <input
                    type="number"
                    step="0.01"
                    value={mobilizedResources.medical_public_health}
                    onChange={(e) => setMobilizedResources(prev => ({ ...prev, medical_public_health: parseFloat(e.target.value) || 0 }))}
                    className="bg-green-700 text-white text-3xl font-bold px-2 py-1 rounded w-full"
                  />
                ) : (
                  <div className="text-white text-4xl font-bold">{mobilizedResources.medical_public_health.toLocaleString('en-PH', { minimumFractionDigits: 2 })} Php</div>
                )}
              </div>

              {/* Nutrition in Emergency */}
              <div className="bg-gradient-to-br from-green-600 to-green-700 rounded-lg p-6 shadow-lg">
                <h4 className="text-white font-bold text-sm mb-2">Nutrition in Emergency</h4>
                {editMode ? (
                  <input
                    type="number"
                    step="0.01"
                    value={mobilizedResources.nutrition_emergency}
                    onChange={(e) => setMobilizedResources(prev => ({ ...prev, nutrition_emergency: parseFloat(e.target.value) || 0 }))}
                    className="bg-green-700 text-white text-3xl font-bold px-2 py-1 rounded w-full"
                  />
                ) : (
                  <div className="text-white text-4xl font-bold">{mobilizedResources.nutrition_emergency.toLocaleString('en-PH', { minimumFractionDigits: 2 })} Php</div>
                )}
              </div>

              {/* Water, Sanitation and Hygiene */}
              <div className="bg-gradient-to-br from-green-600 to-green-700 rounded-lg p-6 shadow-lg">
                <h4 className="text-white font-bold text-sm mb-2">Water, Sanitation and Hygiene</h4>
                {editMode ? (
                  <input
                    type="number"
                    step="0.01"
                    value={mobilizedResources.water_sanitation_hygiene}
                    onChange={(e) => setMobilizedResources(prev => ({ ...prev, water_sanitation_hygiene: parseFloat(e.target.value) || 0 }))}
                    className="bg-green-700 text-white text-3xl font-bold px-2 py-1 rounded w-full"
                  />
                ) : (
                  <div className="text-white text-4xl font-bold">{mobilizedResources.water_sanitation_hygiene.toLocaleString('en-PH', { minimumFractionDigits: 2 })} Php</div>
                )}
              </div>

              {/* Mental Health and Psychosocial Support */}
              <div className="bg-gradient-to-br from-green-600 to-green-700 rounded-lg p-6 shadow-lg">
                <h4 className="text-white font-bold text-sm mb-2">Mental Health and Psychosocial Support</h4>
                {editMode ? (
                  <input
                    type="number"
                    step="0.01"
                    value={mobilizedResources.mental_health_psychosocial_support}
                    onChange={(e) => setMobilizedResources(prev => ({ ...prev, mental_health_psychosocial_support: parseFloat(e.target.value) || 0 }))}
                    className="bg-green-700 text-white text-3xl font-bold px-2 py-1 rounded w-full"
                  />
                ) : (
                  <div className="text-white text-4xl font-bold">{mobilizedResources.mental_health_psychosocial_support > 0 ? mobilizedResources.mentalHealth.toLocaleString('en-PH', { minimumFractionDigits: 2 }) + ' Php' : '_________ Php'}</div>
                )}
              </div>
            </div>
          </div>

          <div className="bg-slate-700 rounded-lg p-4 border border-slate-600">
            <div className="flex justify-between items-center">
              <span className="text-white font-bold text-lg">Total Mobilized Resources:</span>
              <span className="text-teal-400 text-3xl font-bold">{resourcesTotal > 0 ? resourcesTotal.toLocaleString('en-PH', { minimumFractionDigits: 2 }) + ' Php' : '_________ Php'}</span>
            </div>
          </div>
        </div>
      </div>

      {/* Legend */}
      <div className="mt-6 bg-slate-800 rounded-lg p-4 border border-slate-700">
        <h3 className="text-slate-300 text-sm font-semibold mb-3">Status Legend</h3>
        <div className="flex flex-wrap gap-4">
          <div className="flex items-center gap-2">
            <div className="w-3 h-3 bg-green-500 rounded-full"></div>
            <span className="text-slate-400 text-xs">Fully Operational</span>
          </div>
          <div className="flex items-center gap-2">
            <div className="w-3 h-3 bg-yellow-500 rounded-full"></div>
            <span className="text-slate-400 text-xs">Partly Functional</span>
          </div>
          <div className="flex items-center gap-2">
            <div className="w-3 h-3 bg-red-500 rounded-full"></div>
            <span className="text-slate-400 text-xs">Critical/Non-Functional</span>
          </div>
        </div>
      </div>
    </div>
  );
}