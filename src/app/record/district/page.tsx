"use client"
import Wrapper from "@/components/Wrapper"
import React, { FormEvent, useEffect, useRef, useState } from "react"
import { IRecord } from "../[userId]/page"
import Edit from "@/components/Edit"


const UserRecordView = () => {
  const printRef = useRef<HTMLDivElement>(null)
  const [districtRecords, setDistrictRecords] = useState<IRecord[]>([])
  const [selectedRecord, setSelectedRecord] = useState<IRecord | null>(null)
  const [isModalOpen, setIsModalOpen] = useState(false)
  const [reFetchRecord, setRefetchRecord] = useState(false);
  const [district, setDistrict] = useState('')
  const [category, setCategory] = useState('')
  const [loading, setLoading] = useState(false)
  const [categoryLoading, setCategoryLoading] = useState(false)

  useEffect(() => {
    const viewDistrictRecords = async () => {
      
    }
    viewDistrictRecords();
  }, [])

  const onSbumitHanlder = async(e: FormEvent) => {
    e.preventDefault();
    try {

      if(category && district) {
        alert('clear district or category field')
      }

      if(!district && category)  {
        setCategoryLoading(true)

        const response = await fetch(`http://localhost:4000/api/records/cat/${category}`, {
          method: 'GET',
          headers: { 'Content-Type': 'application/json' },
          credentials: 'include',
        });

        const data = await response.json();    
        
        if(!data.success) {       
          alert(data.message)
        }    
        
        setDistrictRecords(data?.data);
      }
      
      if(!category && district) {
        setLoading(true)
        
        const response = await fetch(`http://localhost:4000/api/records/${district}`, {
          method: 'GET',
          headers: { 'Content-Type': 'application/json' },
          credentials: 'include',
        });

        const data = await response.json();
        
        if(!data.success) {       
          alert(data.message)
        }    

        setDistrictRecords(data?.data);
      }
      
    } catch (error) {
      console.error('Error fetching data:', error);
    } finally {
      setLoading(false)
      setCategoryLoading(false)
    }

  }

  const handlePrint = () => {
    window.print();
  }
  
  const handleEdit = (record: IRecord) => {
    setSelectedRecord(record)
    setIsModalOpen(true)
  }

    const handleModalChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (!selectedRecord) return
    const { name, value } = e.target

    if (name.startsWith('by_police.')) {
      const field = name.split('.')[1]
      setSelectedRecord({
        ...selectedRecord,
        by_police: {
          ...selectedRecord.by_police,
          [field]: value,
        }
      })
    } else {
      setSelectedRecord({
        ...selectedRecord,
        [name]: value
      })
    }
  }

  useEffect(() => {
    setDistrict(district)
    const updatedRecord = async () => {
      try {
        setLoading(true)
        
        const response = await fetch(`http://localhost:4000/api/records/${district}`, {
          method: 'GET',
          headers: { 'Content-Type': 'application/json' },
          credentials: 'include',
        });

        const data = await response.json();      
        setDistrictRecords(data?.data);
        
      } catch (error) {
        console.error('Error fetching data:', error);
      } finally {
        setLoading(false)
      }
    }

    updatedRecord();
    
  }, [reFetchRecord])
  
  
  return (
    <Wrapper>
    <form onSubmit={onSbumitHanlder} className="flex flex-col gap-2 max-w-md gap-x-10 mb-10 mt-10 no-print">
      <div className="flex items-center gap-2">
        <div className="flex flex-col ">
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
      </div>

      <div className="flex items-center gap-2">
        <div className="flex flex-col ">
          <input
            type="text"
            placeholder="Enter Category"
            value={category}
            onChange={(e) => setCategory(e.target.value)}
            className="border border-gray-300 rounded px-4 py-[6px] max-w-sm text-white text-base"
          />
        </div>
          <div className='flex items-center justify-center '>
          { categoryLoading ?  
            <button type="submit" className="bg-white text-black px-4 py-2 rounded-md max-w-xs cursor-not-allowed">loading ...</button>
            :
            <button type="submit" className="bg-white text-black px-4 py-2 rounded-md max-w-md cursor-pointer">Get Records by category</button>
          }
        </div>
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
              <th className="border border-gray-400 px-2 py-1 text-black">Cat</th>
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
              <th className="border border-gray-400 px-2 py-1 text-black print:hidden">Actions</th>
            </tr>
          </thead>
          <tbody>
            {districtRecords?.map((item, index) => (
              <tr key={index} className="bg-gray-300">
                <td className="border border-gray-400 px-2 py-1 text-black">{item?.category}</td>
                <td className="border border-gray-400 px-2 py-1 text-black">{item.district}</td>
                <td className="border border-gray-400 px-2 py-1 text-black">{item.police_station}</td>
                <td className="border border-gray-400 px-2 py-1 text-black">{item.crime}</td>
                <td className="border border-gray-400 px-2 py-1 text-black">{item.operated_by}</td>
                <td className="border border-gray-400 px-2 py-1 text-black">{item.CNIC}</td>
                <td className="border border-gray-400 px-2 py-1 text-black">{item.dens_location}</td>
                <td className="border border-gray-400 px-2 py-1 text-black">{item.cell_number}</td>
                <td className="border border-gray-400 px-2 py-1 text-black">{item.by_police.name}</td>
                <td className="border border-gray-400 px-2 py-1 text-black">{item.by_police.rank}</td>
                <td className="border border-gray-400 px-2 py-1 text-black">{item.by_police.posting}</td>
                <td className="border border-gray-400 px-2 py-1 text-black">{item.by_political_person.details}</td>
                <td className="border border-gray-400 px-2 py-1 text-black">{item.by_others_private.details}</td>
                <td className="border border-gray-400 px-2 py-1 text-black">{item.status}</td>
                <td className="border border-gray-400 px-2 py-1 text-black">{item.CRMS_No}</td>
                <td className="border border-gray-400 px-2 py-1 text-black">{item.FIR.FIR_no}</td>
                <td className="border border-gray-400 px-2 py-1 text-black">{item.FIR.FIR_year}</td>
                <td className="border border-gray-400 px-2 py-1 text-black">{item.FIR.FIR_PS}</td>
                <td className="border border-gray-400 px-2 py-1 text-black">{item.FIR.FIR_district}</td>
                <td className="border border-gray-400 px-2 py-1 text-black print:hidden">
                  <button 
                    onClick={() => handleEdit(item)} 
                    className="bg-green-600 hover:bg-green-500 text-white px-2 py-1 rounded"
                  >
                    Edit
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {isModalOpen && selectedRecord && (
        <Edit
          selectedRecord= {selectedRecord}
          setIsModalOpen={setIsModalOpen}
          setRefetchRecord={setRefetchRecord}
          handleModalChange={handleModalChange}

        />
      )}

    </Wrapper>
  )
}

export default UserRecordView
