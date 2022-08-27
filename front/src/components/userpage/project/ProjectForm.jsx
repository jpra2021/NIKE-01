import { useState, useRef, useEffect, useContext, useCallback } from "react"
import { Form, FormControl, Row, Col, Button } from "react-bootstrap";
import DatePicker from "react-datepicker";
import { NoticeContext } from "../../../App";
import { formatDateStr } from "../../util/util";
import { TYPES } from "./projectsReducer";

const ProjectForm = ({ project_id, handler, type, handleForm, index }) => {
    const [ title, setTitle ] = useState("");
    const [ detail, setDetail ] = useState("");
    const [ startDate, setStartDate ] = useState(new Date());
    const [ endDate, setEndDate ] = useState(new Date());
    const { setNotices } = useContext(NoticeContext);
    const period = useRef("");

    useEffect (() => {
        if (type === TYPES.edit) {
            handler.load(index, setTitle, setDetail, setStartDate, setEndDate);
        }
    }, []);

    useEffect (() => {
        const startDateStr = formatDateStr(startDate);
        const endDateStr = formatDateStr(endDate);

        period.current = `${startDateStr} ~ ${endDateStr}`
    }, [startDate, endDate]);

    const handleSubmit = (e) => {
        e.preventDefault();

        if (title === "") {
            setNotices({type: "warn", payload: {title: "프로젝트", message: "제목이 비어있습니다."}});

            return;
        }

        if (detail === "") {
            setNotices({type: "warn", payload: {title: "프로젝트", message: "내용이 비어있습니다."}});
            
            return;
        }

        if (startDate.getTime() > endDate.getTime()) {
            setNotices({type: "warn", payload: {title: "프로젝트", message: "종료일보다 시작일이 더 큽니다."}});

            return;
        }

        const date = period.current

        if (type === TYPES.edit) {
            handler.edit(project_id, title, detail, date, handleForm, index)
        } else {
            handler.add(title, detail, date, handleForm, index);
        }
    }

    return (
        <Form>
            <Form.Group controlId="projectAddTitle">
                <FormControl type="text" placeholder="프로젝트 제목" value={title} onChange={(e) => setTitle(e.target.value)} />
            </Form.Group>
            <Form.Group className="mt-3" controlId="projectAddDescription">
                <FormControl type="text" placeholder="상세내역" value={detail} onChange={(e) => setDetail(e.target.value)} />
            </Form.Group>
            <Row className="mt-3">
                <Col>
                    <DatePicker selected={startDate} onChange={(date) => setStartDate(date)} />
                </Col>
                <Col>
                    <DatePicker selected={endDate} onChange={(date) => setEndDate(date)} />
                </Col>
            </Row>
            <Row className="mt-3 mb-4 text-center">
                <Col sm="20">
                    <Button type="submit" variant="primary" className="me-3" onClick={handleSubmit}>확인</Button>
                    <Button type="button" variant="secondary" onClick={handleForm}>취소</Button>
                </Col>
            </Row>
        </Form>
    );
}

export default ProjectForm;