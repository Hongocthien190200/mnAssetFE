import { createSlice } from "@reduxjs/toolkit";
const locationSlice = createSlice({
    name: "location",
    initialState: {
        show: {
            locationlist: null,
            isFetching: false,
            error: false
        },
        create: {
            isFetching: false,
            error: false,
            success: false
        },
        edit:{
            isFetching:false,
            error:false,
            success:false
        },
        delete:{
            isFetching:false,
            error:false,
            success:false
        }
    },
    reducers: {
        
        showLocationStart: (state) => {
            state.show.isFetching = true;
        },
        showLocationSuccess: (state, action) => {
            state.show.isFetching = false;
            state.show.locationlist = action.payload;
            state.show.error = false;
        },
        showLocationFailed: (state) => {
            state.show.isFetching = false;
            state.show.error = true;
        },
        createLocationStart: (state) => {
            state.create.isFetching = true;
        },
        createLocationSuccess: (state) => {
            state.create.isFetching = false;
            state.create.error = false;
            state.create.success = true;
        },
        createLocationFailed: (state) => {
            state.create.isFetching = false;
            state.create.error = true;
            state.create.success = false;
        },
        
        editLocationStart:(state)=>{
            state.edit.isFetching = true;
        },
        editLocationSuccess:(state)=>{
            state.edit.isFetching = false;
            state.edit.error = false;
            state.edit.success = true;
        },
        editLocationFailed:(state)=>{
            state.edit.isFetching = false;
            state.edit.error = true;
            state.edit.success = false;
        },
        deleteLocationStart:(state)=>{
            state.delete.isFetching = true;
        },
        deleteLocationSuccess:(state)=>{
            state.delete.isFetching = false;
            state.delete.error = false;
            state.delete.success = true;
        },
        deleteLocationFailed:(state)=>{
            state.delete.isFetching = false;
            state.delete.error = true;
            state.delete.success = false;
        },
    }
})
export const {
    showLocationStart,
    showLocationSuccess,
    showLocationFailed,
    createLocationStart,
    createLocationSuccess,
    createLocationFailed,
    editLocationStart,
    editLocationSuccess,
    editLocationFailed,
    deleteLocationStart,
    deleteLocationSuccess,
    deleteLocationFailed,
} = locationSlice.actions;
export default locationSlice.reducer;