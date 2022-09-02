import { TYPES } from "../../util/util";
import { NOTICE_TYPES, notice } from "../../notice/notice";

/*
    Data structure

    projects = [{
        project_id: ...,
        title: ...,
        detail: ...,
        date: ...
    }, ...]
*/

const certificateReducer = (dispatch) => {
  const reducer = (state, action) => {
    const { certificate_id, title, detail, date, index } = action.payload;

    switch (action.type) {
      case TYPES.add: {
        const newCertificate = {
          certificate_id: "",
          title,
          detail,
          date,
        };

        notice(NOTICE_TYPES.success, "입력");

        return [...state, newCertificate];
      }

      case TYPES.remove: {
        const newState = state.filter(
          (certificate) => !(certificate.title === title)
        );

        notice(NOTICE_TYPES.success, "삭제");

        return newState;
      }

      case TYPES.edit: {
        const newState = [...state];

        const editedCertificate = { ...newState[index], title, detail, date };

        newState[index] = editedCertificate;

        notice(NOTICE_TYPES.success, "편집");

        return newState;
      }

      case TYPES.load: {
        const { setTitle, setDetail, setDate } = action.payload;
        const certificate = state[index];

        setTitle(certificate.title);
        setDetail(certificate.detail);
        setDate(new Date(certificate.date));

        return state;
      }

      case TYPES.setID: {
        const newState = [...state];
        const target = newState[index];

        newState[index] = { ...target, certificate_id };

        return newState;
      }

      case TYPES.init: {
        return [...state, { certificate_id, title, detail, date }];
      }

      default:
        return state;
    }
  };

  return reducer;
};

export default certificateReducer;
