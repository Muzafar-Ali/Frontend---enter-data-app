
import { IRecord } from '@/app/view-record/district/page';
import { districts } from '@/constants/districts';
import { recordSchema } from '@/schema/record.schema';
import Image from 'next/image';
import React, { Dispatch, SetStateAction, useState } from 'react'

interface IEditProps {
  selectedRecord: IRecord;
  setIsModalOpen: Dispatch<SetStateAction<boolean>>;
  setRefetchRecord: Dispatch<SetStateAction<boolean>>;
}

const EditRecord = ({ selectedRecord, setIsModalOpen, setRefetchRecord }: IEditProps) => {
  const [input, setInput] = useState<IRecord>(selectedRecord);
  const [errors, setErrors] = useState<Partial<IRecord>>();
  const [loading, setLoading] = useState(false);

  const onChangeHandler = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setInput(prev => ({ ...prev, [name]: value }));
  }

  const handleUpdate = async (e: React.FormEvent) => {
    e.preventDefault();
    
    try {
      setLoading(true);
      setErrors(undefined);
      
      // Validate input
      const result = recordSchema.safeParse(input);
      if (!result.success) {
        setErrors(result.error.flatten().fieldErrors as Partial<IRecord>);
        setLoading(false);
        return;
      }

      const response = await fetch(`http://localhost:4000/api/records/update/${input._id}`, {
        method: 'PATCH',
        headers: {
          'Content-Type': 'application/json',
        },
        credentials: 'include',
        body: JSON.stringify(input),
      });

      const data = await response.json();

      if (!data.success) {
        alert("Update failed: " + data.message);
        return;
      }

      alert("Record updated successfully");
      setIsModalOpen(false);
      setRefetchRecord((prev) => !prev);
    } catch (error) {
      console.error("Update error:", error);
      alert("Something went wrong while updating the record");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className='bg-white w-[1080px] mx-auto px-20 my-10 pb-10 absolute z-20 top-0 ml-20'>
      <div className='flex items-center justify-center gap-x-5 py-10'>
        <Image
          src={"/Sindh_Police_Logo.png"}
          width={70}
          height={70}
          alt='logo'
        />
        <h1 className='text-2xl font-bold'>Edit Narcotics Record</h1>
      </div>

      <form onSubmit={handleUpdate} className='w-full'>
        <div className='grid md:grid-cols-2 gap-x-5'>
          {/* Category */}
          <div className='mb-4'>
            <div className='flex flex-col gap-y-2'>
              <label htmlFor="category">Category</label>
              <select 
                id="category" 
                name="category" 
                className="px-2 border border-black py-2.5 rounded-md w-full"
                value={input.category}
                onChange={onChangeHandler}
              >
                <option value="">Select Category</option>
                <option value="A">A</option>
                <option value="B">B</option>
                <option value="C">C</option>
              </select>
            </div>
          </div>
          
          {/* District */}
          <div className='mb-4'>
            <div className='flex flex-col gap-y-2'>
              <label htmlFor="district">District</label>
              <select 
                id="district" 
                name="district" 
                className="px-2 border border-black py-2.5 rounded-md w-full"
                value={input.district}
                onChange={onChangeHandler}
              >
                <option value="">Select District</option>
                {districts.map((district, index) => (
                  <option key={index} value={district}>{district}</option>
                ))}
              </select>
            </div>
          </div>

          {/* Police Station */}
          <div className='mb-4'>
            <label htmlFor="police_station">Police Station</label>
            <div>
              <input
                type="text" 
                id='police_station'
                name='police_station'
                value={input.police_station}
                onChange={onChangeHandler}
                className="px-2 border border-black py-2 rounded-md w-full"
              />
            </div>
          </div>
          
          {/* Type of Narcotics */}
          <div className='mb-4'>
            <label htmlFor="type_of_Narcotics">Type Of Narcotics</label>
            <div>
              <input
                type="text" 
                id='type_of_Narcotics'
                name='type_of_Narcotics'
                value={input.type_of_Narcotics}
                onChange={onChangeHandler}
                className="px-2 border border-black py-2 rounded-md w-full"
              />
            </div>
          </div>

          {/* Operated By */}
          <div className='mb-4'>
            <label htmlFor="operated_by">Operated By</label>
            <div>
              <input
                type="text" 
                id='operated_by'
                name='operated_by'
                value={input.operated_by}
                onChange={onChangeHandler}
                className="px-2 border border-black py-2 rounded-md w-full"
              />
            </div>
          </div>
          
          {/* Dens Location */}
          <div className='mb-4'>
            <label htmlFor="operated_by">Dens Locationy</label>
            <div>
              <input
                type="text" 
                id='dens_location'
                name='dens_location'
                value={input.dens_location}
                onChange={onChangeHandler}
                className="px-2 border border-black py-2 rounded-md w-full"
              />
            </div>
          </div>

          {/* Cell Number */}
          <div className='mb-4'>
            <label htmlFor="operated_by">Cell Number</label>
            <div>
              <input
                type="text" 
                id='cell_number'
                name='cell_number'
                value={input.cell_number}
                onChange={onChangeHandler}
                className="px-2 border border-black py-2 rounded-md w-full"
              />
            </div>
          </div>

          {/* By Police (Name, Rank, Posting) */}
          <div className='mb-4'>
            <label htmlFor="operated_by">By Police (Name, Rank, Posting)</label>
            <div>
              <input
                type="text" 
                id='cell_number'
                name='cell_number'
                value={input.cell_number}
                onChange={onChangeHandler}
                className="px-2 border border-black py-2 rounded-md w-full"
              />
            </div>
          </div>
          
          {/* By Political Person) */}
          <div className='mb-4'>
            <label htmlFor="by_political_person">By Political Person</label>
            <div>
              <input
                type="text" 
                id='by_political_person'
                name='by_political_person'
                value={input.by_political_person}
                onChange={onChangeHandler}
                className="px-2 border border-black py-2 rounded-md w-full"
              />
            </div>
          </div>

          {/* By Political Person) */}
          <div className='mb-4'>
            <label htmlFor="by_others">By Others</label>
            <div>
              <input
                type="text" 
                id='by_others'
                name='by_others'
                value={input.by_others}
                onChange={onChangeHandler}
                className="px-2 border border-black py-2 rounded-md w-full"
              />
            </div>
          </div>

          {/* By Political Person) */}
          <div className='mb-4'>
            <label htmlFor="by_others">By Others</label>
            <div>
              <input
                type="text" 
                id='by_others'
                name='by_others'
                value={input.by_others}
                onChange={onChangeHandler}
                className="px-2 border border-black py-2 rounded-md w-full"
              />
            </div>
          </div>

          {/* Status */}
          <div className='mb-4'>
            <div className='flex flex-col gap-y-2'>
              <label htmlFor="status">Status</label>
              <select 
                id="status" 
                name="status" 
                className="px-2 border border-black py-2.5 rounded-md w-full"
                value={input.status}
                onChange={onChangeHandler}
              >
                <option value="">Select Category</option>
                <option value="Active">Active</option>
                <option value="Inactive">Inactive</option>
              </select>
            </div>
          </div>
          
          <div className='mb-4'>
            <label htmlFor="CRMS_No">CRMS No</label>
            <div>
              <input
                type="text"
                id='CRMS_No'
                name='CRMS_No'
                value={input.CRMS_No}
                onChange={onChangeHandler}
                className="px-2 border border-black py-2 rounded-md w-full"
              />
            </div>
          </div>

          {/* Remarks`` */}
          <div className='mb-4'>
            <label htmlFor="remarks">Remarks</label>
            <div>
              <textarea 
                id='remarks'
                name='remarks'
                value={input.remarks}
                onChange={onChangeHandler}
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
                value={input.FIR_no}
                onChange={onChangeHandler}
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
                value={input.FIR_year}
                onChange={onChangeHandler}
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
                value={input.FIR_PS_name}
                onChange={onChangeHandler}
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
                value={input.FIR_district}
                onChange={onChangeHandler}
                className="px-2 border border-black py-2 rounded-md w-full"
              />
            </div>
          </div>
          
          {/* CNIC */}
          <div className='mb-4'>
            <label htmlFor="CNIC">CNIC</label>
            <div>
              <input
                type="text" 
                id='CNIC'
                name='CNIC'
                value={input.CNIC}
                onChange={onChangeHandler}
                className="px-2 border border-black py-2 rounded-md w-full"
              />
              {errors?.CNIC && <span className="text-red-400 text-sm">{errors.CNIC}</span>}
            </div>
          </div>
        </div>

          {/* Form Actions */}
          <div className="mt-6 flex justify-center space-x-4">
            <button
              type="button"
              onClick={() => setIsModalOpen(false)}
              className="px-4 py-2 bg-gray-600 hover:bg-gray-700 text-white rounded"
              disabled={loading}
            >
              Cancel
            </button>
            <button
              type="submit"
              className="px-4 py-2 bg-blue-600 hover:bg-blue-700 text-white rounded"
              disabled={loading}
            >
              {loading ? 'Saving...' : 'Save Changes'}
            </button>
          </div>
      </form>
    </div>
  )
}

export default EditRecord;