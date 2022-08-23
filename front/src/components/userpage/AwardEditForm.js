import React, { useState } from "react";
import { Button, Col, Row, Form } from "react-bootstrap";

function AwardEditForm({ currentAward, setAwards, setIsEditing }) {
  const [title, setTitle] = useState(currentAward.title);
  const [description, setDescription] = useState(currentAward.description);

  const handleSubmit = (e) => {
    e.preventDefault();

    // update

    setIsEditing(false);
  };

  return (
    <Form onSubmit={handleSubmit}>
      <Form.Group controlId="awardEditTitle">
        <Form.Control
          type="text"
          placeholder="수상내역"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
        />
      </Form.Group>

      <Form.Group controlId="awardEditDescription" className="mt-3">
        <Form.Control
          type="text"
          placeholder="상세내역"
          value={description}
          onChange={(e) => setDescription(e.target.value)}
        />
      </Form.Group>

      <Form.Group className="mt-3 text-center">
        <Row className="mt-3 text-center">
          <Col sm={{ span: 20 }}>
            <Button className="me-3" variant="primary" type="submit">
              확인
            </Button>
            <Button variant="secondary" onClick={() => setIsEditing(false)}>
              취소
            </Button>
          </Col>
        </Row>
      </Form.Group>
    </Form>
  );
}

export default AwardEditForm;
