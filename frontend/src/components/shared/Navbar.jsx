import React from 'react'
// import { Popover, PopoverContent, PopoverTrigger } from '../ui/popover'
import { Popover,PopoverTrigger, PopoverContent } from "@/components/ui/popover"
import { Avatar, AvatarImage } from '../ui/avatar'
import { Button } from "@/components/ui/button"
import { LogOut, User2 } from 'lucide-react'
import { Link, useNavigate } from 'react-router-dom'
import { useDispatch, useSelector } from 'react-redux'
import store from '@/redux/store'
import { setUser } from '@/redux/authSlice'
import { USER_API_Endpoint } from '@/utils/consortium'
import axios from 'axios'
import { toast } from 'sonner'
import Profile from '../Profile'
const Navbar = () => {
  // const user = false
  const{user}= useSelector(store=>store.auth)
  const dispatch = useDispatch();
    const navigate = useNavigate();
  const logoutHandler = async () => {
    try {
        const res = await axios.get(`${USER_API_Endpoint}/logout`, { withCredentials: true });
        if (res.data.success) {
            dispatch(setUser(null));
            navigate("/");
            toast.success(res.data.message);
        }
    } catch (error) {
        console.log(error);
        toast.error(error.response.data.message);
    }
}
  return (
    <div className='bg-white'>
      <div className='flex  justify-between items-center mx-auto max-w-7xl h-16'>
      <div>
        <h1 className='text-2xl font-bold'>job <span className='text-[#F83002]'>portal</span></h1>
      </div>
      <div className='flex items-center gap-12'>
        <ul className='flex items-center font-medium gap-5'>
          {
           user && user.role === 'recruiter' ? (
            <>
             <li><Link to ="/admin/companies">companies</Link></li>
             <li><Link to="/admin/jobs">Jobs</Link></li>
             </>
            ):(
              <>
            <li><Link to ="/">Home</Link></li>
            <li><Link to="/jobs">Jobs</Link></li>
            <li><Link to="/browse">Browse</Link></li>
            </>
            )
          }
          
</ul>
         
        {
  !user ? (
    <div className=' flex items-center gap-2'>
      <Link to ="/login"><Button variant="outline">Login</Button></Link>
      <Link to ="/signup"><Button className='bg-[#6A38c2]hover:bg-[#5b30a6]'>Signup</Button></Link>
    </div>
  ) : (
    <Popover>
      <PopoverTrigger asChild>
        <Avatar className="cursor-pointer">
          <AvatarImage src={user?.profile?.profilephoto} />
        </Avatar>
      </PopoverTrigger>
      <PopoverContent className='w-80'>
       
        <div className='flex gap-4 space-y-2'>
          <Avatar className="cursor-pointer">
            <AvatarImage src={user?.profile?.profilephoto}/>
          </Avatar>
          <div>
            <h4 className='font-medium'>{user?.fullname}</h4>
            <p className='text-sm text-muted-foreground'>{user?.bio}</p>
          </div>
        </div>
        <div className='flex flex-col my-2  text-gray-600'>
          {
          user && user.role === 'student' && (
          <div className='flex w-fit items-center gap-2 cursor-pointer'>
          <User2 />
          <Button variant="link"><Link to ="profile">view Profile</Link></Button>
        </div>
        )
        }
        <div className='flex w-fit items-center gap-2 cursor-pointer'>
          <LogOut />
          <Button onClick={logoutHandler} variant="link">Logout</Button>
        </div>
        </div>
      </PopoverContent>
    </Popover>
  )
}
</div>
</div>
</div>
  )
}
export default Navbar;