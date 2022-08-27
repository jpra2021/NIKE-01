import { overlapCheck } from "../../util/util";

export const TYPES = {
    add: "ADD",
    remove: "REMOVE",
    edit: "EDIT",
    load: "LOAD",
    setID: "SETID"
}

const projectsReducer = (dispatch) => {
    const setNotices = dispatch;
    const reducer = (state, action) => {
        console.log("reducer 실행됨")
        const { project_id, title, detail, date, index } = action.payload;

        switch (action.type) {
            case TYPES.add: {
                if (overlapCheck(state, title)) {
                    setNotices({type: "warn", payload: {title: "프로젝트", message: "이미 있는 내용입니다."}});
                    return state;
                }
                setNotices({type: "success", payload: {title: "프로젝트", message: "추가되었습니다."}});
                console.log("Add", "실행됨")
                return [ ...state, {project_id, title, detail, date} ];
            }
            
            case TYPES.remove: {
                const newState = state.filter((project) => !(project.title === title));

                setNotices({type: "success", payload: {title: "프로젝트", message: "삭제되었습니다."}});

                return newState;
            }
    
            case TYPES.edit: {
                if (overlapCheck(state, title)) {
                    setNotices({type: "warn", payload: {title: "프로젝트", message: "이미 있는 내용입니다."}});
                    return state;
                }
                
                const newState = [ ...state ];
                
                const editedProject = { ...newState[index], title, detail, date };
                newState[index] = editedProject;
                
                setNotices({type: "success", payload: {title: "프로젝트", message: "수정되었습니다."}});
                return newState;
            }
    
            case TYPES.load: {
                const { setTitle, setDetail, setStartDate, setEndDate } = action.payload;
                    const project = state[index];
                    const dates = project.date.split(" ~ ");
    
                    setTitle(project.title);
                    setDetail(project.detail);
                    setStartDate(new Date(dates[0]));
                    setEndDate(new Date(dates[1]));

                return state;         
            }

            case TYPES.setID: {
                const newState = [ ...state ];
                const target = newState[index];
                
                newState[index] = { ...target, project_id };

                return newState;
            }
            default:
                return state;
        }
    }

    return reducer;
}

export default projectsReducer;