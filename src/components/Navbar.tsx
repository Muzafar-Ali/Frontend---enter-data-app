"use client"
import React from 'react'
import Wrapper from './Wrapper'
import Image from 'next/image'
import Link from 'next/link'
import useUserStore from '@/store/userStore'

const Navbar = () => {
  const { user } = useUserStore();

  const logoutHandler = async () => {
    try {
      const response = await fetch('http://localhost:4000/api/users/logout', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        credentials: 'include',
      });
      const data = await response.json();
      
      if(data.success) {
        localStorage.removeItem("district");
        localStorage.removeItem("user-storage");
        window.location.href = '/';
      }

    } catch (error) {
      console.error('Error:', error);
    }
  }

  
  return (
    <Wrapper className='mt-5 rounded py-5 border-b border-gray-600 shadow-xl'>
      <div className='flex items-center justify-between px-2'>
        <div className="flex items-center justify-between gap-x-2">
          <Image
            src={"/Sindh_Police_Logo.png"}
            height={70}
            width={70}
            alt="sind police logo"
          />
          <h1 className="font-bold text-2xl md:text-4xl text-white">Sindh Police</h1>
        </div>

        <div className='flex items-center gap-x-5 justify-between no-print'>
          { user.role === 'admin' && 
            <Link
              href={"/admin/create-user"}
              className="bg-blue-700 hover:bg-blue-600 text-white px-4 py-3 rounded-md cursor-pointer"
            >
              Create User
            </Link>
          }
          
          { (user.role === 'user' || user.role === 'admin') && 
            <div className='no-print'>
              <Link
                href={`/enter-record`}
                className="bg-blue-700 hover:bg-blue-600 text-white px-4 py-3 rounded-md cursor-pointer"
              >
                Enter Records
              </Link>
            </div>
          }
    
          { user.role === 'user' &&
            <div className='no-print'>
              <Link
                href={`/view-record/${user.id}`}
                className="bg-blue-700 hover:bg-blue-600 text-white px-4 py-3 rounded-md cursor-pointer"
              >
                View Records
              </Link>
            </div>
          }

          { user.role === 'admin' &&
            <div className='no-print'>
              <Link
                href={`/view-record/district`}
                className="bg-blue-700 hover:bg-blue-600 text-white px-4 py-3 rounded-md cursor-pointer"
              >
                View Records by District
              </Link>
            </div>
          }

          { user.role === 'admin' &&
            <div className='no-print'>
              <Link
                href={`/view-record/all`}
                className="bg-blue-700 hover:bg-blue-600 text-white px-4 py-3 rounded-md cursor-pointer"
              >
                View All Records
              </Link>
            </div>
          }

          <div className='no-print'>
            <button
              onClick={logoutHandler} 
              className="bg-blue-700 hover:bg-blue-600 text-white px-4 py-2 rounded-md cursor-pointer"
            >
              Logout
            </button>
          </div>

        </div>
        

      </div>
    </Wrapper>
  )
}

export default Navbar