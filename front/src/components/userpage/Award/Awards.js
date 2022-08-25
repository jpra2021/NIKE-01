import { Card, Row, Col, Button } from "react-bootstrap";
import React, { useReducer, useState } from "react";
import AwardForm from "./AwardForm";
import AwardCard from "./AwardCard";

const overlapCheck = (state, title) => {
  const filtered = state.filter((award) => award.title === title);

  if (filtered.length === 1) {
    return true;
  }

  return false;
};

const reducer = (state, action) => {
  const { title, description, handleForm, index } = action.payload;

  switch (action.type) {
    case "add": {
      handleForm();

      if (overlapCheck(state, title)) {
        alert("이미 등록된 수상이력입니다.");
        return state;
      }

      return [...state, { title, description }];
    }

    case "remove": {
      const newState = state.filter((award) => !(award.title === title));

      return newState;
    }

    case "edit": {
      handleForm();
      const newState = [...state];

      newState[index] = { ...newState[index], title, description };

      if (overlapCheck(state, title)) {
        alert("이미 존재하는 수상이력입니다.");
        return state;
      }

      return newState;
    }

    case "load": {
      const { setTitle, setDescription } = action.payload;
      const award = state[index];

      setTitle(award.title);
      setDescription(award.description);
    }

    default:
      return state;
  }
};

const initialState = [];

function Awards({ isEditable }) {
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
