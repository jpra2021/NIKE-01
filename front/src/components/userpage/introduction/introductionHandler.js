import * as API from "../../../api";
import { TYPES } from "../../util/util";

const introductionHandler = (dispatcher) => {
    const dispatch = dispatcher;

    const add = async (handleEditMode) => {
        dispatch({type: TYPES.add, payload: {}});
        
        handleEditMode();

        // try {
        //     const res = await API.post("user/intro", 
        //         {
        //             text
        //         });

        //     const introduction_id = await res.data._id;

        //     dispatch({type: TYPES.setID, payload: {introduction_id}});
        // } catch (err) {
        //     console.log(err);
        // }
    }

    const edit = (text) => {
        dispatch({type: TYPES.edit, payload: {text}});
    }

    const init = (initialData) => {
        dispatch({type: TYPES.init, payload: { ...initialData }});
    }

    return {add, edit, init};
}

export default introductionHandler;