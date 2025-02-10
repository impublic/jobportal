import { createSlice } from "@reduxjs/toolkit";

const companySlices = createSlice({
    name:"company",
    initialState:{
        singleCompany:null,
        companies:[],
        searchCompanyByText:"",
       
    },
    reducers:{
        // actions
        setSingleCompany:(state,action) => {
            state.singleCompany = action.payload;
        },
        setCompanies:(state,action) => {
            state.companies = action.payload;
        },
        setSearchCompanyByText:(state,action) => {
            state.searchCompanyByText = action.payload;
        }
        
    }
});
export const {setSingleCompany,setCompanies,setSearchCompanyByText} = companySlices.actions;
export default companySlices.reducer;