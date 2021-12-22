import { AxiosError } from "axios";
import { toaster } from "evergreen-ui";

export const handleError = (e: AxiosError): void => {
  if (e.response) {
    const message: string | string[] = e.response.data.message;
    if (typeof message === "string") {
      toaster.danger(message);
    }
    if (Array.isArray(message)) {
      message.map((data) => toaster.danger(data));
    }
  }
};
