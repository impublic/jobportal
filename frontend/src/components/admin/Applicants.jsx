import React, { useEffect } from 'react'
import Navbar from '../shared/Navbar'
import ApplicantsTable from './ApplicantsTable'
import axios from 'axios'
import { APPLICATION_API_END_POINT } from '@/utils/consortium'
import { useNavigate, useParams } from 'react-router-dom'
import { useDispatch, useSelector } from 'react-redux'
import { setAllApplicants } from '@/redux/applicationSlice'

const Applicants =() => {
  const params = useParams();
  const navigate = useNavigate();
  const dispatch= useDispatch();
  
const {applicants} = useSelector(store=>store.application);
console.log("Application are",applicants)
  useEffect(()=>{
const fetchallApplicants = async()=>{
try{
const res = await axios.get(`${APPLICATION_API_END_POINT}/${params.id}/applicants`,{ withCredentials: true });
console.log("Api response",res.data)
dispatch(setAllApplicants(res.data.job));

}catch(error){
  console.log(error)
}
}
fetchallApplicants();
  },[])
  console.log("Applicants State:", applicants);
  return (
    <div>
      <Navbar/>
      <div className='max-w-7xl mx-auto'>
        
      <h1 className='font-bold text-xl my-5'>Applicants {applicants?.applications?.length}</h1>
<ApplicantsTable/>
      </div>
    </div>
  )
}

export default Applicants
