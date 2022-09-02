import React, { useReducer, useState, useMemo, useEffect } from "react";
import { Card, Row, Col, Button } from "react-bootstrap";
import AwardForm from "./AwardForm";
import AwardInfo from "./AwardInfo";
import AwardReducer from "./AwardReducer";
import awardHandler from "./awardHandler";
import { TYPES } from "../../util/util";

const initialState = [];

function Award({ initialData, isEditable }) {
  const reducer = useMemo(() => AwardReducer(), []);
  const [awards, dispatch] = useReducer(reducer, initialState);
  const handler = useMemo(() => awardHandler(dispatch), [dispatch]);

  const [isForm, setIsForm] = useState(false);

  useEffect(() => {
    handler.init(initialData);
  }, []);

  const awardList = useMemo(() => {
    return awards.map((_, idx) => (
      <AwardInfo key={idx} awards={awards} index={idx} handler={handler} isEditable={isEditable} />
    ));
  }, [awards]);

  const handleForm = () => {
    setIsForm(() => !isForm);
  };

  return (
    <Card>
      <Card.Body>
        <Card.Title>수상이력</Card.Title>
        {awardList}
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
            awards={awards}
            index={awards.length}
            handler={handler}
            type={TYPES.add}
            handleForm={handleForm}
          />
        )}
      </Card.Body>
    </Card>
  );
}

export default Award;
