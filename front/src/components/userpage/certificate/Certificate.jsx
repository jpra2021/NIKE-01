import { useState, useReducer } from "react";
import { Card, Row, Col, Button } from "react-bootstrap";
import CertificateForm from "./CertificateForm";
import CertificateInfo from "./CertificateInfo";

const overlapCheck = (state, title) => {
    const filtered = state.filter((certificate) => certificate.title === title);

    if (filtered.length === 1) {
        
        return true;
    }
    
    return false;
}

const reducer = (state, action) => {
    const { title, detail, date, handleForm, index } = action.payload;

    switch (action.type) {
        case "add": {
            handleForm();

            if(overlapCheck(state, title)) {
                alert("이미 있는 자격증입니다.");
                return state;
            }

            return [ ...state, {title, detail, date} ];
        }
                
        case "remove": {
            const newState = state.filter((certificate) => !(certificate.title === title));

            return newState;
        }

        case "edit": {
            handleForm();
            const newState = [ ...state ];

            newState[index] = { ...newState[index], title, detail, date };
            
            if(overlapCheck(state, title)) {
                alert("이미 있는 자격증입니다.");
                return state;
            }

            return newState;
        }

        case "load": {
            const { setTitle, setDetail, setDate } = action.payload;
                const certificate = state[index];

                setTitle(certificate.title);
                setDetail(certificate.detail);
                setDate(new Date(certificate.date));
        }
        default:
            return state;
    }
}

const initialState = [];

const Certificate = ({ isEditable }) => {
    const [ isForm, setIsForm ] = useState(false);
    const [ certificates, dispatch ] = useReducer(reducer, initialState);

    const handleForm = () => {        
        setIsForm(() => !isForm);
    }

    return (
        <Card>
            <Card.Body>
                <Card.Title>자격증</Card.Title>
                {certificates.map((certificate, idx) => (<CertificateInfo key={idx} certificate={certificate} index={idx} dispatch={dispatch} />))}
                {isEditable &&
                    <Row className="mt-3 mb-4 text-center">
                        <Col sm="20">
                            <Button variant="primary" onClick={handleForm}>+</Button>
                        </Col>
                    </Row>
                }
                {isForm && <CertificateForm dispatch={dispatch} type="add" handleForm={handleForm} index={certificates.length}/>}
            </Card.Body>
        </Card>
    );
}

export default Certificate;