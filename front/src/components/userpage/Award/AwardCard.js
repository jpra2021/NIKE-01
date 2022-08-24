import React, { useState } from "react";
import { Button, Card, Col, Row } from "react-bootstrap";

import AwardEditForm from "./AwardEditForm";

function AwardCard({ award, isEditable }) {
  const [isEditing, setIsEditing] = useState(false);

  const handleDelete = (e) => {
    console.log("delete 기능");
  };

  return (
    <Card.Text>
      <Row className="align-items-center">
        {isEditing ? (
          <AwardEditForm
            setIsEditing={setIsEditing}
            currentAward={{
              title: award.title,
              description: award.description,
            }}
          />
        ) : (
          <>
            <Col>
              <span>{award.title}</span>
              <br />
              <span className="text-muted">{award.description}</span>
            </Col>

            {isEditable && (
              <Col lg="1" xs>
                <Button
                  size="sm"
                  variant="outline-info"
                  onClick={() => setIsEditing(true)}
                >
                  편집
                </Button>
                <div className="mb-2" />
                <Button
                  size="sm"
                  variant="outline-danger"
                  onClick={handleDelete}
                >
                  삭제
                </Button>
              </Col>
            )}
          </>
        )}
      </Row>
    </Card.Text>
  );
}

export default AwardCard;
