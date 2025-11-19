import { toast } from "react-toastify";

export const showToast = {
  success: (message) =>
    toast.success(message, {
      position: "top-right",
      autoClose: 3000,
      hideProgressBar: false,
      closeOnClick: true,
      pauseOnHover: true,
    }),

  error: (message) =>
    toast.error(message, {
      position: "top-right",
      autoClose: 4000,
      hideProgressBar: false,
      closeOnClick: true,
      pauseOnHover: true,
    }),

  info: (message) =>
    toast.info(message, {
      position: "top-right",
      autoClose: 3000,
      hideProgressBar: false,
      closeOnClick: true,
      pauseOnHover: true,
    }),

  warning: (message) =>
    toast.warning(message, {
      position: "top-right",
      autoClose: 3000,
      hideProgressBar: false,
      closeOnClick: true,
      pauseOnHover: true,
    }),

  loading: (message) =>
    toast.loading(message, {
      position: "top-right",
    }),

  update: (toastId, options) => toast.update(toastId, options),
};

export default showToast;
