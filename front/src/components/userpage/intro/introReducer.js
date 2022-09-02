import { TYPES } from "../../util/util";
import { NOTICE_TYPES, notice } from "../../notice/notice";

const introductionReducer = () => {
  const reducer = (state, action) => {
    const { introduction_id, text } = action.payload;

    switch (action.type) {
      case TYPES.add: {
        notice(NOTICE_TYPES.success, "입력");

        return { ...state };
      }

      case TYPES.edit: {
        return { ...state, text };
      }

      case TYPES.setID: {
        return { ...state, introduction_id };
      }

      case TYPES.init: {
        return { introduction_id, text };
      }

      default:
        return state;
    }
  };

  return reducer;
};

export default introductionReducer;
