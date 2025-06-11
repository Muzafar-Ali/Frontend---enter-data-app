"use client"
import EditRecord from '@/components/EditRecord';
import Wrapper from '@/components/Wrapper'
import { useEffect, useRef, useState } from 'react'
import { IRecord } from '../district/page';

const UserRecordView = () => {
  const printRef = useRef<HTMLDivElement>(null)
  const [records, setRecords] = useState<IRecord[]>([])
  const [selectedRecord, setSelectedRecord] = useState<IRecord | null>(null)
  const [isModalOpen, setIsModalOpen] = useState(false)
  const [reFetchRecord, setRefetchRecord] = useState(false);
  console.log('reFetchRecord', reFetchRecord);
  
  useEffect(() => {
    const getAllRecords = async () => {
      try {
        const response = await fetch(`http://localhost:4000/api/records/all`, {
          method: 'GET',
          headers: { 'Content-Type': 'application/json' },
          credentials: 'include',
        });

        const data = await response.json();    
        
        if(!data.success) {       
          alert(data.message)
        }    
        
        setRecords(data?.data);
              
      } catch (error) {
        console.error('Error fetching data:', error);
      }
    }
    getAllRecords();
  }, [reFetchRecord])

  const handlePrint = () => {
    window.print();
  }

  const handleEdit = (record: IRecord) => {
    setSelectedRecord(record)
    setIsModalOpen(true)
  }

  return (
    <Wrapper className='mt-10'>      
      <div className="flex justify-between items-center mb-4">
        <button
          onClick={() => setRefetchRecord((prev) => !prev)} 
          className="bg-white text-black px-4 py-2 rounded-md max-w-md cursor-pointer"
        >
          Get Fresh Records
        </button>
        
        <button 
          onClick={handlePrint}
          className="bg-blue-700 hover:bg-blue-600 text-white px-4 py-2 rounded no-print"
        >
          Print Records
        </button>
      </div>

      <div ref={printRef} className="overflow-auto print:overflow-visible">
        <table className="min-w-full table-auto border-collapse border border-gray-700 text-sm text-white">
          <thead className="bg-white">
            <tr>
              <th className="border border-gray-400 px-2 py-1 text-black">Category</th>
              <th className="border border-gray-400 px-2 py-1 text-black">District</th>
              <th className="border border-gray-400 px-2 py-1 text-black">Police Station</th>
              <th className="border border-gray-400 px-2 py-1 text-black">Type of Narcotics</th>
              <th className="border border-gray-400 px-2 py-1 text-black">Operated By</th>
              <th className="border border-gray-400 px-2 py-1 text-black">Dens Location</th>
              <th className="border border-gray-400 px-2 py-1 text-black">Cell Number</th>
              <th className="border border-gray-400 px-2 py-1 text-black">By Police Name</th>
              <th className="border border-gray-400 px-2 py-1 text-black">By Political Person</th>
              <th className="border border-gray-400 px-2 py-1 text-black">Others</th>
              <th className="border border-gray-400 px-2 py-1 text-black">Status</th>
              <th className="border border-gray-400 px-2 py-1 text-black">Remarks</th>
              <th className="border border-gray-400 px-2 py-1 text-black">CRMS No</th>
              <th className="border border-gray-400 px-2 py-1 text-black">FIR No</th>
              <th className="border border-gray-400 px-2 py-1 text-black">FIR Year</th>
              <th className="border border-gray-400 px-2 py-1 text-black">FIR PS Name</th>
              <th className="border border-gray-400 px-2 py-1 text-black">FIR District</th>
              <th className="border border-gray-400 px-2 py-1 text-black">CNIC</th>
              <th className="border border-gray-400 px-2 py-1 text-black print:hidden">Actions</th>
            </tr>
          </thead>
          <tbody>
            {records?.map((item, index) => (
              <tr key={index} className="bg-white">
                <td className="border border-gray-400 px-2 py-1 text-black text-center">{item?.category}</td>
                <td className="border border-gray-400 px-2 py-1 text-black">{item.district}</td>
                <td className="border border-gray-400 px-2 py-1 text-black">{item.police_station}</td>
                <td className="border border-gray-400 px-2 py-1 text-black">{item.type_of_Narcotics}</td>
                <td className="border border-gray-400 px-2 py-1 text-black">{item.operated_by}</td>
                <td className="border border-gray-400 px-2 py-1 text-black">{item.dens_location}</td>
                <td className="border border-gray-400 px-2 py-1 text-black">{item.cell_number}</td>
                <td className="border border-gray-400 px-2 py-1 text-black">{item.by_police}</td>
                <td className="border border-gray-400 px-2 py-1 text-black">{item.by_political_person}</td>
                <td className="border border-gray-400 px-2 py-1 text-black">{item.by_others}</td>
                <td className="border border-gray-400 px-2 py-1 text-black">{item.status}</td>
                <td className="border border-gray-400 px-2 py-1 text-black">{item.remarks}</td>
                <td className="border border-gray-400 px-2 py-1 text-black">{item.CRMS_No}</td>
                <td className="border border-gray-400 px-2 py-1 text-black">{item.FIR_no}</td>
                <td className="border border-gray-400 px-2 py-1 text-black">{item.FIR_year}</td>
                <td className="border border-gray-400 px-2 py-1 text-black">{item.FIR_PS_name}</td>
                <td className="border border-gray-400 px-2 py-1 text-black">{item.FIR_district}</td>
                <td className="border border-gray-400 px-2 py-1 text-black">{item.CNIC}</td>
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
        <EditRecord
          selectedRecord= {selectedRecord}
          setIsModalOpen={setIsModalOpen}
          setRefetchRecord={setRefetchRecord}
        />
      )}

    </Wrapper>
  )
}

export default UserRecordView
