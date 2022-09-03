import { useState, useEffect, useMemo, useReducer } from "react";
import { Card, Row, Col, Form, FloatingLabel, Button } from "react-bootstrap";
import introductionReducer from "./introReducer";
import introductionHandler from "./introHandler";

const Introduction = ({ initialData, isEditable }) => {
  const reducer = useMemo(() => introductionReducer(), []);
  const [intro, dispatch] = useReducer(reducer, { text: "" });
  const handler = useMemo(() => introductionHandler(dispatch), [dispatch]);

  const [editMode, setEditMode] = useState(false);

  useEffect(() => {
    handler.init(initialData);
  }, []);

  const handleEditMode = () => {
    setEditMode((current) => !current);
  };

  const handleChange = (e) => {
    let { value } = e.target;

    value = value.slice(0, 300);

    handler.edit(value, handleEditMode);

    if (value?.length === 0) {
      setEditMode(false);
    } else {
      setEditMode(true);
    }
  };

  const handleClick = () => {
    handler.add(intro.text);
    handleEditMode();
  };

  return (
    <Card>
      <Card.Body>
        <Card.Title>소개</Card.Title>
        {isEditable && (
          <Row className="mt-3 text-center">
            <Form>
              <FloatingLabel
                className="text-center"
                controlId="floatingTextarea2"
                label={intro.text?.length + " / 300"}
              >
                <Form.Control
                  as="textarea"
                  value={intro.text}
                  onChange={handleChange}
                  maxLength={300}
                  style={{
                    resize: "none",
                    height: "300px",
                    overflow: "hidden",
                  }}
                  className="mb-4"
                />
              </FloatingLabel>
              {editMode && (
                <Button size="sm" variant="outline-info" onClick={handleClick}>
                  확인
                </Button>
              )}
            </Form>
          </Row>
        )}
        {!isEditable && (
          <Row
            className="justify-content-between align-items-center mb-2"
            style={{
              resize: "none",
              height: "fit-content",
              overflow: "hidden",
            }}
          >
            <Col>{intro.text}</Col>
          </Row>
        )}
      </Card.Body>
    </Card>
  );
};

export default Introduction;
