import React, { useState } from "react";
import { Button, Card, Col, Row } from "react-bootstrap";

import AwardEditForm from "./AwardEditForm";

function AwardCard({ award, isEditable }) {
  const [isEditing, setIsEditing] = useState(false);

  return (
    <Card.Text className="align-items-center">
      <Row>
        {isEditing ? (
          <AwardEditForm
            setIsEditing={setIsEditing}
            currentAward={{
              title: award.title,
              description: award.description,
            }}
          />
        ) : (
          <Col>
            <span>{award.title}</span>
            <br />
            <span className="text-muted">{award.description}</span>
          </Col>
        )}

        {isEditable && (
          <Col lg="1" xs>
            {!isEditing && (
              <Button
                className="mr-3"
                size="sm"
                variant="outline-info"
                onClick={() => setIsEditing(true)}
              >
                편집
              </Button>
            )}
          </Col>
        )}
      </Row>
    </Card.Text>
  );
}

export default AwardCard;
