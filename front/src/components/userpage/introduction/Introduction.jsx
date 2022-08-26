import { useState, useEffect, useRef, useCallback } from "react";
import { Card, Row, Form, Button } from "react-bootstrap";

const Introduction = () => {
    const [ value, setValue ] = useState("");
    const textarea = useRef();

    const handleResizeHeight = () => {
        console.log(textarea.current.style.height);
        textarea.current.style.height = textarea.current.scrollHeight + "px";
        // if(textarea.current.style.height) {
        //     textarea.current.sytle.height = "inherit";
        // } else {
        //     console.log("hi")
        // }
    };

    // useEffect(() => {
    //     if(value === "") {
    //         textarea.current.style.height = "44px";
    //     }
    // }, [value]);

    const handleChange = (e) => {
        setValue(e.target.value);
    }

    return (
        <Card>
            <Card.Body>
                <Card.Title>소개</Card.Title>
                <Row className="mt-3 text-center">
                    <Form>
                        <Form.Control
                            value={value}
                            onChange={handleChange}
                            ref={textarea}
                            maxLength="500"
                            style={{"resize": "none", "height": "44px"}}
                            className="mb-4"
                            // size="sm"
                            as="textarea"
                        />
                        <Button size="sm" variant="primary">편집</Button>
                    </Form>
                </Row>
            </Card.Body>
        </Card>
    );
}

export default Introduction;