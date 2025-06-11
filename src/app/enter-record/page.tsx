"use client"
import Wrapper from '@/components/Wrapper'
import { districts } from '@/constants/districts'
import { RecordInput, recordSchema } from '@/schema/record.schema'
import useUserStore from '@/store/userStore'
import Image from 'next/image'
import React, { useEffect, useState } from 'react'

interface IInitialInput {
  category: string;
  district: string;
  police_station: string;
  type_of_Narcotics: string;
  operated_by: string;
  dens_location: string;
  cell_number: string;
  by_police: string;
  by_political_person: string;
  by_others: string;
  status: string;
  remarks: string;
  CRMS_No: string;
  FIR_no: string;
  FIR_year: string;
  FIR_PS_name: string;
  FIR_district: string;
  CNIC: string;
}

const RecordPage = () => {

  const initialInput: IInitialInput = {
    category: "",
    district: "",
    police_station: "",
    type_of_Narcotics: "",
    operated_by: "",
    dens_location: "",
    cell_number: "",
    by_police: "",
    by_political_person: "",
    by_others: "",
    status: "",
    remarks: "",
    CRMS_No: "",
    FIR_no: "",
    FIR_year: "",
    FIR_PS_name: "",
    FIR_district: "",
    CNIC: "",
  }
  
  const [input, setInput] = useState<IInitialInput>(initialInput);
  const [errors, setErrors] = useState<Partial<IInitialInput>>()
  const [loading, setLoading] = useState(false);

  const onChangeHandler = async (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>) => {
    console.log(e.target);
    
    const { name, value } = e.target;
    setInput(prev => ({ ...prev, [name]: value }));
  }


    const onSubmitHanlder = async (e: React.FormEvent) => {
      e.preventDefault();
      console.log('inputData', input);
  
      try {
        setLoading(true);
        setErrors(undefined);
        const result = recordSchema.safeParse(input);

        if (!result.success) {
          alert('Data missing: Please fill all fields');
          setErrors(result.error.flatten().fieldErrors as Partial<RecordInput>);
          setLoading(false);
          return;
        }
        
        const response = await fetch('http://localhost:4000/api/records/create', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json'
          },
          credentials: 'include',
          body: JSON.stringify(input)
        });

        const data = await response.json();
        
        if(!data.success) {
          alert(data.message);
          setLoading(false);
          return;
        }
  
        setInput(initialInput);
  
      } catch (error) {
        console.error(error);
      } finally {
        setLoading(false);
      }
    }

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

      <form onSubmit={onSubmitHanlder} className='w-full '>
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
              <option value="Narcotics">select Category</option>
              <option value="A">A</option>
              <option value="B">B</option>
              <option value="C">C</option>
            </select>
          </div>
        </div>
        
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
              <option value="District">select District</option>
              { districts.map ((district, index) => (
                <option key={index} value={district}>{district}</option>
              ))}
            </select>
          </div>
        </div>

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
        
        <div className='mb-4'>
          <label htmlFor="dens_location">Dens Location</label>
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

        <div className='mb-4'>
          <label htmlFor="cell_number">Cell Number</label>
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

        <div className='mb-4'>
          <label htmlFor="by_police">By Police (Name, Rank, Posting)</label>
          <div>
            <input
              type="text"
              id='by_police' 
              name='by_police'
              value={input.by_police}
              onChange={onChangeHandler}
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
              value={input.by_political_person}
              onChange={onChangeHandler}
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
              value={input.by_others}
              onChange={onChangeHandler}
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
              value={input.status}
              onChange={onChangeHandler}
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
              value={input.remarks}
              onChange={onChangeHandler}
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
              value={input.CRMS_No}
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
            { errors &&  <span className="text-base text-red-400">{errors.CNIC}</span> }
          </div>
        </div>

        <div className='flex items-center justify-center mt-10'>
          { loading ?  
            <button type="submit" className="bg-[#2A4892] text-white px-4 py-2 rounded-md min-w-xs cursor-not-allowed">loading ...</button>
            :
            <button type="submit" className="bg-[#2A4892] text-white px-4 py-2 rounded-md min-w-xs cursor-pointer">Submit</button>
          }
        </div>

      </form>
    </div>
  )
}

export default RecordPage;