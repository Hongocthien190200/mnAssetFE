import React, { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';

import { createAxios } from '../../../../createInstance';
import { loginSuccess } from '../../../../redux/authSlice';
import { createTransferAsset } from '../../../../redux/apiRequest';

import SignaturePad from '../../../Components/Signature';

import styles from './Stranfer.module.scss';
import classNames from 'classnames/bind';
const cx = classNames.bind(styles);

const Stranfer = ({ setStranferAsset, newStranferData, user, loadingOn, loadingOff, axiosJWT }) => {
    console.log(newStranferData)
    const dispatch = useDispatch();
    const [signature, setSignature] = useState(false);
    const [signatureURL, setSignatureURL] = useState(null);

    const state = useSelector((state) => state.auth?.allusers);
    const userlist = state?.listuser || [];

    const [selectedUser, setSelectedUser] = useState('all');

    // Hàm xử lý khi thay đổi người dùng
    const handleUserChange = (e) => {
        const userId = e.target.value;
        const user = userlist.find(user => user._id === userId);
        setSelectedUser(user || {});
    };

    const handleBtnSign = () => {
        setSignature(true);
    };

    const handleSaveSignature = (dataURL) => {
        setSignatureURL(dataURL); // Lưu URL hình chữ ký
        setSignature(false); // Đóng modal ký tên
    };

    const handleConfirm = async () => {
        if (selectedUser== 'all' || !selectedUser || !newStranferData) {
            alert("Vui lòng chọn bên B và kiểm tra lại thông tin tài sản.");
            return;
        }
        // Tạo payload cho biên bản bàn giao
        const transferData = {
            content: [{
                asset: newStranferData.id,
                status: ["Tình trạng ghi chú tại đây"]
            }],
            partyA: user._id,
            partyASignature: signatureURL,
            partyB: selectedUser._id,
        };

        loadingOn(); // Bật trạng thái loading
        console.log(transferData);
        loadingOff();
        // try {
        //     await createTransferAsset(dispatch, transferData, axiosJWT);
        //     alert("Biên bản bàn giao đã được tạo thành công.");
        //     setStranferAsset(false); // Đóng popup sau khi xác nhận
        // } catch (error) {
        //     console.error("Lỗi khi tạo biên bản bàn giao:", error);
        //     alert("Đã xảy ra lỗi khi tạo biên bản bàn giao.");
        // } finally {
        //     loadingOff(); // Tắt trạng thái loading
        // }
    };

    const handleCancelBtn = () => {
        setStranferAsset(false);
    };

    return (
        <>
            <div className={cx("popup")}>
                <div className={cx("popup-content")}>
                    <div className={cx("header")}>
                        <h2>Cộng hòa xã hội chủ nghĩa Việt Nam</h2>
                        <h3>Độc lập - Tự do - Hạnh phúc</h3>
                    </div>
                    <h2 className={cx("title")}>Biên bản bàn giao tài sản</h2>
                    <h3 className={cx("title2")}>Các bên gồm có:</h3>
                    <div className={cx("parties")}>
                        <div className={cx("party")}>
                            <h4>Bên bàn giao (Bên A)</h4>
                            <p>Ông/Bà: {user.fullname}</p>
                            <p>Chức vụ: {user.position}</p>
                        </div>
                        <div className={cx("party")}>
                            <h4>Bên nhận (Bên B)</h4>
                            <p>
                                Ông/Bà:{" "}
                                <select onChange={handleUserChange} value={selectedUser._id}>
                                    <option value='all'>--Tất cả--</option>
                                    {userlist.map((user) => (
                                        <option key={user._id} value={user._id}>
                                            {user.fullname}
                                        </option>
                                    ))}
                                </select>
                            </p>
                            <p>Chức vụ: {selectedUser.position || "Chưa xác định"}</p>
                        </div>
                    </div>
                    <p className={cx('address')}>Địa chỉ: 10E Bùi Văn Ba, Phường Tân Thuận Đông, Quận 7, TP.Hồ Chí Minh</p>
                    <h3 className={cx("title3")}>Nội dung bàn giao gồm có:</h3>
                    <table className={cx("asset-table")}>
                        <thead>
                            <tr>
                                <th>STT</th>
                                <th>Nội dung</th>
                                <th>Số lượng</th>
                                <th>Tình trạng</th>
                            </tr>
                        </thead>
                        <tbody>
                            <tr>
                                <td>1</td>
                                <td>tài sản: {newStranferData.name} <br />mã tài sản: {newStranferData.code}</td>
                                <td>1</td>
                                <td>
                                    <textarea
                                        placeholder=""
                                        rows={1}
                                        onInput={(e) => {
                                            e.target.style.height = "auto";
                                            e.target.style.height = `${e.target.scrollHeight}px`;
                                        }}
                                    />
                                </td>
                            </tr>
                        </tbody>
                    </table>
                    <div className={cx("signatures")}>
                        <p className={cx('address-sg')}>TP. Hồ Chí Minh, ngày 25 tháng 10 năm 2024.</p>
                        <div className={cx("signature-section")}>
                            <div className={cx("signature")}>
                                <h4>Bên A ký tên</h4>
                                {signatureURL ? (
                                    <img src={signatureURL} alt="Signature" className={cx("signature-image")} />
                                ) : (
                                    <button onClick={handleBtnSign} className={cx("signature-box")}>Ký tên</button>
                                )}
                                <p>{user.fullname}</p>
                            </div>
                            <div className={cx("signature")}>
                                <h4>Bên B ký tên</h4>
                                {/* <button className={cx("signature-box")}>Ký tên</button> */}
                                <p>{selectedUser.fullname || "Chưa xác định"}</p>
                            </div>
                        </div>
                    </div>
                    <div className={cx("buttons")}>
                        <button onClick={handleConfirm} className={cx("confirm-button")}>Xác nhận</button>
                        <button onClick={handleCancelBtn} className={cx("cancel-button")}>Hủy</button>
                    </div>
                </div>
            </div>
            {signature && (
                <SignaturePad onSave={handleSaveSignature} setSignature={setSignature} />
            )}
        </>
    );
};

export default Stranfer;
