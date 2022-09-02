import React, { useState, useContext, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { Container, Col, Row, Form, Button } from "react-bootstrap";
import { UserStateContext } from "../../App";
// import { toast } from "react-toastify";
// import "react-toastify/dist/ReactToastify.css";

import * as API from "../../api";

const UserInfoAuth = () => {
  const navigate = useNavigate();
  const [password, setPassword] = useState("");
  const userState = useContext(UserStateContext);
  const [show, setShow] = useState(false);

  /* 유저가 로그인 했는 지 확인하는 로직 */
  useEffect(() => {
    if (!userState.user) {
      navigate("/login", { replace: true });
      return;
    }
  }, [navigate, userState.user]);

  const isPasswordValid = password.length >= 4;

  const handleChange = (e) => {
    setPassword(e.target.value);
    setShow(false);
  };

  const checkPassword = async (password) => {
    const res = await API.post("user/verify", { password });
    const { ok } = res.data;

    if (ok) {
      // toast.success("인증에 성공하였습니다.", {
      //   position: "top-right",
      //   autoClose: 3000,
      //   hideProgressBar: false,
      //   closeOnClick: true,
      //   pauseOnHover: true,
      //   draggable: true,
      //   progress: undefined,
      // });

      navigate("/user/edit", { replace: true, state: { isAuth: true } });
      return;
    } else {
      // toast.warn("비밀번호가 올바르지 않습니다.", {
      //   position: "top-right",
      //   autoClose: 3000,
      //   hideProgressBar: false,
      //   closeOnClick: true,
      //   pauseOnHover: true,
      //   draggable: true,
      //   progress: undefined,
      // });

      setShow(true);
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    checkPassword(password);
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
            <Form.Group controlId="checkPassword" className="mt-3">
              <Form.Label>비밀번호</Form.Label>
              <Form.Control
                type="password"
                autoComplete="off"
                placeholder="password"
                value={password}
                onChange={handleChange}
              />
              {!isPasswordValid && !show && (
                <Form.Text className="text-success">
                  비밀번호는 4글자 이상으로 설정해 주세요.
                </Form.Text>
              )}
              {show && (
                <Form.Text className="text-danger">
                  비밀번호가 올바르지 않습니다.
                </Form.Text>
              )}
            </Form.Group>

            <Form.Group as={Row} className="mt-3 text-center">
              <Col sm={{ span: 20 }}>
                <Button
                  variant="primary"
                  disabled={!isPasswordValid}
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
};

export default UserInfoAuth;
