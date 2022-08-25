import { Card, Row, Col, Button } from "react-bootstrap";
import React, { useReducer, useState, useContext, useMemo } from "react";
import AwardForm from "./AwardForm";
import AwardCard from "./AwardCard";
import { NoticeContext } from "../../../App";
import AwardReducer from "./AwardReducer";

const initialState = [];

function Awards({ isEditable }) {
  const { setNotices } = useContext(NoticeContext);
  const reducer = useMemo(() => AwardReducer(setNotices), []);
  const [isForm, setIsForm] = useState(false);
  const [awards, dispatch] = useReducer(reducer, initialState);

  const handleForm = () => {
    setIsForm(() => !isForm);
  };

  return (
    <Card>
      <Card.Body>
        <Card.Title>수상이력</Card.Title>
        {awards.map((award, idx) => (
          <AwardCard key={idx} award={award} index={idx} dispatch={dispatch} />
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
          <AwardForm
            dispatch={dispatch}
            type="add"
            handleForm={handleForm}
            index={awards.length}
          />
        )}
      </Card.Body>
    </Card>
  );
}

export default Awards;
