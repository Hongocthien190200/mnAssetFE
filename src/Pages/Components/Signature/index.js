import React, { useRef, useEffect } from 'react';
import SignatureCanvas from 'react-signature-canvas';

import { FaWindowClose } from "react-icons/fa";

import classNames from 'classnames/bind';
import styles from './SignaturePad.module.scss';
const cx = classNames.bind(styles);

const SignaturePad = ({ onSave, setSignature }) => {
    const signatureRef = useRef({});

    const clear = () => {
        signatureRef.current.clear();
    };

    const save = () => {
        const dataURL = signatureRef.current.getTrimmedCanvas().toDataURL('image/png');
        onSave(dataURL);
    };
    const CloseButton = () => {
        setSignature(false);
    }
    useEffect(() => {
        const handleKeyDown = (event) => {
            if (event.key === 'Escape') {
                CloseButton();
            }
        };

        window.addEventListener('keydown', handleKeyDown);
        return () => {
            window.removeEventListener('keydown', handleKeyDown);
        };
    }, []);
    return (
        <div className={cx("signature-user")}>
            <div className={cx("signature-container")}>
                <div className={cx("closeBtn")}><FaWindowClose onClick={() => { CloseButton() }} /></div>
                <SignatureCanvas
                    ref={signatureRef}
                    penColor='black'
                    canvasProps={{ width: 400, height: 200, className: cx('signature-canvas') }}
                />
                <div>
                    <button onClick={clear}>Clear</button>
                    <button onClick={save}>Save</button>
                </div>
            </div>
        </div>

    );
};

export default SignaturePad;
