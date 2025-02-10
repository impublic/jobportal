import React,{useState} from 'react';
import { Dialog, DialogContent, DialogFooter, DialogHeader, DialogTitle } from './ui/dialog';
import { Label } from './ui/label';
import { Button } from './ui/button';
import { Loader, Loader2 } from 'lucide-react';
import { useDispatch, useSelector } from 'react-redux';
import store from '@/redux/store';
import { USER_API_Endpoint } from '@/utils/consortium';
import axios from 'axios';
import { setUser } from '@/redux/authSlice';
import { toast } from 'sonner';

const UpdateProfileDialog = ({open,setopen}) => {
  const [loading, setLoading] = useState(false);

  const{user}=useSelector(store=>store.auth);
  const[input,setinput]=useState({
    fullname:user?.fullname,
    email:user?.email,
    phonenumber:user?.phonenumber,
    bio:user?.profile?.bio,
    skills:user?.skills?.map(skill=>skill),
    file:user?.profile?.resume
  })
  const changeEventHandle = (e)=>{
setinput({...input,[e.target.name]:e.target.value});
  }
  const dispatch= useDispatch()
  const fileChangeHandler = (e) => {
    const file = e.target.files?.[0];
    setinput({...input,file})
  }
   const submitHandler = async (e)=>{
    e.preventDefault();
    const formData = new FormData();
    formData.append("fullname", input.fullname);
    formData.append("email", input.email);
    formData.append("phonenumber", input.phonenumber);
    formData.append("bio", input.bio);
    formData.append("skills", input.skills);
    if (input.file) {
        formData.append("file", input.file);
    }
    try{
      const res = await axios.post(`${USER_API_Endpoint}/profile/update`,formData,{
        headers: {
          'Content-Type': 'multipart/form-data'
      },
      withCredentials: true
      });

      if (res.data.success) {
        dispatch(setUser(res.data.user))
        toast.success(res.data.message)
      }
    }catch(error){
console.log(error)
toast.error(error.response.data.message);
    }
    setopen(false)
    console.log(input)
   }
  return (
    <div>
      <Dialog open={open}>
        <DialogContent className="sm:max-w-[425px]" onInteractOutside={() => setopen(false)}>
                    <DialogHeader>
                        <DialogTitle>Update Profile</DialogTitle>
           
                <DialogTitle>UpdateTitle</DialogTitle>
            </DialogHeader>
            <form onSubmit={submitHandler}>
                <div className='grid gap-4 py-4 '>
                  <div className='grid grid-cols-4 items-center gap-4'>
                  <Label htmlFor="name" className="text-right">Name</Label>
                  <input
                  id="name"
                  type="text"
                  name="name"
                  value={input.fullname}
                  onChange={changeEventHandle}
                  className='col-span-3'/>
                </div>
                

                <div className='grid grid-cols-4 items-center gap-4'>
                  <Label htmlFor="email" className="text-right">Email</Label>
                  <input
                  id="email"
                  name="email"
                  type="email"
                  value={input.email}
                  onChange={changeEventHandle}
                  className='col-span-3'/>
                </div>
                <div className='grid grid-cols-4 items-center gap-4'>
                  <Label htmlFor="name" className="text-right">Number</Label>
                  <input
                  id="number"
                  name="number"
                  type="number"
                  value={input.phonenumber}
                  onChange={changeEventHandle}
                  className='col-span-3'/>
                </div>
                <div className='grid grid-cols-4 items-center gap-4'>
                  <Label htmlFor="email" className="text-right">Bio</Label>
                  <input
                  id="bio"
                  name="bio"
                  value={input.bio}
                  onChange={changeEventHandle}
                  className='col-span-3'/>
                </div>
                <div className='grid grid-cols-4 items-center gap-4'>
                  <Label htmlFor="email" className="text-right">skills</Label>
                  <input
                  id="skills"
                  name="skills"
                  onChange={changeEventHandle}
                  value={input.skills}
                  className='col-span-3'/>
                </div>

                <div className='grid grid-cols-4 items-center gap-4'>
                  <Label htmlFor="file" className="text-right">Resume</Label>
                  <input
                  id="file"
                  name="file"
                  type="file"
                  accept='application/pdf'
                  onChange={fileChangeHandler}
                  className='col-span-3'/>
                </div>
                </div>
<DialogFooter>
{
  loading ?<Button className='w-full my-4'><Loader className=' w-4 h-4 mr-2 animate-spin'/>please wait </Button>:<Button type="submit" className='w-full my-4'>update</Button>
}
</DialogFooter>
            </form>
        </DialogContent>
      </Dialog>
    </div>
  );
}

export default UpdateProfileDialog;
