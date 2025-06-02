import { IRecord } from '@/app/record/[userId]/page';
import React, { Dispatch, SetStateAction } from 'react'

interface IEditProps {
  selectedRecord: IRecord;
  setIsModalOpen: Dispatch<SetStateAction<boolean>>;
  setRefetchRecord: Dispatch<SetStateAction<boolean>>;
  handleModalChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
}
const Edit = ({ handleModalChange, selectedRecord, setIsModalOpen, setRefetchRecord} : IEditProps) => {

  const handleUpdate = async () => {
  if (!selectedRecord?._id) {
    alert("No record selected");
    return;
  }

  try {
    const response = await fetch(`http://localhost:4000/api/records/update/${selectedRecord._id}`, {
      method: 'PATCH',
      headers: {
        'Content-Type': 'application/json',
      },
      credentials: 'include', // Include cookies if you need auth
      body: JSON.stringify(selectedRecord),
    });

    const data = await response.json();

    if (!data.success) {
      alert("Update failed: " + data.message);
      return;
    }

    // Optionally refresh records or update state locally
    alert("Record updated successfully");
    setIsModalOpen(false);

    // Optional: re-fetch or locally update records
    // Example:
    // setRecords(prev => prev.map(r => r._id === selectedRecord._id ? data.data : r));
    setRefetchRecord((prev) => !prev);
  } catch (error) {
    console.error("Update error:", error);
    alert("Something went wrong while updating the record");
  }
};

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center z-50">
          <div className="bg-white text-black p-6 rounded shadow-md w-full max-w-3xl max-h-screen overflow-y-auto">
            <h3 className="text-xl font-bold mb-4">Edit Record</h3>

            <div className="grid grid-cols-2 gap-4">
              <div>
                <label className="text-sm font-medium">Crime</label>
                <input
                  name="crime"
                  value={selectedRecord.crime}
                  onChange={handleModalChange}
                  className="w-full p-2 border rounded"
                />
              </div>

              <div>
                <label className="text-sm font-medium">Operated By</label>
                <input
                  name="operated_by"
                  value={selectedRecord.operated_by}
                  onChange={handleModalChange}
                  className="w-full p-2 border rounded"
                />
              </div>

              <div>
                <label className="text-sm font-medium">CNIC</label>
                <input
                  name="CNIC"
                  value={selectedRecord.CNIC}
                  onChange={handleModalChange}
                  className="w-full p-2 border rounded"
                />
              </div>

              <div>
                <label className="text-sm font-medium">Dens Location</label>
                <input
                  name="dens_location"
                  value={selectedRecord.dens_location}
                  onChange={handleModalChange}
                  className="w-full p-2 border rounded"
                />
              </div>

              <div>
                <label className="text-sm font-medium">Mobile Number</label>
                <input
                  name="cell_number"
                  value={selectedRecord.cell_number}
                  onChange={handleModalChange}
                  className="w-full p-2 border rounded"
                />
              </div>

              {/* By Police Section */}
              <div className="col-span-2 border p-4 rounded">
                <p className="font-semibold mb-2">By Police</p>
                <div className="grid grid-cols-3 gap-4">
                  <div>
                    <label className="text-sm font-medium">Name</label>
                    <input
                      name="by_police.name"
                      value={selectedRecord.by_police.name}
                      onChange={handleModalChange}
                      className="w-full p-2 border rounded"
                    />
                  </div>
                  <div>
                    <label className="text-sm font-medium">Rank</label>
                    <input
                      name="by_police.rank"
                      value={selectedRecord.by_police.rank}
                      onChange={handleModalChange}
                      className="w-full p-2 border rounded"
                    />
                  </div>
                  <div>
                    <label className="text-sm font-medium">Posting</label>
                    <input
                      name="by_police.posting"
                      value={selectedRecord.by_police.posting}
                      onChange={handleModalChange}
                      className="w-full p-2 border rounded"
                    />
                  </div>
                </div>
              </div>

              {/* By Political Person */}
              <div className="col-span-2 border p-4 rounded">
                <p className="font-semibold mb-2">By Political Person</p>
                <label className="text-sm font-medium">Details</label>
                <input
                  name="by_political_person.details"
                  value={selectedRecord.by_political_person.details}
                  onChange={handleModalChange}
                  className="w-full p-2 border rounded"
                />
              </div>

              {/* By Others Private */}
              <div className="col-span-2 border p-4 rounded">
                <p className="font-semibold mb-2">By Others (Private)</p>
                <label className="text-sm font-medium">Details</label>
                <input
                  name="by_others_private.details"
                  value={selectedRecord.by_others_private.details}
                  onChange={handleModalChange}
                  className="w-full p-2 border rounded"
                />
              </div>

              <div>
                <label className="text-sm font-medium">Status</label>
                <input
                  name="status"
                  value={selectedRecord.status}
                  onChange={handleModalChange}
                  className="w-full p-2 border rounded"
                />
              </div>

              <div>
                <label className="text-sm font-medium">CRMS No</label>
                <input
                  name="CRMS_No"
                  value={selectedRecord.CRMS_No}
                  onChange={handleModalChange}
                  className="w-full p-2 border rounded"
                />
              </div>

              {/* FIR Section */}
              <div className="col-span-2 border p-4 rounded">
                <p className="font-semibold mb-2">FIR Details</p>
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <label className="text-sm font-medium">FIR No</label>
                    <input
                      name="FIR.FIR_no"
                      value={selectedRecord.FIR.FIR_no}
                      onChange={handleModalChange}
                      className="w-full p-2 border rounded"
                    />
                  </div>
                  <div>
                    <label className="text-sm font-medium">FIR Year</label>
                    <input
                      name="FIR.FIR_year"
                      value={selectedRecord.FIR.FIR_year}
                      onChange={handleModalChange}
                      className="w-full p-2 border rounded"
                    />
                  </div>
                  <div>
                    <label className="text-sm font-medium">FIR PS</label>
                    <input
                      name="FIR.FIR_PS"
                      value={selectedRecord.FIR.FIR_PS}
                      onChange={handleModalChange}
                      className="w-full p-2 border rounded"
                    />
                  </div>
                  <div>
                    <label className="text-sm font-medium">FIR District</label>
                    <input
                      name="FIR.FIR_district"
                      value={selectedRecord.FIR.FIR_district}
                      onChange={handleModalChange}
                      className="w-full p-2 border rounded"
                    />
                  </div>
                </div>
              </div>
            </div>

            <div className="mt-6 flex justify-end space-x-4">
              <button
                onClick={() => setIsModalOpen(false)}
                className="px-4 py-2 bg-gray-600 hover:bg-gray-700 text-white rounded"
              >
                Cancel
              </button>
              <button
                onClick={handleUpdate}
                className="px-4 py-2 bg-blue-600 hover:bg-blue-700 text-white rounded"
              >
                Save Changes
              </button>
            </div>
          </div>
        </div>
  )
}

export default Edit