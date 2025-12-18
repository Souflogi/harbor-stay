import styled from "styled-components";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

export const StyledToastContainer = styled(ToastContainer)`
  .Toastify__toast {
    background: var(--color-grey-0);
    color: var(--color-grey-900);
    border-radius: 12px;
    box-shadow: var(--shadow-md);
    padding: 16px 20px;
    min-height: auto;
  }

  .Toastify__toast--success {
    border-left: 5px solid var(--color-green-100);
  }

  .Toastify__toast--error {
    border-left: 5px solid var(--color-red-600);
  }

  .Toastify__toast-body {
    font-family: "Poppins", sans-serif;
    font-size: 14px;
    line-height: 1.4;
  }

  .Toastify__progress-bar {
    height: 3px;
    background: var(--color-brand-600);
  }

  .Toastify__close-button {
    opacity: 0.6;
  }

  .Toastify__close-button:hover {
    opacity: 1;
  }
`;
