import { IRecord } from '@/app/enter-record/view-record/[userId]/page';
import Image from 'next/image';
import React, { Dispatch, SetStateAction } from 'react'

interface IEditProps {
  selectedRecord: IRecord;
  setIsModalOpen: Dispatch<SetStateAction<boolean>>;
  setRefetchRecord: Dispatch<SetStateAction<boolean>>;
  handleModalChange: (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => void;
}
const EditRecord2 = ({ handleModalChange, selectedRecord, setIsModalOpen, setRefetchRecord} : IEditProps) => {

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
      credentials: 'include',
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
    <div className='bg-white w-[1080px] mx-auto px-20 my-10 pb-10'>
      <div className='flex items-center justify-center gap-x-5 py-10'>
        <Image
          src={"/Sindh_Police_Logo.png"}
          width={70}
          height={70}
          alt='logo'
        />
        <h1 className='text-2xl font-bold '>Narcotics Sindh Police Form Entry</h1>
      </div>

      <div  className='w-full '>
        <div className='mb-4'>
          <div className='flex flex-col gap-y-2'>
            <label htmlFor="category">Category</label>
            <select 
              id="category" 
              name="category" 
              className="px-2 border border-black py-2.5 rounded-md w-full"
              onChange={handleModalChange}
            >
              <option value="Narcotics">select Category</option>
              <option value="A">A</option>
              <option value="B">B</option>
              <option value="C">C</option>
            </select>
          </div>
        </div>
        
        {/* <div className='mb-4'>
          <div className='flex flex-col gap-y-2'>
            <label htmlFor="district">District</label>
            <select 
              id="district" 
              name="district" 
              className="px-2 border border-black py-2.5 rounded-md w-full"
              onChange={handleModalChange}
            >
              <option value="District">select District</option>
              { districts.map ((district, index) => (
                <option key={index} value={district}>{district}</option>
              ))}
            </select>
          </div>
        </div> */}

        <div className='mb-4'>
          <label htmlFor="police_station">Police Station</label>
          <div>
            <input
              type="text" 
              id='police_station'
              name='police_station'
              onChange={handleModalChange}
              className="px-2 border border-black py-2 rounded-md w-full"
            />
          </div>
        </div>
        
        <div className='mb-4'>
          <label htmlFor="type_of_Narcotics">Type Of Narcotics</label>
          <div>
            <input
              type="text" 
              id='type_of_Narcotics'
              name='type_of_Narcotics'
              onChange={handleModalChange}
              className="px-2 border border-black py-2 rounded-md w-full"
            />
          </div>
        </div>

        <div className='mb-4'>
          <label htmlFor="operated_by">Operated By</label>
          <div>
            <input
              type="text" 
              id='operated_by'
              name='operated_by'
              onChange={handleModalChange}
              className="px-2 border border-black py-2 rounded-md w-full"
            />
          </div>
        </div>
        
        <div className='mb-4'>
          <label htmlFor="dens_location">Dens Location</label>
          <div>
            <input
              type="text"
              id='dens_location' 
              name='dens_location'
              onChange={handleModalChange}
              className="px-2 border border-black py-2 rounded-md w-full"
            />
          </div>
        </div>

        <div className='mb-4'>
          <label htmlFor="cell_number">Cell Number</label>
          <div>
            <input
              type="text"
              id='cell_number' 
              name='cell_number'
              onChange={handleModalChange}
              className="px-2 border border-black py-2 rounded-md w-full"
            />
          </div>
        </div>

        <div className='mb-4'>
          <label htmlFor="by_police">By Police (Name, Rank, Posting)</label>
          <div>
            <input
              type="text"
              id='by_police' 
              name='by_police'
              onChange={handleModalChange}
              className="px-2 border border-black py-2 rounded-md w-full"
            />
          </div>
        </div>

        <div className='mb-4'>
          <label htmlFor="by_political_person">By Political Person</label>
          <div>
            <input
              type="text"
              id='by_political_person' 
              name='by_political_person'
              onChange={handleModalChange}
              className="px-2 border border-black py-2 rounded-md w-full"
            />
          </div>
        </div>

        <div className='mb-4'>
          <label htmlFor="by_others">By Others</label>
          <div>
            <input
              type="text"
              id='by_others' 
              name='by_others'
              onChange={handleModalChange}
              className="px-2 border border-black py-2 rounded-md w-full"
            />
          </div>
        </div>

        <div className='mb-4'>
          <div className='flex flex-col gap-y-2'>
            <label htmlFor="status">Present Status</label>
            <select 
              id="status" 
              name="status" 
              className="px-2 border border-black py-2.5 rounded-md w-full"
              onChange={handleModalChange}
            >
              <option value="Narcotics">select status</option>
              <option value="Active">Active</option>
              <option value="Inatice">Inatice</option>
            </select>
          </div>
        </div>

        <div className='mb-4'>
          <label htmlFor="remarks">Remarks</label>
          <div>
            <textarea 
              id='remarks'
              name='remarks'
              className="px-2 border border-black py-2 rounded-md w-full"
            />
          </div>
        </div>

        <div className='mb-4'>
          <label htmlFor="CRMS_No">CRMS No</label>
          <div>
            <input
              type="text"
              id='CRMS_No'
              name='CRMS_No'
              onChange={handleModalChange}
              className="px-2 border border-black py-2 rounded-md w-full"
            />
          </div>
        </div>

        <div className='mb-4'>
          <label htmlFor="FIR_no">FIR No</label>
          <div>
            <input
              type="text"
              id='FIR_no'
              name='FIR_no'
              onChange={handleModalChange}
              className="px-2 border border-black py-2 rounded-md w-full"
            />
          </div>
        </div>

        <div className='mb-4'>
          <label htmlFor="FIR_year">FIR Year</label>
          <div>
            <input
              type="text"
              id='FIR_year'
              name='FIR_year'
              onChange={handleModalChange}
              className="px-2 border border-black py-2 rounded-md w-full"
            />
          </div>
        </div>

        <div className='mb-4'>
          <label htmlFor="FIR_PS_name">FIR PS Name</label>
          <div>
            <input
              type="text"
              id='FIR_PS_name'
              name='FIR_PS_name'
              onChange={handleModalChange}
              className="px-2 border border-black py-2 rounded-md w-full"
            />
          </div>
        </div>

        <div className='mb-4'>
          <label htmlFor="FIR_district">FIR District</label>
          <div>
            <input
              type="text"
              id='FIR_district'
              name='FIR_district'
              onChange={handleModalChange}
              className="px-2 border border-black py-2 rounded-md w-full"
            />
          </div>
        </div>

        <div className='mb-4'>
          <label htmlFor="CNIC">CNIC</label>
          <div>
            <input
              type="text" 
              id='CNIC'
              name='CNIC'
              onChange={handleModalChange}
              className="px-2 border border-black py-2 rounded-md w-full"
            />
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
  )
}

export default EditRecord2