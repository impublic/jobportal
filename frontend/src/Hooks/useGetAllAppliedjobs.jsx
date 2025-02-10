import { setAllAppliedJobs } from '@/redux/jobslice';
import { APPLICATION_API_END_POINT } from '@/utils/consortium';
import axios from 'axios';
import React, { useEffect } from 'react';
import { useDispatch } from 'react-redux';

const useGetAllAppliedjobs = () => {
    const dispatch=useDispatch();
    useEffect(()=>{
        const fetchAppliedJobs = async()=>{
            try{
                const res = await axios.get(`${APPLICATION_API_END_POINT}/get`,{withCredentials:true});
                console.log( "Applicant are" ,res.data)
                if(res.data.success){
                    dispatch(setAllAppliedJobs(res.data.application))
                }
            }catch(error){
                console.log(error)
            }
        }
        fetchAppliedJobs();
    },[])
  return (
    <div>
      
    </div>
  );
}

export default useGetAllAppliedjobs;
