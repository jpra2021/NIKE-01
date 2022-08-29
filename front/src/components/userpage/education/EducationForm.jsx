import React, { useState, useEffect, useContext } from "react";
import { Form, Row, Col, Button } from "react-bootstrap";
import { NoticeContext } from "../../../App";
import { TYPES } from "../../util/util";

const DEGREE_TYPES = {
    attend: "재학중",
    bachelor: "학사졸업",
    master: "석사졸업",
    doctor: "박사졸업",
};

function EducationForm({ education_id, handler, type, handleForm, index }) {
    const [formData, setFormData] = useState({
        // 용의자 1
        school: "",
        major: "",
        degree: DEGREE_TYPES.attend,
    });

    const { setNotices } = useContext(NoticeContext);

    useEffect(() => {
        if (type === TYPES.edit) {
            handler.load( index, setFormData );
        }
    }, []);

    const handleFormChange = (e) => {
      const { name, value } = e.target;

      setFormData((current) => {
        const newState = {
            ...current,
            [name]: value
        }

        return newState;
      });
    }

    const handleSubmit = (e) => {
        e.preventDefault();

        const { school, major, degree } = formData;

        if (school === "") {
            setNotices({
                type: "warn",
                payload: {title: "학력", message: "학교 이름이 비어있습니다."},
            });

            return;
        }

        if (major === "") {
            setNotices({
                type: "warn",
                payload: {title: "학력", message: "전공이 비어있습니다."},
            });

            return;
        }

        if (degree === "") {
            setNotices({
                type: "warn",
                payload: {title: "학력", message: "학력이 비어있습니다."},
            });

            return;
        }

        if (type === TYPES.edit) {
            handler.edit(education_id, school, major, degree, handleForm, index);
        } else {
            handler.add(school, major, degree, handleForm, index);
        }
    };

    return (
        <Form>
            <Form.Group controlId="educationAddSchool">
                <Form.Control
                    name="school"
                    value={formData.school}
                    type="text"
                    placeholder="학교 이름"
                    onChange={handleFormChange}
                />
            </Form.Group>
            <Form.Group className="mt-3" controlId="educationAddMajor">
                <Form.Control
                    name="major"
                    type="text"
                    placeholder="전공"
                    value={formData.major}
                    onChange={handleFormChange}
                />
            </Form.Group>
            <Form.Group className="mb-3, mt-3">
                <Form.Check
                    inline
                    checked={formData.degree === DEGREE_TYPES.attend}
                    id="radio-add-1"
                    name="degree"
                    value={DEGREE_TYPES.attend}
                    type="radio"
                    label="재학중"
                    onChange={handleFormChange}
                />
                <Form.Check
                    inline
                    checked={formData.degree === DEGREE_TYPES.bachelor}
                    id="radio-add-2"
                    name="degree"
                    value={DEGREE_TYPES.bachelor}
                    type="radio"
                    label="학사졸업"
                    onChange={handleFormChange}
                />
                <Form.Check
                    inline
                    checked={formData.degree === DEGREE_TYPES.master}
                    id="radio-add-3"
                    name="degree"
                    value={DEGREE_TYPES.master}
                    type="radio"
                    label="석사졸업"
                    onChange={handleFormChange}
                />
                <Form.Check
                    inline
                    checked={formData.degree === DEGREE_TYPES.doctor}
                    id="radio-add-4"
                    name="degree"
                    value={DEGREE_TYPES.doctor}
                    type="radio"
                    label="박사졸업"
                    onChange={handleFormChange}
                />
            </Form.Group>
            <Row className="mt-3 text-center row">
                <Col sm="20">
                    <Button
                        variant="primary"
                        type="submit"
                        className="me-3"
                        onClick={handleSubmit}
                    >
                        확인
                    </Button>
                    <Button
                        variant="secondary"
                        type="button"
                        onClick={handleForm}
                    >
                        취소
                    </Button>
                </Col>
            </Row>
        </Form>
    );
}

export default EducationForm;
