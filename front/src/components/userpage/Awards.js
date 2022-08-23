import { Card, Row, Col, Button } from "react-bootstrap";
import React, { useState } from "react";

// import * as Api from "../../api";
import AwardAddForm from "./AwardAddForm";
import AwardCard from "./AwardCard";

// Award list 띄우기
function Awards({ portfolioOwnerId, isEditable }) {
  const [awards, setAwards] = useState(null);
  const [isAdding, setIsAdding] = useState(false);
  // const [isEditing, setIsEditing] = useState(false);
  const sampleData = [
    { title: "제 5회 B대회", description: "A해서 B대회에서 우수상" },
    { title: "제 5회 A대회", description: "A대회에서 아차상" },
  ];

  // get , setAwards

  return (
    <Card>
      <Card.Body>
        <Card.Title>수상이력</Card.Title>
        {/**자신의 포트폴리오인 경우 편집버튼이 있고 클릭 시 입력 Form*/}
        {sampleData.map((award) => (
          <AwardCard award={award} isEditable={isEditable} />
        ))}

        {/**자신의 포트폴리오인 경우에만 +(추가) button이 있다*/}
        {isEditable && (
          <Row className="mt-3 mb-4 text-center">
            <Col sm="20">
              <Button variant="primary" onClick={() => setIsAdding(true)}>
                +
              </Button>
            </Col>
          </Row>
        )}

        {/** 추가 버튼을 클릭하면 입력 Form이 나타나며, 제출 시 목록에 추가된다 */}
        {isAdding && (
          <AwardAddForm
            portfolioOwnerId={portfolioOwnerId}
            setAwards
            setIsAdding={setIsAdding}
          />
        )}
      </Card.Body>
    </Card>
  );
}

export default Awards;
