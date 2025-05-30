"use client"
import Wrapper from "@/components/Wrapper"
import React, { FormEvent, useEffect, useRef, useState } from "react"

interface IRecord {
  district: string,
  police_station: string,
  crime: string,
  operated_by: string,
  CNIC: string,
  dens_location: string,
  cell_number: string,
  by_police: {
    name: string,
    rank: string,
    posting: string,
  },
  by_political_person: {
    details: string,
  },
  by_others_private: {
    details: string,
  },
  status: string,
  CRMS_No: string,
  FIR: {
    FIR_no: string,
    FIR_year: string,
    FIR_PS: string,
    FIR_district: string,
  },
  user: string
}

const UserRecordView = () => {
  const [districtRecords, setDistrictRecords] = useState<IRecord[]>([])
  const printRef = useRef<HTMLDivElement>(null)
  const [district, setDistrict] = useState('')
  const [loading, setLoading] = useState(false)

  useEffect(() => {
    const viewDistrictRecords = async () => {
      
    }
    viewDistrictRecords();
  }, [])

  // const onSubmitHandler = async() => {

  // }

  const onSbumitHanlder = async(e: FormEvent) => {
    e.preventDefault();
    try {
      setLoading(true)
      
      const response = await fetch(`http://localhost:4000/api/records/${district}`, {
        method: 'GET',
        headers: { 'Content-Type': 'application/json' },
        credentials: 'include',
      });

      const data = await response.json();
      console.log('data', data?.data);
      
      setDistrictRecords(data?.data);
      
    } catch (error) {
      console.error('Error fetching data:', error);
    } finally {
      setLoading(false)
    }

  }

  const handlePrint = () => {
    window.print();
  }
  console.log('district', district);
  
  return (
    <Wrapper>
    <form onSubmit={onSbumitHanlder} className="flex max-w-md gap-x-10 mb-10 mt-10">
      <div className="flex flex-col ">
        {/* <label className="text-white">District</label> */}
        <input
          type="text"
          placeholder="Enter District"
          value={district}
          onChange={(e) => setDistrict(e.target.value)}
          className="border border-gray-300 rounded px-4 py-[6px] max-w-sm text-white text-base"
        />
      </div>
        <div className='flex items-center justify-center '>
        { loading ?  
          <button type="submit" className="bg-white text-black px-4 py-2 rounded-md max-w-xs cursor-not-allowed">loading ...</button>
          :
          <button type="submit" className="bg-white text-black px-4 py-2 rounded-md max-w-md cursor-pointer">Get District records</button>
        }
      </div>

    </form>

      <div className="flex justify-between items-center mb-4">
        <h2 className='text-xl font-bold text-white'>Records Entered by {district} District</h2>
        <button 
          onClick={handlePrint}
          className="bg-blue-700 hover:bg-blue-600 text-white px-4 py-2 rounded"
        >
          Print Records
        </button>
      </div>

      <div ref={printRef} className="overflow-auto print:overflow-visible">
        <table className="min-w-full table-auto border-collapse border border-gray-700 text-sm text-white">
          <thead className="bg-gray-200">
            <tr>
              <th className="border border-gray-400 px-2 py-1 text-black">District</th>
              <th className="border border-gray-400 px-2 py-1 text-black">Police Station</th>
              <th className="border border-gray-400 px-2 py-1 text-black">Crime</th>
              <th className="border border-gray-400 px-2 py-1 text-black">Operated By</th>
              <th className="border border-gray-400 px-2 py-1 text-black">CNIC</th>
              <th className="border border-gray-400 px-2 py-1 text-black">Dens Location</th>
              <th className="border border-gray-400 px-2 py-1 text-black">Mobile Number</th>
              <th className="border border-gray-400 px-2 py-1 text-black">Police Name</th>
              <th className="border border-gray-400 px-2 py-1 text-black">Police Rank</th>
              <th className="border border-gray-400 px-2 py-1 text-black">Police Posting</th>
              <th className="border border-gray-400 px-2 py-1 text-black">Political Details</th>
              <th className="border border-gray-400 px-2 py-1 text-black">Private Details</th>
              <th className="border border-gray-400 px-2 py-1 text-black">Status</th>
              <th className="border border-gray-400 px-2 py-1 text-black">CRMS No</th>
              <th className="border border-gray-400 px-2 py-1 text-black">FIR No</th>
              <th className="border border-gray-400 px-2 py-1 text-black">FIR Year</th>
              <th className="border border-gray-400 px-2 py-1 text-black">FIR PS</th>
              <th className="border border-gray-400 px-2 py-1 text-black">FIR District</th>
            </tr>
          </thead>
          <tbody>
            {districtRecords?.map((item, index) => (
              <tr key={index} className="bg-gray-300">
                <td className="border border-gray-400 px-2 py-1 text-black">{item?.district}</td>
                <td className="border border-gray-400 px-2 py-1 text-black">{item?.police_station}</td>
                <td className="border border-gray-400 px-2 py-1 text-black">{item?.crime}</td>
                <td className="border border-gray-400 px-2 py-1 text-black">{item?.operated_by}</td>
                <td className="border border-gray-400 px-2 py-1 text-black">{item?.CNIC}</td>
                <td className="border border-gray-400 px-2 py-1 text-black">{item?.dens_location}</td>
                <td className="border border-gray-400 px-2 py-1 text-black">{item?.cell_number}</td>
                <td className="border border-gray-400 px-2 py-1 text-black">{item?.by_police?.name}</td>
                <td className="border border-gray-400 px-2 py-1 text-black">{item?.by_police?.rank}</td>
                <td className="border border-gray-400 px-2 py-1 text-black">{item?.by_police?.posting}</td>
                <td className="border border-gray-400 px-2 py-1 text-black">{item?.by_political_person?.details}</td>
                <td className="border border-gray-400 px-2 py-1 text-black">{item?.by_others_private?.details}</td>
                <td className="border border-gray-400 px-2 py-1 text-black">{item?.status}</td>
                <td className="border border-gray-400 px-2 py-1 text-black">{item?.CRMS_No}</td>
                <td className="border border-gray-400 px-2 py-1 text-black">{item?.FIR?.FIR_no}</td>
                <td className="border border-gray-400 px-2 py-1 text-black">{item?.FIR?.FIR_year}</td>
                <td className="border border-gray-400 px-2 py-1 text-black">{item?.FIR?.FIR_PS}</td>
                <td className="border border-gray-400 px-2 py-1 text-black">{item?.FIR?.FIR_district}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </Wrapper>
  )
}

export default UserRecordView
