
import React, { useEffect, useState } from 'react'
import { Table, TableCaption, TableBody,  TableCell, TableHead,TableHeader, TableRow } from '../ui/table'
import { Badge } from '../ui/badge'
import { Avatar, AvatarImage } from '../ui/avatar'
import { Popover, PopoverContent, PopoverTrigger } from '../ui/popover'
import { Edit2, MoreHorizontal } from 'lucide-react'
import { useSelector } from 'react-redux'
import { useNavigate } from 'react-router-dom'

const CompaniesTable = () => {
  const { companies,searchCompanyByText} = useSelector(store => store.company);
  const[filtercompany,setFilterCompany]=useState(companies)
  const navigate= useNavigate()
    useEffect(()=>{
const filteredCompany = companies.length>=0 && companies.filter((company)=>{
  if(!searchCompanyByText){
    return true
  };
return company?.name?.toLowerCase().includes(searchCompanyByText.toLowerCase());
});
setFilterCompany(filteredCompany);
},[companies,searchCompanyByText])
  return (
    <div>
      <Table>
        <TableCaption>A List Of your recent Registered companies</TableCaption>
        <TableHeader>
            <TableRow>
                <TableHead>Logo</TableHead>
                <TableHead>Name</TableHead>
                <TableHead>Date</TableHead>
                <TableHead className='text-right'>Action</TableHead>
                <TableHead className="text-right"><Badge>Status</Badge></TableHead>
                </TableRow>
                </TableHeader>
                <TableBody>
                  {
                   filtercompany?.map((company)=>(
                  <tr>
                  <TableCell>
                    <Avatar>
                <AvatarImage  src={company.logo} alt="profile" />
                </Avatar>
                </TableCell>
                <TableCell>{company.name}</TableCell>
                <TableCell>{company.createdAt.split("T")[0]}</TableCell>
                <TableCell className='text-right'>
                <Popover>
                                        <PopoverTrigger><MoreHorizontal /></PopoverTrigger>
                                        <PopoverContent className="w-32">
                                            <div onClick={()=> navigate(`/admin/companies/${company._id}`)} className='flex items-center gap-2 w-fit'>
                                                <Edit2 className='w-4' />
                                                <span>Edit</span>
                                            </div>
                                        </PopoverContent>
                                    </Popover>
                                
                </TableCell>
                </tr>
                    ))
                  }

                    </TableBody>
                    </Table>
                    </div>
  )
}

export default CompaniesTable
