import { Card, Row, Col, Button } from "react-bootstrap";
import React, { useReducer, useState, useContext, useMemo } from "react";
import EducationForm from "./EducationForm";
import EducationInfo from "./EducationInfo";
import { NoticeContext } from "../../../App";
import EducationReducer from "./reducerEducation";

const initialState = [];

function Education({ isEditable }) {
  const { setNotices } = useContext(NoticeContext);
  const reducer = useMemo(() => EducationReducer(setNotices), []);
  const [isForm, setIsForm] = useState(false);
  const [educations, dispatch] = useReducer(reducer, initialState);

  const handleForm = () => {
    setIsForm(() => !isForm);
  };

  return (
    <Card>
      <Card.Body>
        <Card.Title>학력</Card.Title>
        {educations.map((education, idx) => (
          <EducationInfo
            key={idx}
            education={education}
            index={idx}
            dispatch={dispatch}
          />
        ))}

        {isEditable && (
          <Row className="mt-3 mb-4 text-center">
            <Col sm="20">
              <Button variant="primary" onClick={handleForm}>
                +
              </Button>
            </Col>
          </Row>
        )}

        {isForm && (
          <EducationForm
            dispatch={dispatch}
            type="add"
            handleForm={handleForm}
            index={educations.length}
          />
        )}
      </Card.Body>
    </Card>
  );
}

export default Education;
