import React from 'react';
import { ColorRing } from "react-loader-spinner";


import classNames from 'classnames/bind';
import styles from './Loader.module.scss';
const cx = classNames.bind(styles);

const LoaderSpinner = () => {

    return (
        <div className={cx("spinner-container")}>
            <ColorRing
                visible={true}
                height="80"
                width="80"
                ariaLabel="color-ring-loading"
                wrapperStyle={{}}
                wrapperClass="color-ring-wrapper"
                colors={['#e15b64', '#f47e60', '#f8b26a', '#abbd81', '#849b87']}
            />
        </div>

    );
};

export default LoaderSpinner;
