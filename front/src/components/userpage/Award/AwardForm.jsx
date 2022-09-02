import { useState, useEffect, useContext } from "react";
import { Form, Row, Col, Button } from "react-bootstrap";
import { TYPES, overlapCheck } from "../../util/util";
import { NOTICE_TYPES, notice } from "../../notice/notice";

function AwardForm({ awards, index, handler, type, handleForm }) {
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");

  useEffect(() => {
    if (type === TYPES.edit) {
      handler.load(index, setTitle, setDescription);
    }
  }, []);

  const handleSubmit = (e) => {
    e.preventDefault();

    if (title === "") {
      notice(NOTICE_TYPES.warn, "입력");

      return;
    }

    if (description === "") {
      notice(NOTICE_TYPES.warn, "입력");

      return;
    }

    console.log(awards, title);
    if (overlapCheck(awards, title)) {
      notice(NOTICE_TYPES.warn, "입력");

      return;
    }

    if (type === TYPES.edit) {
      const award_id = awards[index].award_id;

      handler.edit(award_id, title, description, handleForm, index);
    } else {
      handler.add(title, description, handleForm, index);
    }
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
