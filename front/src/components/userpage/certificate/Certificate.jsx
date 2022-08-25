import { useState, useReducer, useContext, useMemo } from "react";
import { Card, Row, Col, Button } from "react-bootstrap";
import CertificateForm from "./CertificateForm";
import CertificateInfo from "./CertificateInfo";
import { NoticeContext } from "../../../App";
import certificateReducer from "./certificateReducer";

const initialState = [];

const Certificate = ({ isEditable }) => {
    const { setNotices } = useContext(NoticeContext);
    const reducer = useMemo(() => (certificateReducer(setNotices)), [])
    const [ certificates, dispatch ] = useReducer(reducer, initialState);
    const [ isForm, setIsForm ] = useState(false);

    const handleForm = () => {        
        setIsForm(() => !isForm);
    }

    return (
        <Card>
            <Card.Body>
                <Card.Title>자격증</Card.Title>
                {certificates.map((certificate, idx) => (<CertificateInfo key={idx} certificate={certificate} index={idx} dispatch={dispatch} />))}
                {isEditable &&
                    <Row className="mt-3 mb-4 text-center">
                        <Col sm="20">
                            <Button variant="primary" onClick={handleForm}>+</Button>
                        </Col>
                    </Row>
                }
                {isForm && <CertificateForm dispatch={dispatch} type="add" handleForm={handleForm} index={certificates.length}/>}
            </Card.Body>
        </Card>
    );
}

export default Certificate;