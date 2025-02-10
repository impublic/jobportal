import React, { useState } from 'react'
import Navbar from '../shared/Navbar'
import { Label } from '../ui/label'
import { Input } from '../ui/input'
import { Form, useNavigate } from 'react-router-dom'
import { Button } from '../ui/button'
import { Select, SelectContent, SelectGroup, SelectItem, SelectTrigger, SelectValue } from '../ui/select'
import { useSelector } from 'react-redux'
import axios from 'axios'
import { JOB_API_END_POINT } from '@/utils/consortium'
import { toast } from 'sonner'
import { Loader2 } from 'lucide-react'
const companyArray = [];
const PostJobs = () => {
    const { companies} = useSelector(store => store.company);
    const navigate=useNavigate();
    const[input,setInput]=useState({
        title:"",
        description:"",
        requirements:"",
        salary:"",
        location:"",
        jobType:"",
        experience:"",
        position:0,
        companyId:""
    })
    const[loading,setloading]=useState(false)
    const changeEventHandler = (e) => {
        setInput({ ...input, [e.target.name]: e.target.value });
    };
    const selectChangeHandler = (value) => {
        const selectedCompany = companies.find((company)=> company.name.toLowerCase() === value);
        setInput({...input, companyId:selectedCompany._id});
    };
    const submitHandler = async (e) => {
        e.preventDefault();
        console.log(input)
        try{
            setloading(true)
            const res = await axios.post(`${JOB_API_END_POINT}/post`,input,{
                headers:{
                    'Content-Type':'application/json'
                },
                withCredentials:true
            });
            if(res.data.success){
                console.log(res.data.message)
            toast.success(res.data.message)
            navigate('/admin/jobs')
            }
        }catch(error){
            toast.error(error.response.data.message)
        }finally{
            setloading(false)
        }
    }
  return (
    <div>
     <Navbar/>
     <div className='flex items-center justify-center w-screen my-5'>
        <Form onSubmit = {submitHandler} className=' p-8 max-w-4xl border border-gray-200 shadow-lg rounded-md'>
        
        <div className='grid grid-cols-2 gap-5 '>
        <div>
        <Label>Title</Label>
            <Input
            type="text"
            value={input.title}
            onChange={changeEventHandler}
            name="title"
            className="focus-visible:ring-offset-0 focus-visible:ring-0 my-1"
            />
            </div>

            <div>
                            <Label>Description</Label>
                            <Input
                                type="text"
                                name="description"
                                value={input.description}
                                onChange={changeEventHandler}
                                className="focus-visible:ring-offset-0 focus-visible:ring-0 my-1"
                            />
                        </div>

                        <div>
                            <Label>Requirements</Label>
                            <Input
                                type="text"
                                name="requirements"
                                value={input.requirements}
                                onChange={changeEventHandler}
                                className="focus-visible:ring-offset-0 focus-visible:ring-0 my-1"
                            />
                        </div>

                        <div>
                            <Label>Salary</Label>
                            <Input
                                type="text"
                                name="salary"
                                value={input.salary}
                                onChange={changeEventHandler}
                                className="focus-visible:ring-offset-0 focus-visible:ring-0 my-1"
                            />
                        </div>

                        <div>
                            <Label>Location</Label>
                            <Input
                                type="text"
                                name="location"
                                value={input.location}
                                onChange={changeEventHandler}
                                className="focus-visible:ring-offset-0 focus-visible:ring-0 my-1"
                            />
                        </div>

                        <div>
                            <Label>Job Type</Label>
                            <Input
                                type="text"
                                name="jobType"
                                value={input.jobType}
                                onChange={changeEventHandler}
                                className="focus-visible:ring-offset-0 focus-visible:ring-0 my-1"
                            />
                        </div>

                        <div>
                            <Label>Experience Level</Label>
                            <Input
                                type="text"
                                name="experience"
                                value={input.experience}
                                onChange={changeEventHandler}
                                className="focus-visible:ring-offset-0 focus-visible:ring-0 my-1"
                            />
                        </div>

                        <div>
                            <Label>No of Postion</Label>
                            <Input
                                type="number"
                                name="position"
                                value={input.position}
                                onChange={changeEventHandler}
                                className="focus-visible:ring-offset-0 focus-visible:ring-0 my-1"
                            />
                        </div>
                        </div>
                        {
                            
                                companies.length > 0 && (
                                    <Select onValueChange = {selectChangeHandler}> 
                                        <SelectTrigger className="w-[180px]">
                                            <SelectValue placeholder="Select a Company" />
                                        </SelectTrigger>
                                        <SelectContent>
                                            <SelectGroup>
                                                {
                                                    companies.map((company)=>{
                                                 return (
                                                    <SelectItem value={company?.name?.toLowerCase()}>
                                                        {company?.name}
                                                    </SelectItem>
                                                 )
                                                    })
                                                }
                                            </SelectGroup>
                                        </SelectContent>
                                        </Select>
                            )
                        }
                       
                        {
                        loading ? <Button className="w-full my-4"> <Loader2 className='mr-2 h-4 w-4 animate-spin' /> Please wait </Button> : <Button type="submit" className="w-full my-4">Post New Job</Button>
                    }
                        {
                            companies.length === 0 && <p className='text-xs text-red-600 font-bold text-center my-3'>*Please register a company first, before posting a jobs</p>
                        }
</Form>

     </div>
    </div>
  )
}

export default PostJobs
