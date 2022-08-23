import React, { useState, useEffect } from "react";
import { Col, Button, Form } from "react-bootstrap";

function EducationAddForm({ setAddingNew }) {
  const [school, setSchool] = useState(null);
  const [major, setMajor] = useState(null);
  const educationLevel = ["재학중", "학사졸업", "석사졸업", "박사졸업"];
  const [radioValue, setRadioValue] = useState(educationLevel[0]);

  return (
    <Form>
      <Form.Group controlId="educationAddSchool">
        <Form.Control
          type="text"
          placeholder="학교 이름"
          onChange={(e) => setSchool(e.target.value)}
        />
      </Form.Group>
      <Form.Group
        className="mt-3"
        controlId="educationAddMajor"
        onChange={(e) => setMajor(e.target.value)}
      >
        <Form.Control type="text" placeholder="전공" />
      </Form.Group>
      <div className="mb-3 mt-3">
        {educationLevel.map((type, i) => (
          <div
            key={`form-check-${type}`}
            className="form-check form-check-inline"
          >
            <Form.Check
              type="radio"
              name="radio"
              id={`radio-add-${i + 1}`}
              label={type}
              value={type}
              onChange={(e) => setRadioValue(e.target.value)}
            />
          </div>
        ))}
      </div>
      <Form.Group className="mt-3 text-center row">
        <Col sm="20">
          <Button variant="primary" type="submit" className="me-3">
            확인
          </Button>
          <Button
            variant="secondary"
            type="button"
            onClick={() => setAddingNew(false)}
          >
            취소
          </Button>
        </Col>
      </Form.Group>
    </Form>
  );
}

export default EducationAddForm;