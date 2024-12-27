import React, { useState, useEffect, useRef } from 'react';
import { useDispatch, useSelector } from "react-redux";

import { editAssets, showAssets, getAllUser } from "../../../../redux/apiRequest";
import { createAxios } from '../../../../createInstance';
import { loginSuccess } from '../../../../redux/authSlice';

import { showSuccessToast, showErrorToast } from '../../../Components/ToastMessage';
import CreateAsset from './createAsset';
import StranferAsset from '../../Components/StranferAsset';

import styles from './Assets.module.scss';
import classNames from 'classnames/bind';
const cx = classNames.bind(styles);

const ListAsset = ({ elementRef, currentIdlocation, currentIdAssetCate, loadingOn, loadingOff }) => {
    const dispatch = useDispatch();
    const user = useSelector((state) => state.auth.login?.currentUser);
    let axiosJWT = createAxios(user, dispatch, loginSuccess);

    const [editingAssetId, setEditingAssetId] = useState(null);
    const [tooltip, setTooltip] = useState({ content: '', x: 0, y: 0, visible: false });

    const divRef = useRef(null);  // Tạo ref để tham chiếu đến thẻ div
    const [tooltipPosition, setTooltipPosition] = useState({});

    const [selectedImage, setSelectedImage] = useState(null);
    const [assetData, setAssetData] = useState({}); // State to hold the editable asset data

    let state = useSelector((state) => state.asset?.show);
    let assetslist = [];
    if (state && state?.assetslist) {
        assetslist = state.assetslist;
    }


    // Update asset details
    const handleEditChange = (e, field) => {
        const value = e.target.value;
        if (field === 'description') {
            // Tách chuỗi thành mảng bằng dấu xuống dòng
            setAssetData((prevData) => ({
                ...prevData,
                [field]: value.split("\n")
            }));
        } else {
            // Xử lý cho các trường khác nếu có
            setAssetData((prevData) => ({
                ...prevData,
                [field]: value
            }));
        }
    };

    const saveEdits = async (assetId) => {
        // Prepare the new data
        const newData = { ...assetData };

        // Check if an image is selected
        if (selectedImage) {
            // If a new image is selected, append it to FormData
            const formData = new FormData();
            formData.append('image', selectedImage); // Append the new image
            for (const key in newData) {
                formData.append(key, newData[key]); // Append other fields
            }
            await editAssets(formData, assetId, dispatch, axiosJWT, updateAssetSuccess, updateAssetFailed);
        } else {
            await editAssets(newData, assetId, dispatch, axiosJWT, updateAssetSuccess, updateAssetFailed);
        }

    };

    const updateAssetSuccess = () => {
        // Clear editing state and selected image after saving
        setEditingAssetId(null);
        setSelectedImage(null);
        setAssetData({}); // Reset asset data
        showSuccessToast("Chỉnh sửa tài sản thành công!");
        showAssets(currentIdlocation, currentIdAssetCate, dispatch, axiosJWT, loadingOn, loadingOff)
    };
    const updateAssetFailed = () => {
        // Clear editing state and selected image after saving
        setEditingAssetId(null);
        setSelectedImage(null);
        setAssetData({}); // Reset asset data
        showErrorToast("Chỉnh sửa tài sản không thành công!");
    };


    // Function to show tooltip
    const handleMouseOver = (e, content, isImage = false) => {
        const element = e.target;
        if (isImage || element.scrollWidth > element.clientWidth) {
            const rectPageasset = elementRef.current.getBoundingClientRect();
            const rect = element.getBoundingClientRect();
            const tdWidth = element.clientWidth;

            setTooltip({
                content: isImage ? <img src={content} alt="Tooltip" style={{ width: '240px', height: '135px' }} /> : content,
                x: rect.left - rectPageasset.left,
                y: rect.bottom,
                visible: true,
                isImage,
                width: tdWidth
            });
        }
    };

    // Function to hide tooltip
    const handleMouseOut = () => {
        setTooltip({ ...tooltip, visible: false });
    };
    //Hàm gọi hàm showAssets
    const callShowAssets = () => {
        showAssets(currentIdlocation, currentIdAssetCate, dispatch, axiosJWT, loadingOn, loadingOff);
    };
    useEffect(() => {
        if (currentIdlocation && currentIdAssetCate) {
            showAssets(currentIdlocation, currentIdAssetCate, dispatch, axiosJWT, loadingOn, loadingOff)
        }
    }, [currentIdlocation, currentIdAssetCate]);

    useEffect(() => {
        // Khi tooltip được render, tính lại top dựa trên chiều cao của thẻ div
        if (divRef.current) {
            setTooltipPosition(divRef.current.offsetHeight);
        }
    }, [tooltip]);  // Gọi lại mỗi khi tooltip thay đổi

    //lấy chiều cao thẻ <thead> để set giá trị top cho thẻ con <tr>
    const theadRef = useRef(null);
    const [theadHeight, setTheadHeight] = useState(0);
    useEffect(() => {
        const theadElement = theadRef.current;

        const observer = new ResizeObserver((entries) => {
            for (let entry of entries) {
                const height = entry.contentRect.height;
                setTheadHeight(height);  // Cập nhật chiều cao vào state
            }
        });

        if (theadElement) {
            observer.observe(theadElement);
        }

        // Clean up the observer on component unmount
        return () => {
            if (theadElement) {
                observer.unobserve(theadElement);
            }
        };
    }, []);
    const [stranferAsset, setStranferAsset] = useState(false);
    const [newStranferData, setNewStranferData] = useState(
        {
            id: '',
            code: '',
            name: '',
            status: 'hahaha',
        }
    )
    const handleSignature = async (id, code, name) => {
        await getAllUser(dispatch, axiosJWT, loadingOn, loadingOff)
        setNewStranferData({
            id,
            code,
            name
        })
        setStranferAsset(true)
    }
    return (
        <>
            <div className={cx('table-container')}>
                <table>
                    <thead ref={theadRef}>
                        <tr>
                            <th>Mã tài sản</th>
                            <th style={{ width: '48px' }}>Ảnh</th>
                            <th style={{ width: '100px' }}>Tên tài sản</th>
                            <th>Số lượng</th>
                            <th>Đơn vị</th>
                            <th>Năm mua</th>
                            <th>Năm dùng</th>
                            <th>Trạng thái</th>
                            <th>Mẫu</th>
                            <th>Số máy</th>
                            <th>Người dùng</th>
                            <th>Giá</th>
                            <th style={{ width: '120px' }}>Thông tin thêm</th>
                            <th style={{ width: '120px' }}>Ghi chú</th>
                            <th colSpan={2}>Chức năng</th>
                        </tr>
                    </thead>
                    <tbody>
                        {currentIdAssetCate && currentIdAssetCate !== 'all' && (
                            <CreateAsset
                                currentIdAssetCate={currentIdAssetCate}
                                currentIdlocation={currentIdlocation}
                                dispatch={dispatch}
                                axiosJWT={axiosJWT}
                                callShowAssets={callShowAssets}
                                loadingOn={loadingOn}
                                loadingOff={loadingOff}
                                theadHeight={theadHeight}
                            />
                        )}
                        {assetslist.map(asset => (
                            <tr key={asset._id}>
                                <td onMouseOver={(e) => handleMouseOver(e, asset.assetCode)} onMouseOut={handleMouseOut}>
                                    {asset.assetCode}
                                </td>
                                <td onMouseOver={(e) => handleMouseOver(e, asset.imagePath, true)} onMouseOut={handleMouseOut}>
                                    {editingAssetId === asset._id ? (
                                        <div className={cx("custom-file-input")}>
                                            <span>Image</span>
                                            <input
                                                type="file"
                                                onChange={(e) => setSelectedImage(e.target.files[0])}
                                            />
                                        </div>
                                    ) : (
                                        asset.imagePath && (
                                            <img
                                                src={asset.imagePath}
                                                alt={asset.name || "Unnamed Asset"}
                                            />
                                        )
                                    )}
                                </td>
                                <td onMouseOver={(e) => handleMouseOver(e, asset.name)} onMouseOut={handleMouseOut}>
                                    {editingAssetId === asset._id ? (
                                        <input
                                            type="text"
                                            value={assetData.name ?? asset.name ?? ""} // Nếu asset.name hoặc assetData.name không tồn tại, dùng chuỗi rỗng
                                            onChange={(e) => handleEditChange(e, 'name')}
                                        />
                                    ) : (
                                        asset.name
                                    )}
                                </td>
                                <td onMouseOver={(e) => handleMouseOver(e, asset.quantity)} onMouseOut={handleMouseOut}>
                                    {asset.quantity}
                                </td>
                                <td onMouseOver={(e) => handleMouseOver(e, asset.unit)} onMouseOut={handleMouseOut}>
                                    {editingAssetId === asset._id ? (
                                        <input
                                            type="text"
                                            value={assetData.unit ?? asset.unit ?? ""} // Kiểm tra giá trị null/undefined và dùng chuỗi rỗng
                                            onChange={(e) => handleEditChange(e, 'unit')}
                                        />
                                    ) : (
                                        asset.unit
                                    )}
                                </td>
                                <td onMouseOver={(e) => handleMouseOver(e, asset.yearOfProduction)} onMouseOut={handleMouseOut}>
                                    {editingAssetId === asset._id ? (
                                        <input
                                            type="text"
                                            value={assetData.yearOfProduction ?? asset.yearOfProduction ?? ""} // Giá trị null/undefined chuyển thành rỗng
                                            onChange={(e) => handleEditChange(e, 'yearOfProduction')}
                                        />
                                    ) : (
                                        asset.yearOfProduction
                                    )}
                                </td>
                                <td onMouseOver={(e) => handleMouseOver(e, asset.yearOfUse)} onMouseOut={handleMouseOut}>
                                    {editingAssetId === asset._id ? (
                                        <input
                                            type="text"
                                            value={assetData.yearOfUse ?? asset.yearOfUse ?? ""} // Giá trị null/undefined chuyển thành rỗng
                                            onChange={(e) => handleEditChange(e, 'yearOfUse')}
                                        />
                                    ) : (
                                        asset.yearOfUse
                                    )}
                                </td>
                                <td onMouseOver={(e) => handleMouseOver(e, asset.status === 'in_use' ? 'Đang sử dụng'
                                    : asset.status === 'liquidated' ? 'Thanh lý'
                                        : 'Đã hỏng')} onMouseOut={handleMouseOut}>
                                    {asset.status === 'in_use' ? 'Đang sử dụng'
                                        : asset.status === 'liquidated' ? 'Thanh lý'
                                            : 'Đã hỏng'}
                                </td>
                                <td onMouseOver={(e) => handleMouseOver(e, asset.model)} onMouseOut={handleMouseOut}>
                                    {editingAssetId === asset._id ? (
                                        <input
                                            type="text"
                                            value={assetData.model ?? asset.model ?? ""} // Giá trị null/undefined chuyển thành rỗng
                                            onChange={(e) => handleEditChange(e, 'model')}
                                        />
                                    ) : (
                                        asset.model
                                    )}
                                </td>
                                <td onMouseOver={(e) => handleMouseOver(e, asset.serialNumber)} onMouseOut={handleMouseOut}>
                                    {editingAssetId === asset._id ? (
                                        <input
                                            type="text"
                                            value={assetData.serialNumber ?? asset.serialNumber ?? ""} // Giá trị null/undefined chuyển thành rỗng
                                            onChange={(e) => handleEditChange(e, 'serialNumber')}
                                        />
                                    ) : (
                                        asset.serialNumber
                                    )}
                                </td>
                                <td onMouseOver={(e) => handleMouseOver(e, asset.user)} onMouseOut={handleMouseOut}>
                                    {asset.user ?? ""}
                                </td>
                                <td onMouseOver={(e) => handleMouseOver(e, asset.price)} onMouseOut={handleMouseOut}>
                                    {editingAssetId === asset._id ? (
                                        <input
                                            type="text"
                                            value={assetData.price ?? asset.price ?? ""} // Giá trị null/undefined chuyển thành rỗng
                                            onChange={(e) => handleEditChange(e, 'price')}
                                        />
                                    ) : (
                                        asset.price
                                    )}
                                </td>
                                <td onMouseOver={(e) => handleMouseOver(e, asset.description)} onMouseOut={handleMouseOut}>
                                    {editingAssetId === asset._id ? (
                                        <textarea
                                            type="text"
                                            value={
                                                assetData.description
                                                    ? assetData.description.join("\n")  // Nếu assetData.description tồn tại, nối các phần tử bằng dấu xuống dòng
                                                    : asset.description
                                                        ? asset.description.join("\n")  // Nếu asset.description tồn tại, nối các phần tử bằng dấu xuống dòng
                                                        : ""  // Nếu không có giá trị nào, trả về chuỗi rỗng
                                            }
                                            onChange={(e) => handleEditChange(e, 'description')}  // Gọi hàm xử lý khi thay đổi nội dung
                                        />
                                    ) : (
                                        asset.description
                                    )}
                                </td>
                                <td onMouseOver={(e) => handleMouseOver(e, asset.notes)} onMouseOut={handleMouseOut}>
                                    {asset.notes ?? ""}
                                </td>
                                <td>
                                    {editingAssetId === asset._id ? (
                                        <button onClick={() => saveEdits(asset._id)}>Lưu</button>
                                    ) : (
                                        <button onClick={() => {
                                            setEditingAssetId(asset._id);
                                            setAssetData({ // Initialize editable data
                                                image: asset.image,
                                                name: asset.name,
                                                unit: asset.unit,
                                                yearOfProduction: asset.yearOfProduction,
                                                yearOfUse: asset.yearOfUse,
                                                model: asset.model,
                                                serialNumber: asset.serialNumber,
                                                price: asset.price,
                                                description: asset.description,
                                            });
                                        }}>Sửa</button>
                                    )}
                                </td>
                                <td>
                                    {!asset.user ? (
                                        <button onClick={() => handleSignature(asset._id, asset.assetCode, asset.name)}>Giao</button>
                                    ) : (
                                        <button disabled >Giao</button>
                                    )}
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>
            {tooltip.visible && (
                <div ref={divRef}
                    className={cx(tooltip.isImage ? 'tooltipImg' : 'tooltip')}

                    style={{ left: `${tooltip.x + tooltip.width + 30}px`, top: `${tooltip.y - tooltipPosition}px` }}
                >
                    {Array.isArray(tooltip.content) ? (
                        tooltip.content.map((item, index) => (
                            <div key={index}>{item}</div>
                        ))
                    ) : (
                        tooltip.content
                    )}
                </div>
            )}
            {stranferAsset && (
                <StranferAsset
                    setStranferAsset={setStranferAsset}
                    newStranferData={newStranferData}
                    user={user}
                    loadingOn={loadingOn}
                    loadingOff={loadingOff}
                    axiosJWT={axiosJWT}
                />
            )}
        </>
    );
};

export default ListAsset;
