import React, { useState } from "react";
import { Button, Card, Col, Row } from "react-bootstrap";
import AwardForm from "./AwardForm";

function AwardCard({ award, index, dispatch }) {
  const [isEditing, setIsEditing] = useState(false);
  const { title, description } = award;

  const handleForm = () => {
    setIsEditing(() => !isEditing);
  };

  if (isEditing) {
    return (
      <AwardForm
        dispatch={dispatch}
        type="edit"
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
            onClick={(e) => dispatch({ type: "remove", payload: { title } })}
          >
            삭제
          </Button>
        </Col>
      </Row>
    </Card.Text>
  );
}

export default AwardCard;
