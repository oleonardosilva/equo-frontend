import { toast, ToastOptions } from "react-toastify";

const options: ToastOptions = {
  position: "top-right",
  autoClose: 5000,
  hideProgressBar: false,
  closeOnClick: false,
  pauseOnHover: true,
  draggable: true,
  progress: undefined,
  theme: "dark",
};

function info(message: string) {
  toast.info(message, options);
}

function error(message: string) {
  toast.error(message, options);
}

function success(message: string) {
  toast.success(message, options);
}

export { info, error, success };
