import { createSlice } from "@reduxjs/toolkit";
const assetSlice = createSlice({
    name: "asset",
    initialState: {
        show: {
            assetslist: null,
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
        
        showStart: (state) => {
            state.show.isFetching = true;
        },
        showSuccess: (state, action) => {
            state.show.isFetching = false;
            state.show.assetslist = action.payload;
            state.show.error = false;
        },
        showFailed: (state) => {
            state.show.isFetching = false;
            state.show.error = true;
        },
        createStart: (state) => {
            state.create.isFetching = true;
        },
        createSuccess: (state) => {
            state.create.isFetching = false;
            state.create.error = false;
            state.create.success = true;
        },
        createFailed: (state) => {
            state.create.isFetching = false;
            state.create.error = true;
            state.create.success = false;
        },
        
        editStart:(state)=>{
            state.edit.isFetching = true;
        },
        editSuccess:(state)=>{
            state.edit.isFetching = false;
            state.edit.error = false;
            state.edit.success = true;
        },
        editFailed:(state)=>{
            state.edit.isFetching = false;
            state.edit.error = true;
            state.edit.success = false;
        },
        deleteStart:(state)=>{
            state.delete.isFetching = true;
        },
        deleteSuccess:(state)=>{
            state.delete.isFetching = false;
            state.delete.error = false;
            state.delete.success = true;
        },
        deleteFailed:(state)=>{
            state.delete.isFetching = false;
            state.delete.error = true;
            state.delete.success = false;
        },
    }
})
export const {
    showStart,
    showSuccess,
    showFailed,
    createStart,
    createSuccess,
    createFailed,
    editStart,
    editSuccess,
    editFailed,
    deleteStart,
    deleteSuccess,
    deleteFailed,
} = assetSlice.actions;
export default assetSlice.reducer;