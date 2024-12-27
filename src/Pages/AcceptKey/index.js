import React, { useState, useEffect, useRef } from 'react';
import { useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import LoaderSpinner from '../Components/LoaderSpinner';

import {showSuccessToast} from '../Components/ToastMessage'
import { FaUser, FaLock } from 'react-icons/fa';
import { FaKey } from "react-icons/fa6";

import Signin from '../../assets/signin.svg';

import classNames from 'classnames/bind';
import styles from '../Login/Login.module.scss';

import { acceptkeyUser } from "../../redux/apiRequest";

const cx = classNames.bind(styles);

const Login = () => {
    const dispatch = useDispatch();
    // lưu trữ thông tin user hiện tại
    const currentUser = useSelector((state) => state.auth.login?.currentUser);

    // chuyển trang
    const navigate = useNavigate();

    // State lưu trữ - cập nhật các thông tin kích hoạt tài khoản và đăng ký, hiệu ứng loading khi kích hoạt tài khoản - đăng ký
    const [username, setUsername] = useState("");
    const [code, setCode] = useState("");
    const [password, setPassword] = useState("");

    // State để kiểm soát hiển thị spinner
    const [loading, setLoading] = useState(false);

    // State để kiểm soát lỗi kích hoạt tài khoản
    const [errors, setErrors] = useState({});
    
    const containerRef = useRef(null);
    //State kiểm soát mode đăng ký
    const [isSignUpMode, setIsSignUpMode] = useState(false);


    useEffect(() => {
        // Kiểm tra xem người dùng đã kích hoạt tài khoản hay chưa
        if (currentUser) {
            navigate("/");
        }
    }, [currentUser]);

    //Hàm xử lý khi người dùng kích hoạt tài khoản
    const handleLogin = (e) => {
        e.preventDefault();
        setLoading(true);
        const newUser = {
            username: username,
            password: password,
            code: code,
        };
        if (!username.trim() || !password.trim() || !code.trim()) {
            setErrors({ message: "Vui lòng điền đầy đủ thông tin." });
            setLoading(false); // Ẩn spinner nếu có lỗi
            return;
        }
        acceptkeyUser(newUser, dispatch, acceptSuccess, handleLoginError);
    };
    // Hàm xử lý khi người dùng kích hoạt tài khoản lỗi
    const handleLoginError = (error) => {
        setErrors({ message: error.message });
        setLoading(false);
    };

    const handleButtonLogin = () =>{
        navigate('/login');
    }
    const acceptSuccess=()=>{
        setLoading(false);
        navigate('/login');
        showSuccessToast("Đã kích hoạt tài khoản thành công!");
    }
    return (
        <>
            {loading && <div className={cx("spinner-overlay")}></div>}
            <div className={cx('container', { 'sign-up-mode': isSignUpMode })} ref={containerRef}>
                <div className={cx('forms-container')}>
                    <div className={cx('signin-signup')}>
                        <form className={cx('sign-in-form')} onSubmit={handleLogin}>
                            <h2 className={cx('title')}>Kích hoạt tài khoản</h2>
                            <div className={cx('input-field')}>
                                <i>
                                    <FaUser className={cx('icon')} />
                                </i>
                                <input
                                    type="text"
                                    id="username"
                                    name="username"
                                    value={username}
                                    onChange={(e) => setUsername(e.target.value)}
                                    placeholder="Tên tài khoản" />
                            </div>
                            <div className={cx('input-field')}>
                                <i>
                                    <FaLock className={cx('icon')} />
                                </i>
                                <input
                                    type="password"
                                    id="password"
                                    name="password"
                                    value={password}
                                    onChange={(e) => setPassword(e.target.value)}
                                    placeholder="Mật khẩu" />
                            </div>
                            <div className={cx('input-field')}>
                                <i>
                                    <FaKey className={cx('icon')} />
                                </i>
                                <input
                                    type="password"
                                    id="code"
                                    name="code"
                                    value={code}
                                    onChange={(e) => setCode(e.target.value)}
                                    placeholder="Mã kích hoạt" />
                            </div>
                            <div className={cx("login-error")}>
                                <span>{errors?.message}</span>
                            </div>
                            <input type="submit" value="Kích hoạt" className={cx('btn', 'solid')} />
                        </form>
                    </div>
                </div>
                <div className={cx('panels-container')}>
                    <div className={cx('panel', 'left-panel')}>
                        <div className={cx('content')}>
                            <h3>Bạn đã kích hoạt tài khoản?</h3>
                            <p>
                                Hãy đăng nhập để bắt đầu sử dụng ứng dụng và khám phá những điều mới mẻ!
                            </p>
                            <button onClick={()=>{handleButtonLogin()}} className={cx('btn', 'transparent')} id="sign-up-btn">
                                Đăng nhập
                            </button>
                        </div>
                        <img src={Signin} className={cx('image')} alt="Sign up" />
                    </div>
                </div>
            </div>
            {loading && (
                <LoaderSpinner/>
            )}
        </>

    );
};

export default Login;
