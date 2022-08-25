import { useState, useRef, useEffect, useContext } from "react"
import { Form, FormControl, Row, Col, Button } from "react-bootstrap";
import DatePicker from "react-datepicker";
import { NoticeContext } from "../../../App";

const formatDateStr = (date) => {
    const year = date.getFullYear();
    const month =('0' + (date.getMonth() + 1));
    let day = date.getDate();

    if (day <= 9) {
        day = "0" + day;
    }

    const period = year + '-' + month + '-' + day;

    return period;
}

const ProjectForm = ({ dispatch, type, handleForm, index }) => {
    const [ title, setTitle ] = useState("");
    const [ detail, setDetail ] = useState("");
    const [ startDate, setStartDate ] = useState(new Date());
    const [ endDate, setEndDate ] = useState(new Date());
    const period = useRef("");
    const { setNotices } = useContext(NoticeContext);

    useEffect (() => {
        if (type === "edit") {
            dispatch({type: "load", payload: {index, setTitle, setDetail, setStartDate, setEndDate, setNotices}});
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
            alert("프로젝트 제목이 비어있습니다!");

            return;
        }

        if (detail === "") {
            alert("내용이 비어있습니다!");

            return;
        }

        if (startDate.getTime() > endDate.getTime()) {
            alert("종료일보다 시작일이 더 큽니다!");

            return;
        }

        const date = period.current

        dispatch({type, payload: {title, detail, date, handleForm, index, setNotices}});
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