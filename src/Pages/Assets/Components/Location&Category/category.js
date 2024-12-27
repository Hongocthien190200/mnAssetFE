import React, { useState, useEffect, useRef } from 'react';

import styles from './style.module.scss';
import classNames from 'classnames/bind';

import { showSuccessToast, showErrorToast } from '../../../Components/ToastMessage';
import { showAssetCategory, createAssetCategory } from "../../../../redux/apiRequest";

const cx = classNames.bind(styles);

const CreateLocation = ({ axiosJWT, dispatch, setShowPopupCategory, loadingOn, loadingOff }) => {
    const [newAssetCategory, setNewAssetCategory] = useState({ name: '', address: '', code: '' });

    // State to handle form errors
    const [formErrors, setFormErrors] = useState({});

    // Handle input change for the new location form
    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setNewAssetCategory(prevState => ({ ...prevState, [name]: value }));
    };

    // Validate form inputs
    const validateForm = () => {
        loadingOn();
        const errors = {};
        if (!newAssetCategory.name) {
            errors.name = 'Tên phân loại không được để trống';
        }
        if (!newAssetCategory.code) {
            errors.code = 'Mã phân loại không được để trống';
        }
        return errors;
    };

    // Handle form submission for creating a new location
    const handleAddAssetCategory = () => {
        const errors = validateForm();
        if (Object.keys(errors).length === 0) {
            // No errors, proceed with adding location
            createAssetCategory(dispatch, axiosJWT, newAssetCategory, addAssetCategorySuccess, addAssetCategoryFailed, loadingOff);
        } else {
            // Set errors to display them
            setFormErrors(errors);
            loadingOff();
        }
    };

    const addAssetCategorySuccess = () => {
        setNewAssetCategory({ name: '', code: '' });
        setFormErrors({});
        setShowPopupCategory(false);  // Close popup after adding location
        showSuccessToast("Thêm mới phân loại tài sản thành công!");
        showAssetCategory(dispatch, axiosJWT);
    };
    const addAssetCategoryFailed = () => {
        setNewAssetCategory({ name: '', code: '' });
        setFormErrors({});
        setShowPopupCategory(false);  // Close popup after adding location
        showErrorToast("Thêm mới phân loại tài sản không thành công!");
    };

    return (
        <>
            <div className={cx("popup")}>
                <div className={cx("popup-content")}>
                    <h3>Thêm phân loại tài sản</h3>
                    <div>
                        <label>Tên phân loại:</label>
                        <input
                            type="text"
                            name="name"
                            value={newAssetCategory.name}
                            onChange={handleInputChange}
                        />
                        {formErrors.name && <span className={cx("error")}>{formErrors.name}</span>}
                    </div>
                    <div>
                        <label>Mã ký hiệu phân loại</label>
                        <input
                            type="text"
                            name="code"
                            value={newAssetCategory.code}
                            onChange={handleInputChange}
                        />
                        {formErrors.code && <span className={cx("error")}>{formErrors.code}</span>}
                    </div>
                    
                    <button onClick={handleAddAssetCategory} className={cx("confirm-button")}>
                        Xác nhận
                    </button>
                    <button onClick={() => setShowPopupCategory(false)} className={cx("cancel-button")}>
                        Hủy
                    </button>
                </div>
            </div>
        </>
    );
};

export default CreateLocation;
