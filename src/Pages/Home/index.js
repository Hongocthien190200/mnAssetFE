import React, { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import Breadcrumb from '../Components/Breadcrumb';

import { FaWarehouse } from 'react-icons/fa';
import { AiFillSetting } from 'react-icons/ai';
import { BiTransfer } from 'react-icons/bi';
import { RiSearchLine } from 'react-icons/ri';
import { IoFilter } from 'react-icons/io5';
import { LuPlus } from 'react-icons/lu';
import Signature from '../Components/Signature';


import logo from '../../assets/logo.png';
import styles from './Home.module.scss';
import classNames from 'classnames/bind';

import { Bar } from 'react-chartjs-2';
import { Chart as ChartJS, CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend } from 'chart.js';

ChartJS.register(
    CategoryScale,
    LinearScale,
    BarElement,
    Title,
    Tooltip,
    Legend
);

const cx = classNames.bind(styles);

function Home() {
    const navigate = useNavigate();
    const dispatch = useDispatch();
    const user = useSelector((state) => state.auth.login?.currentUser);

    const data = {
        labels: ['Tháng 1', 'Tháng 2', 'Tháng 3', 'Tháng 4', 'Tháng 5', 'Tháng 6', 'Tháng 7', 'Tháng 8', 'Tháng 9', 'Tháng 10', 'Tháng 11', 'Tháng 12'],
        datasets: [
            {
                label: 'Số lượng tài sản quản lý',
                data: [120, 150, 180, 200, 160, 210, 250, 220, 230, 240, 280, 300],
                backgroundColor: 'rgba(54, 162, 235, 0.6)',
                borderColor: 'rgba(54, 162, 235, 1)',
                borderWidth: 1,
            },
        ],
    };

    const options = {
        responsive: true,
        plugins: {
            legend: {
                position: 'top',
            },
            title: {
                display: true,
                text: 'Số lượng tài sản quản lý qua từng tháng (2023)',
            },
        },
    };
    const [signature, setSignature] = useState(false);
    const handleSignature= () =>{
        setSignature(true);
    }
    return (
        <>
            <div className={cx('head-title')}>
                <div className={cx('left')}>
                    <h1>Tổng quan tài sản</h1>
                    <Breadcrumb />
                </div>
            </div>

            <ul className={cx('box-info')}>
                <li>
                    <i onClick={() => {handleSignature()}} className={cx('bx')}><FaWarehouse /></i>
                    <span className={cx('text')}>
                        <h3>320</h3>
                        <p>Kho quản lý</p>
                    </span>
                </li>
                <li>
                    <i className={cx('bx')}><BiTransfer /></i>
                    <span className={cx('text')}>
                        <h3>120</h3>
                        <p>Chuyển giao tài sản</p>
                    </span>
                </li>
                <li>
                    <i className={cx('bx')}><AiFillSetting /></i>
                    <span className={cx('text')}>
                        <h3>50</h3>
                        <p>Lịch bảo trì</p>
                    </span>
                </li>
            </ul>

            <div className={cx('table-data')}>
                <div className={cx('order')}>
                    <div className={cx('head')}>
                        <h3>Lịch sử bảo trì</h3>
                        <RiSearchLine className={cx('bx')} />
                        <IoFilter className={cx('bx')} />
                    </div>
                    <table>
                        <thead>
                            <tr>
                                <th>Tài sản</th>
                                <th>Ngày bảo trì</th>
                                <th>Trạng thái</th>
                            </tr>
                        </thead>
                        <tbody>
                            <tr>
                                <td>
                                    <img src={logo} alt='' />
                                    <p>Máy tính văn phòng</p>
                                </td>
                                <td>15-09-2023</td>
                                <td><span className={cx('status', 'completed')}>Hoàn thành</span></td>
                            </tr>
                            <tr>
                                <td>
                                    <img src={logo} alt='' />
                                    <p>Máy điều hòa</p>
                                </td>
                                <td>10-08-2023</td>
                                <td><span className={cx('status', 'pending')}>Đang chờ</span></td>
                            </tr>
                        </tbody>
                    </table>
                </div>

                <div className={cx('todo')}>
                    <div className={cx('head')}>
                        <h3>Công việc cần làm</h3>
                        <LuPlus className={cx('bx')} />
                        <IoFilter className={cx('bx')} />
                    </div>
                    <ul className={cx('todo-list')}>
                        <li className={cx('not-completed')}>
                            <p>Kiểm kê tài sản hàng tháng</p>
                            <i className={cx('bx', 'bx-dots-vertical-rounded')}></i>
                        </li>
                        <li className={cx('completed')}>
                            <p>Hoàn thành bảo trì tài sản</p>
                            <i className={cx('bx', 'bx-dots-vertical-rounded')}></i>
                        </li>
                    </ul>
                </div>
            </div>

            <div className={cx('table-chart')}>
                <div className={cx('chart')}>
                    <div className={cx('head')}>
                        <h3>Biểu đồ quản lý tài sản</h3>
                    </div>
                    <Bar data={data} options={options} />
                </div>
            </div>
            {signature && (
                <Signature />
            )}
        </>
    );
}

export default Home;
