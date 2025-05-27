"use client"
import Wrapper from '@/components/Wrapper'
import { RecordInput, recordSchema } from '@/schema/record.schema'
import useUserStore from '@/store/userStore'
import React, { useEffect, useState } from 'react'

const RecordPage = () => {
  const { role } = useUserStore();

  const initialInput = {
    district: "",
    police_station: "",
    crime: "",
    operated_by: "",
    CNIC: "",
    dens_location: "",
    cell_number: "",
    by_police: {
      name: "",
      rank: "",
      posting: ""
    },
    by_political_person: {
      details: "",
    },
    by_others_private: {
      details: "",
    },
    status: "",
    CRMS_No: "",
    FIR: {
      FIR_no: "",
      FIR_year: "",
      FIR_PS: "",
      FIR_district: "",
    },
  }

  const [input, setInput] = useState<RecordInput>(initialInput);
  const [errors, setErrors] = useState<Partial<RecordInput>>();
  const [loading, setLoading] = useState(false);
  const [district, setDistrict] = useState<string | null>(null);

  useEffect(() => {
    if(role !== 'admin') {
      
      const storedDistrict = localStorage.getItem("district");
      setDistrict(storedDistrict);   
      if (storedDistrict) {
        setInput(prev => ({ ...prev, district: storedDistrict }));
      }
    }
  }, [role]);

  const changeEventHandler = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;

    // Handle nested properties (e.g., "by_police.name", "FIR.FIR_no")
    if (name.includes('.')) {
      const [parent, child] = name.split('.');
      
      setInput(prev => ({
        ...prev,
        [parent]: {
          // ...(prev[parent as keyof typeof prev] as Record<string, any>), // Type assertion
          ...(prev[parent as keyof typeof prev] as object),
          [child]: value
        }
      }));
    } 
    // Handle top-level properties
    else {
      // Make sure we're not accidentally adding an "input" field
      if (name !== 'input') {
        setInput(prev => ({
          ...prev,
          [name]: value,
        }));
      }
    }
  };

  const onSubmitHanlder = async (e: React.FormEvent) => {
    console.log("Form submitted")
    e.preventDefault();
    try {
      setLoading(true);
      setErrors(undefined);

      const result = recordSchema.safeParse(input);
      console.log('result', result);

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
    <Wrapper className='mb-20'>
      <div className="flex items-center justify-center mt-10">
        <form onSubmit={onSubmitHanlder} className="md:p-8 w-full max-w-3xl rounded-lg md:border border-gray-200 mx-4 flex flex-col gap-2">
          <div className='flex items-center gap-x-10 justify-between px-20'>
            <div className="mb-4">
              <label className='text-white'>District</label>
              <div className="relative">
                <input
                  type="text"
                  name="district"
                  value={input.district}
                  onChange={changeEventHandler}
                  className="px-2 border py-2 rounded-md text-white outline-none w-full"
                  readOnly={Boolean(district)}
                />

                {errors && (
                  <span className="text-base text-red-400">{errors.district}</span>
                )} 
              </div>
            </div>
            <div className="mb-4">
              <label className='text-white'>Police Station</label>
              <div className="relative">
                <input
                  type="text"
                  name="police_station"
                  value={input.police_station}
                  onChange={changeEventHandler}
                  className="px-2 border py-2 rounded-md text-white outline-none w-full"
                />

                {errors && (
                  <span className="text-base text-red-400">{errors.police_station}</span>
                )} 
              </div>
            </div>
          </div>

          <div className="mb-4 mx-20">
            <label className='text-white'>Crimes</label>
            <div className="relative">
              <input
                type="text"
                name="crime"
                value={input.crime}
                onChange={changeEventHandler}
                className="px-2 border py-2 rounded-md text-white outline-none w-full"
              />
              {errors && (
                <span className="text-base text-red-400">{errors.crime}</span>
              )} 
            </div>
          </div>

          <div className="mb-4 mx-20">
            <label className='text-white'>Operated By</label>
            <div className="relative">
              <input
                type="text"
                name="operated_by"
                value={input.operated_by}
                onChange={changeEventHandler}
                className="px-2 border py-2 rounded-md text-white outline-none w-full"
              />
              {errors && (
                <span className="text-base text-red-400">{errors.operated_by}</span>
              )} 
            </div>
          </div>

          <div className="mb-4 mx-20">
            <label className='text-white'>CNIC</label>
            <div className="relative">
              <input
                type="text"
                name="CNIC"
                value={input.CNIC}
                onChange={changeEventHandler}
                className="px-2 border py-2 rounded-md text-white outline-none w-full"
              />
              { errors && <span className="text-base text-red-400">{errors.CNIC}</span> } 
            </div>
          </div>
          <div className="mb-4 mx-20">
            <label className='text-white'>Dens Location</label>
            <div className="relative">
              <input
                type="text"
                name="dens_location"
                value={input.dens_location}
                onChange={changeEventHandler}
                className="px-2 border py-2 rounded-md text-white outline-none w-full"
              />
               {errors && <span className="text-base text-red-400">{errors.dens_location}</span> } 
            </div>
          </div>
          
          <div className="mb-4 mx-20">
            <label className='text-white'>Mobile Number</label>
            <div className="relative">
              <input
                type="text"
                name="cell_number"
                value={input.cell_number}
                onChange={changeEventHandler}
                className="px-2 border py-2 rounded-md text-white outline-none w-full"
              />
              {errors && <span className="text-base text-red-400">{errors.cell_number}</span> } 
            </div>
          </div>
          
          <label className='text-white px-20'>By Police</label>
          <div className='border rounded-md  mx-20 text-white'>
            {errors?.by_police && Array.isArray(errors.by_police) && (<p className="text-red-400 px-20 mt-1">{errors.by_police[0]}</p>)}
            <div className='grid grid-cols-2 gap-x-5 text-white p-4'>
              <div className="mb-4">
                <label className='text-white'>Name</label>
                <div className="relative">
                  <input
                    type="text"
                    name="by_police.name"
                    value={input.by_police?.name}
                    onChange={changeEventHandler}
                    className="px-2 border py-2 rounded-md text-white outline-none w-full"
                  />
                  {errors && <span className="text-base text-red-400">{errors.by_police?.name}</span> } 
                </div>
              </div>
              
              <div className="mb-4">
                <label className='text-white'>Rank</label>
                <div className="relative">
                  <input
                    type="text"
                    name="by_police.rank"
                    value={input.by_police?.rank}
                    onChange={changeEventHandler}
                    className="px-2 border py-2 rounded-md text-white outline-none w-full"
                  />
                  {errors && <span className="text-base text-red-400">{errors.by_police?.rank}</span> } 
                </div>
              </div>

              <div className="mb-4">
                <label className='text-white'>posting</label>
                <div className="relative">
                  <input
                    type="text"
                    name="by_police.posting"
                    value={input.by_police?.posting}
                    onChange={changeEventHandler}
                    className="px-2 border py-2 rounded-md text-white outline-none w-full"
                  />
                  {errors && <span className="text-base text-red-400">{errors.by_police?.posting}</span> } 
                </div>
              </div>
            </div>

          </div>

          <label className='text-white mt-5 px-20'>By Political Person</label>
          <div className='grid grid-cols-1 gap-x-5 border rounded-md text-white p-4 mx-20'>
            <div className="mb-4">
              <label className='text-white'>Name & Details</label>
              <div className="relative">
                <input
                  type="text"
                  name="by_political_person.details"
                  value={input.by_political_person?.details}
                  onChange={changeEventHandler}
                  className="px-2 border py-2 rounded-md text-white outline-none w-full"
                />
                {errors && <span className="text-base text-red-400">{errors.by_political_person?.details}</span> } 
              </div>
            </div>
          </div>

          <label className='text-white mt-5 mx-20'>By Others private</label>
          <div className='grid grid-cols-1 gap-x-5 border rounded-md text-white p-4 mx-20'>
            <div className="mb-4 ">
              <label className='text-white'>Name & Details</label>
              <div className="relative">
                <input
                  type="text"
                  name="by_others_private.details"
                  value={input.by_others_private?.details}
                  onChange={changeEventHandler}
                  className="px-2 border py-2 rounded-md text-white outline-none w-full"
                />
                {errors && <span className="text-base text-red-400">{errors.by_others_private?.details}</span> } 
              </div>
            </div>
          </div>
          
          <div className="mb-4 flex items-center gap-x-10 justify-between mt-5 px-20">
            <div className="relative">
              <label className='text-white'>Status</label>
              <input
                type="text"
                name="status"
                value={input.status}
                onChange={changeEventHandler}
                className="px-2 border py-2 rounded-md text-white outline-none w-full"
              />
              {errors && <span className="text-base text-red-400">{errors.status}</span> } 
            </div>
            
            <div className="relative">
            <label className='text-white'>CRMS_No</label>
              <input
                type="text"
                name="CRMS_No"
                value={input.CRMS_No}
                onChange={changeEventHandler}
                className="px-2 border py-2 rounded-md text-white outline-none w-full"
              />
              {errors && <span className="text-base text-red-400">{errors.CRMS_No}</span> } 
            </div>
          </div>

          <label className='text-white px-20'>FIR</label>
          <div className='border rounded-md mx-20 text-white'>
            {errors?.FIR && Array.isArray(errors.FIR) && (<p className="text-red-400 px-20 mt-1">{errors.FIR[0]}</p>)}
            <div className='grid grid-cols-2 gap-x-5 text-white p-4'>
              <div className="mb-4">
                <label className='text-white'>FIR_no</label>
                <div className="relative">
                  <input
                    type="text"
                    name="FIR.FIR_no"
                    value={input.FIR?.FIR_no}
                    onChange={changeEventHandler}
                    className="px-2 border py-2 rounded-md text-white outline-none w-full"
                  />
                  {errors && <span className="text-base text-red-400">{errors.FIR?.FIR_no}</span> } 
                </div>
              </div>
              
              <div className="mb-4">
                <label className='text-white'>FIR_year</label>
                <div className="relative">
                  <input
                    type="text"
                    name="FIR.FIR_year"
                    value={input.FIR?.FIR_year}
                    onChange={changeEventHandler}
                    className="px-2 border py-2 rounded-md text-white outline-none w-full"
                  />
                  {errors && <span className="text-base text-red-400">{errors.FIR?.FIR_year}</span> } 
                </div>
              </div>

              <div className="mb-4">
                <label className='text-white'>FIR_district</label>
                <div className="relative">
                  <input
                    type="text"
                    name="FIR.FIR_district"
                    value={input.FIR?.FIR_district}
                    onChange={changeEventHandler}
                    className="px-2 border py-2 rounded-md text-white outline-none w-full"
                  />
                  {errors && <span className="text-base text-red-400">{errors.FIR?.FIR_district}</span> } 
                </div>
              </div>
              
              <div className="mb-4">
                <label className='text-white'>FIR_PS</label>
                <div className="relative">
                  <input
                    type="text"
                    name="FIR.FIR_PS"
                    value={input.FIR?.FIR_PS}
                    onChange={changeEventHandler}
                    className="px-2 border py-2 rounded-md text-white outline-none w-full"
                  />
                  {errors && <span className="text-base text-red-400">{errors.FIR?.FIR_PS}</span> } 
                </div>
              </div>
            </div>

          </div>
          
          <div className='flex items-center justify-center mt-10'>
            { loading ?  
              <button type="submit" className="bg-white text-black px-4 py-2 rounded-md min-w-md cursor-not-allowed">loading ...</button>
              :
              <button type="submit" className="bg-white text-black px-4 py-2 rounded-md min-w-md cursor-pointer">Submit</button>
            }
          </div>

        </form>
      </div>
    </Wrapper>
  )
}

export default RecordPage;