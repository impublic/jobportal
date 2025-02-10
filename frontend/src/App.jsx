import React from 'react'
import Navbar from './components/shared/Navbar'
import { createBrowserRouter, RouterProvider } from 'react-router-dom'
import Home from './components/Home'
import Login from './components/auth/Login'
import Signup from './components/auth/Signup'
import Jobs from './components/Jobs'
import Browse from './components/Browse'
import Profile from './components/Profile'
import JobDescription from './components/JobDescription'
import Companies from './components/admin/Companies'
import CompanyCreate from './components/admin/CompanyCreate'
import Companysetup from './components/admin/Companysetup'
import Adminjobs from './components/admin/Adminjobs'
import PostJobs from './components/admin/PostJobs'
import Applicants from './components/admin/Applicants'
import protectedRoute from './components/admin/protectedRoute'

const appRouter = createBrowserRouter([
  {
    path: '/',
    element: <Home/>
  },
  {
    path: '/login',
    element: <Login />
  },
  {
    path: '/signup',
    element: <Signup/>
  },
  {
  path:'/jobs',
  element:<Jobs/>
  },
  {
  path:'/description/:id',
  element:<JobDescription/>
  },
  {
    path:'/browse',
    element:<Browse/>
    },
    {
      path:'/profile',
      element:<Profile/>
      },
      // Admin ka liya
      {
        path:'/admin/companies',
        element: <protectedRoute> <Companies/></protectedRoute> 
        },
      {
        path:'/admin/companies/create',
        element:<CompanyCreate/> 
      },
      {
        path:'/admin/companies/:id',
        element:<Companysetup/>
      },
      {
        path:'/admin/jobs',
        element:<Adminjobs/>
      },
      {
        path:'/admin/jobs/create',
        element:<PostJobs/>
      },
      {
        path:'/admin/jobs/:id/applicants',
        element:<Applicants/>
      }
  ])
const App = () => {
  return (
    <div>
      <RouterProvider router = {appRouter}/>
    </div>
  )
}

export default App
