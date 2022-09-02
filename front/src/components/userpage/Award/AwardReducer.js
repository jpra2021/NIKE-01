import { TYPES, overlapCheck } from "../../util/util";
import { NOTICE_TYPES, notice } from "../../notice/notice";

/*
    Data structure

    awards = [{
        award_id: ...,
        title: ...,
        detail: ...,
        date: ...
    }, ...]
*/

const AwardReducer = () => {
  const reducer = (state, action) => {
    const { award_id, title, description, index } = action.payload;

    switch (action.type) {
      case TYPES.add: {
        const newAward = {
          award_id: "",
          title,
          description,
        };

        notice(NOTICE_TYPES.success, "입력");

        return [...state, newAward];
      }

      case TYPES.remove: {
        const newState = state.filter((award) => !(award.title === title));

        notice(NOTICE_TYPES.success, "삭제");

        return newState;
      }

      case TYPES.edit: {
        const newState = [...state];

        const editedAward = {
          ...newState[index],
          title,
          description,
        };

        newState[index] = editedAward;

        notice(NOTICE_TYPES.success, "편집");

        return newState;
      }

      case TYPES.load: {
        const { setTitle, setDescription } = action.payload;
        const award = state[index];

        setTitle(award.title);
        setDescription(award.description);

        return state;
      }

      case TYPES.setID: {
        const newState = [...state];
        const target = newState[index];

        target.award_id = award_id;

        newState[index] = { ...target, award_id };

        return newState;
      }

      case TYPES.init: {
        return [...state, { award_id, title, description }];
      }

      default:
        return state;
    }
  };

  return reducer;
};

export default AwardReducer;
