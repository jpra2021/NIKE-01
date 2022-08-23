import { useState, useReducer } from "react";
import { Card, Row, Col, Button } from "react-bootstrap";
import ProjectForm from "./ProjectForm";
import ProjectInfo from "./ProjectInfo";

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
            const { setTitle, setDetail, setStartDate, setEndDate } = action.payload;
                const project = state[index];
                const dates = project.date.split(" ~ ");

                setTitle(project.title);
                setDetail(project.detail);
                setStartDate(new Date(dates[0]));
                setEndDate(new Date(dates[1]));
        default:
            return state;
    }
}

const initialState = [];

const Project = ({ isEditable }) => {
    const [ isForm, setIsForm ] = useState(false);
    const [ projects, dispatch ] = useReducer(reducer, initialState);

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
                {isForm && <ProjectForm dispatch={dispatch} type="add" handleForm={handleForm} index={projects.length}/>}
            </Card.Body>
        </Card>
    );
}

export default Project;