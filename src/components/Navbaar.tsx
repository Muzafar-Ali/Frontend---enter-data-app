"use client"
import React from 'react'
import Wrapper from './Wrapper'
import Image from 'next/image'
import Link from 'next/link'
import useUserStore from '@/store/userStore'

const Navbaar = () => {
  const { role } = useUserStore();

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
        window.location.href = '/';
      }

    } catch (error) {
      console.error('Error:', error);
    }
  }
  
  return (
    <Wrapper className='mt-5 rounded py-5'>
      <div className='flex items-center justify-between px-10'>
        <div className="flex items-center justify-between gap-x-5">
          <h1 className="font-bold text-2xl text-white">Sindh Police</h1>
          <Image
            src={"/Sindh_Police_Logo.png"}
            height={50}
            width={50}
            alt="sind police logo"
          />
        </div>

        <div className='flex items-center gap-10 justify-between'>
          { role === 'admin' && 
            <Link
              href={"/admin/create-user"}
              className="bg-white text-black px-4 py-2 rounded-md cursor-pointer"
            >
              Create User
            </Link>
          }

          { role === 'admin' && 
            <Link
              href={"/record"}
              className="bg-white text-black px-4 py-2 rounded-md cursor-pointer"
            >
              Create Record
            </Link>
          }

          <div>
            <button
              onClick={logoutHandler} 
              className="bg-white text-black px-4 py-2 rounded-md cursor-pointer"
            >
              Logout
            </button>
          </div>

        </div>
        

      </div>
    </Wrapper>
  )
}

export default Navbaar