import React, { useEffect } from 'react';
import { NavLink, useNavigate } from 'react-router-dom';
import Navbar from './shared/Navbar';
import Herosection from './Herosection';
import Categorycaro from './Categorycaro';
import Latestjobs from './Latestjobs';
import Footer from './Footer';
import useGetAllJobs from '@/Hooks/useGetAllJobs';
import { useSelector } from 'react-redux';

const Home = () => {
  useGetAllJobs()
  const{user}=useSelector(store=>store.auth)
  const navigate = useNavigate();
  useEffect(()=>{
    if(user?.role ==='recruiter'){
      navigate("/admin/companies");
    }
  },[])
  
  return (
    <div>
      <Navbar/>
      <Herosection/>
      <Categorycaro/>
      <Latestjobs/>
      <Footer/>
    </div>
  );
}

export default Home;
