
import { setCompanies } from '@/redux/companySlices'
import { COMPANY_API_END_POINT } from '@/utils/consortium'

import axios from 'axios'
import { useEffect } from 'react'
import { useDispatch } from 'react-redux'

const useGetAllCompanies = (companyId) => {
    const dispatch = useDispatch();
    useEffect(()=>{
        const fetchcompanies = async () => {
            try {
                const res = await axios.get(`${COMPANY_API_END_POINT}/get`,{withCredentials:true});
                console.log(res.data.companies);
                if(res.data.success){
                    dispatch(setCompanies(res.data.companies));
                }
            } catch (error) {
                console.log(error);
            }
        }
        fetchcompanies();
    },[])
}

export default useGetAllCompanies