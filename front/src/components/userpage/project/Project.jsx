import { useState, useReducer, useMemo, useEffect } from "react";
import { Card, Row, Col, Button, Accordion } from "react-bootstrap";
import ProjectForm from "./ProjectForm";
import ProjectInfo from "./ProjectInfo";
import projectsReducer from "./projectsReducer";
import projectsHandler from "./projectsHandler";
import { TYPES } from "../../util/util";

const initialState = [];

const Project = ({ initialData, isEditable }) => {
  const reducer = useMemo(() => projectsReducer(), []);
  const [projects, dispatch] = useReducer(reducer, initialState);
  const handler = useMemo(() => projectsHandler(dispatch), [dispatch]);

  const [isForm, setIsForm] = useState(false);

  useEffect(() => {
    handler.init(initialData);
  }, [initialData]);

  const projectList = useMemo(() => {
    return projects.map((_, idx) => (
      <ProjectInfo
        key={idx}
        projects={projects}
        index={idx}
        handler={handler}
      />
    ));
  }, [projects]);

  const handleForm = () => {
    setIsForm((current) => !current);
  };

  return (
    <Card>
      <Card.Body>
        <Card.Title>프로젝트</Card.Title>
        {projectList}
        {isEditable && (
          <Row className="mt-3 mb-4 text-center">
            <Col sm="20">
              <Button variant="primary" onClick={handleForm}>
                +
              </Button>
            </Col>
          </Row>
        )}
        {isForm && (
          <ProjectForm
            projects={projects}
            index={projects.length}
            handler={handler}
            type={TYPES.add}
            handleForm={handleForm}
          />
        )}
      </Card.Body>
    </Card>
  );
};

export default Project;
