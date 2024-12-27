import { createSlice } from "@reduxjs/toolkit";
const authSlice = createSlice({
    name: "auth",
    initialState: {
        login: {
            currentUser: null,
            isFetching: false,
            error: false
        },
        register: {
            isFetching: false,
            error: false,
            success: false
        }
        ,acceptkey: {
            isFetching: false,
            error: false,
            success: false
        },
        allusers:{
            listuser:null,
            isFetching: false,
            error: false
        },
        // alllogin:{
        //     listlogin:null,
        //     isFetching: false,
        //     error: false
        // },
        editPassword:{
            isFetching:false,
            error:false,
            success:false
        },
        deleteuser:{
            isFetching:false,
            error:false,
            success:false
        }
    },
    reducers: {
        deleteUserStart:(state)=>{
            state.deleteuser.isFetching = true;
        },
        deleteUserSuccess:(state)=>{
            state.deleteuser.isFetching = false;
            state.deleteuser.error = false;
            state.deleteuser.success = true;
        },
        deleteUserFailed:(state)=>{
            state.deleteuser.isFetching = false;
            state.deleteuser.error = true;
            state.deleteuser.success = false;
        },
        updatePassWordStart:(state)=>{
            state.editPassword.isFetching = true;
        },
        updatePassWordSuccess:(state)=>{
            state.editPassword.isFetching = false;
            state.editPassword.error = false;
            state.editPassword.success = true;
        },
        updatePassWordFailed:(state)=>{
            state.editPassword.isFetching = false;
            state.editPassword.error = true;
            state.editPassword.success = false;
        },
        // getallLoginStart: (state) => {
        //     state.alllogin.isFetching = true;
        // },
        // getallLoginSuccess: (state, action) => {
        //     state.alllogin.isFetching = false;
        //     state.alllogin.listlogin = action.payload;
        //     state.alllogin.error = false;
        // },
        // getallLoginFailed: (state) => {
        //     state.alllogin.isFetching = false;
        //     state.alllogin.error = true;
        // },
        getallUserStart: (state) => {
            state.allusers.isFetching = true;
        },
        getallUserSuccess: (state, action) => {
            state.allusers.isFetching = false;
            state.allusers.listuser = action.payload;
            state.allusers.error = false;
        },
        getallUserFailed: (state) => {
            state.allusers.isFetching = false;
            state.allusers.error = true;
        },
        loginStart: (state) => {
            state.login.isFetching = true;
        },
        loginSuccess: (state, action) => {
            state.login.isFetching = false;
            state.login.currentUser = action.payload;
            state.login.error = false;
        },
        loginFailed: (state) => {
            state.login.isFetching = false;
            state.login.error = true;
        },
        RegisterStart: (state) => {
            state.register.isFetching = true;
        },
        RegisterSuccess: (state) => {
            state.register.isFetching = false;
            state.register.error = false;
            state.register.success = true;
        },
        RegisterFailed: (state) => {
            state.register.isFetching = false;
            state.register.error = true;
            state.register.success = false;
        },
        acceptkeyStart: (state) => {
            state.acceptkey.isFetching = true;
        },
        acceptkeySuccess: (state) => {
            state.acceptkey.isFetching = false;
            state.acceptkey.error = false;
            state.acceptkey.success = true;
        },
        acceptkeyFailed: (state) => {
            state.acceptkey.isFetching = false;
            state.acceptkey.error = true;
            state.acceptkey.success = false;
        },
        logoutStart: (state) => {
            state.login.isFetching = true;
        },
        logoutSuccess: (state, action) => {
            state.login.isFetching = false;
            state.login.currentUser = null;
            state.login.error = false;
        },
        logoutFailed: (state) => {
            state.login.isFetching = false;
            state.login.error = true;
        },
    }
})
export const {
    deleteUserStart,
    deleteUserSuccess,
    deleteUserFailed,
    loginStart,
    loginFailed,
    loginSuccess,
    RegisterStart,
    RegisterSuccess,
    RegisterFailed,
    acceptkeyStart,
    acceptkeySuccess,
    acceptkeyFailed,
    logoutStart,
    logoutSuccess,
    logoutFailed,
    updatePassWordStart,
    updatePassWordSuccess,
    updatePassWordFailed,
    getallUserStart,
    getallUserSuccess,
    getallUserFailed
} = authSlice.actions;
export default authSlice.reducer;