import React from 'react'
import { Carousel, CarouselContent, CarouselItem } from './ui/carousel'

import { Button } from './ui/button'
import { useDispatch } from 'react-redux'
import { useNavigate } from 'react-router-dom'
import { setSearchedQuery } from '@/redux/jobslice'

  const category=[
  "Frontend Developer",
  "Backend Developer",
  "Data Science",
  "Graphic Designer",
  "Full Stack Developer"
]
const Categorycaro = () => {
const dispatch= useDispatch();
const navigate = useNavigate();
  const searchJobHandler = (query)=>{
      dispatch(setSearchedQuery(query))
      navigate('/browse')
    }
   return (
    <div>
       <Carousel className="w-full max-w-xl mx-auto my-28">
       <CarouselContent>
        {
        category.map((cat,index)=>(
          <CarouselItem className="md:basis-1/2 lg-basis-1/3">
            <Button onClick={()=>searchJobHandler(cat)} variant="outline" className="rounded-full">{cat}</Button>
          </CarouselItem>
        ))
      }
       </CarouselContent>
       </Carousel>
    </div>
  )
}

export default Categorycaro;
