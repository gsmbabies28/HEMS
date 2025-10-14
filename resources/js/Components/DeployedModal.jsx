import React from 'react';
import Modal from './Modal';
import { router } from '@inertiajs/react';

const DeployedModal = ({ show, setModalShow, setModalData, modalData }) => {
  return (
     <Modal show={show} onClose={()=>setModalShow(false)} >
      <div className="bg-slate-200 p-5 rounded ">
        <h1 className='text-xl font-bold text-center mb-4'>{modalData.category}</h1>
        
        {/* Add New Personnel Button */}
        <div className="mb-4 flex justify-end">
          <button 
            onClick={() => {
              // Add a new empty row to the personnel array
              const newPerson = {
                id: Date.now(), // temporary ID
                full_name: '',
                position: '',
                assigned_facility: '',
                deployment_start_date: new Date().toISOString().split('T')[0],
                health_cluster_team: modalData.category
              };
              setModalData({
                ...modalData,
                personnel: [...(modalData.personnel || []), newPerson]
              });
            }}
            className="bg-blue-500 hover:bg-blue-600 text-white font-semibold px-4 py-2 rounded transition-colors"
          >
            + Add Personnel
          </button>
        </div>
    
        <table className='table-auto w-full'>
          <thead>
            <tr className='bg-slate-400'>
              <th className="border px-4 py-2">Name</th>
              <th className="border px-4 py-2">Role</th>
              <th className="border px-4 py-2">Deployed Date</th>
              <th className="border px-4 py-2">Actions</th>
            </tr>
          </thead>
          <tbody>
            {modalData.personnel && modalData.personnel.length > 0 ? (
              modalData.personnel.map((person, index) => (
                <tr key={person.id} className="hover:bg-slate-300 bg-white">
                  <td className="border px-4 py-2">
                    <input 
                      type="text"
                      value={person.full_name}
                      onChange={(e) => {
                        const updated = [...modalData.personnel];
                        updated[index].full_name = e.target.value;
                        setModalData({...modalData, personnel: updated});
                      }}
                      className="w-full px-2 py-1 rounded"
                      placeholder="Enter name"
                    />
                  </td>
                  <td className="border px-4 py-2">
                    <input 
                      type="text"
                      value={person.position}
                      onChange={(e) => {
                        const updated = [...modalData.personnel];
                        updated[index].position = e.target.value;
                        setModalData({...modalData, personnel: updated});
                      }}
                      className="w-full px-2 py-1 rounded"
                      placeholder="Enter role"
                    />
                  </td>
                  <td className="border px-4 py-2">
                    <input 
                      type="date"
                      value={person.deployment_start_date}
                      onChange={(e) => {
                        const updated = [...modalData.personnel];
                        updated[index].deployment_start_date = e.target.value;
                        setModalData({...modalData, personnel: updated});
                      }}
                      className="w-full px-2 py-1 rounded"
                    />
                  </td>
                  <td className="border px-4 py-2 text-center">
                    <button
                      onClick={() => {
                        const updated = modalData.personnel.filter((_, i) => i !== index);
                        setModalData({...modalData, personnel: updated});
                        router.delete(`/personnel/${person.id}`, {preserveScroll: true});
                      }}
                      className="bg-red-500 hover:bg-red-600 text-white px-3 py-1 rounded text-sm transition-colors"
                    >
                      Remove
                    </button>
                  </td>
                </tr>
              ))
            ) : (
              <tr>
                <td className="border px-4 py-2 text-center bg-white" colSpan="4">No personnel deployed.</td>
              </tr>
            )}
          </tbody>
        </table>
    
        {/* Save Button */}
        <div className="mt-4 flex justify-end gap-2">
          <button 
            onClick={() => setModalShow(false)}
            className="bg-gray-500 hover:bg-gray-600 text-white font-semibold px-4 py-2 rounded transition-colors"
          >
            Cancel
          </button>
          <button 
            onClick={() => {
              // Handle save logic here (e.g., API call)
              router.put('/personnel', { personnel: modalData.personnel },{preserveScroll: true});
              setModalShow(false);
            }}
            className="bg-green-500 hover:bg-green-600 text-white font-semibold px-4 py-2 rounded transition-colors"
          >
            Save Changes
          </button>
        </div>
      </div>
    </Modal>
  )
}

export default DeployedModal