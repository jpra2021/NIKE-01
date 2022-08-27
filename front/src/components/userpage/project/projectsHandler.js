import * as API from "../../../api";
import { TYPES } from "./projectsReducer";

const projectsHandler = (dispatcher) => {
    const dispatch = dispatcher;

    const add = async (title, detail, date, handleForm, index) => {
        dispatch({type: TYPES.add, payload: {title, detail, date, handleForm}});
        
        handleForm()

        try {
            const res = await API.post("user/project", 
                {
                    title,
                    detail,
                    date
                });

            const project_id = await res.data._id;

            dispatch({type: TYPES.setID, payload: {project_id, index}});
        } catch (err) {
            console.log(err);
        }
    }

    const remove = async (project_id, title) => {
        dispatch({type: TYPES.remove, payload: {project_id, title}});
        console.log("delete는 바디가 없음")
        // await API.delete("/user/project", {"_id": project_id});
    }

    const edit = async (project_id, title, detail, date, handleForm, index) => {
        dispatch({type: TYPES.edit, payload: {title, detail, date, handleForm, index}});

        handleForm()

        await API.put("user/project", {
            _id: project_id,
            title,
            detail,
            date,
        });
        console.log("hi")
    }

    const load = (index, setTitle, setDetail, setStartDate, setEndDate) => {
        dispatch({type: TYPES.load, payload: {index, setTitle, setDetail, setStartDate, setEndDate}});
    }

    return {add, remove, edit, load};
}

export default projectsHandler;