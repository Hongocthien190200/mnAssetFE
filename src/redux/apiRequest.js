import axios from "axios";
// import { saveAs } from 'file-saver';

//Đăng ký/Đăng nhập/User
import {
    RegisterFailed, RegisterStart, RegisterSuccess,
    loginFailed, loginStart, loginSuccess,
    logoutFailed, logoutStart, logoutSuccess,
    updatePassWordStart, updatePassWordSuccess, updatePassWordFailed,
    deleteUserStart, deleteUserSuccess, deleteUserFailed,
    acceptkeyStart, acceptkeySuccess, acceptkeyFailed,
    getallUserStart, getallUserSuccess, getallUserFailed
} from "./authSlice";

//Tài sản
import {
    showStart, showSuccess, showFailed,
    createStart, createSuccess, createFailed,
    editStart, editSuccess, editFailed
} from "./assetSlice";

//Khu vực
import {
    showLocationStart, showLocationSuccess, showLocationFailed,
    createLocationStart, createLocationSuccess, createLocationFailed,
} from "./locationSlice";

//Khu vực
import {
    showAssetCategoryStart, showAssetCategorySuccess, showAssetCategoryFailed,
    createAssetCategoryStart, createAssetCategorySuccess, createAssetCategoryFailed
} from "./assetcategorySlice";

//Chuyển giao - nhận tài sản
import {
    transferAssetStart, transferAssetSuccess, transferAssetFailed,
} from "./transferassetSlice";

axios.defaults.baseURL = 'http://localhost:4000';

//XOÁ TÀI KHOẢN
export const deleteUser = async (id, dispatch, successCallback, errCallback, accessToken, axiosJWT) => {
    await dispatch(deleteUserStart());
    try {
        await axiosJWT.delete(`/api/users/${id}`, {
            headers: { token: `Bearer ${accessToken}` },
        });
        await dispatch(deleteUserSuccess());
        await successCallback();
    }
    catch (error) {
        await errCallback();
        await dispatch(deleteUserFailed(error));
    }
}
//THAY ĐỔI MẬT KHẨU
export const updatePassWord = async (newData, dispatch, successCallback, errCallback, accessToken, axiosJWT) => {
    await dispatch(updatePassWordStart());
    try {
        await axiosJWT.patch("/api/changepw", newData, {
            headers: { token: `Bearer ${accessToken}` },
        });
        await dispatch(updatePassWordSuccess());
        await successCallback();
    }
    catch (error) {
        await errCallback();
        await dispatch(updatePassWordFailed(error));
    }
}

//ĐĂNG NHẬP
export const loginUser = async (user, dispatch, navigate, errorCallback) => {
    dispatch(loginStart());
    try {
        const res = await axios.post("/api/login", user);
        await dispatch(loginSuccess(res.data));
        await navigate("/");
    }
    catch (error) {
        if (error.response && error.response.data && error.response.data.message !== "") {
            errorCallback(new Error("Sai tên đăng nhập hoặc mật khẩu"));
            dispatch(loginFailed());
        }
    }
}
//ĐĂNG XUẤT
export const logOut = async (dispatch, id, navigate, accessToken, axiosJWT) => {
    dispatch(logoutStart());
    try {
        await axiosJWT.post("/api/logout", id, {
            headers: { token: `Bearer ${accessToken}` },
        });
        dispatch(logoutSuccess());
        navigate("/login");
    }
    catch (err) {
        dispatch(logoutFailed());
    }
}
//ĐĂNG KÝ
export const registerUser = async (user, dispatch, succesCallback, errCallback) => {
    dispatch(RegisterStart());
    try {
        await axios.post("/api/register", user);
        dispatch(RegisterSuccess());
        await succesCallback();
    } catch (error) {
        if (error.response && error.response.data && error.response.data.message !== "") {
            dispatch(RegisterFailed());
            await errCallback(new Error("Tên đăng nhập đã tồn tại"));
        }
    }
}
//LẤY TẤT CẢ TÀI KHOẢN
export const getAllUser = async (dispatch,axiosJWT, loadingOn, loadingOff) => {
    loadingOn();
    dispatch(getallUserStart());
    try {
        const res = await axiosJWT.get("/api/alluser");
        await dispatch(getallUserSuccess(res.data));
        loadingOff();
    } catch (error) {
        if (error.response && error.response.data && error.response.data.message !== "") {
            dispatch(getallUserFailed());
            loadingOff();
        }
    }
}
//KÍCH HOẠT TÀI KHOẢN
export const acceptkeyUser = async (user, dispatch, acceptSuccess, errCallback) => {
    dispatch(acceptkeyStart());
    try {
        await axios.patch("/api/acceptkey", user);
        dispatch(acceptkeySuccess());
        acceptSuccess();
    } catch (error) {
        if (error.response && error.response.data && error.response.data.message !== "") {
            await errCallback(new Error(error.response.data));
            dispatch(acceptkeyFailed());
        }
    }
}

