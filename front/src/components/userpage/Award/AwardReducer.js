import { overlapCheck } from "../../util/util";

const AwardReducer = (dispatch) => {
  const setNotices = dispatch;

  const reducer = (state, action) => {
    const { title, description, handleForm, index } = action.payload;

    switch (action.type) {
      case "add": {
        handleForm();

        if (overlapCheck(state, title)) {
          setNotices({
            type: "warn",
            payload: {
              title: "수상내역",
              message: "이미 존재하는 수상내역입니다.",
            },
          });

          return state;
        }

        setNotices({
          type: "success",
          payload: { title: "수상내역", message: "추가되었습니다." },
        });

        return [...state, { title, description }];
      }

      case "remove": {
        const newState = state.filter((award) => !(award.title === title));
        setNotices({
          type: "success",
          payload: { title: "수상내역", message: "삭제되었습니다." },
        });

        return newState;
      }

      case "edit": {
        handleForm();
        const newState = [...state];

        newState[index] = { ...newState[index], title, description };

        if (overlapCheck(state, title)) {
          setNotices({
            type: "warn",
            payload: {
              title: "수상내역",
              message: "이미 존재하는 수상내역입니다.",
            },
          });
          return state;
        }

        setNotices({
          type: "success",
          payload: { title: "수상내역", message: "수정되었습니다." },
        });

        return newState;
      }

      case "load": {
        const { setTitle, setDescription } = action.payload;
        const award = state[index];

        setTitle(award.title);
        setDescription(award.description);
      }

      default:
        return state;
    }
  };

  return reducer;
};

export default AwardReducer;
