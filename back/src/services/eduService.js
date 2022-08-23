import { Education } from "../db/models/Education";

//실제 사용할 함수들 정리
/*
    1. 입력한 학력 추가
    2. 학력 편집
*/
class eduService{
    //학력 추가
    static async addEdu({school, major, position}){
        const addNewEducation = await Education.create({
            school,
            major,
            position
        })

        return addNewEducation
    }

    //학력 편집
    static async editEdu({school, major, position}){
        const updateEducation = await Education.update({
            school,
            major,
            position
        })

        return updateEducation
    }
}





export {eduService}