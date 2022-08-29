import { TYPES, overlapCheck } from "../../util/util";

const awardReducer = (dispatch) => {
  const setNotices = dispatch;

  const reducer = (state, action) => {
    const { award_id, title, description, index } = action.payload;

    switch (action.type) {
      case TYPES.add: {
        if (overlapCheck(state, title)) {
          setNotices({
            type: "warn",
            payload: {
              title: "수상이력",
              message: "이미 존재하는 수상내역입니다.",
            },
          });

          return state;
        }

        setNotices({
          type: "success",
          payload: { title: "수상이력", message: "추가되었습니다." },
        });

        return [...state, { title, description }];
      }

      case TYPES.remove: {
        const newState = state.filter((award) => !(award.title === title));

        setNotices({
          type: "success",
          payload: { title: "수상이력", message: "삭제되었습니다." },
        });

        return newState;
      }

      case TYPES.edit: {
        if (overlapCheck(state, title)) {
          setNotices({
            type: "warn",
            payload: {
              title: "수상이력",
              message: "이미 존재하는 수상내역입니다.",
            },
          });
          return state;
        }

        const newState = [...state];

        const editedAward = {
          ...newState[index],
          title,
          description,
        };
        newState[index] = editedAward;

        setNotices({
          type: "success",
          payload: { title: "수상이력", message: "수정되었습니다." },
        });

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

export default awardReducer;
