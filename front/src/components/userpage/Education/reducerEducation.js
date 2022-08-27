import { overlapCheck } from "../../util/util";
import * as Api from "../../../api";

const reducerEducation = (dispatch) => {
  const setNotices = dispatch;

  const reducer = (state, action) => {
    const { school, major, degree, handleForm, index } = action.payload;

    switch (action.type) {
      case "add": {
        handleForm();

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

        const data = {
          school: school,
          major: major,
          degree: degree,
        };

        let edu_id = "";

        Api.post("user/edu", data)
          .then((res) => (edu_id = res.data._id))
          .catch((err) => console.log(err.message));

        setNotices({
          type: "success",
          payload: { title: "학력", message: "추가되었습니다." },
        });

        const newAward = { edu_id, school, major, degree };

        return [...state, newAward];
      }

      case "remove": {
        const { edu_id } = action.payload;

        let _id = edu_id;

        Api.delete("user/edu", _id)
          .then((res) => console.log(res))
          .catch((err) => console.log(err.message));

        setNotices({
          type: "success",
          payload: { title: "학력", message: "삭제되었습니다." },
        });

        const newState = state.filter(
          (education) => !(education.school === school)
        );

        return newState;
      }

      case "edit": {
        handleForm();
        const newState = [...state];

        if (overlapCheck(state, school)) {
          setNotices({
            type: "warn",
            payload: {
              title: "학력",
              message: "이미 존재하는 학력입니다.",
            },
          });
          return state;
        }

        const data = {
          school: school,
          major: major,
          degree: degree,
        };

        Api.put("user/edu", data)
          .then((res) => console.log(res))
          .catch((err) => console.log(err.message));

        setNotices({
          type: "success",
          payload: { title: "학력", message: "수정되었습니다." },
        });

        newState[index] = { ...newState[index], school, major, degree };

        return newState;
      }

      case "load": {
        const { setSchool, setMajor, setDegree } = action.payload;
        const education = state[index];

        setSchool(education.school);
        setMajor(education.major);
        setDegree(education.degree);
      }

      default:
        return state;
    }
  };

  return reducer;
};

export default reducerEducation;
