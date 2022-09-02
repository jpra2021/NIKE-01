import { useState, useRef, useEffect, useContext } from "react"
import { Form, FormControl, Row, Col, Button } from "react-bootstrap";
import DatePicker from "react-datepicker";
import { TYPES, overlapCheck, formatDateStr } from "../../util/util";
import { NOTICE_TYPES, notice } from "../../notice/notice";

const CertificateForm = ({ certificates, index, handler, type, handleForm }) => {
    const [ title, setTitle ] = useState("");
    const [ detail, setDetail ] = useState("");
    const [ date, setDate ] = useState(new Date());
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
            notice(NOTICE_TYPES.warn, "입력");

            return;
        }

        if (detail === "") {
            notice(NOTICE_TYPES.warn, "입력");

            return;
        }

        if (overlapCheck(certificates, title)) {
            notice(NOTICE_TYPES.warn, "입력");

            return;
        }

        const periodValue = period.current


        
        if (type === TYPES.edit) {
            const certificate_id = certificates[index].certificate_id;

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