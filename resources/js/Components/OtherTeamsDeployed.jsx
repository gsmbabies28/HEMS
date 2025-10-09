import React from 'react'

const OtherTeamsDeployed = () => {
  return (
    <>
      {/* Other Teams Deployed */}
      <div className="bg-slate-800 rounded-lg shadow-xl border border-slate-700 overflow-hidden mb-6">
        <div className="bg-gradient-to-r from-emerald-700 to-green-800 p-4 border-b border-emerald-600">
          <h2 className="text-white text-lg font-bold flex items-center gap-2">
            <Users className="text-emerald-300" size={24} />
            OTHER TEAMS DEPLOYED
          </h2>
        </div>

        <div className="p-6">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {/* First Team - RHA Team with 6 Teams */}
            <div className="bg-slate-750 rounded-lg border border-slate-600 overflow-hidden">
              <div className="bg-green-600 p-6 text-center">
                <div className="text-6xl font-bold text-white mb-2">6</div>
                <div className="text-white font-bold text-lg">Teams</div>
              </div>
              <div className="bg-green-500 p-4 text-center">
                <div className="text-white font-bold text-lg">RHA TEAM</div>
              </div>
              <div className="bg-slate-700 p-4 text-center min-h-[60px] flex items-center justify-center">
                <div className="text-slate-300 text-sm italic">INSERT PHOTOS HERE</div>
              </div>
            </div>

            {/* Second Team - Placeholder */}
            <div className="bg-slate-750 rounded-lg border border-slate-600 overflow-hidden">
              <div className="bg-green-600 p-6 text-center">
                <div className="text-4xl font-bold text-white mb-2">—</div>
                <div className="text-white font-bold text-lg">Teams</div>
              </div>
              <div className="bg-green-500 p-4 text-center">
                <div className="text-white font-bold text-lg">TYPE OF TEAM</div>
              </div>
              <div className="bg-slate-700 p-4 text-center min-h-[60px] flex items-center justify-center">
                <div className="text-slate-300 text-sm italic">INSERT PHOTOS HERE</div>
              </div>
            </div>

            {/* Third Team - Placeholder */}
            <div className="bg-slate-750 rounded-lg border border-slate-600 overflow-hidden">
              <div className="bg-green-600 p-6 text-center">
                <div className="text-4xl font-bold text-white mb-2">—</div>
                <div className="text-white font-bold text-lg">Teams</div>
              </div>
              <div className="bg-green-500 p-4 text-center">
                <div className="text-white font-bold text-lg">TYPE OF TEAM</div>
              </div>
              <div className="bg-slate-700 p-4 text-center min-h-[60px] flex items-center justify-center">
                <div className="text-slate-300 text-sm italic">INSERT PHOTOS HERE</div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  )
}

export default OtherTeamsDeployed