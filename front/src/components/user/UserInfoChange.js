import React, { useState, useContext } from "react";
import { useNavigate } from "react-router-dom";
import { Container, Col, Row, Form, Button } from "react-bootstrap";
import { NoticeContext } from "../../App";

function UserInfoChange() {
  const navigate = useNavigate();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const { setNotices } = useContext(NoticeContext);

  const validateEmail = (email) => {
    return email
      .toLowerCase()
      .match(
        /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/
      );
  };

  const isEmailValid = validateEmail(email);
  const isPasswordValid = password.length >= 4;
  const isFormValid = isEmailValid && isPasswordValid;

  const onChangeAuthEmail = (e) => {
    setEmail(e.target.value);
  };

  const onChangeAuthPassword = (e) => {
    setPassword(e.target.value);
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    // 이메일, 비밀번호 변경하기

    setNotices({
      type: "success",
      payload: {
        title: "변경 성공!",
        message: "이메일과 비밀번호가 변경되었습니다.",
      },
    });

    navigate("/");
  };

  return (
    <Container>
      <Row className="justify-content-md-center mt-5">
        <Form.Text
          className="justify-content-md-center mb-5 text-primary"
          style={{ display: "flex", fontSize: 17 }}
        >
          기존 이메일과 비밀번호가 아래와 같이 변경됩니다.
        </Form.Text>

        <Col xs={5}>
          <Form>
            <Form.Group controlId="checkEmail">
              <Form.Label>이메일 주소</Form.Label>
              <Form.Control
                type="email"
                autoComplete="on"
                placeholder="email"
                value={email}
                onChange={onChangeAuthEmail}
              />
              {!isEmailValid && (
                <Form.Text className="text-success">
                  이메일 형식이 올바르지 않습니다.
                </Form.Text>
              )}
            </Form.Group>

            <Form.Group controlId="checkPassword" className="mt-3">
              <Form.Label>비밀번호</Form.Label>
              <Form.Control
                type="password"
                autoComplete="on"
                placeholder="password"
                value={password}
                onChange={onChangeAuthPassword}
              />
              {!isPasswordValid && (
                <Form.Text className="text-success">
                  비밀번호는 4글자 이상입니다.
                </Form.Text>
              )}
            </Form.Group>

            <Form.Group as={Row} className="mt-3 text-center">
              <Col sm={{ span: 20 }}>
                <Button
                  variant="primary"
                  disabled={!isFormValid}
                  onClick={handleSubmit}
                >
                  변경하기
                </Button>
              </Col>
            </Form.Group>

            <Form.Group as={Row} className="mt-3 text-center">
              <Col sm={{ span: 20 }}>
                <Button variant="light" onClick={() => navigate("/")}>
                  변경하지 않고 돌아가기
                </Button>
              </Col>
            </Form.Group>
          </Form>
        </Col>
      </Row>
    </Container>
  );
}

export default UserInfoChange;
