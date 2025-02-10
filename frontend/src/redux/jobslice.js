import { createSlice } from "@reduxjs/toolkit";
const jobslice = createSlice({
    name:"job",
    initialState:{
        allJobs:[],
        singlejob:null,
        allAdminJobs:[],
        allAppliedJobs:[],
        searchJobByText:"",
        searchedQuery:"",
    },
    reducers:{
         // actions
         setAllJobs:(state,action) => {
            state.allJobs = action.payload;
        },
        setSingleJob:(state,action) => {
            state.singlejob = action.payload;
    },
    setAllAdminJobs:(state,action) => {
        state.allAdminJobs = action.payload;
    },
    setSearchJobByText:(state,action) => {
        state.searchJobByText = action.payload;
    },
    setAllAppliedJobs:(state,action) => {
        state.allAppliedJobs = action.payload;
    },
    setSearchedQuery:(state,action) => {
        state.searchedQuery = action.payload;
    }
}
});
export const{setAllJobs,setSingleJob,setAllAdminJobs,setSearchJobByText,setAllAppliedJobs,setSearchedQuery} = jobslice.actions;
export default jobslice.reducer;