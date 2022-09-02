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

const projectsReducer = () => {
  const reducer = (state, action) => {
    const { project_id, title, detail, date, index } = action.payload;

    switch (action.type) {
      case TYPES.add: {
        const newProject = {
          project_id: "",
          title,
          detail,
          date,
        };

        notice(NOTICE_TYPES.success, "입력");

        return [...state, newProject];
      }

      case TYPES.remove: {
        const newState = state.filter((project) => !(project.title === title));

        notice(NOTICE_TYPES.success, "삭제");

        return newState;
      }

      case TYPES.edit: {
        const newState = [...state];

        const editedProject = { ...newState[index], title, detail, date };

        newState[index] = editedProject;

        notice(NOTICE_TYPES.success, "편집");

        return newState;
      }

      case TYPES.load: {
        const { setTitle, setDetail, setStartDate, setEndDate } =
          action.payload;
        const project = state[index];
        const dates = project.date.split(" ~ ");

        setTitle(project.title);
        setDetail(project.detail);
        setStartDate(new Date(dates[0]));
        setEndDate(new Date(dates[1]));

        return state;
      }

      case TYPES.setID: {
        const newState = [...state];
        const target = newState[index];

        target.project_id = project_id;

        newState[index] = target;

        return newState;
      }

      case TYPES.init: {
        return [...state, { project_id, title, detail, date }];
      }

      default:
        return state;
    }
  };

  return reducer;
};

export default projectsReducer;
