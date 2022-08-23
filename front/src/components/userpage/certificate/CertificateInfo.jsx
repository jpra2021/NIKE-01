import { useState } from "react";
import { Card, Row, Col, Button } from "react-bootstrap";
import CertificateForm from "./CertificateForm";

const CertificateInfo = ({ certificate, index, dispatch }) => {
    const [ isEditing, setIsEditing ] = useState(false);

    const handleForm = () => {
        setIsEditing(() => !isEditing);
    }

    if (isEditing) {
        return (
            <CertificateForm dispatch={dispatch} type="edit" handleForm={handleForm} index={index} />
        );
    }

    return (
        <Card.Text as="div">
            <Row className="justify-content-between align-items-center mb-2">
                <Col>
                    {certificate.title}
                    <br />
                    <span className="text-muted">{certificate.detail}</span>
                    <br />
                    <span className="text-muted">{certificate.date}</span>
                </Col>
                <Col className="col-lg-1">
                    <Button size="sm" variant="outline-info" onClick={(e) => setIsEditing(() => !isEditing)}>편집</Button>
                </Col>
            </Row>
        </Card.Text>
    );
}

export default CertificateInfo;