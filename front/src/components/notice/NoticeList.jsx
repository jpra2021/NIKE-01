import React, { useState, useContext } from 'react';
import ToastContainer from 'react-bootstrap/ToastContainer';
import Notice from './Notice';
import { NoticeContext } from '../../App';

function NoticeList() {
    const { notices } = useContext(NoticeContext);

    return (
        <ToastContainer containerPosition="fixed" position="top-end" className="mt-2 me-2">
            {notices.map((notice, idx) => <Notice key={idx} title={notice.title}  message={notice.message} type={notice.type} />)}
        </ToastContainer>
    );
}

export default NoticeList;