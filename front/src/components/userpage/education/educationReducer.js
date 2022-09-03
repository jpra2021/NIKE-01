import { TYPES } from "../../util/util";
import { NOTICE_TYPES, notice } from "../../notice/notice";

/*
    Data structure

    educations = [{
        education_id: ...,
        school: ...,
        major: ...,
        degree: ...
    }, ...]
*/

const educationReducer = () => {
  const reducer = (state, action) => {
    const { education_id, school, major, degree, index } = action.payload;

    switch (action.type) {
      case TYPES.add: {
        const newEducation = {
          education_id: "",
          school,
          major,
          degree,
        };

        notice(NOTICE_TYPES.success, "입력");

        return [...state, newEducation];
      }

      case TYPES.remove: {
        const newState = state.filter(
          (education) => !(education.school === school)
        );

        notice(NOTICE_TYPES.success, "삭제");

        return newState;
      }

      case TYPES.edit: {
        const newState = [...state];

        const editedEducation = {
          ...newState[index],
          school,
          major,
          degree,
        };
        newState[index] = editedEducation;

        notice(NOTICE_TYPES.success, "편집");

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
