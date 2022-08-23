import React, { useState, useEffect } from "react";
import { Col, Button, Form } from "react-bootstrap";

// Education 정보 추가 및 수정 form
function EducationForm({ data, degree, setState }) {
  const [school, setSchool] = useState(data ? data.school : null);
  const [major, setMajor] = useState(data ? data.major : null);
  const [radioValue, setRadioValue] = useState(data ? data.degree : degree[0]);

  useEffect(() => {
    console.log(school, major, radioValue);
  }, [school, major, radioValue]);

  return (
    <Form>
      <Form.Group controlId="educationAddSchool">
        <Form.Control
          type="text"
          value={school}
          placeholder="학교 이름"
          onChange={(e) => setSchool(e.target.value)}
        />
      </Form.Group>
      <Form.Group className="mt-3" controlId="educationAddMajor">
        <Form.Control
          type="text"
          placeholder="전공"
          value={major}
          onChange={(e) => setMajor(e.target.value)}
        />
      </Form.Group>
      <div className="mb-3 mt-3">
        {degree.map((type, i) => (
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
              defaultChecked={
                data ? i === degree.indexOf(data.degree) : i === 0
              }
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
            onClick={() => setState(false)}
          >
            취소
          </Button>
        </Col>
      </Form.Group>
    </Form>
  );
}

export default EducationForm;
