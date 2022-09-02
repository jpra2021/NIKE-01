import React, { useState } from "react";
import { Button, Form, Card, Col, Row } from "react-bootstrap";
import * as Api from "../../api";
import { useNavigate } from "react-router-dom";

function UserEditForm({ user, setIsEditing, setUser }) {
  //useState로 name 상태를 생성함.
  const [name, setName] = useState(user?.name);
  //useState로 description 상태를 생성함.
  const [description, setDescription] = useState(user.description);

  // userState로 img 상태를 생성함.
  const [uploadImg, setUploadImg] = useState({
    preview: "",
    data: null,
  });

  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();

    // 유저가 업로드한 이미지가 있다면 post 요청
    if (uploadImg.data !== null) {
      const formData = new FormData();
      formData.append("file", uploadImg.data);

      // await Api.delete("delete");
      // await Api.imgDefault("settingDefaultImg", { user_id: user.user_id });
      await Api.imgPut("upload", formData);
    }

    // "users/유저id" 엔드포인트로 PUT 요청함.
    const res = await Api.put("users/edit", {
      name,
      description,
    });
    // 유저 정보는 response의 data임.
    const updatedUser = res.data;

    // 해당 유저 정보로 user을 세팅함.
    setUser(updatedUser);

    // isEditing을 false로 세팅함.
    setIsEditing(false);
  };

  const redirectToUserInfo = () => {
    setIsEditing(false);
    navigate("/user/auth");
  };

  const handleImgChange = (e) => {
    const imgPreview = URL.createObjectURL(e.target.files[0]);
    const imgFile = e.target.files[0];

    setUploadImg({
      preview: imgPreview,
      data: imgFile,
    });
    console.log(imgPreview, imgFile);
  };

  return (
    <Card className="mb-2">
      <Card.Body>
        <Form onSubmit={handleSubmit}>
          {uploadImg.preview && (
            <img src={uploadImg.preview} alt="preview_image" width="140px" />
          )}
          <Form.Group controlId="userEditImage" className="mb-3 mt-2">
            <Form.Control
              type="file"
              size="sm"
              accept="uploadImg/*"
              onChange={handleImgChange}
            />
          </Form.Group>

          <Form.Group controlId="userEditName" className="mb-3">
            <Form.Text>이름</Form.Text>
            <Form.Control
              type="text"
              placeholder="이름"
              value={name}
              onChange={(e) => setName(e.target.value)}
            />
          </Form.Group>

          <Form.Group controlId="userEditDescription">
            <Form.Text>인사말</Form.Text>
            <Form.Control
              type="text"
              placeholder="정보, 인사말"
              value={description}
              onChange={(e) => setDescription(e.target.value)}
            />
          </Form.Group>

          <Form.Group as={Row} className="mt-3 text-center">
            <Col sm={{ span: 20 }}>
              <Button variant="primary" type="submit" className="me-3">
                확인
              </Button>
              <Button variant="secondary" onClick={() => setIsEditing(false)}>
                취소
              </Button>
            </Col>
          </Form.Group>

          <Form.Group as={Row} className="mt-3 justify-content-center">
            <Button
              variant="putline-secondary"
              style={{
                width: "180px",
                height: "30px",
                fontSize: "12px",
              }}
              onClick={redirectToUserInfo}
            >
              이메일과 비밀번호 변경하기
            </Button>
          </Form.Group>
        </Form>
      </Card.Body>
    </Card>
  );
}

export default UserEditForm;
