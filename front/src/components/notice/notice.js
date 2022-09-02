import { toast } from "react-toastify";

export const NOTICE_TYPES = {
  success: "SUCCESS",
  warn: "WARN",
};

export const notice = (type, target) => {
  switch (type) {
    case NOTICE_TYPES.success: {
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

    case NOTICE_TYPES.warn: {
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

    default: {
      toast.error(`토스트 사용에 실패했어요!`, {
        position: "top-right",
        autoClose: 3000,
        hideProgressBar: true,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: false,
        progress: 0,
      });
    }
  }
};
