import * as API from "../../../api";
import { TYPES } from "../../util/util";

const certificatesHandler = (dispatcher) => {
    const dispatch = dispatcher;

    const add = async (title, detail, date, handleForm, index) => {
        dispatch({type: TYPES.add, payload: {title, detail, date}});
        
        handleForm();

        try {
            const res = await API.post("user/certificate", 
                {
                    title,
                    detail,
                    date
                });

            const certificate_id = await res.data._id;

            dispatch({type: TYPES.setID, payload: {certificate_id, index}});
        } catch (err) {
            console.log(err);
        }
    }

    const remove = async (certificate_id, title) => {
        dispatch({type: TYPES.remove, payload: {certificate_id, title}});
        console.log("delete는 바디가 없음")
        // await API.delete("/user/project", {"_id": certificate_id});
    }

    const edit = async (certificate_id, title, detail, date, handleForm, index) => {
        dispatch({type: TYPES.edit, payload: {title, detail, date, index}});

        handleForm();

        try {
            await API.put("user/certificate", {
                _id: certificate_id,
                title,
                detail,
                date,
            });
        } catch (err) {
            console.log(err)
        }
    }

    const load = (index, setTitle, setDetail, setDate) => {
        dispatch({type: TYPES.load, payload: {index, setTitle, setDetail, setDate}});
    }

    return {add, remove, edit, load};
}

export default certificatesHandler;