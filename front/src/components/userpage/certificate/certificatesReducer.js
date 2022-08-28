import { TYPES, overlapCheck } from "../../util/util";

const certificateReducer = (dispatch) => {
    const setNotices = dispatch;

    const reducer = (state, action) => {
        const { certificate_id, title, detail, date, index } = action.payload;
    
        switch (action.type) {
            case TYPES.add: {
                if(overlapCheck(state, title)) {
                    setNotices({type: "warn", payload: {title: "자격증", message: "이미 있는 자격증입니다."}});

                    return state;
                }

                setNotices({type: "success", payload: {title: "자격증", message: "추가되었습니다."}});
                
                return [ ...state, {title, detail, date} ];
            }
                    
            case TYPES.remove: {
                const newState = state.filter((certificate) => !(certificate.title === title));

                setNotices({type: "success", payload: {title: "자격증", message: "삭제되었습니다."}});

                return newState;
            }
    
            case TYPES.edit: {        
                if(overlapCheck(state, title)) {
                    setNotices({type: "warn", payload: {title: "자격증", message: "이미 있는 자격증입니다."}});
                    return state;
                }

                const newState = [ ...state ];

                const editedCertificate = { ...newState[index], title, detail, date }
                newState[index] = editedCertificate;

                setNotices({type: "success", payload: {title: "자격증", message: "수정되었습니다."}});

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
                const newState = [ ...state ];
                const target = newState[index];
                
                newState[index] = { ...target, certificate_id };

                return newState;
            }
            
            case TYPES.init: {
                return [ ...state, {certificate_id, title, detail, date} ];
            }
            
            default:
                return state;
        }
    }

    return reducer;
}

export default certificateReducer;