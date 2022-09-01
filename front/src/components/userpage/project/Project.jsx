import { useState, useReducer, useContext, useMemo, useEffect } from "react";
import { Card, Row, Col, Button } from "react-bootstrap";
import ProjectForm from "./ProjectForm";
import ProjectInfo from "./ProjectInfo";
import { NoticeContext } from "../../Portfolio";
import projectsReducer from "./projectsReducer";
import projectsHandler from "./projectsHandler";
import { TYPES } from "../../util/util";

const initialState = [];

const Project = ({ initialData, isEditable }) => {
    const { setNotices } = useContext(NoticeContext);
    const reducer = useMemo(() => (projectsReducer(setNotices)), [])
    const [ projects, dispatch ] = useReducer(reducer, initialState);
    const handler = useMemo(() => projectsHandler(dispatch), [dispatch]);

    const [ isForm, setIsForm ] = useState(false);
    
    useEffect(() => {
        handler.init(initialData);
    }, []);
    
    console.log("project reload!")
    const projectList = useMemo(() => {
        return projects.map((project, idx) => (<ProjectInfo key={idx} project={project} index={idx} handler={handler} />));
    }, [projects]);
    
    const handleForm = () => {   
        setIsForm((current) => !current);
    }

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