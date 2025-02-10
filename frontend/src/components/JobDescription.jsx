import React, { useEffect } from 'react';
import { Button } from './ui/button';
import { Badge } from './ui/badge';
import { useParams } from 'react-router-dom';
import { APPLICATION_API_END_POINT, JOB_API_END_POINT } from '@/utils/consortium';
import axios from 'axios';
import { setSingleJob } from '@/redux/jobslice';
import { useDispatch, useSelector } from 'react-redux';
import store from '@/redux/store';
import { toast } from 'sonner';
import { useState } from 'react';

const JobDescription = () => {
  //  const isApplied = true;
  const{singlejob}=useSelector(store=>store.job)
  const{user}= useSelector(store=>store.auth)
  const isInitiallyApplied = singlejob?.applications?.some(application=>application.applicant === user?._id) || false;
  const[isApplied,setisApplied]=useState(isInitiallyApplied)
  const params= useParams();
  const jobId= params.id;
 const dispatch = useDispatch();

 const applyjobHandler = async()=>{
  try{
const res = await axios.get(`${APPLICATION_API_END_POINT}/apply/${jobId}`,{withCredentials:true})
if(res.data.success){
  setisApplied(true) //update the local state
  const UpdateSinglejob={...singlejob,applications:[...singlejob.applications,{applicant:user?._id}]}
  dispatch(setSingleJob(UpdateSinglejob))
  setisApplied(res.data.job.applications.some(application=>application.applicant === user?._id))//update the local state
  toast.success(res.data.message)
}
  }catch(error){
  console.log(error);
  toast.error(error.response.data.message)
 }
}
  useEffect(()=>{
    const fetchSingleJobs = async()=>{
try{
const res = await axios.get(`${JOB_API_END_POINT}/get/${jobId}`,{withCredentials:true});
if(res.data.success){
  dispatch(setSingleJob(res.data.job));
}

}catch(error){
  console.log(error)
}
    };
    fetchSingleJobs();
  },[jobId,dispatch,user?._id]);
  return (
    <div className='max-w-7xl mx-auto my-10'>
      <div className='flex items-center justify-between'>
        <div>
      <h1 className='font-bold text-2xl'>{singlejob?.title}</h1>
      
      
      <div className='flex items-center gap-2 mt-4'>
                <Badge className={'text-blue-700 font-bold'} variant="ghost">{singlejob?.position}Positions</Badge>
                <Badge className={'text-[#F83002] font-bold'} variant="ghost">{singlejob?.jobType}</Badge>
                <Badge className={'text-[#7209b7] font-bold'} variant="ghost">{singlejob?.salary} LPA</Badge>
            </div>
      </div>

      
        <Button 
        onClick={isApplied ? null : applyjobHandler}
        disabled={isApplied}
         className={`rounded-lg ${isApplied?'bg-gray-600 cursor-not-allowed':'bg-[#5f178f] hover:bg-[#5f32ad]'}`}>
          {isApplied?'Already applied':'Apply Now'}</Button>
      </div>
      <h1 className='border-b-2 border-b-gray-300 font-medium py-4'>Job Description</h1>
<div className='my-4'>
  <h1 className='font-bold my-1'>Role:<span className='pl-4 font-normal text-gray-800'>{singlejob?.title}</span></h1>
  <h1 className='font-bold my-1'>Location:<span className='pl-4 font-normal text-gray-800'>{singlejob?.location}</span></h1>
  <h1 className='font-bold my-1'>Description:<span className='pl-4 font-normal text-gray-800'>{singlejob?.description}</span></h1>
  <h1 className='font-bold my-1'>Experience:<span className='pl-4 font-normal text-gray-800'>{singlejob?.experienceLevel}</span></h1>
  <h1 className='font-bold my-1'>salary:<span className='pl-4 font-normal text-gray-800'>{singlejob?.salary}LPA</span></h1>
  <h1 className='font-bold my-1'>Total Applicants: <span className='pl-4 font-normal text-gray-800'>{singlejob?.applications?.length}</span></h1>
  <h1 className='font-bold my-1'>posted Date:<span className='pl-4 font-normal text-gray-800'>{singlejob?.createdAt.split("T")[0]}</span></h1>
</div>
    </div>
    
  );
}

export default JobDescription;
