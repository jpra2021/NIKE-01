import { useState, useReducer, useContext, useMemo, useEffect } from "react";
import { Card, Row, Col, Button } from "react-bootstrap";
import CertificateForm from "./CertificateForm";
import CertificateInfo from "./CertificateInfo";
import { NoticeContext } from "../../../App";
import certificateReducer from "./certificatesReducer";
import certificatesHandler from "./certificatesHandler";

const initialState = [];

const Certificate = ({ initialData, isEditable }) => {
    const { setNotices } = useContext(NoticeContext);
    const reducer = useMemo(() => (certificateReducer(setNotices)), [])
    const [ certificates, dispatch ] = useReducer(reducer, initialState);
    const handler = useMemo(() => certificatesHandler(dispatch));

    const [ isForm, setIsForm ] = useState(false);

    const handleForm = () => {        
        setIsForm(() => !isForm);
    }

    useEffect(() => {
        handler.init(initialData);
    }, []);

    return (
        <Card>
            <Card.Body>
                <Card.Title>자격증</Card.Title>
                {certificates.map((certificate, idx) => (<CertificateInfo key={idx} certificate={certificate} index={idx} handler={handler} />))}
                {isEditable &&
                    <Row className="mt-3 mb-4 text-center">
                        <Col sm="20">
                            <Button variant="primary" onClick={handleForm}>+</Button>
                        </Col>
                    </Row>
                }
                {isForm && <CertificateForm handler={handler} type="add" handleForm={handleForm} index={certificates.length}/>}
            </Card.Body>
        </Card>
    );
}

export default Certificate;