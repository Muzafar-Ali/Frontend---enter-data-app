"use client"
import Edit from '@/components/Edit'
import Wrapper from '@/components/Wrapper'
import { useEffect, useRef, useState } from 'react'

export interface IRecord {
  _id: string,
  category: string,
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
  const [records, setRecords] = useState<IRecord[]>([])
  const [selectedRecord, setSelectedRecord] = useState<IRecord | null>(null)
  const [isModalOpen, setIsModalOpen] = useState(false)
  const printRef = useRef<HTMLDivElement>(null)
  const district = localStorage.getItem('district')
  const [reFetchRecord, setRefetchRecord] = useState(false);

  useEffect(() => {
    const viewRecords = async () => {
      const response = await fetch('http://localhost:4000/api/records', {
        method: 'GET',
        headers: { 'Content-Type': 'application/json' },
        credentials: 'include',
      });
      const data = await response.json();
      setRecords(data.data);
    }
    viewRecords();
  }, [reFetchRecord])

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



  return (
    <Wrapper>
      <div className="flex justify-between items-center mb-4">
        <h2 className='text-xl font-bold text-white'>Records Entered by {district} District</h2>
        <button 
          onClick={handlePrint}
          className="bg-blue-700 hover:bg-blue-600 text-white px-4 py-2 rounded no-print"
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
            {records?.map((item, index) => (
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
