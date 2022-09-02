import React, { useState, useEffect } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import { Container, Col, Row, Form, Button } from "react-bootstrap";
import { NOTICE_TYPES, notice } from "../components/notice/notice";
import * as API from "../api";


function UserInfoChange() {
  const navigate = useNavigate();
  const { state } = useLocation();

  const [formData, setFormData] = useState({
    email: "",
    password: "",
    confirmPassword: "",
  });

  // 이메일, 비밀번호 중 무엇을 변경할 것인지 유저가 선택
  const [chooseEmail, setChooseEmail] = useState(false);
  const [choosePassword, setChoosePassword] = useState(false);

  useEffect(() => {
    if (!state?.isAuth) {
      navigate("/");
      return;
    }
  }, [navigate, state]);

  const validateEmail = (email) => {
    return email
      .toLowerCase()
      .match(
        /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/
      );
  };

  const isEmailValid = validateEmail(formData.email);
  const isPasswordValid = formData.password.length >= 4;
  const isPasswordSame = formData.password === formData.confirmPassword;
  const isFormValid = isEmailValid && isPasswordValid && isPasswordSame;

  const formValidation = () => {
    if (chooseEmail && choosePassword) {
      return !isFormValid;
    } else if (chooseEmail && !choosePassword) {
      return !isEmailValid;
    } else if (!chooseEmail && choosePassword) {
      return !isPasswordValid || !isPasswordSame;
    } else {
      return true;
    }
  };

  const handleFormChange = (e) => {
    const { name, value } = e.target;

    setFormData((current) => {
      return { ...current, [name]: value };
    });
  };

  const handleClick = (e) => {
    e.preventDefault();

    try {
      //이메일 변경
      if (chooseEmail) {
        API.put("users/edit", {
          email: formData.email,
        });
      }

      //비밀번호 변경
      if (choosePassword) {
        API.put("users/edit", {
          password: formData.password,
        });
      }

      notice(NOTICE_TYPES.warn, "변경")

      navigate("/");
      return;
    } catch (err) {
      console.log("변경에 실패하였습니다.\n", err);
    }
  };

  return (
    <Container>
      <Row className="justify-content-center mt-5">
        <Form.Text
          className="justify-content-center mb-4 text-primary"
          style={{ display: "flex", fontSize: 17 }}
        >
          변경하고 싶은 것을 모두 체크해주세요.
        </Form.Text>

        <Form
          className="mb-4"
          style={{ display: "flex", justifyContent: "center" }}
        >
          <Form.Check
            inline
            label="이메일"
            name="selectEmail"
            type="checkbox"
            id="checkbox-1"
            onChange={(e) => setChooseEmail((prev) => !prev)}
          />
          <Form.Check
            inline
            label="비밀번호"
            name="selectPassword"
            type="checkbox"
            id="checkbox-2"
            onChange={(e) => setChoosePassword((prev) => !prev)}
          />
        </Form>

        <Col xs={5}>
          <Form>
            {/* 이메일 변경 선택 */}
            {chooseEmail && (
              <Form.Group controlId="changeEmail" className="mb-3">
                <Form.Label>이메일 주소</Form.Label>
                <Form.Control
                  type="email"
                  autoComplete="on"
                  placeholder="email"
                  name="email"
                  value={formData.email}
                  onChange={handleFormChange}
                />
                {!isEmailValid && (
                  <Form.Text className="text-success">
                    이메일 형식이 올바르지 않습니다.
                  </Form.Text>
                )}
              </Form.Group>
            )}

            {/* 비밀번호 변경 선택 */}
            {choosePassword && (
              <>
                <Form.Group controlId="changePassword">
                  <Form.Label>비밀번호</Form.Label>
                  <Form.Control
                    type="password"
                    autoComplete="off"
                    placeholder="password"
                    name="password"
                    value={formData.password}
                    onChange={handleFormChange}
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
                    name="confirmPassword"
                    value={formData.confirmPassword}
                    onChange={handleFormChange}
                  />
                  {!isPasswordSame && (
                    <Form.Text className="text-success">
                      비밀번호가 일치하지 않습니다.
                    </Form.Text>
                  )}
                </Form.Group>
              </>
            )}

            <Form.Group as={Row} className="mt-3 text-center">
              <Col sm={{ span: 20 }}>
                <Button
                  variant="primary"
                  disabled={formValidation()}
                  onClick={handleClick}
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
