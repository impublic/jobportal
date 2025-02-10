import React from 'react';
import { Table, TableBody, TableCaption, TableCell, TableHead, TableHeader, TableRow } from './ui/table';

import { useSelector } from 'react-redux';
import { Badge } from './ui/badge';


const AppliedJobTable = () => {
  const{allAppliedJobs}= useSelector(store=>store.job)
  return (
    <div>
      <Table>
        <TableCaption>A List Of Your applied Jobs</TableCaption>
        <TableHeader>
            <TableRow>
                <TableHead>Date</TableHead>
                <TableHead>Job Role</TableHead>
                <TableHead>Company</TableHead>
                <TableHead className="text-right"><Badge>Status</Badge></TableHead>
                </TableRow>
                </TableHeader>
                <TableBody>
                    {
                        allAppliedJobs.length<=0 ?<span>You haven't applied any Job yet</span>:allAppliedJobs.map((appliedjob,index)=>(
<TableRow key={appliedjob?._id}>
                      <TableCell>{appliedjob?.createdAt?.split("T")[0]}</TableCell>
                <TableCell>{appliedjob?.job?.title}</TableCell>
                <TableCell>{appliedjob?.job?.company?.name}</TableCell>
                <TableCell className='text-right'>
                <Badge className={`${appliedjob?.status === "rejected" ? 'bg-red-600' :
                   appliedjob.status === 'pending' ? 'bg-gray-400' : 
                   'bg-green-400'}`}>{appliedjob.status.toUpperCase()}</Badge></TableCell>
                  
</TableRow>
                        ))
                    }
                    </TableBody>
           
        
      </Table>
    </div>
  );
}

export default AppliedJobTable;
