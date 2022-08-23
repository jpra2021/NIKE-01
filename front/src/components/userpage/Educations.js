import React, { useState } from "react";
import { Card, Row, Col, Button } from "react-bootstrap";

import EducationBody from "./EducationBody";
import EducationAddForm from "./EducationAddForm";

function Educations({ isEditable }) {
  const [addingNew, setAddingNew] = useState(false);
  const sampleData = [
    {
      school: "ERAU",
      major: "Software",
      degree: "학사졸업",
    },
    {
      school: "ERAU Grad School",
      major: "Blockchain",
      degree: "석사졸업",
    },
  ];

  /* TODO: 
  - radio 버튼 default checked 설정
  - 데이터 post, put 요청
  */
  return (
    <Card>
      <Card.Body>
        <Card.Title>학력</Card.Title>
        {sampleData.map((data) => (
          <EducationBody data={data} />
        ))}
        {isEditable && (
          <Row className="mt-3 text-center mb-4 row">
            <Col sm="20">
              <Button
                variant="primary"
                className="btn btn-primary"
                onClick={() => setAddingNew(true)}
              >
                +
              </Button>
            </Col>
          </Row>
        )}
        {addingNew && <EducationAddForm setAddingNew={setAddingNew} />}
      </Card.Body>
    </Card>
  );
}

export default Educations;
