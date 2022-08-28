import * as API from "../../../api";
import { TYPES } from "../../util/util";

const projectsHandler = (dispatcher) => {
    const dispatch = dispatcher;

    const add = async (title, detail, date, handleForm, index) => {
        dispatch({type: TYPES.add, payload: {title, detail, date}});
        
        handleForm();

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
        dispatch({type: TYPES.edit, payload: {title, detail, date, index}});

        handleForm();
        
        try {
            await API.put("user/project", {
                _id: project_id,
                title,
                detail,
                date,
            });
        } catch (err) {
            console.log(err);
        }
    }

    const load = (index, setTitle, setDetail, setStartDate, setEndDate) => {
        dispatch({type: TYPES.load, payload: {index, setTitle, setDetail, setStartDate, setEndDate}});
    }

    const init = (initialData) => {
        initialData.data.map((data) =>{
            const {_id, title, detail, date} = data;

            dispatch({type: TYPES.init, payload: {project_id: _id, title, detail, date}});
        });
    }

    return {add, remove, edit, load, init};
}

export default projectsHandler;