import React, { useState, useEffect } from "react";
import { Form, Row, Col, Button } from "react-bootstrap";

function AwardForm({ dispatch, type, handleForm, index }) {
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");

  useEffect(() => {
    if (type === "edit") {
      dispatch({ type: "load", payload: { index, setTitle, setDescription } });
    }
  }, []);

  const handleSubmit = (e) => {
    e.preventDefault();

    if (title === "") {
      alert("수상내역 제목이 비어있습니다!");

      return;
    }

    if (description === "") {
      alert("내용이 비어있습니다!");

      return;
    }

    dispatch({
      type,
      payload: { title, description, handleForm, index },
    });
  };

  return (
    <Form>
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
      <Row className="mt-3 mb-4 text-center">
        <Col sm="20">
          <Button
            type="submit"
            variant="primary"
            className="me-3"
            onClick={handleSubmit}
          >
            확인
          </Button>
          <Button type="button" variant="secondary" onClick={handleForm}>
            취소
          </Button>
        </Col>
      </Row>
    </Form>
  );
}

export default AwardForm;
