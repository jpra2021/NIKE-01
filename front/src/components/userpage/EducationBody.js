import React from "react";
import { Card, Col } from "react-bootstrap";

function EducationBody({ data }) {
  return (
    <Card.Text>
      <div className="align-items-center row">
        <Col>
          <span>{data.school}</span>
          <br />
          <span className="text-muted">
            {data.major} ({data.degree})
          </span>
        </Col>
      </div>
    </Card.Text>
  );
}

export default EducationBody;
