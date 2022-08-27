import { overlapCheck } from "../../util/util";
import * as api from "../../../api";

const educationReducer = (dispatch) => {
    const setNotices = dispatch;

    const reducer = (state, action) => {
        console.log(state, action)
        const { formData, handleForm, index } = action.payload;
        const { school, major, degree } = formData;
        switch (action.type) {
            case "add": {
                handleForm();

                if (overlapCheck(state, school)) {
                    setNotices({type: "warn", payload: {title: "학력", message: "이미 있는 내용입니다."}});
                    return state;
                }
                
                const newEducation = {school, major, degree};     

                api.post("user/education", newEducation)
                    .catch((err) => {
                        console.log(err.message);
                    });

                setNotices({type: "success", payload: {title: "학력", message: "추가되었습니다."}});

                return [ ...state, newEducation ];
            }
            
            case "remove": {
                const newState = state.filter((education) => !(education.school === school));
    
                setNotices({type: "success", payload: {title: "학력", message: "삭제되었습니다."}});
                return newState;
            }
    
            case "edit": {
                handleForm();
                
                if (overlapCheck(state, school)) {
                    setNotices({type: "warn", payload: {title: "학력", message: "이미 있는 내용입니다."}});
                    return state;
                }

                const newState = [ ...state ];
                console.log(newState)
                const editedEducation = { ...newState[index], school, major, degree };
                newState[index] = editedEducation;

                api.put("user/education", editedEducation)
                    .catch((err) => {
                        console.log(err.message);
                    });
    
                setNotices({type: "success", payload: {title: "학력", message: "수정되었습니다."}});
                return newState;
            }
    
            case "load": {
                const { setFormData } = action.payload;
                    const education = state[index];
                
                    setFormData({
                        school: education.school,
                        major:education.major,
                        degree: education.degree
                    });

                return state;
            }
            default:
                return state;
        }
    }

    return reducer;
}

export default educationReducer;