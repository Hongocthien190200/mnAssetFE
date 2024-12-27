import 'bootstrap/dist/css/bootstrap.min.css';
import React, { useState, useEffect } from 'react';
import { useDispatch, useSelector } from "react-redux";
import { useLocation, useNavigate, Link } from 'react-router-dom'; 

import { logOut } from "../../../redux/apiRequest";
import { logoutSuccess } from "../../../redux/authSlice";
import { createAxios } from "../../../createInstance";


import { AiFillHome } from "react-icons/ai";
import { MdDashboard } from "react-icons/md";
import { FaCog } from "react-icons/fa";
import { FaSignOutAlt } from "react-icons/fa";
import { IoClose } from "react-icons/io5";
import { MdOutlineMenu } from "react-icons/md";
import { RiAdminFill } from "react-icons/ri";

import { RiSearchLine } from "react-icons/ri";
import { GoBellFill } from "react-icons/go";
import { FaThList } from "react-icons/fa";


import logo from "../../../assets/logo.png";

import styles from './DefaultLayout.module.scss';
import classNames from "classnames/bind";
const cx = classNames.bind(styles);

function DefaultLayout({ children }) {
    const user = useSelector((state) => state.auth.login?.currentUser);
    const accessToken = user?.accessToken;
    const id = user?._id;
    const location = useLocation();
    const dispatch = useDispatch();
    const navigate = useNavigate();
    let axiosJWT = createAxios(user, dispatch, logoutSuccess);

    const [activeItem, setActiveItem] = useState('Tổng quan');
    const [isSidebarHidden, setSidebarHidden] = useState(false);
    const [isSearchFormShown, setSearchFormShown] = useState(false);
    const [isDarkMode, setDarkMode] = useState(false);

    useEffect(() => {
        // Sidebar auto-hide on smaller screens
        if (window.innerWidth < 768) {
            setSidebarHidden(true);
        }

        const handleResize = () => {
            if (window.innerWidth > 576) {
                setSearchFormShown(false);
            }
        };

        window.addEventListener('resize', handleResize);
        return () => window.removeEventListener('resize', handleResize);
    }, []);
    useEffect(() => {
        // Mapping từ đường dẫn đến tên mục
        const pathToItem = {
            '/': 'Tổng quan',
            '/assets': 'Tài sản',
            '/setting': 'Setting',
            '/accounts': 'Accounts',
        };

        // Lấy đường dẫn hiện tại
        const currentPath = location.pathname;

        // Cập nhật activeItem dựa trên đường dẫn
        setActiveItem(pathToItem[currentPath] || 'Tổng quan');
    }, [location.pathname]);

    const toggleSidebar = () => {
        setSidebarHidden(!isSidebarHidden);
    };

    const handleSearchClick = (e) => {
        if (window.innerWidth < 576) {
            setSearchFormShown(!isSearchFormShown);
        }
    };

    const handleModeChange = () => {
        setDarkMode(!isDarkMode);
        if (!isDarkMode) {
            document.body.classList.add('dark');
            document.body.style.backgroundColor = '#060714';
        }
        else {
            document.body.classList.remove('dark');
            document.body.style.backgroundColor = '';
        }
    };

    const handleLogoutConfirmed = () => {
        logOut(dispatch, id, navigate, accessToken, axiosJWT);
    }
    return (
        <div className={cx("admin-layout", { "dark": isDarkMode })}>
            <section className={cx("sidebar", isSidebarHidden ? 'hide' : '')}>
                <Link to="/" className={cx("brand")}>
                    <AiFillHome className={cx('bx')} />
                    <span className={cx("text")}>Sos.Assets</span>
                </Link>
                <ul className={cx('side-menu', 'top')}>
                    <li className={cx({ active: activeItem === 'Tổng quan' })}>
                        <Link to="/" onClick={() => setActiveItem('Tổng quan')}>
                            <MdDashboard className={cx('bx')} />
                            <span className={cx("text")}>Tổng quan</span>
                        </Link>
                    </li>
                    <li className={cx({ active: activeItem === 'Tài sản' })}>
                        <Link to="/assets" onClick={() => setActiveItem('Tài sản')}>
                            <FaThList className={cx('bx')} />
                            <span className={cx("text")}>Tài sản</span>
                        </Link>
                    </li>
                    <li className={cx({ active: activeItem === 'Accounts' })}>
                        <Link to="/accounts" onClick={() => setActiveItem('Accounts')}>
                            <RiAdminFill className={cx('bx')} />
                            <span className={cx("text")}>Tài khoản</span>
                        </Link>
                    </li>
                </ul>
                <ul className={cx("side-menu")}>
                    <li className={cx({ active: activeItem === 'Setting' })}>
                        <Link to="/setting" onClick={() => setActiveItem('Setting')}>
                            <FaCog className={cx('bx', 'bxs-cog')} />
                            <span className={cx("text")}>Cài đặt</span>
                        </Link>
                    </li>
                    <li>
                        <Link onClick={handleLogoutConfirmed} className={cx("logout")}>
                            <FaSignOutAlt className={cx('bx')} />
                            <span className={cx("text")}>Đăng xuất</span>
                        </Link>
                    </li>
                </ul>
            </section>

            <section className={cx("content")}>
                <nav>
                    <MdOutlineMenu className={cx('bx', "bx-menu")} onClick={toggleSidebar} />
                    <div className={cx("nav-link")} onClick={toggleSidebar}>Danh mục</div>
                    <form action="#" className={cx(isSearchFormShown ? 'show' : '')}>
                        <div className={cx("form-input")}>
                            <input type="search" placeholder="Tìm kiếm..." />
                            <button type="submit" className={cx("search-btn")} onClick={handleSearchClick}>
                                {isSearchFormShown ? <IoClose className={cx('bx', 'bx-x')} /> : <RiSearchLine className={cx('bx', 'bx-search')} />}
                            </button>
                        </div>
                    </form>
                    <input type="checkbox" id="switch-mode" className={cx("switch-mode")} hidden onChange={handleModeChange} />
                    <label htmlFor="switch-mode" className={cx("switch-mode2")}></label>
                    <Link to="/admin/notification" className={cx("notification")}>
                        <GoBellFill className={cx('bx')} />
                        <span className={cx("num")}>8</span>
                    </Link>
                    <Link to="/admin/profile" className={cx("profile")}>
                        <img src={logo} />
                    </Link>
                </nav>

                <main className={cx('default-layout')}>
                    {children}
                </main>
            </section>
        </div>
    );
}

export default DefaultLayout;
