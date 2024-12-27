import { createSlice } from "@reduxjs/toolkit";
const assetcategorySlice = createSlice({
    name: "assetcategory",
    initialState: {
        show: {
            assetcategorylist: null,
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
        
        showAssetCategoryStart: (state) => {
            state.show.isFetching = true;
        },
        showAssetCategorySuccess: (state, action) => {
            state.show.isFetching = false;
            state.show.assetcategorylist = action.payload;
            state.show.error = false;
        },
        showAssetCategoryFailed: (state) => {
            state.show.isFetching = false;
            state.show.error = true;
        },
        createAssetCategoryStart: (state) => {
            state.create.isFetching = true;
        },
        createAssetCategorySuccess: (state) => {
            state.create.isFetching = false;
            state.create.error = false;
            state.create.success = true;
        },
        createAssetCategoryFailed: (state) => {
            state.create.isFetching = false;
            state.create.error = true;
            state.create.success = false;
        },
        
        editAssetCategoryStart:(state)=>{
            state.edit.isFetching = true;
        },
        editAssetCategorySuccess:(state)=>{
            state.edit.isFetching = false;
            state.edit.error = false;
            state.edit.success = true;
        },
        editAssetCategoryFailed:(state)=>{
            state.edit.isFetching = false;
            state.edit.error = true;
            state.edit.success = false;
        },
        deleteAssetCategoryStart:(state)=>{
            state.delete.isFetching = true;
        },
        deleteAssetCategorySuccess:(state)=>{
            state.delete.isFetching = false;
            state.delete.error = false;
            state.delete.success = true;
        },
        deleteAssetCategoryFailed:(state)=>{
            state.delete.isFetching = false;
            state.delete.error = true;
            state.delete.success = false;
        },
    }
})
export const {
    showAssetCategoryStart,
    showAssetCategorySuccess,
    showAssetCategoryFailed,
    createAssetCategoryStart,
    createAssetCategorySuccess,
    createAssetCategoryFailed,
    editAssetCategoryStart,
    editAssetCategorySuccess,
    editAssetCategoryFailed,
    deleteAssetCategoryStart,
    deleteAssetCategorySuccess,
    deleteAssetCategoryFailed,
} = assetcategorySlice.actions;
export default assetcategorySlice.reducer;