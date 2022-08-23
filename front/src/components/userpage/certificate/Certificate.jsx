import { useState, useReducer } from "react";
import { Card, Row, Col, Button } from "react-bootstrap";
import CertificateForm from "./CertificateForm";
import CertificateInfo from "./CertificateInfo";

const reducer = (state, action) => {
    const { title, detail, date, handleForm, index } = action.payload;

    switch (action.type) {
        case "add":
            handleForm();
            const a = [ ...state, {title, detail, date} ];
            return a
        case "edit":
            const newState = [ ...state ];

            newState[index] = { ...newState[index], title, detail, date };
            
            handleForm();

            return newState;
        case "load":
            const { setTitle, setDetail, setDate } = action.payload;
                const certificate = state[index];

                setTitle(certificate.title);
                setDetail(certificate.detail);
                setDate(new Date(certificate.date));
        default:
            return state;
    }
}

const initialState = [];

const Certificate = ({ isEditable }) => {
    const [ isForm, setIsForm ] = useState(false);
    const [ certificate, dispatch ] = useReducer(reducer, initialState);

    const handleForm = () => {        
        setIsForm(() => !isForm);
    }

    return (
        <Card>
            <Card.Body>
                <Card.Title>자격증</Card.Title>
                {certificate.map((certificate, idx) => (<CertificateInfo key={idx} certificate={certificate} index={idx} dispatch={dispatch} />))}
                {isEditable &&
                    <Row className="mt-3 mb-4 text-center">
                        <Col sm="20">
                            <Button variant="primary" onClick={handleForm}>+</Button>
                        </Col>
                    </Row>
                }
                {isForm && <CertificateForm dispatch={dispatch} type="add" handleForm={handleForm} index={certificate.length}/>}
            </Card.Body>
        </Card>
    );
}

export default Certificate;