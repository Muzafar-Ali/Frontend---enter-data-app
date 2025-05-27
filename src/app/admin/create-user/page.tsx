"use client"
import Wrapper from '@/components/Wrapper'
import React, { FormEvent, useState } from 'react'

const CreateUser = () => {
  const [input, setInput] = useState({
    district: "",
    password: "",
  })
  const [loading, setLoading] = useState(false)

  const changeEventHandler = (e: React.ChangeEvent<HTMLInputElement>) => {
    setInput({
      ...input,
      [e.target.name]: e.target.value
    })
  }
  
  const createUserHandler = async(e: FormEvent) => {
    e.preventDefault();
    try {
      setLoading(true)
     
      const res = await fetch('http://localhost:4000/api/users/create', {
        method: "POST",
        body: JSON.stringify(input),
        headers: {
          "Content-Type": "application/json"
        },
        credentials: "include"
      })
      const data = await res.json()
      
      if(!data.success) {
        alert(data.message)
        return
      }

      alert(data.message)
      
    } catch (error) {
      console.log(error)
    } finally {
      setLoading(false)
    }
  } 
  return (
    <Wrapper>
      <div className="flex flex-col items-center justify-center min-h-screen">
        <p className='text-white text-2xl py-5'>Create Users</p>
        <form onSubmit={createUserHandler} className="md:p-8 w-full max-w-md rounded-lg md:border border-gray-200 mx-4 flex flex-col">
          <div className="mb-4">
            <label className='text-white'>User name</label>
            <div className="relative">
              <input
                type="district"
                placeholder="district"
                name="district"
                value={input.district}
                onChange={changeEventHandler}
                className="px-2 border py-2 rounded-md text-white outline-none w-full"
              />
              {/* {errors && <span className="text-base text-red-400">{errors.district}</span>}  */}
            </div>
          </div>
          <div className="mb-4">
            <label className='text-white'>Password</label>
            <div className="relative">
              <input
                type="password"
                placeholder="password"
                name="password"
                value={input.password}
                onChange={changeEventHandler}
                className="px-2 border py-2 rounded-md text-white outline-none w-full"
              />
              {/* {errors && <span className="text-base text-red-400">{errors.password}</span>}  */}
            </div>
          </div>
          { loading ?  
            <button type="submit" className="bg-white text-black px-4 py-2 rounded-md cursor-not-allowed">loading ...</button>
            :
            <button type="submit" className="bg-white text-black px-4 py-2 rounded-md">Create</button>
          }
        </form>
      </div>
    </Wrapper>
  )
}

export default CreateUser