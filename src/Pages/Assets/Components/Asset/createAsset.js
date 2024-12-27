import React, { useState } from 'react';
import { createAsset } from '../../../../redux/apiRequest';

import { showSuccessToast, showErrorToast } from '../../../Components/ToastMessage';
import classNames from 'classnames/bind';
import styles from './Assets.module.scss';
const cx = classNames.bind(styles);

const CreateAsset = ({ currentIdAssetCate, currentIdlocation, dispatch, axiosJWT, callShowAssets, loadingOn, loadingOff, theadHeight}) => {
    const [newAsset, setNewAsset] = useState({
        name: '',
        quantity: '',
        unit: '',
        yearOfProduction: '',
        yearOfUse: '',
        model: '',
        serialNumber: '',
        location: '',
        category: '',
        price: '',
        description: '',
        image: '',
    });

    const [errors, setErrors] = useState({
        name: false,
        quantity: false,
        unit: false,
        yearOfProduction: false,
        yearOfUse: false,
        image: false,
    });

    const validateForm = () => {
        let isValid = true;
        let newErrors = {
            name: false,
            quantity: false,
            unit: false,
            yearOfProduction: false,
            yearOfUse: false,
            image: false,
        };

        if (!newAsset.name) {
            newErrors.name = true;
            isValid = false;
        }
        if (!newAsset.quantity) {
            newErrors.quantity = true;
            isValid = false;
        }
        if (!newAsset.unit) {
            newErrors.unit = true;
            isValid = false;
        }
        if (!newAsset.yearOfProduction) {
            newErrors.yearOfProduction = true;
            isValid = false;
        }
        if (!newAsset.yearOfUse) {
            newErrors.yearOfUse = true;
            isValid = false;
        }
        if (!newAsset.image) {
            newErrors.image = true;
            isValid = false;
        }

        setErrors(newErrors);
        return isValid;
    };

    const addNewAsset = async () => {
        await loadingOn();
        if (!validateForm()) {
            loadingOff();
            return showErrorToast("Bạn vui lòng nhập các trường bắt buộc!");
        }
        const formData = new FormData();
        formData.append('name', newAsset.name);
        formData.append('quantity', newAsset.quantity);
        formData.append('unit', newAsset.unit);
        formData.append('yearOfProduction', newAsset.yearOfProduction);
        formData.append('yearOfUse', newAsset.yearOfUse);
        formData.append('model', newAsset.model);
        formData.append('serialNumber', newAsset.serialNumber);
        formData.append('location', currentIdlocation);
        formData.append('category', currentIdAssetCate);
        formData.append('price', newAsset.price);
        formData.append('description', newAsset.description);
        formData.append('image', newAsset.image); // Thêm file ảnh vào FormData

        await createAsset(dispatch, axiosJWT, formData, createAssetSuccces, createAssetFailed);
    };

    const createAssetSuccces = () => {
        setNewAsset({
            name: '',
            quantity: '',
            unit: '',
            yearOfProduction: '',
            yearOfUse: '',
            model: '',
            serialNumber: '',
            location: '',
            category: '',
            price: '',
            description: '',
            image: '',
        });
        setErrors({
            name: false,
            quantity: false,
            unit: false,
            yearOfProduction: false,
            yearOfUse: false,
            image: false,
        });
        loadingOff();
        showSuccessToast("Thêm mới tài sản thành công!");
        callShowAssets();
    };

    const createAssetFailed = () => {
        setNewAsset({
            name: '',
            quantity: '',
            unit: '',
            yearOfProduction: '',
            yearOfUse: '',
            model: '',
            serialNumber: '',
            location: '',
            category: '',
            price: '',
            description: '',
            image: '',
        });
        setErrors({
            name: false,
            quantity: false,
            unit: false,
            yearOfProduction: false,
            yearOfUse: false,
            image: false,
        });
        loadingOff();
        showErrorToast("Thêm mới tài sản không thành công!");
        callShowAssets();
    };
    return (
        <>
            <tr style={{ top: `${theadHeight}px`, position: 'sticky', zIndex: '1', backgroundColor: 'var(--light)'}}>
                <td>
                    <input
                        type="text"
                        placeholder="mặc định"
                        disabled
                    />
                </td>
                <td>
                    <div className={cx("custom-file-input", errors.image ? 'error-border' : '')}>
                        <span>Image</span>
                        <input
                            type="file"
                            onChange={(e) => setNewAsset({ ...newAsset, image: e.target.files[0] })}
                        />
                    </div>
                </td>
                <td>
                    <input
                        type="text"
                        placeholder=""
                        value={newAsset.name}
                        onChange={(e) => setNewAsset({ ...newAsset, name: e.target.value })}
                        className={errors.name ? cx('error-border') : ''}
                    />
                </td>
                <td>
                    <input
                        type="text"
                        placeholder=""
                        value={newAsset.quantity}
                        onChange={(e) => setNewAsset({ ...newAsset, quantity: e.target.value })}
                        className={errors.quantity ? cx('error-border') : ''}
                    />
                </td>
                <td>
                    <input
                        type="text"
                        placeholder=""
                        value={newAsset.unit}
                        onChange={(e) => setNewAsset({ ...newAsset, unit: e.target.value })}
                        className={errors.unit ? cx('error-border') : ''}
                    />
                </td>
                <td>
                    <input
                        type="text"
                        placeholder=""
                        value={newAsset.yearOfProduction}
                        onChange={(e) => setNewAsset({ ...newAsset, yearOfProduction: e.target.value })}
                        className={errors.yearOfProduction ? cx('error-border') : ''}
                    />
                </td>
                <td>
                    <input
                        type="text"
                        placeholder=""
                        value={newAsset.yearOfUse}
                        onChange={(e) => setNewAsset({ ...newAsset, yearOfUse: e.target.value })}
                        className={errors.yearOfUse ? cx('error-border') : ''}
                    />
                </td>
                <td>
                    <input
                        type="text"
                        placeholder="default"
                        disabled
                    />
                </td>
                <td>
                    <input
                        type="text"
                        placeholder=""
                        value={newAsset.model}
                        onChange={(e) => setNewAsset({ ...newAsset, model: e.target.value })}
                    />
                </td>
                <td>
                    <input
                        type="text"
                        placeholder=""
                        value={newAsset.serialNumber}
                        onChange={(e) => setNewAsset({ ...newAsset, serialNumber: e.target.value })}
                    />
                </td>
                <td>
                    <input
                        type="text"
                        placeholder="mặc định"
                        disabled
                    />
                </td>
                <td>
                    <input
                        type="text"
                        placeholder=""
                        value={newAsset.price}
                        onChange={(e) => setNewAsset({ ...newAsset, price: e.target.value })}
                    />
                </td>
                <td>
                    <textarea
                        type="text"
                        placeholder=""
                        value={newAsset.description}
                        onChange={(e) => setNewAsset({ ...newAsset, description: e.target.value })}
                    />
                </td>
                <td>
                    <input
                        type="text"
                        placeholder="mặc định"
                        disabled
                    />
                </td>
                <td>
                    <button onClick={addNewAsset}>Add</button>
                </td>
                <td></td>
            </tr>
        </>
    );
};

export default CreateAsset;
