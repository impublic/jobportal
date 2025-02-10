
import { setAllAdminJobs } from '@/redux/jobslice';
import {JOB_API_END_POINT} from '@/utils/consortium';

import axios from 'axios';
import React, { useEffect } from 'react';
import { useDispatch } from 'react-redux';

const useGetAdminJobs = () => {
    const dispatch= useDispatch();
    useEffect(()=>{
      const fetchAllAdminJobs = async ()=>{
  try{
    const res = await axios.get(`${JOB_API_END_POINT}/getadminjobs`,{withCredentials:true});
  console.log(res)
  if(res.data.success){
    dispatch(setAllAdminJobs(res.data.jobs));
  }
  
  }catch(error){
    console.log(error)
  }
      }
      fetchAllAdminJobs();
    },[])
  
    return (
      <div>
        
      </div>
    );
  }

export default useGetAdminJobs;


