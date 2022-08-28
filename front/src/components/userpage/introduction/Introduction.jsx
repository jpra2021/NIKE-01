import { useState, useEffect, useContext, useMemo, useReducer, useRef } from "react";
import { Card, Row, Col, Form, FloatingLabel, Button } from "react-bootstrap";
import introductionReducer from "./introductionReducer";
import { NoticeContext } from "../../../App";
import introductionHandler from "./introductionHandler";
import { TYPES } from "../../util/util";
// 리네이밍
const Introduction = ({ initialData, isEditable }) => {
    const { setNotices } = useContext(NoticeContext);
    const reducer = useMemo(() => introductionReducer(setNotices), []);
    const [intro, dispatch] = useReducer(reducer, { text: ""});
    const handler = useMemo(() => introductionHandler(dispatch));
    const [ editMode, setEditMode ] = useState(true);
    const [ isEdit, setIsEdit ] = useState(false);

    const handleEditMode = () => {
        setEditMode((current) => !current);
    }

    const handleChange =(e) => {
        const { value } = e.target;

        handler.edit(value);
    }

    const handleClick = () => {
        // handler.add(handleEditMode);
        handleEditMode()
    };

    return (
        <Card>
            <Card.Body>
                <Card.Title>소개</Card.Title>
                {isEditable &&
                    <Row className="mt-3 text-center">
                        <Form>
                            <FloatingLabel
                                controlId="floatingTextarea2"
                                label={intro.text.length + " / 300"}
                            >
                                <Form.Control
                                    as="textarea"
                                    value={intro.text}
                                    onChange={handleChange}
                                    maxLength={300}
                                    style={{resize: "none", height: "300px", overflow: "hidden"}}
                                    className="mb-4"
                                />
                            </FloatingLabel >
                            {!isEditable && 
                                (<Row className="justify-content-between align-items-center mb-2" style={{resize: "none", height: "fit-content", overflow: "hidden"}}>
                                    <Col>
                                        {intro.text}
                                    </Col>
                                </Row>)
                            }
                            {isEditable && (
                                editMode ? 
                                    <Button size="sm" variant="outline-info" onClick={handleClick}>편집</Button>
                                    :
                                    <Button size="sm" variant="outline-info" onClick={handleEditMode}>확인</Button>
                            )  
                            }
                        </Form>
                    </Row>
                }
            </Card.Body>
        </Card>
    );
};

export default Introduction;
