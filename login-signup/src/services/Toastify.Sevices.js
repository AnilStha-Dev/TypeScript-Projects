import { ToastContainer, toast } from 'react-toastify';
const toaster={
    position: "top-right",
    autoClose: 5000,
    hideProgressBar: false,
    closeOnClick: true,
    pauseOnHover: true,
    draggable: true,
    progress: undefined,
    theme: "light",
    };

    export const successToast=(message)=>{
        toast.success(message,toaster);
    }
    export const errorToast=(message)=>{
        toast.error(message,toaster);
    }
    export const warningToast=(message)=>{
        toast.warning(message, toasterConfig)
    }