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
          { user.role === 'admin' && 
            <Link
              href={"/admin/create-user"}
              className="bg-white text-black px-4 py-2 rounded-md cursor-pointer"
            >
              Create User
            </Link>
          }
          
          { (user.role === 'user' || user.role === 'admin') && 
            <div>
              <Link
                href={`/record`}
                className="bg-white text-black px-4 py-3 rounded-md cursor-pointer"
              >
                Enter Records
              </Link>
            </div>
          }
    
          { user.role === 'user' &&
            <div>
              <Link
                href={`/record/${user.id}`}
                className="bg-white text-black px-4 py-3 rounded-md cursor-pointer"
              >
                View Records
              </Link>
            </div>
          }

          { user.role === 'admin' &&
            <div>
              <Link
                href={`/record/district`}
                className="bg-white text-black px-4 py-3 rounded-md cursor-pointer"
              >
                View Records by District
              </Link>
            </div>
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

export default Navbar