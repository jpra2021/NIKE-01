import { useState, useReducer, useContext, useMemo, useEffect } from "react";
import { Card, Row, Col, Button } from "react-bootstrap";
import ProjectForm from "./ProjectForm";
import ProjectInfo from "./ProjectInfo";
import projectsReducer from "./projectsReducer";
import projectsHandler from "./projectsHandler";
import { TYPES } from "../../util/util";
import { NOTICE_TYPES, notice } from "../../notice/notice";

const initialState = [];

const Project = ({ initialData, isEditable }) => {
    const reducer = useMemo(() => (projectsReducer()), [])
    const [ projects, dispatch ] = useReducer(reducer, initialState);
    const handler = useMemo(() => projectsHandler(dispatch, projects), [dispatch]);

    const [ isForm, setIsForm ] = useState(false);
    
    useEffect(() => {
        handler.init(initialData);
    }, []);

    console.log("project reload!")
    const projectList = useMemo(() => {
        return projects.map(({meta, project}, idx) => (<ProjectInfo key={idx} project_id={meta.project_id} project={project} index={idx} handler={handler} />));
    }, [projects]);
    
    const handleForm = () => {   
        setIsForm((current) => !current);
    }
    console.log(projects);
    return (
        <Card>
            <Card.Body>
                <Card.Title>프로젝트</Card.Title>
                {projectList}
                {isEditable &&
                    <Row className="mt-3 mb-4 text-center">
                        <Col sm="20">
                            <Button variant="primary" onClick={handleForm}>+</Button>
                        </Col>
                    </Row>
                }
                {isForm && <ProjectForm handler={handler} type={TYPES.add} handleForm={handleForm} index={projects.length} />}
            </Card.Body>
        </Card>
    );
}

export default Project;