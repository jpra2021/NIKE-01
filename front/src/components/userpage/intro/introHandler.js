import * as API from "../../../api";
import { TYPES } from "../../util/util";

const introductionHandler = (dispatcher) => {
    const dispatch = dispatcher;

    const add = async (text) => {
        dispatch({ type: TYPES.add, payload: {} });

        try {
            const res = await API.put("users/edit", {
                intro: text,
            });

            const introduction_id = await res.data._id;

            dispatch({ type: TYPES.setID, payload: { introduction_id } });
        } catch (err) {
            console.log(err);
        }
    };

    const edit = (text) => {
        dispatch({ type: TYPES.edit, payload: { text } });
    };

    const init = (initialData) => {
        let { _id, intro } = initialData.data;
        if (intro === undefined) {
            intro = "";
        }

        dispatch({
            type: TYPES.init,
            payload: { introduction_id: _id, text: intro },
        });
    };

    return { add, edit, init };
};

export default introductionHandler;
