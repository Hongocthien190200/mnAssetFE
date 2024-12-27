import React, { useState, useEffect, useRef } from 'react';
import { useDispatch, useSelector } from "react-redux";

import styles from './AssetsHome.module.scss';
import classNames from 'classnames/bind';

import Breadcrumb from '../Components/Breadcrumb';
import ListAsset from './Components/Asset/listAsset';
import LoaderSpinner from '../Components/LoaderSpinner';
import CreateLocation from './Components/Location&Category/location';
import CreateAssetCategory from './Components/Location&Category/category';

import { showLocations, showAssetCategory } from "../../redux/apiRequest";
import { createAxios } from '../../createInstance';
import { loginSuccess } from '../../redux/authSlice';

const cx = classNames.bind(styles);

const PageAsset = () => {
    // State để kiểm soát hiển thị spinner
    const [loading, setLoading] = useState(false);

    // State xử lý popup create của Locations
    const [showPopup, setShowPopup] = useState(false);
    // State xử lý popup create của Categories
    const [showPopupCategory, setShowPopupCategory] = useState(false);


    const dispatch = useDispatch();
    const user = useSelector((state) => state.auth.login?.currentUser);
    let axiosJWT = createAxios(user, dispatch, loginSuccess);

    const elementRef = useRef(null);

    //Khu vực
    let stateLocation = useSelector((state) => state.location?.show);
    let locationslist = [];
    if (stateLocation && stateLocation?.locationlist) {
        locationslist = stateLocation.locationlist;
    }

    // State xử lý lưu trữ id hiện tại của Khu vực xem tài sản
    const [currentIdlocation, setCurrentIdlocation] = useState(locationslist[0]?._id);


    // Hàm xử lý khi thay đổi lựa chọn khu vực xem tài sản
    const handleLocationChange = (e) => {
        const selectedLocationId = e.target.value;
        setCurrentIdlocation(selectedLocationId);
    };


    //Phân loại tài sản
    let stateAssetCategory = useSelector((state) => state.assetcategory?.show);
    let assetCategorylist = [];
    if (stateAssetCategory && stateAssetCategory?.assetcategorylist) {
        assetCategorylist = stateAssetCategory.assetcategorylist;
    }

    // State xử lý lưu trữ id hiện tại của Phân loại xem tài sản
    const [currentIdAssetCate, setCurrentIdAssetCate] = useState('all');

    // Hàm xử lý khi thay đổi lựa chọn Phân loại xem tài sản
    const handleAssetCategoryChange = (e) => {
        const selectedAssetCategoryId = e.target.value;
        setCurrentIdAssetCate(selectedAssetCategoryId);
    };

    //bật đầu load spinner
    const loadingOn = () => {
        setLoading(true);
    }
    //tắt load spinner
    const loadingOff = () => {
        setLoading(false);
    }

    // Fetch all locations from the API
    useEffect(() => {
        if (user?.accessToken) {
            showLocations(dispatch, axiosJWT);
            showAssetCategory(dispatch, axiosJWT);
        }
    }, []);

    return (
        <>
            <div ref={elementRef} className={cx("page-asset")}>
                <Breadcrumb />
                <h2>Quản lý tài sản</h2>
                <div className={cx("control-container")}>
                    <div className={cx("location-container")}>
                        <select onChange={handleLocationChange} value={currentIdlocation}>
                            {locationslist.map((location) => (
                                <option key={location._id} value={location._id}>
                                    {location.name}
                                </option>
                            ))}
                        </select>
                        <button onClick={() => setShowPopup(true)} className={cx("add-location-button")}>
                            Thêm khu vực
                        </button>
                    </div>
                    <div className={cx("category-container")}>
                        <select onChange={handleAssetCategoryChange} value={currentIdAssetCate}>
                            <option value='all'>
                                -----Tất cả-----
                            </option>
                            {assetCategorylist.map((assetcategory) => (
                                <option key={assetcategory._id} value={assetcategory._id}>
                                    {assetcategory.name}
                                </option>
                            ))}
                        </select>
                        <button onClick={() => setShowPopupCategory(true)} className={cx("add-category-button")}>
                            Thêm phân loại
                        </button>
                    </div>
                </div>

                <ListAsset
                    elementRef={elementRef}
                    currentIdlocation={currentIdlocation}
                    currentIdAssetCate={currentIdAssetCate}
                    loadingOn={loadingOn}
                    loadingOff={loadingOff}
                />

                {showPopup && (
                    <CreateLocation
                        axiosJWT={axiosJWT}
                        dispatch={dispatch}
                        setShowPopup={setShowPopup}
                        loadingOn={loadingOn}
                        loadingOff={loadingOff}
                    />
                )}

                {showPopupCategory && (
                    <CreateAssetCategory
                        axiosJWT={axiosJWT}
                        dispatch={dispatch}
                        setShowPopupCategory={setShowPopupCategory}
                        loadingOn={loadingOn}
                        loadingOff={loadingOff}
                    />
                )}
            </div>

            {loading && (
                <LoaderSpinner />
            )}
        </>
    );
};

export default PageAsset;