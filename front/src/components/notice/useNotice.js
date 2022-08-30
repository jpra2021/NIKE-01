import { useReducer } from "react";
import reducer from "./noticeReducer";

const useNotice = () => {
    const [ notices, dispatch ] = useReducer(reducer ,[]);


}

export useNotice;