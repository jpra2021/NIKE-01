import { useState, useRef, useEffect } from "react"
import { Form, FormControl, Row, Col, Button } from "react-bootstrap";
import DatePicker from "react-datepicker";
import { TYPES, overlapCheck, formatDateStr } from "../../util/util";
import { NOTICE_TYPES, notice } from "../../notice/notice";

const ProjectForm = ({ projects, index, handler, type, handleForm }) => {
    const [ title, setTitle ] = useState("");
    const [ detail, setDetail ] = useState("");
    const [ startDate, setStartDate ] = useState(new Date());
    const [ endDate, setEndDate ] = useState(new Date());
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
            notice(NOTICE_TYPES.warn, "입력");

            return;
        }

        if (detail === "") {
            notice(NOTICE_TYPES.warn, "입력");
            
            return;
        }

        if (startDate.getTime() > endDate.getTime()) {
            notice(NOTICE_TYPES.warn, "입력");

            return;
        }

        if (overlapCheck(projects, title)) {
            notice(NOTICE_TYPES.warn, "입력");

            return;
        }

        const date = period.current

        if (type === TYPES.edit) {
            const project_id = projects[index].project_id;
            
            handler.edit(project_id, title, detail, date, handleForm, index);
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