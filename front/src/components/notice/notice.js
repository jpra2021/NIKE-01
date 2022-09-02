import { ToastContainer, toast } from "react-toastify";
// import "react-toastify/dist/ReactToastify.css";

export const NOTICE_TYPES = {
    success: "SUCCESS",
    warn: "WARN"
}

export const notice = (type, target) => {
    switch (type) {
        case (NOTICE_TYPES.success): {
            toast.success(`${target}에 성공했어요!`, {
                position: "top-right",
                autoClose: 3000,
                hideProgressBar: true,
                closeOnClick: true,
                pauseOnHover: true,
                draggable: false,
                progress: 0,
            });

            break;
        }

        case (NOTICE_TYPES.warn): {
            toast.error(`${target}에 실패했어요!`, {
                position: "top-right",
                autoClose: 3000,
                hideProgressBar: true,
                closeOnClick: true,
                pauseOnHover: true,
                draggable: false,
                progress: 0,
            });

            break;
        }
    }
}