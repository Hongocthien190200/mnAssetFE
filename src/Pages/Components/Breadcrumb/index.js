import React from 'react';
import { Link, useLocation } from 'react-router-dom';
import { HiChevronRight } from 'react-icons/hi';
import styles from './Breadcrumb.module.scss';
import classNames from 'classnames/bind';

const cx = classNames.bind(styles);

function Breadcrumb() {
    const location = useLocation(); // Lấy thông tin đường dẫn hiện tại
    const currentPath = location.pathname; // Đường dẫn hiện tại

    // Xác định tên breadcrumb dựa trên đường dẫn hiện tại
    let additionalItem = null; // Khởi tạo biến cho phần tử bổ sung
    if (currentPath === '/') {
        additionalItem = null; // Không có thêm phần tử nào cho trang chủ
    } else if (currentPath === '/assets'){
        additionalItem = <Link className={cx('active')}  to='/assets'>Tài sản</Link>; // Hoặc tên khác nếu cần
    }else if (currentPath === '/accounts'){
        additionalItem = <Link className={cx('active')}  to='/accounts'>Quản lý người dùng</Link>; // Hoặc tên khác nếu cần
    } else if (currentPath === '/setting'){
        additionalItem = <Link className={cx('active')} to='/setting'>Cài đặt</Link>; // Hoặc tên khác nếu cần
    } 

    return (
        <ul className={cx('breadcrumb')}>
            <li>
                <Link to="#">Tổng quan</Link>
            </li>
            <li><HiChevronRight className={cx('bx')} /></li>
            <li>
                <Link className={cx(currentPath === '/'?'active':'')} to="/">Trang chủ</Link>
            </li>
            {additionalItem && (
                <>
                    <li><HiChevronRight className={cx('bx')} />{additionalItem}</li>
                </>
            )}
        </ul>
    );
}

export default Breadcrumb;
