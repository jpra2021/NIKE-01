import { useState } from "react";
import { Card, Row, Col, Button } from "react-bootstrap";
import ProjectForm from "./ProjectForm";

const ProjectInfo = ({ project, index, dispatch }) => {
    const [ isEditing, setIsEditing ] = useState(false);

    const handleForm = () => {
        setIsEditing(() => !isEditing);
    }

    if (isEditing) {
        return (
            <ProjectForm dispatch={dispatch} type="edit" handleForm={handleForm} index={index} />
        );
    }

    return (
        <Card.Text as="div">
            <Row className="justify-content-between align-items-center mb-2">
                <Col>
                    {project.title}
                    <br />
                    <span className="text-muted">{project.detail}</span>
                    <br />
                    <span className="text-muted">{project.date}</span>
                </Col>
                <Col className="col-lg-1">
                    <Button size="sm" variant="outline-info" onClick={(e) => setIsEditing(() => !isEditing)}>편집</Button>
                </Col>
            </Row>
        </Card.Text>
    );
}

export default ProjectInfo;