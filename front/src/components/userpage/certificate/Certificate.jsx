import { useState, useReducer, useContext, useMemo, useEffect } from "react";
import { Card, Row, Col, Button } from "react-bootstrap";
import CertificateForm from "./CertificateForm";
import CertificateInfo from "./CertificateInfo";
import certificateReducer from "./certificatesReducer";
import certificatesHandler from "./certificatesHandler";
import { TYPES } from "../../util/util";

const initialState = [];

const Certificate = ({ initialData, isEditable }) => {
    const reducer = useMemo(() => (certificateReducer()), [])
    const [ certificates, dispatch ] = useReducer(reducer, initialState);
    const handler = useMemo(() => certificatesHandler(dispatch), [dispatch]);

    const [ isForm, setIsForm ] = useState(false);
    
    useEffect(() => {
        handler.init(initialData);
    }, []);
    
    const certificateList  = useMemo(() => {
        return certificates.map((_, idx) => (<CertificateInfo key={idx} certificates={certificates} index={idx} handler={handler} />));
    }, [certificates]);

    const handleForm = () => {        
        setIsForm(() => !isForm);
    }

    return (
        <Card>
            <Card.Body>
                <Card.Title>자격증</Card.Title>
                {certificateList}
                {isEditable &&
                    <Row className="mt-3 mb-4 text-center">
                        <Col sm="20">
                            <Button variant="primary" onClick={handleForm}>+</Button>
                        </Col>
                    </Row>
                }
                {isForm && <CertificateForm certificates={certificates} index={certificates.length} handler={handler} type={TYPES.add} handleForm={handleForm} />}
            </Card.Body>
        </Card>
    );
}

export default Certificate;