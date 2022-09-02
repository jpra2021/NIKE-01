import { TYPES } from "../../util/util";

const introductionReducer = (dispatch) => {
    const setNotices = dispatch;

    const reducer = (state, action) => {
        const { introduction_id, text } = action.payload;

        switch (action.type) {
            case TYPES.add: {
                setNotices({
                    type: "success",
                    payload: { title: "소개", message: "입력되었습니다." },
                });

                return { ...state};
            }

            case TYPES.edit: {
                return { ...state, text};
            }

            case TYPES.setID: {
                return { ...state, introduction_id };
            }

            case TYPES.init: {
                return {introduction_id, text};
            }

            default:
                return state;
        }
    };

    return reducer;
};

export default introductionReducer;
