import React, { useState, useEffect, useContext } from "react";
import { Form, FormControl, Row, Col, Button, InputGroup } from "react-bootstrap";
import { NoticeContext } from "../../../App";

export const TYPES = {
  attend: "재학중",
  bachelor: "학사졸업",
  master: "석사졸업",
  doctor: "박사졸업"
}

// Education 정보 추가 및 수정 form
function EducationForm({ dispatch, type, handleForm, index }) {
  const [ formData, setFormData ] = useState({school: "", major: "", degree: TYPES.attend});
  const { setNotices } = useContext(NoticeContext);

  useEffect(() => {
    if (type === "edit") {
      dispatch({type: "load", payload: {index, setFormData}});
    }
  }, []);

  const handleSubmit = (e) => {
    e.preventDefault();

    if (formData.school === "") {
        setNotices({type: "warn", payload: {title: "학력", message: "학교 이름이 비어있습니다."}});

        return;
    }

    if (formData.major === "") {
        setNotices({type: "warn", payload: {title: "학력", message: "전공이 비어있습니다."}});
        
        return;
    }

    dispatch({type, payload: {formData, handleForm, index}});
}

  const handleFormChange = (e) => {
    const { value, name } = e.target;

    setFormData((current) => {
      return { 
        ...current,
        [name]: value
      };
    })
  }
  
  return (
    <Form>
      <Form.Group controlId="educationAddSchool">
        <Form.Control name="school" value={formData.school}  type="text"  placeholder="학교 이름" onChange={handleFormChange} />
      </Form.Group>
      <Form.Group className="mt-3" controlId="educationAddMajor">
        <Form.Control name="major" type="text" placeholder="전공" value={formData.major} onChange={handleFormChange} />
      </Form.Group>
      <Form.Group className="mb-3, mt-3">
        <Form.Check inline defaultChecked id="radio-add-1" name="degree" value={TYPES.attend} type="radio" label="재학중" onClick={handleFormChange} />
        <Form.Check inline id="radio-add-2" name="degree" value={TYPES.bachelor} type="radio" label="학사졸업" onClick={handleFormChange} />
        <Form.Check inline id="radio-add-3" name="degree" value={TYPES.master} type="radio" label="석사졸업" onClick={handleFormChange} />
        <Form.Check inline id="radio-add-4" name="degree" value={TYPES.doctor} type="radio" label="박사졸업" onClick={handleFormChange} />
      </Form.Group>
      <Form.Group className="mt-3 text-center row">
        <Col sm="20">
          <Button variant="primary" type="submit" className="me-3" onClick={handleSubmit}>확인</Button>
          <Button variant="secondary" type="button" onClick={handleForm}>취소</Button>
        </Col>
      </Form.Group>
    </Form>
  );
}

export default EducationForm;
