import { useState, useReducer, useContext, useMemo } from "react";
import { Card, Row, Col, Button } from "react-bootstrap";
import ProjectForm from "./ProjectForm";
import ProjectInfo from "./ProjectInfo";
import { NoticeContext } from "../../../App";
import projectsReducer from "./projectsReducer";
import projectsHandler from "./projectsHandler";
import { useCallback } from "react";

const initialState = [];

const Project = ({ isEditable }) => {
    const { setNotices } = useContext(NoticeContext);
    const reducer = useMemo(() => (projectsReducer(setNotices)), [])
    const [ projects, dispatch ] = useReducer(reducer, initialState);
    const handler = useMemo(() => projectsHandler(dispatch), [dispatch]);

    const [ isForm, setIsForm ] = useState(false);

    const handleForm = () => {   
        setIsForm((current) => !current);
    }
    
    console.log(projects)
    return (
        <Card>
            <Card.Body>
                <Card.Title>프로젝트</Card.Title>
                {projects.map((project, idx) => (<ProjectInfo key={idx} project={project} index={idx} handler={handler} />))}
                {isEditable &&
                    <Row className="mt-3 mb-4 text-center">
                        <Col sm="20">
                            <Button variant="primary" onClick={handleForm}>+</Button>
                        </Col>
                    </Row>
                }
                {isForm && <ProjectForm handler={handler} type="add" handleForm={handleForm} index={projects.length} />}
            </Card.Body>
        </Card>
    );
}

export default Project;