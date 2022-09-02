import { Card, Row, Col, Button } from "react-bootstrap";
import React, { useReducer, useState, useContext, useMemo, useEffect } from "react";
import EducationForm from "./EducationForm";
import EducationInfo from "./EducationInfo";
import educationReducer from "./educationReducer";
import educationHandler from "./educationHandler";
import { TYPES } from "../../util/util";

const initialState = [];

function Education({ initialData, isEditable }) {
  const reducer = useMemo(() => educationReducer(), []);
  const [educations, dispatch] = useReducer(reducer, initialState);
  const handler = useMemo(() => educationHandler(dispatch), [dispatch]);
  
  const [isForm, setIsForm] = useState(false);

  useEffect(() => {
    handler.init(initialData);
  }, []);

  const educationList = useMemo(() => {
    return educations.map((_, idx) => (<EducationInfo key={idx} educations={educations} index={idx} handler={handler} />));
  }, [educations]);

  const handleForm = () => {
    setIsForm((current) => !current);
  };
  return (
    <Card>
      <Card.Body>
        <Card.Title>학력</Card.Title>
        {educationList}
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
            educations={educations}
            index={educations.length}
            handler={handler}
            type={TYPES.add}
            handleForm={handleForm}
          />
        )}
      </Card.Body>
    </Card>
  );
}

export default Education;
