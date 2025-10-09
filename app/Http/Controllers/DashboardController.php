<?php

namespace App\Http\Controllers;

use App\Models\AffectedPopulation;
use App\Models\Casualty;
use App\Models\DeployedHRH;
use App\Models\HealthClusterTeam;
use App\Models\HealthFacility;
use App\Models\MedicalServicesProvided;
use App\Models\MobilizedResources;
use App\Models\OtherMedicalServicesProvided;
use Illuminate\Http\Request;
use Inertia\Inertia;

class DashboardController extends Controller
{

    public function index()
    {
        $affectedData = AffectedPopulation::all();
        $casualties = Casualty::all();
        $deployedHRH = DeployedHRH::first();
        $healthFacilities = HealthFacility::all();
        $healthClusterTeams = HealthClusterTeam::first(); // Placeholder for future implementation
        $medicalServicesProvided = MedicalServicesProvided::first();
        $bloodDataProp = OtherMedicalServicesProvided::all();
        $mobilizedResources = MobilizedResources::first();

        return Inertia::render('Welcome', [
            'affectedDataProp' => $affectedData,
            'casualtiesProp' => $casualties,
            'healthFacilitiesProp' => $healthFacilities,
            'deployedHRHProp' => $deployedHRH,
            'healthClusterTeamsProp' => $healthClusterTeams,
            'medicalServicesProvidedProp' => $medicalServicesProvided,
            'bloodDataProp' => $bloodDataProp,
            'mobilizedResourcesProp' => $mobilizedResources,
        ]);
    }

    public function update(Request $request)
    {
        // dd($request->all());
        $validatedData = $request->validate([
            'affectedData' => 'required|array',
            'casualties' => 'required|array',
            'healthFacilities' => 'required|array',
            'deployedHRH' => 'required|array',
            'healthClusterTeams' => 'required|array',
            'medicalServicesProvided' => 'required|array',
            'bloodData' => 'required|array',
            'mobilizedResources' => 'required|array',
        ]);

        // Use the helper for each model group
        $this->updateRecord(AffectedPopulation::class, $validatedData['affectedData']);
        $this->updateRecord(Casualty::class, $validatedData['casualties']);
        $this->updateRecord(DeployedHRH::class, $validatedData['deployedHRH']);
        $this->updateRecord(HealthClusterTeam::class, $validatedData['healthClusterTeams']);
        $this->updateRecord(MedicalServicesProvided::class, $validatedData['medicalServicesProvided']);
        $this->updateRecord(MobilizedResources::class, $validatedData['mobilizedResources']);
        $this->updateMultipleRecords(HealthFacility::class, $validatedData['healthFacilities']);
        $this->updateMultipleRecords(OtherMedicalServicesProvided::class, $validatedData['bloodData']);

        // return back()->with('success', 'Data updated successfully.');
    }

    /**
     * Helper method to update a model record safely.
     */
    private function updateRecord(string $modelClass, array $data): void
    {
        if (!isset($data['id'])) {
            return; // skip if no ID is provided
        }

        $record = $modelClass::find($data['id']);

        if ($record) {
            $record->update($data);
        }
        else {
            $modelClass::create($data);
        }
    }
    private function updateMultipleRecords(string $modelClass, array $records): void
    {
        foreach ($records as $data) {
            if (!is_array($data)) {
                continue;
            }

            if (isset($data['id'])) {
                $record = $modelClass::find($data['id']);
                $record ? $record->update($data) : $modelClass::create($data);
            } else {
                $modelClass::create($data);
            }
        }
    }
    
}
