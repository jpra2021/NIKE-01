import { useState, useReducer, useContext, useMemo } from "react";
import { Card, Row, Col, Button } from "react-bootstrap";
import EducationForm from "./EducationForm";
import EducationInfo from "./EducationInfo";
import { NoticeContext } from "../../../App";
import educationReducer from "./reducerEducation";

const initialState = [];

function Education({ isEditable }) {
  const { setNotices } = useContext(NoticeContext);
  const reducer = useMemo(() => (educationReducer(setNotices)), [])
  const [ educationList, dispatch ] = useReducer(reducer, initialState);
  const [isForm, setIsForm] = useState(false);

  const handleForm = () => {   
    setIsForm((current) => !current);
  }
  
  return (
    <Card>
      <Card.Body>
        <Card.Title>학력</Card.Title>
        {educationList.map((education, idx) => (<EducationInfo key={idx} education={education} index={idx} dispatch={dispatch} />))}
        {isEditable && (
          <Row className="mt-3 mb-4 text-center">
            <Col sm="20">
              <Button variant="primary" onClick={handleForm}>+</Button>
            </Col>
          </Row>
        )
        }
        {isForm && <EducationForm dispatch={dispatch} type="add" handleForm={handleForm} />}
      </Card.Body>
    </Card>
  );
}

export default Education;
