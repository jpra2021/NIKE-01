import React, { useState } from "react";
import { Button, Card, Col, Row } from "react-bootstrap";
import AwardForm from "./AwardForm";
import { TYPES } from "../../util/util";

function AwardInfo({ award, index, handler }) {
  const [isEditing, setIsEditing] = useState(false);
  const { award_id, title, description } = award;

  const handleForm = () => {
    setIsEditing(() => !isEditing);
  };

  if (isEditing) {
    return (
      <AwardForm
        award_id={award_id}
        handler={handler}
        type={TYPES.edit}
        handleForm={handleForm}
        index={index}
      />
    );
  }

  return (
    <Card.Text as="div">
      <Row className="justify-content-between align-items-center mb-2">
        <Col>
          <span>{title}</span>
          <br />
          <span className="text-muted">{description}</span>
        </Col>
        <Col className="col-lg-1">
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
            onClick={(e) => handler.remove(award_id, title)}
          >
            삭제
          </Button>
        </Col>
      </Row>
    </Card.Text>
  );
}

export default AwardInfo;
