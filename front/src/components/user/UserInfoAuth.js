import React, { useState, useContext } from "react";
import { useNavigate } from "react-router-dom";
import { Container, Col, Row, Form, Button } from "react-bootstrap";
import { NoticeContext } from "../../App";

function UserInfoAuth() {
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

    // 동일한 아이디와 패스워드인지 검사...
    // if (올바른 이메일, 비번이 아니면)
    // return incorrectInfo();

    correctInfo();
    navigate("/infochange");
  };

  const incorrectInfo = () => {
    setNotices({
      type: "warn",
      payload: {
        title: "인증 실패!",
        message: "이메일 또는 비밀번호가 올바르지 않습니다.",
      },
    });
  };

  const correctInfo = () => {
    setNotices({
      type: "success",
      payload: {
        title: "인증 성공!",
        message: "인증에 성공하였습니다.",
      },
    });
  };

  return (
    <Container>
      <Row className="justify-content-md-center mt-5">
        <Form.Text
          className="justify-content-md-center mb-5 text-primary"
          style={{ display: "flex", fontSize: 17 }}
        >
          유저 정보 변경을 위한 인증이 필요합니다.
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
                  인증하기
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

export default UserInfoAuth;
