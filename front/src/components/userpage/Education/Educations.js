import React, { useState } from "react";
import { Card, Row, Col, Button } from "react-bootstrap";

import EducationCard from "./EducationCard";
import EducationForm from "./EducationForm";

function Educations({ isEditable }) {
  const [addNew, setAddNew] = useState(false);
  const degree = ["재학중", "학사졸업", "석사졸업", "박사졸업"];
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

  /* TODO: 데이터 post, put 요청
  */
  return (
    <Card>
      <Card.Body>
        <Card.Title>학력</Card.Title>
        {sampleData.map((data) => (
          <EducationCard
            key={`edu-card-${data.school}`}
            data={data}
            degree={degree}
            isEditable={isEditable}
          />
        ))}
        {isEditable && (
          <Row className="mt-3 text-center mb-4 row">
            <Col sm="20">
              <Button
                variant="primary"
                className="btn btn-primary"
                onClick={() => setAddNew(true)}
              >
                +
              </Button>
            </Col>
          </Row>
        )}
        {addNew && <EducationForm degree={degree} setState={setAddNew} />}
      </Card.Body>
    </Card>
  );
}

export default Educations;
