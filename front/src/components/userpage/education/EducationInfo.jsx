import React, { useState } from "react";
import { Card, Row, Col, Button } from "react-bootstrap";
import EducationForm from "./EducationForm";
import { TYPES } from "../../util/util";

function EducationInfo({ educations, index, handler }) {
  const [isEditing, setIsEditing] = useState(false);
  const { education_id, school, major, degree } = educations[index];

  const handleForm = () => {
    setIsEditing((current) => !current);
  };

  if (isEditing) {
    return (
      <EducationForm
        educations={educations}
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
          {school}
          <br />
          <span className="text-muted">
            {major} ({degree})
          </span>
        </Col>
        <Col className="col-lg-1">
          <Button size="sm" variant="outline-info" onClick={handleForm}>
            편집
          </Button>
          <div className="mb-2" />
          <Button
            size="sm"
            variant="outline-danger"
            onClick={() => handler.remove(education_id, school)}
          >
            삭제
          </Button>
        </Col>
      </Row>
    </Card.Text>
  );
}

export default EducationInfo;