// HIỂN THỊ DANH SÁCH TÀI SẢN THEO KHU VỰC:
export const showAssets = async (idLocation, idAssetCategory, dispatch, axiosJWT, loadingOn, loadingOff) => {
    loadingOn();
    dispatch(showStart());
    try {
        const res = await axiosJWT.get(`/api/assets/${idLocation}/${idAssetCategory}`);
        await dispatch(showSuccess(res.data));
        loadingOff();
    }
    catch (error) {
        if (error.response && error.response.data && error.response.data.message !== "") {
            dispatch(showFailed());
            loadingOff();
        }
    }
}
// THÊM TÀI SẢN
export const createAsset = async (dispatch, axiosJWT, formData, succesCallback, failedCallback) => {
    dispatch(createStart());
    try {
        const res = await axiosJWT.post("/api/assets", formData, {
            headers: {
                'Content-Type': 'multipart/form-data',
            }
        });
        await dispatch(createSuccess(res.data));
        await succesCallback();
    }
    catch (error) {
        if (error.response && error.response.data && error.response.data.message !== "") {
            dispatch(createFailed());
            await failedCallback();
        }
    }
}
// CẬP NHẬT TÀI SẢN:
export const editAssets = async (newData, assetId, dispatch, axiosJWT, succesCallback, failedCallback) => {
    dispatch(editStart());
    try {
        const res = await axiosJWT.put(`/api/assets/${assetId}`, newData, {
            headers: {
                'Content-Type': 'multipart/form-data'
            }
        });
        await dispatch(editSuccess(res.data));
        succesCallback();
    }
    catch (error) {
        if (error.response && error.response.data && error.response.data.message !== "") {
            dispatch(editFailed());
            failedCallback();
        }
    }
}

// HIỂN THỊ DANH SÁCH VỊ TRÍ
export const showLocations = async (dispatch, axiosJWT) => {
    dispatch(showLocationStart());
    try {
        const res = await axiosJWT.get("/api/locations");
        await dispatch(showLocationSuccess(res.data));
    }
    catch (error) {
        if (error.response && error.response.data && error.response.data.message !== "") {
            dispatch(showLocationFailed());
        }
    }
}
// THÊM VỊ TRÍ
export const createLocations = async (dispatch, axiosJWT, newData, succesCallback, failedCallback, loadingOff) => {
    await dispatch(createLocationStart());
    try {
        const res = await axiosJWT.post("/api/locations", newData);
        await dispatch(createLocationSuccess(res.data));
        await loadingOff()
        await succesCallback();
    }
    catch (error) {
        if (error.response && error.response.data && error.response.data.message !== "") {
            await loadingOff()
            await dispatch(createLocationFailed());
            await failedCallback();
        }
    }
}
// HIỂN THỊ DANH SÁCH PHÂN LOẠI TÀI SẢN
export const showAssetCategory = async (dispatch, axiosJWT) => {
    dispatch(showAssetCategoryStart());
    try {
        const res = await axiosJWT.get("/api/assetcategory");
        await dispatch(showAssetCategorySuccess(res.data));
    }
    catch (error) {
        if (error.response && error.response.data && error.response.data.message !== "") {
            dispatch(showAssetCategoryFailed());
        }
    }
}
// THÊM PHÂN LOẠI TÀI SẢN
export const createAssetCategory = async (dispatch, axiosJWT, newData, succesCallback, failedCallback, loadingOff) => {
    dispatch(createAssetCategoryStart());
    try {
        const res = await axiosJWT.post("/api/assetcategory", newData);
        await dispatch(createAssetCategorySuccess(res.data));
        loadingOff();
        await succesCallback();
    }
    catch (error) {
        if (error.response && error.response.data && error.response.data.message !== "") {
            dispatch(createAssetCategoryFailed());
            loadingOff();
            await failedCallback();
        }
    }
}

// THÊM PHIẾU BÀN GIAO TÀI SẢN
// THÊM TÀI SẢN
export const createTransferAsset = async (dispatch, axiosJWT, formData, succesCallback, failedCallback) => {
    dispatch(transferAssetStart());
    try {
        const res = await axiosJWT.post("/api/transferasset", formData, {
            headers: {
                'Content-Type': 'multipart/form-data',
            }
        });
        await dispatch(transferAssetSuccess(res.data));
        await succesCallback();
    }
    catch (error) {
        if (error.response && error.response.data && error.response.data.message !== "") {
            dispatch(transferAssetFailed());
            await failedCallback();
        }
    }
}