import React from 'react'

const Logistics = ({editMode,headTitle, dataResource, setDataResource, resourcesTotal}) => {
  return (
      <div className="p-6">
          <div className="mb-6">
            <h3 className="text-teal-400 font-bold text-lg mb-4">{headTitle}</h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {/* Medical and Public Health */}
              <div className="bg-gradient-to-br from-green-600 to-green-700 rounded-lg p-6 shadow-lg">
                <h4 className="text-white font-bold text-sm mb-2">Medical and Public Health</h4>
                {editMode ? (
                  <input
                    type="number"
                    step="0.01"
                    value={dataResource.medical_public_health}
                    onChange={(e) => setDataResource(prev => ({ ...prev, medical_public_health: parseFloat(e.target.value) || 0 }))}
                    className="bg-green-700 text-white text-3xl font-bold px-2 py-1 rounded w-full"
                  />
                ) : (
                  <div className="text-white text-4xl font-bold">{dataResource.medical_public_health.toLocaleString('en-PH', { minimumFractionDigits: 2 })} Php</div>
                )}
              </div>

              {/* Nutrition in Emergency */}
              <div className="bg-gradient-to-br from-green-600 to-green-700 rounded-lg p-6 shadow-lg">
                <h4 className="text-white font-bold text-sm mb-2">Nutrition in Emergency</h4>
                {editMode ? (
                  <input
                    type="number"
                    step="0.01"
                    value={dataResource.nutrition_emergency}
                    onChange={(e) => setDataResource(prev => ({ ...prev, nutrition_emergency: parseFloat(e.target.value) || 0 }))}
                    className="bg-green-700 text-white text-3xl font-bold px-2 py-1 rounded w-full"
                  />
                ) : (
                  <div className="text-white text-4xl font-bold">{dataResource.nutrition_emergency.toLocaleString('en-PH', { minimumFractionDigits: 2 })} Php</div>
                )}
              </div>

              {/* Water, Sanitation and Hygiene */}
              <div className="bg-gradient-to-br from-green-600 to-green-700 rounded-lg p-6 shadow-lg">
                <h4 className="text-white font-bold text-sm mb-2">Water, Sanitation and Hygiene</h4>
                {editMode ? (
                  <input
                    type="number"
                    step="0.01"
                    value={dataResource.water_sanitation_hygiene}
                    onChange={(e) => setDataResource(prev => ({ ...prev, water_sanitation_hygiene: parseFloat(e.target.value) || 0 }))}
                    className="bg-green-700 text-white text-3xl font-bold px-2 py-1 rounded w-full"
                  />
                ) : (
                  <div className="text-white text-4xl font-bold">{dataResource.water_sanitation_hygiene.toLocaleString('en-PH', { minimumFractionDigits: 2 })} Php</div>
                )}
              </div>

              {/* Mental Health and Psychosocial Support */}
              <div className="bg-gradient-to-br from-green-600 to-green-700 rounded-lg p-6 shadow-lg">
                <h4 className="text-white font-bold text-sm mb-2">Mental Health and Psychosocial Support</h4>
                {editMode ? (
                  <input
                    type="number"
                    step="0.01"
                    value={dataResource.mental_health_psychosocial_support}
                    onChange={(e) => setDataResource(prev => ({ ...prev, mental_health_psychosocial_support: parseFloat(e.target.value) || 0 }))}
                    className="bg-green-700 text-white text-3xl font-bold px-2 py-1 rounded w-full"
                  />
                ) : (
                  <div className="text-white text-4xl font-bold">{dataResource.mental_health_psychosocial_support > 0 ? dataResource.mental_health_psychosocial_support.toLocaleString('en-PH', { minimumFractionDigits: 2 }) + ' Php' : '_________ Php'}</div>
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
  )
}

export default Logistics