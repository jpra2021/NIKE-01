import { useState } from "react";
import { Card, Row, Col, Button } from "react-bootstrap";
import CertificateForm from "./CertificateForm";
import { TYPES } from "../../util/util";

const CertificateInfo = ({ certificates, index, handler, isEditable }) => {
  const [isEditing, setIsEditing] = useState(false);
  const { certificate_id, title, detail, date } = certificates[index];

  const handleForm = () => {
    setIsEditing(() => !isEditing);
  };

  if (isEditing) {
    return (
      <CertificateForm
        certificates={certificates}
        index={index}
        handler={handler}
        type={TYPES.edit}
        handleForm={handleForm}
      />
    );
  }

  return (
    <Card.Text as="div">
      <Row className="justify-content-between align-items-center mb-2">
        <Col>
          {title}
          <br />
          <span className="text-muted">{detail}</span>
          <br />
          <span className="text-muted">{date}</span>
        </Col>
        <Col className="col-lg-1">
          {isEditable &&
            <>
              <Button
                size="sm"
                variant="outline-info"
                onClick={(e) => setIsEditing(() => !isEditing)}
              >
                편집
              </Button>
              <div className="mb-2" />
              <Button
                size="sm"
                variant="outline-danger"
                onClick={(e) => handler.remove(certificate_id, title)}
              >
                삭제
              </Button>
            </>
          }
        </Col>
      </Row>
    </Card.Text>
  );
};

export default CertificateInfo;
