import { useState, useRef, useEffect, useContext } from "react"
import { Form, FormControl, Row, Col, Button } from "react-bootstrap";
import DatePicker from "react-datepicker";
import { NoticeContext } from "../../Portfolio";
import { TYPES, formatDateStr } from "../../util/util";

const CertificateForm = ({ certificate_id, handler, type, handleForm, index }) => {
    const [ title, setTitle ] = useState("");
    const [ detail, setDetail ] = useState("");
    const [ date, setDate ] = useState(new Date());
    const { setNotices } = useContext(NoticeContext);
    const period = useRef("");
    
    useEffect (() => {
        if (type === TYPES.edit) {
            handler.load(index, setTitle, setDetail, setDate);
        }
    }, []);

    useEffect (() => {
        period.current = formatDateStr(date);
    }, [date]);

    const handleSubmit = (e) => {
        e.preventDefault();

        if (title === "") {
            setNotices({type: "warn", payload: {title: "자격증", message: "제목이 비어있습니다."}});

            return;
        }

        if (detail === "") {
            setNotices({type: "warn", payload: {title: "자격증", message: "내용이 비어있습니다."}});

            return;
        }

        const periodValue = period.current
        
        if (type === TYPES.edit) {
            handler.edit(certificate_id, title, detail, periodValue, handleForm, index);
        } else {
            handler.add(title, detail, periodValue, handleForm, index);
        }
    }

    return (
        <Form>
            <Form.Group controlId="certificateAddTitle">
                <FormControl type="text" placeholder="자격증 제목" value={title} onChange={(e) => setTitle(e.target.value)} />
            </Form.Group>
            <Form.Group className="mt-3" controlId="certificateAddDescription">
                <FormControl type="text" placeholder="상세내역" value={detail} onChange={(e) => setDetail(e.target.value)} />
            </Form.Group>
            <Row className="mt-3">
                <Col>
                    <DatePicker selected={date} onChange={(date) => setDate(date)} />
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

export default CertificateForm;