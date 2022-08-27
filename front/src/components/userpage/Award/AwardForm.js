import React, { useState, useEffect, useContext } from "react";
import { Form, Row, Col, Button } from "react-bootstrap";
import { NoticeContext } from "../../../App";

function AwardForm({ dispatch, type, handleForm, index }) {
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const { setNotices } = useContext(NoticeContext);

  useEffect(() => {
    if (type === "edit") {
      dispatch({ type: "load", payload: { index, setTitle, setDescription } });
    }
  }, []);

  const handleSubmit = (e) => {
    e.preventDefault();

    if (title === "") {
      setNotices({
        type: "warn",
        payload: { title: "수상이력", message: "수상내역이 비어있습니다." },
      });

      return;
    }

    if (description === "") {
      setNotices({
        type: "warn",
        payload: { title: "수상이력", message: "상세내역이 비어있습니다." },
      });

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
