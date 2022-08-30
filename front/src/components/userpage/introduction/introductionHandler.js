import * as API from "../../../api";
import { TYPES } from "../../util/util";

const introductionHandler = (dispatcher) => {
    const dispatch = dispatcher;

    const add = async (text) => {
        console.log("=========")
        try {
            dispatch({type: TYPES.add, payload: {}});
            const res = await API.put("users/edit", 
                {
                    intro: text
                });

            const introduction_id = await res.data._id;

            dispatch({type: TYPES.setID, payload: {introduction_id}});
        } catch (err) {
            console.log(err);
        }
    }

    const edit = (text) => {
        dispatch({type: TYPES.edit, payload: {text}});
    }

    const init = (initialData) => {
        const { _id, intro } = initialData;

        dispatch({type: TYPES.init, payload: { introduction_id: _id, text: intro }});
    }

    return {add, edit, init};
}

export default introductionHandler;