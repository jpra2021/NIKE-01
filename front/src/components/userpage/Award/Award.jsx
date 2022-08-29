import { Card, Row, Col, Button } from "react-bootstrap";
import React, {
  useReducer,
  useState,
  useContext,
  useMemo,
  useEffect,
} from "react";
import AwardForm from "./AwardForm";
import AwardInfo from "./AwardInfo";
import { NoticeContext } from "../../../App";
import AwardReducer from "./AwardReducer";
import awardHandler from "./awardHandler";

const initialState = [];

function Award({ initialData, isEditable }) {
  const { setNotices } = useContext(NoticeContext);
  const reducer = useMemo(() => AwardReducer(setNotices), []);
  const [awards, dispatch] = useReducer(reducer, initialState);
  const handler = useMemo(() => awardHandler(dispatch));

  const [isForm, setIsForm] = useState(false);

  const handleForm = () => {
    setIsForm(() => !isForm);
  };

  useEffect(() => {
    handler.init(initialData);
  }, []);

  return (
    <Card>
      <Card.Body>
        <Card.Title>수상이력</Card.Title>
        {awards.map((award, idx) => (
          <AwardInfo key={idx} award={award} index={idx} handler={handler} />
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
            handler={handler}
            type="add"
            handleForm={handleForm}
            index={awards.length}
          />
        )}
      </Card.Body>
    </Card>
  );
}

export default Award;
