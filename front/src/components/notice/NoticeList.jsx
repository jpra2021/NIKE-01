import { useContext, useState } from 'react';
import ToastContainer from 'react-bootstrap/ToastContainer';
import { Toast } from "react-bootstrap"
import Notice from './Notice';
import { NoticeContext } from "../Portfolio"

function NoticeList() {
    const { notices } = useContext(NoticeContext);
    const [ show, setShow ] = useState(true)
    console.log(notices.map((notice, idx) => <Notice key={idx} title={notice.title}  message={notice.message} type={notice.type} />));
    return (
        <ToastContainer containerPosition="fixed" position="top-end" className="mt-2 me-2">
            {notices.map((notice, idx) => <Notice key={idx} title={notice.title}  message={notice.message} type={notice.type} />)}
        </ToastContainer>
    );
}

export default NoticeList;