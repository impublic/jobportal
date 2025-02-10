import React from 'react';
import Latestjobscard from './Latestjobscard';
import { useSelector } from 'react-redux';
import store from '@/redux/store';
const randomjobs= [1,2,3,4,5,6,7,8]
const Latestjobs = () => {
  const{allJobs}=useSelector(store=>store.job)
  return (
    <div className='max-w-7xl mx-auto my-20'>
      <h1 className='text-4xl font-bold'><span className='text-[#6A38c2]'>Latest & Top </span>Job openings</h1>
      <div className='grid grid-cols-3 my-5 gap-4'>
        {
    allJobs.length <=0?<span>No Job Available</span>:allJobs?.slice(0,6).map((job)=><Latestjobscard key ={job._id}job={job}/>)
   }
   </div>
    </div>
  )
}

export default Latestjobs;
