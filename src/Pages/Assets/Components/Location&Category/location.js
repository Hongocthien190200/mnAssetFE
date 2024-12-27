import React, { useState, useEffect, useRef } from 'react';

import styles from './style.module.scss';
import classNames from 'classnames/bind';

import { showSuccessToast, showErrorToast } from '../../../Components/ToastMessage';
import { showLocations, createLocations } from "../../../../redux/apiRequest";

const cx = classNames.bind(styles);

const CreateLocation = ({ axiosJWT, dispatch, setShowPopup, loadingOn, loadingOff }) => {
    const [newLocation, setNewLocation] = useState({ name: '', address: '', code: '' });

    // State to handle form errors
    const [formErrors, setFormErrors] = useState({});

    // Handle input change for the new location form
    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setNewLocation(prevState => ({ ...prevState, [name]: value }));
    };

    // Validate form inputs
    const validateForm = () => {
        loadingOn();
        const errors = {};
        if (!newLocation.name) {
            errors.name = 'Tên khu vực không được để trống';
        }
        if (!newLocation.address) {
            errors.address = 'Địa chỉ không được để trống';
        }
        if (!newLocation.code) {
            errors.code = 'Mã khu vực không được để trống';
        }
        return errors;
    };

    // Handle form submission for creating a new location
    const handleAddLocation = () => {
        const errors = validateForm();
        if (Object.keys(errors).length === 0) {
            // No errors, proceed with adding location
            createLocations(dispatch, axiosJWT, newLocation, addLocationSuccess, addLocationFailed, loadingOff );
        } else {
            // Set errors to display them
            setFormErrors(errors);
            loadingOff(); 
        }
    };

    const addLocationSuccess = () => {
        setNewLocation({ name: '', address: '', code: '' });
        setFormErrors({});
        setShowPopup(false);  // Close popup after adding location
        showSuccessToast("Thêm mới khu vực thành công!");
        showLocations(dispatch, axiosJWT);
    };
    const addLocationFailed = () => {
        setNewLocation({ name: '', address: '', code: '' });
        setFormErrors({});
        setShowPopup(false);  // Close popup after adding location
        showErrorToast("Thêm mới khu vực không thành công!");
    };


    return (
        <>
            <div className={cx("popup")}>
                <div className={cx("popup-content")}>
                    <h3>Thêm Khu vực mới</h3>
                    <div>
                        <label>Tên khu vực:</label>
                        <input
                            type="text"
                            name="name"
                            value={newLocation.name}
                            onChange={handleInputChange}
                        />
                        {formErrors.name && <span className={cx("error")}>{formErrors.name}</span>}
                    </div>
                    <div>
                        <label>Địa chỉ:</label>
                        <input
                            type="text"
                            name="address"
                            value={newLocation.address}
                            onChange={handleInputChange}
                        />
                        {formErrors.address && <span className={cx("error")}>{formErrors.address}</span>}
                    </div>
                    <div>
                        <label>Mã khu vực:</label>
                        <input
                            type="text"
                            name="code"
                            value={newLocation.code}
                            onChange={handleInputChange}
                        />
                        {formErrors.code && <span className={cx("error")}>{formErrors.code}</span>}
                    </div>
                    <button onClick={handleAddLocation} className={cx("confirm-button")}>
                        Xác nhận
                    </button>
                    <button onClick={() => setShowPopup(false)} className={cx("cancel-button")}>
                        Hủy
                    </button>
                </div>
            </div>
        </>
    );
};

export default CreateLocation;
