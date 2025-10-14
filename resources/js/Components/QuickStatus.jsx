export default function QuickStatus () {
	return (
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
	);
}
