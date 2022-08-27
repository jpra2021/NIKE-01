import React, { useState, useContext, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { Container, Col, Row, Form, Button } from "react-bootstrap";
import { NoticeContext, UserStateContext } from "../../App";

function UserInfoChange({ correctUserInfo, setCorrectUserInfo }) {
  const navigate = useNavigate();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const { setNotices } = useContext(NoticeContext);
  const userState = useContext(UserStateContext);

  useEffect(() => {
    if (!userState.user || !correctUserInfo) {
      navigate("/", { replace: true });
      return;
    }
  });

  const validateEmail = (email) => {
    return email
      .toLowerCase()
      .match(
        /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/
      );
  };

  const isEmailValid = validateEmail(email);
  const isPasswordValid = password.length >= 4;
  const isPasswordSame = password === confirmPassword;
  const isFormValid = isEmailValid && isPasswordValid && isPasswordSame;

  const onChangeEmail = (e) => {
    setEmail(e.target.value);
  };

  const onChangePassword = (e) => {
    setPassword(e.target.value);
  };

  const onChangeConfirmPassword = (e) => {
    setConfirmPassword(e.target.value);
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    // 이메일, 비밀번호 변경하기
    try {
      alertChangeComplete();
      setCorrectUserInfo(false);
    } catch (err) {
      console.log("이메일, 비밀번호 변경에 실패하였습니다.\n", err);
    }
  };

  const alertChangeComplete = () => {
    setNotices({
      type: "success",
      payload: {
        title: "변경 성공!",
        message: "이메일과 비밀번호가 변경되었습니다.",
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
          기존 이메일과 비밀번호가 아래와 같이 변경됩니다.
        </Form.Text>

        <Col xs={5}>
          <Form>
            <Form.Group controlId="changeEmail">
              <Form.Label>이메일 주소</Form.Label>
              <Form.Control
                type="email"
                autoComplete="on"
                placeholder="email"
                value={email}
                onChange={onChangeEmail}
              />
              {!isEmailValid && (
                <Form.Text className="text-success">
                  이메일 형식이 올바르지 않습니다.
                </Form.Text>
              )}
            </Form.Group>

            <Form.Group controlId="changePassword" className="mt-3">
              <Form.Label>비밀번호</Form.Label>
              <Form.Control
                type="password"
                autoComplete="off"
                placeholder="password"
                value={password}
                onChange={onChangePassword}
              />
              {!isPasswordValid && (
                <Form.Text className="text-success">
                  비밀번호는 4글자 이상으로 설정해 주세요.
                </Form.Text>
              )}
            </Form.Group>

            <Form.Group controlId="confirmChangePassword" className="mt-3">
              <Form.Label>비밀번호 재확인</Form.Label>
              <Form.Control
                type="password"
                autoComplete="off"
                placeholder="confirm password"
                value={confirmPassword}
                onChange={onChangeConfirmPassword}
              />
              {!isPasswordSame && (
                <Form.Text className="text-success">
                  비밀번호가 일치하지 않습니다.
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
