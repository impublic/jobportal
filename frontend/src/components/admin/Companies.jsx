import React, { useState } from 'react';
import Navbar from '../shared/Navbar';
import { Button } from '../ui/button';
import CompaniesTable from './CompaniesTable';
import { useNavigate } from 'react-router-dom';
import useGetAllCompanies from '@/Hooks/useGetAllCompanies';
import { useDispatch } from 'react-redux';
import { useEffect } from 'react';
import { setSearchCompanyByText } from '@/redux/companySlices';

const Companies = () => {
  useGetAllCompanies()
  const[input,setinput]=useState('')
  const dispatch = useDispatch()
  const navigate= useNavigate();
  useEffect(()=>{
    dispatch(setSearchCompanyByText(input))
  },[input])
  return (
    <div>
     <Navbar/>
     <div className='max-w-6xl mx-auto my-10'>

      <div className='flex items-center justify-between'>
      <input
      className='w-fit'
      placeholder='Filter By Name'
      onChange={(e)=>setinput(e.target.value)}/>
      <Button  onClick={()=>navigate("/admin/companies/create")}>New company</Button>
      </div>
<CompaniesTable/>
     </div>
    </div>
  );
}

export default Companies;
