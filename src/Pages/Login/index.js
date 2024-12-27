import React, { useState, useEffect, useRef } from 'react';
import { useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import LoaderSpinner from '../Components/LoaderSpinner';

import { FaUser, FaLock, FaEnvelope, FaFacebookF, FaTwitter, FaGoogle, FaLinkedinIn } from 'react-icons/fa';
import Signin from '../../assets/signin.svg';
import Signup from '../../assets/signup.svg';

import classNames from 'classnames/bind';
import styles from './Login.module.scss';

import { loginUser, registerUser } from "../../redux/apiRequest";
import { showSuccessToast, showErrorToast } from '../Components/ToastMessage';

const cx = classNames.bind(styles);

const Login = () => {
    const dispatch = useDispatch();
    // lưu trữ thông tin user hiện tại
    const currentUser = useSelector((state) => state.auth.login?.currentUser);

    // chuyển trang
    const navigate = useNavigate();

    // State lưu trữ - cập nhật các thông tin đăng nhập và đăng ký, hiệu ứng loading khi đăng nhập - đăng ký
    const [username, setUsername] = useState("");
    const [email, setMail] = useState("");
    const [password, setPassword] = useState("");

    // State để kiểm soát hiển thị spinner
    const [loading, setLoading] = useState(false);

    // State để kiểm soát lỗi đăng nhập
    const [errors, setErrors] = useState({});

    // State để kiểm soát lỗi đăng nhập
    const [errorsRegis, setErrorsRegis] = useState({});



    //State cho cơ chế đăng ký đăng nhập
    const containerRef = useRef(null);
    //State kiểm soát mode đăng ký
    const [isSignUpMode, setIsSignUpMode] = useState(false);

    // Cơ chế đổi mode đăng ký
    const handleSignUpClick = () => {
        setUsername('');
        setPassword('');
        setErrors('');
        setIsSignUpMode(true);
        if (containerRef.current) {
            containerRef.current.classList.add(cx('sign-up-mode'));
        }
    };
    // cơ chế đổi mode đăng nhập
    const handleSignInClick = () => {
        setUsername('');
        setPassword('');
        setMail('');
        setErrorsRegis('');
        setIsSignUpMode(false);
        if (containerRef.current) {
            containerRef.current.classList.remove(cx('sign-up-mode'));
        }
    };

    useEffect(() => {
        // Kiểm tra xem người dùng đã đăng nhập hay chưa
        if (currentUser) {
            navigate("/");
        }
    }, [currentUser]);

    //Hàm xử lý khi người dùng đăng nhập
    const handleLogin = (e) => {
        e.preventDefault();
        setLoading(true);
        const newUser = {
            username: username,
            password: password,
        };
        if (!username.trim() || !password.trim()) {
            setErrors({ message: "Vui lòng điền đầy đủ thông tin." });
            setLoading(false); // Ẩn spinner nếu có lỗi
            return;
        }
        loginUser(newUser, dispatch, navigate, handleLoginError);
    };
    // Hàm xử lý khi người dùng đăng nhập lỗi
    const handleLoginError = (error) => {
        setErrors({ message: error.message });
        setLoading(false);
    };

    //Hàm xử lý khi người dùng đăng ký
    const handleRegister = (e) => {
        e.preventDefault();
        setLoading(true);
        const newUser = {
            username: username,
            password: password,
            email: email,
        };
        if (!username.trim() || !password.trim() || !email.trim()) {
            setErrorsRegis({ message: "Vui lòng điền đầy đủ thông tin." });
            setLoading(false);
            return;
        }
        if (!username.trim() || !password.trim() || !email.trim()) {
            setErrorsRegis({ message: "Vui lòng điền đầy đủ thông tin." });
            setLoading(false);
            return;
        }

        if (!validateUsername(username)) {
            setErrorsRegis({ message: "Tên tài khoản phải từ 8 ký tự và không chứa ký tự đặc biệt." });
            setLoading(false);
            return;
        }

        if (password.length < 8) {
            setErrorsRegis({ message: "Mật khẩu phải có từ 8 ký tự." });
            setLoading(false);
            return;
        }
        registerUser(newUser, dispatch, handleRegisterSuccess, handleRegisterError);
    };
    //Hàm xử lý validate tên tài khoản
    const validateUsername = (username) => {
        const regex = /^[a-zA-Z0-9!@#$%]{8,}$/;
        return regex.test(username);
    };
    //xử lý khi người dùng đăng ký thành công tài khoản
    const handleRegisterSuccess = () => {
        setErrorsRegis({ message: "Thành công! Hãy liên hệ Admin để nhận khóa bí mật." });
        setLoading(false);
        setIsSignUpMode(false);
        setUsername('');
        setPassword('');
        setMail('');
        setErrorsRegis((''));
        showSuccessToast('Đăng ký thành công!');

    };
    // Hàm xử lý khi người dùng đăng ký lỗi
    const handleRegisterError = (error) => {
        setErrorsRegis({ message: error.message });
        setLoading(false);
        showErrorToast('Thất bại, Xin hãy thử lại!');
    };

    return (
        <>
            {loading && <div className={cx("spinner-overlay")}></div>}
            <div className={cx('container', { 'sign-up-mode': isSignUpMode })} ref={containerRef}>
                <div className={cx('forms-container')}>
                    <div className={cx('signin-signup')}>
                        <form className={cx('sign-in-form')} onSubmit={handleLogin}>
                            <h2 className={cx('title')}>Đăng nhập</h2>
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
                            <div className={cx("login-error")}>
                                <span>{errors?.message}</span>
                            </div>
                            <input type="submit" value="đăng nhập" className={cx('btn', 'solid')} />

                            <p className={cx('social-text')}>Đăng nhập với phương thức khác</p>
                            <div className={cx('social-media')}>
                                <a href="#" className={cx('social-icon')}>
                                    <FaFacebookF />
                                </a>
                                <a href="#" className={cx('social-icon')}>
                                    <FaTwitter />
                                </a>
                                <a href="#" className={cx('social-icon')}>
                                    <FaGoogle />
                                </a>
                                <a href="#" className={cx('social-icon')}>
                                    <FaLinkedinIn />
                                </a>
                            </div>
                        </form>
                        <form action="#" className={cx('sign-up-form')} onSubmit={handleRegister}>
                            <h2 className={cx('title')}>Đăng ký</h2>
                            <div className={cx('input-field')}>
                                <i>
                                    <FaUser className={cx('icon')} />
                                </i>
                                <input
                                    type="text"
                                    id="usernameRegis"
                                    name="username"
                                    value={username}
                                    onChange={(e) => setUsername(e.target.value)}
                                    placeholder="Tên tài khoản" />
                            </div>
                            <div className={cx('input-field')}>
                                <i>
                                    <FaEnvelope className={cx('icon')} />
                                </i>
                                <input
                                    type="email"
                                    id="emailRegis"
                                    name="email"
                                    value={email}
                                    onChange={(e) => setMail(e.target.value)}
                                    placeholder="Email" />
                            </div>
                            <div className={cx('input-field')}>
                                <i>
                                    <FaLock className={cx('icon')} />
                                </i>
                                <input
                                    type="password"
                                    id="passwordRegis"
                                    name="password"
                                    value={password}
                                    onChange={(e) => setPassword(e.target.value)}
                                    placeholder="Mật khẩu" />
                            </div>
                            <div className={cx("login-error")}>
                                <span>{errorsRegis?.message}</span>
                            </div>
                            <input type="submit" className={cx('btn')} value="đăng ký" />

                            <p className={cx('social-text')}>Đăng ký với phương thức khác</p>
                            <div className={cx('social-media')}>
                                <a href="#" className={cx('social-icon')}>
                                    <FaFacebookF />
                                </a>
                                <a href="#" className={cx('social-icon')}>
                                    <FaTwitter />
                                </a>
                                <a href="#" className={cx('social-icon')}>
                                    <FaGoogle />
                                </a>
                                <a href="#" className={cx('social-icon')}>
                                    <FaLinkedinIn />
                                </a>
                            </div>
                        </form>
                    </div>
                </div>
                <div className={cx('panels-container')}>
                    <div className={cx('panel', 'left-panel')}>
                        <div className={cx('content')}>
                            <h3>Bạn là người mới</h3>
                            <p>
                                Bắt đầu tham gia các khóa học của chúng tôi bằng cách đăng ký tài khoản miễn phí!
                            </p>
                            <button className={cx('btn', 'transparent')} onClick={handleSignUpClick} id="sign-up-btn">
                                Đăng ký
                            </button>
                        </div>
                        <img src={Signin} className={cx('image')} alt="Sign up" />
                    </div>
                    <div className={cx('panel', 'right-panel')}>
                        <div className={cx('content')}>
                            <h3>Bạn đã có tài khoản</h3>
                            <p>
                                Hãy đăng nhập ngay để tiếp tục tham gia các khóa đào tạo của chúng tôi!
                            </p>
                            <button className={cx('btn', 'transparent')} onClick={handleSignInClick} id="sign-in-btn">
                                Đăng nhập
                            </button>
                        </div>
                        <img src={Signup} className={cx('image')} alt="Sign in" />
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
