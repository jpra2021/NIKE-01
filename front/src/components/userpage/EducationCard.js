import React, { useState } from "react";
import { Card, Col } from "react-bootstrap";

import EducationForm from "./EducationForm";

function EducationCard({ data, degree }) {
  const [isEditing, setIsEditing] = useState(false);
  return (
    <>
      {isEditing ? (
        <EducationForm data={data} degree={degree} setState={setIsEditing} />
      ) : (
        <Card.Text>
          <div className="align-items-center row">
            <Col>
              <span>{data.school}</span>
              <br />
              <span className="text-muted">
                {data.major} ({data.degree})
              </span>
            </Col>
            <Col lg="1">
              <button
                className="mr-3 btn btn-outline-info btn-sm"
                onClick={() => setIsEditing(true)}
              >
                편집
              </button>
            </Col>
          </div>
        </Card.Text>
      )}
    </>
  );
}

export default EducationCard;
