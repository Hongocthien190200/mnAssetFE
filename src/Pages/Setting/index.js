import React, { useState, useEffect } from 'react';
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import Breadcrumb from '../Components/Breadcrumb';



// import { getAllSubjectByAllCategory } from "../../redux/apiRequest";
import { createAxios } from '../../createInstance';
import { loginSuccess } from '../../redux/authSlice';
import { HiChevronRight } from "react-icons/hi";
import { FaCalendarCheck } from "react-icons/fa6";
import { BiSolidGroup } from "react-icons/bi";
import { AiFillDollarCircle } from "react-icons/ai";
import { RiSearchLine } from "react-icons/ri";
import { IoFilter } from "react-icons/io5";
import { LuPlus } from "react-icons/lu";

import logo from "../../assets/logo.png"
import styles from './Setting.module.scss';
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
    let axiosJWT = createAxios(user, dispatch, loginSuccess);
    const data = {
        labels: [
            'Tháng 1', 'Tháng 2', 'Tháng 3', 'Tháng 4',
            'Tháng 5', 'Tháng 6', 'Tháng 7', 'Tháng 8',
            'Tháng 9', 'Tháng 10', 'Tháng 11', 'Tháng 12'
        ],
        datasets: [
            {
                label: 'Số lượng đơn hàng',
                data: [120, 190, 300, 500, 200, 300, 400, 350, 450, 500, 600, 700],
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
                text: 'Số lượng đơn hàng qua từng tháng (2023)',
            },
        },
    };
    return (
        <>
            <div className={cx("head-title")}>
                <div className={cx("left")}>
                    <h1>Tổng quan</h1>
                    <Breadcrumb/>
                </div>
                {/* <a href="#" className={cx("btn-download")}>
                    <i className={cx('bx', 'bxs-cloud-download')} ></i>
                    <span className={cx("text")}>Download PDF</span>
                </a> */}
            </div>

            <ul className={cx("box-info")}>
                <li>
                    <i className={cx('bx')}><FaCalendarCheck /></i>
                    <span className={cx("text")}>
                        <h3>1020</h3>
                        <p>Đơn hàng mới</p>
                    </span>
                </li>
                <li>
                    <i className={cx('bx')}><BiSolidGroup /></i>
                    <span className={cx("text")}>
                        <h3>2834</h3>
                        <p>Khách hàng</p>
                    </span>
                </li>
                <li>
                    <i className={cx('bx')}><AiFillDollarCircle /></i>
                    <span className={cx("text")}>
                        <h3>2543tr</h3>
                        <p>Doanh thu</p>
                    </span>
                </li>
            </ul>

            <div className={cx("table-data")}>
                <div className={cx("order")}>
                    <div className={cx("head")}>
                        <h3>Recent Orders</h3>
                        <RiSearchLine className={cx('bx')} />
                        <IoFilter className={cx('bx')} />
                    </div>
                    <table>
                        <thead>
                            <tr>
                                <th>User</th>
                                <th>Date Order</th>
                                <th>Status</th>
                            </tr>
                        </thead>
                        <tbody>
                            <tr>
                                <td>
                                    <img src={logo} alt='' />
                                    <p>John Doe</p>
                                </td>
                                <td>01-10-2021</td>
                                <td><span className={cx("status", "completed")}>Completed</span></td>
                            </tr>
                            <tr>
                                <td>
                                    <img src={logo} alt='' />
                                    <p>John Doe</p>
                                </td>
                                <td>01-10-2021</td>
                                <td><span className={cx("status", "pending")}>Pending</span></td>
                            </tr>
                            <tr>
                                <td>
                                    <img src={logo} alt='' />
                                    <p>John Doe</p>
                                </td>
                                <td>01-10-2021</td>
                                <td><span className={cx("status", "process")}>Process</span></td>
                            </tr>
                            <tr>
                                <td>
                                    <img src={logo} alt='' />
                                    <p>John Doe</p>
                                </td>
                                <td>01-10-2021</td>
                                <td><span className={cx("status", "pending")}>Pending</span></td>
                            </tr>
                            <tr>
                                <td>
                                    <img src={logo} />
                                    <p>John Doe</p>
                                </td>
                                <td>01-10-2021</td>
                                <td><span className={cx("status", "completed")}>Completed</span></td>
                            </tr>
                        </tbody>
                    </table>
                </div>

                <div className={cx("todo")}>
                    <div className={cx("head")}>
                        <h3>Todos</h3>
                        <LuPlus className={cx('bx')} />
                        <IoFilter className={cx('bx')} />
                    </div>
                    <ul className={cx("todo-list")}>
                        <li className={cx("completed")}>
                            <p>Todo List</p>
                            <i className={cx('bx', 'bx-dots-vertical-rounded')}></i>
                        </li>
                        <li className={cx("completed")}>
                            <p>Todo List</p>
                            <i className={cx('bx', 'bx-dots-vertical-rounded')}></i>
                        </li>
                        <li className={cx("not-completed")}>
                            <p>Todo List</p>
                            <i className={cx('bx', 'bx-dots-vertical-rounded')}></i>
                        </li>
                        <li className={cx("completed")}>
                            <p>Todo List</p>
                            <i className={cx('bx', 'bx-dots-vertical-rounded')}></i>
                        </li>
                        <li className={cx("not-completed")}>
                            <p>Todo List</p>
                            <i className={cx('bx', 'bx-dots-vertical-rounded')}></i>
                        </li>
                    </ul>
                </div>
            </div>

            <div className={cx("table-chart")}>
                <div className={cx("chart")}>
                    <div className={cx("head")}>
                        <h3>Biểu đồ đơn hàng qua các năm</h3>
                    </div>
                    <Bar data={data} options={options} />
                </div>
            </div>

        </>
    );
}

export default Home;
