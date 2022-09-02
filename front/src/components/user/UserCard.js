import { useNavigate } from "react-router-dom";
import { Card, Row, Button, Col } from "react-bootstrap";
import * as Api from "../../api";
import { useEffect, useState } from "react";

function UserCard({ user, setIsEditing, isEditable, isNetwork }) {
  const navigate = useNavigate();

  // 유저 프로필이 default 이미지인지 아닌지. true면 default.
  const [isDefaultImg, setIsDefaultImg] = useState(true);
  // card.img에 들어갈 src
  const [imgSrc, setImgSrc] = useState(null);

  useEffect(() => {
    setImgSrc(user?.profileImgSrc);

    if (imgSrc === "latteIsHere") {
      setIsDefaultImg(true);
    } else {
      setIsDefaultImg(false);
    }
  }, [user?.profileImgSrc, imgSrc]);

  //등록 이미지 삭제 후, 기본 이미지로 재설정
  const handleDeleteImg = async (e) => {
    e.preventDefault();
    await Api.delete("delete");
    await Api.imgDefault("settingDefaultImg", { user_id: user.user_id }).then(
      () => setIsDefaultImg(true)
    );
  };

  return (
    <Card className="mb-2 ms-3 mr-5" style={{ width: "18rem" }}>
      <Card.Body>
        <Row className="justify-content-md-center">
          {isDefaultImg ? (
            <Card.Img
              style={{ width: "10rem", height: "8rem" }}
              className="mb-3"
              src={process.env.PUBLIC_URL + "/img/latte_default.png"}
              alt="default image"
            />
          ) : (
            <Card.Img
              style={{ width: "10rem", height: "8rem" }}
              className="mb-3"
              src={imgSrc}
              alt="custom image"
            />
          )}
          {/* 자신의 페이지 && default image 아닌 경우 초기화 버튼 활성화 */}
          {isEditable && !isDefaultImg && (
            <Col sm={{ span: 20 }} className="text-center text-info">
              <Button
                variant="outline-danger"
                size="sm"
                onClick={handleDeleteImg}
              >
                이미지 초기화
              </Button>
            </Col>
          )}
        </Row>
        <Card.Title>{user?.name}</Card.Title>
        <Card.Subtitle className="mb-2 text-muted">{user?.email}</Card.Subtitle>
        <Card.Text>{user?.description}</Card.Text>

        {isEditable && (
          <Col>
            <Row className="mt-3 text-center text-info">
              <Col sm={{ span: 20 }}>
                <Button
                  variant="outline-info"
                  size="sm"
                  onClick={() => setIsEditing(true)}
                >
                  편집
                </Button>
              </Col>
            </Row>
          </Col>
        )}

        {isNetwork && (
          <Card.Link
            className="mt-3"
            href="#"
            onClick={() => navigate(`/users/${user.user_id}`)}
          >
            포트폴리오
          </Card.Link>
        )}
      </Card.Body>
    </Card>
  );
}

export default UserCard;
