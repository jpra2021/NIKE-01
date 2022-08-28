import { TYPES, overlapCheck } from "../../util/util";

const educationReducer = (dispatch) => {
    const setNotices = dispatch;

    const reducer = (state, action) => {
        const { education_id, school, major, degree, index } = action.payload;

        switch (action.type) {
            case TYPES.add: {
                if (overlapCheck(state, school)) {
                    setNotices({
                        type: "warn",
                        payload: {
                            title: "학력",
                            message: "이미 존재하는 수상내역입니다.",
                        },
                    });

                    return state;
                }

                setNotices({
                    type: "success",
                    payload: { title: "학력", message: "추가되었습니다." },
                });

                return [...state, { school, major, degree }];
            }

            case TYPES.remove: {
                const newState = state.filter(
                    (education) => !(education.school === school)
                );

                setNotices({
                    type: "success",
                    payload: { title: "학력", message: "삭제되었습니다." },
                });

                return newState;
            }

            case TYPES.edit: {
                if (overlapCheck(state, school)) {
                    setNotices({
                        type: "warn",
                        payload: {
                            title: "학력",
                            message: "이미 존재하는 학력입니다.",
                        },
                    });
                }

                const newState = [...state];

                const editedEducation = {
                    ...newState[index],
                    school,
                    major,
                    degree,
                };
                newState[index] = editedEducation;

                setNotices({
                    type: "success",
                    payload: { title: "학력", message: "수정되었습니다." },
                });

                return newState;
            }

            case TYPES.load: {
                const { setFormData } = action.payload;
                const education = state[index];

                setFormData({ ...education });

                return state;
            }

            case TYPES.setID: {
                const newState = [...state];
                const target = newState[index];

                newState[index] = { ...target, education_id };

                return newState;
            }

            case TYPES.init: {
                return [...state, { education_id, school, major, degree }];
            }

            default:
                return state;
        }
    };

    return reducer;
};

export default educationReducer;
