import React, { useState } from "react";
import { Button, Form, Col, Row } from "react-bootstrap";

function AwardAddForm({ portfolioOwnerId, SetAwards, SetIsAdding }) {
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");

  // Form 제출 시 실행
  const handleSubmit = (e) => {
    e.preventDefault();
    // post
    // get
    // SetAwards() 로 award 갱신...
    SetIsAdding(false); // Form 숨기기
  };

  return (
    <Form onSubmit={handleSubmit}>
      <Form.Group controlId="awardAddTitle">
        <Form.Control
          type="text"
          placeholder="수상내역"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
        />
      </Form.Group>

      <Form.Group controlId="awardAddDescription" className="mt-3">
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
            <Button variant="secondary" onClick={() => SetIsAdding(false)}>
              취소
            </Button>
          </Col>
        </Row>
      </Form.Group>
    </Form>
  );
}

export default AwardAddForm;
