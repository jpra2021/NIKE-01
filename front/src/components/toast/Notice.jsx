import { Toast } from "react-bootstrap";
import { useState } from "react";

const Notice = ({ title, message }) => {
    const [ show, setShow ] = useState(true);

    return (
        <Toast onClose={() => setShow(false)} show={show} delay={3000} autohide>
            <Toast.Header closeButton={false}>{title}</Toast.Header>
            <Toast.Body>{message}</Toast.Body>
        </Toast>
    );
}

export default Notice;