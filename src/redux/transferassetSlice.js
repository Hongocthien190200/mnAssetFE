import { createSlice } from "@reduxjs/toolkit";
const transferassetSlice = createSlice({
    name: "transferasset",
    initialState: {
        transfer: {
            isFetching: false,
            error: false,
            success: false
        }
    },
    reducers: {

        transferAssetStart: (state) => {
            state.transfer.isFetching = true;
        },
        transferAssetSuccess: (state) => {
            state.transfer.isFetching = false;
            state.transfer.error = false;
            state.transfer.success = true;
        },
        transferAssetFailed: (state) => {
            state.transfer.isFetching = false;
            state.transfer.error = true;
            state.transfer.success = false;
        },
    }
})
export const {
    transferAssetStart,
    transferAssetSuccess,
    transferAssetFailed,
} = transferassetSlice.actions;
export default transferassetSlice.reducer;