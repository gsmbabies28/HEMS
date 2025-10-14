<?php

namespace App\Http\Controllers;

use App\Models\AffectedPopulation;
use App\Models\AvailableResources;
use App\Models\Casualty;
use App\Models\DeployedHRH;
use App\Models\HealthClusterTeam;
use App\Models\HealthFacility;
use App\Models\HospitalCensus;
use App\Models\MedicalServicesProvided;
use App\Models\MobilizedResources;
use App\Models\OtherMedicalServicesProvided;
use App\Models\PatientCatered;
use App\Models\PersonnelDeployed;
use App\Models\PrepositionResources;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Storage;
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
        $hospitalCensus = HospitalCensus::all();
        $patientCatered = PatientCatered::first();
        $prepositionedResources = PrepositionResources::first(); // Placeholder for future implementation
        $availableResources = AvailableResources::first(); // Placeholder for future implementation
        $personnelDeployed = PersonnelDeployed::all(); // Placeholder for future implementation

        $json = Storage::disk('local')->get('data/header.json');
        $headerTitle = json_decode($json, true);

        return Inertia::render('Welcome', [
            'affectedDataProp' => $affectedData,
            'casualtiesProp' => $casualties,
            'healthFacilitiesProp' => $healthFacilities,
            'deployedHRHProp' => $deployedHRH,
            'healthClusterTeamsProp' => $healthClusterTeams,
            'medicalServicesProvidedProp' => $medicalServicesProvided,
            'bloodDataProp' => $bloodDataProp,
            'mobilizedResourcesProp' => $mobilizedResources,
            'hospitalCensusProp' => $hospitalCensus,
            'patientCateredProp' => $patientCatered,
            'prepositionedResourcesProp' => $prepositionedResources,
            'availableResourcesProp' => $availableResources,
            'headerTitleProp' => $headerTitle,
            'personnelDeployedProp' => $personnelDeployed,
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
            'hospitalCensus' => 'required|array',
            'patientCatered' => 'required|array',
            'prepositionedResources' => 'required|array',
            'availableResources' => 'required|array',
        ]);

        // Use the helper for each model group
        $this->updateRecord(AffectedPopulation::class, $validatedData['affectedData']);
        $this->updateRecord(Casualty::class, $validatedData['casualties']);
        $this->updateRecord(DeployedHRH::class, $validatedData['deployedHRH']);
        $this->updateRecord(HealthClusterTeam::class, $validatedData['healthClusterTeams']);
        $this->updateRecord(MedicalServicesProvided::class, $validatedData['medicalServicesProvided']);
        $this->updateRecord(PrepositionResources::class, $validatedData['prepositionedResources']);
        $this->updateRecord(AvailableResources::class, $validatedData['availableResources']);
        $this->updateRecord(MobilizedResources::class, $validatedData['mobilizedResources']);
        $this->updateRecord(PatientCatered::class, $validatedData['patientCatered']);
        $this->updateMultipleRecords(HealthFacility::class, $validatedData['healthFacilities']);
        $this->updateMultipleRecords(OtherMedicalServicesProvided::class, $validatedData['bloodData']);
        $this->updateMultipleRecords(HospitalCensus::class, $validatedData['hospitalCensus']);

        if ($request->has('cardTitle')) {
            $headerData = $request->input('cardTitle');
            $this->updateHeader($headerData);
        }


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

    public function updateHeader(array $data)
    {
        Storage::disk('local')->put('data/header.json', json_encode($data, JSON_PRETTY_PRINT));
    }
    
}
