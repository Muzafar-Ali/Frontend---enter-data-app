"use client"
import Wrapper from "@/components/Wrapper";
import { UserLoginInput, userLoginSchema } from "@/schema/user.schema";
import Image from "next/image";
import { FormEvent, useState } from "react";
import { FaLock, FaUser } from "react-icons/fa";
import { z } from "zod";
import { useRouter } from 'next/navigation';
import useUserStore from "@/store/userStore";

export default function Home() {
  const { setUser } = useUserStore();
  const router = useRouter();

  const [input, setInput] = useState<UserLoginInput>({
    district: "",
    password: "",
  })
  const [errors, setErrors] = useState<Partial<UserLoginInput>>();
  const [apiError, setApiError] = useState<string | null>(null);
  const [loading, setLoading] = useState(false)

  const changeEventHandler = (e: React.ChangeEvent<HTMLInputElement>) => {
    setInput((prev) => ({ 
      ...prev, 
      [e.target.name]: e.target.value 
    }));
  };

  const loginSubmitHandler = async(e: FormEvent) => {
    e.preventDefault();
    try {
      setLoading(true)
      setErrors(undefined)
      
      const result = userLoginSchema.safeParse(input);
      
      if(!result.success) {
        setErrors(result.error.flatten().fieldErrors as Partial<UserLoginInput>);
        setLoading(false);
        return;
      }

      const response = await fetch('http://localhost:4000/api/users/login', {
        method: 'POST',
        body: JSON.stringify(input),
        headers: {
          'Content-Type': 'application/json'
        },
        credentials: 'include'
      });

      const data = await response.json();
      
      if(!data.success) {
        setApiError(data.message);
        setLoading(false);
        return;
      }

      setUser(data.user);
      localStorage.setItem('district', input.district)
      router.push('/enter-record');
      
      setLoading(false);
    } catch (error: any) {
      
      setLoading(false);
      
      if (error instanceof z.ZodError) {
        setErrors(error.flatten().fieldErrors as Partial<UserLoginInput>);
      }
    }
  }

  return (
    <Wrapper>
      <div className="flex items-center justify-center min-h-screen">
        <form onSubmit={loginSubmitHandler} className="md:p-8 w-full max-w-md rounded-lg md:border border-gray-200 mx-4 flex flex-col">
          <div className="mb-4 flex items-center justify-between">
            <h1 className="font-bold text-2xl text-white">User Login</h1>
            <Image 
              src={"/Sindh_Police_Logo.png"}
              height={50}
              width={50} 
              alt="sind police logo"
            />
          </div>
          <h1>{ apiError && <span className="text-base text-red-400">{apiError}</span>}</h1>
          <div className="mb-4">
            <div className="relative">
              <input
                type="text"
                placeholder="district"
                name="district"
                value={input.district}
                onChange={changeEventHandler}
                className="pl-10 border py-2 rounded-md text-white outline-none w-full"
              />
              <FaUser className="absolute inset-y-3 left-2 text-white pointer-events-none" />
              {errors && (
                <span className="text-base text-red-400">{errors.district}</span>
              )} 
            </div>
          </div>

          <div className="mb-4">
            <div className="relative">
              <input
                type="password"
                placeholder="password"
                name="password"
                value={input.password}
                onChange={changeEventHandler}
                className="pl-10 border py-2 rounded-md text-white outline-none w-full"
              />
              <FaLock className="absolute inset-y-3 left-2 text-white pointer-events-none" />
              {errors && (
                <span className="text-base text-red-400">{errors.password}</span>
              )} 
            </div>
          </div>
          { loading ?  
            <button type="submit" className="bg-white text-black px-4 py-2 rounded-md cursor-not-allowed">loading ...</button>
            :
            <button type="submit" className="bg-white text-black px-4 py-2 rounded-md">Login</button>
          }
        </form>
      </div>
    </Wrapper>
  );
}
