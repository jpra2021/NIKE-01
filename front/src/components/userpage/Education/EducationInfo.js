import React, { useState } from "react";
import { Card, Row, Col, Button } from "react-bootstrap";
import EducationForm from "./EducationForm";

function EducationInfo({ education, index, dispatch }) {
  const [isEditing, setIsEditing] = useState(false);
  const { school, major, degree } = education;

  const handleForm = () => {
    setIsEditing(() => !isEditing);
  };

  if (isEditing) {
    return (
      <EducationForm
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
          <span>{school}</span>
          <br />
          <span className="text-muted">
            {major} ({degree})
          </span>
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
            onClick={(e) => dispatch({ type: "remove", payload: { school } })}
          >
            삭제
          </Button>
        </Col>
      </Row>
    </Card.Text>
  );
}

export default EducationInfo;
