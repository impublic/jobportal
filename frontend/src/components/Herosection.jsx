import React, { useState } from 'react'
import { Button } from './ui/button'
import { Search } from 'lucide-react'
import { useDispatch } from 'react-redux'
import { useNavigate } from 'react-router-dom'
import { setSearchedQuery } from '@/redux/jobslice'

const Herosection = () => {
  const[query,setQuery]=useState("")
  const dispatch = useDispatch();
  const navigate = useNavigate();
  
  const searchJobHandler = ()=>{
    dispatch(setSearchedQuery(query))
    navigate('/browse')
  }
  return (
    <div className='text-center'>
      <div className='flex  flex-col gap-5 my-10'>
      <span className=' mx-auto px-4 py-2 bg-gray-100 rounded-full text-[#F83002] font-medium'>No 1 job hunt</span>
    <h1 className='text-5xl font-bold'>search,apply & <br/> Get Your <span className='text-[#6A38C2]'> Dream job</span></h1>
    <p>Lorem ipsum dolor sit amet consectetur adipisicing elit. Aliquid aspernatur temporibus nihil tempora dolor!</p>
    <div className='flex w-[40%] shadow-lg rounded-full border border-gray-200 pl-3 gap-5 items-center mx-auto'>
      <input
      type="text"
      placeholder='Find Your Dream Job'
      onChange={(e)=>setQuery(e.target.value)}
      className='w-full outline-none border-none'/>
      <Button onClick={searchJobHandler} className='rounded-r-full bg-[#6A38C2]'>
        <Search className='w-5 h-5'/>
      </Button>
    </div>
    </div>
    </div>
  )
}

export default Herosection
