import React, { useState } from 'react';
import Navbar from '../shared/Navbar';
import { Button } from '../ui/button';

import { useNavigate } from 'react-router-dom';

import { useDispatch } from 'react-redux';
import { useEffect } from 'react';
import { setSearchCompanyByText } from '@/redux/companySlices';

import useGetAdminJobs from '@/Hooks/useGetAdminJobs';
import AdminJobTable from './AdminJobTable';
import { setSearchJobByText } from '@/redux/jobslice';
const Adminjobs = () => {
  useGetAdminJobs();
  const[input,setinput]=useState('')
  const dispatch = useDispatch()
  const navigate= useNavigate();
  useEffect(()=>{
    dispatch(setSearchJobByText(input))
  },[input])
  return (
    <div>
     <Navbar/>
     <div className='max-w-6xl mx-auto my-10'>

      <div className='flex items-center justify-between'>
      <input
      className='w-fit'
      placeholder='Filter By Name,Role'
      onChange={(e)=>setinput(e.target.value)}/>
      <Button  onClick={()=>navigate("/admin/jobs/create")}>New jobs</Button>
      </div>
<AdminJobTable/>
     </div>
    </div>
  );
}


export default Adminjobs
