import * as API from "../../../api";
import { TYPES } from "../../util/util";

const awardHandler = (dispatcher) => {
  const dispatch = dispatcher;

  const add = async (title, description, handleForm, index) => {
    dispatch({ type: TYPES.add, payload: { title, description } });

    handleForm();

    try {
      const res = await API.post("users/award", {
        title,
        description,
      });

      const award_id = await res.data._id;

      dispatch({ type: TYPES.setID, payload: { award_id, index } });
    } catch (err) {
      console.log(err);
    }
  };

  const remove = async (award_id, title) => {
    dispatch({ type: TYPES.remove, payload: { title } });

    try {
      await API.delete("users/award", award_id);
    } catch (err) {
      console.log(err);
    }
  };

  const edit = async (award_id, title, description, handleForm, index) => {
    dispatch({ type: TYPES.edit, payload: { title, description, index } });

    handleForm();

    try {
      await API.put("users/award", {
        _id: award_id,
        title,
        description,
      });
    } catch (err) {
      console.log(err);
    }
  };

  const load = (index, setTitle, setDescription) => {
    dispatch({
      type: TYPES.load,
      payload: { index, setTitle, setDescription },
    });
  };

  const init = (initialData) => {
    initialData.data.map((data) => {
      const { _id, title, description } = data;

      dispatch({
        type: TYPES.init,
        payload: { award_id: _id, title, description },
      });
    });
  };

  return { add, remove, edit, load, init };
};

export default awardHandler;
