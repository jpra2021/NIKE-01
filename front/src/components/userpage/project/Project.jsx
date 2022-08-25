import { useState, useReducer, useContext, useMemo } from "react";
import { Card, Row, Col, Button } from "react-bootstrap";
import ProjectForm from "./ProjectForm";
import ProjectInfo from "./ProjectInfo";
import { NoticeContext } from "../../../App";
import projectsReducer from "./projectsReducer";

const initialState = [];

const Project = ({ isEditable }) => {
    const { setNotices } = useContext(NoticeContext);
    const reducer = useMemo(() => (projectsReducer(setNotices)), [])
    const [ projects, dispatch ] = useReducer(reducer, initialState);
    const [ isForm, setIsForm ] = useState(false);

    const handleForm = () => {   
        setIsForm(() => !isForm);
    }

    return (
        <Card>
            <Card.Body>
                <Card.Title>프로젝트</Card.Title>
                {projects.map((project, idx) => (<ProjectInfo key={idx} project={project} index={idx} dispatch={dispatch} />))}
                {isEditable &&
                    <Row className="mt-3 mb-4 text-center">
                        <Col sm="20">
                            <Button variant="primary" onClick={handleForm}>+</Button>
                        </Col>
                    </Row>
                }
                {isForm && <ProjectForm dispatch={dispatch} type="add" handleForm={handleForm} index={projects.length} />}
            </Card.Body>
        </Card>
    );
}

export default Project;