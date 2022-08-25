import { Toast } from "react-bootstrap";
import { useState } from "react";

const Notice = ({ title, message, type }) => {
    const [ show, setShow ] = useState(true);
    let titleColor = "";

    switch (type) {
        case "success":
            titleColor = "#0d6efd";
            break;
        case "warn":
            titleColor = "#D94827";
            break;
        default:
            titleColor = "#0d6efd"
    }

    return (
        <Toast
            className="rounded"
            onClose={() => setShow(false)}
            show={show}
            delay={5000}
            autohide
        >
            <Toast.Header
                className="text-white"
                style={{backgroundColor: titleColor, padding: "8px 8px 8px 20px"}}
                closeButton={false}
            >
                <strong>{title}</strong>
            </Toast.Header>
            <Toast.Body>{message}</Toast.Body>
        </Toast>
    );
}

export default Notice;