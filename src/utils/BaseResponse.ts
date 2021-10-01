import constants from "./constants";

export default class BaseResponse {
  constructor(props: {
    success?: boolean;

    message?: string;

    statusCode?: number;

    data?: any;

    error?: { [key: string]: string };
  }) {
    this.data = props.data;
    this.success = props.success === undefined ? true : props.success;
    this.statusCode = props.statusCode || 200;
    this.message =
      props.message ||
      (this.success ? "request was successful" : constants.generalError);
    this.error = props.error;
  }

  success: boolean;

  message: string;

  statusCode: number;

  data?: any;

  error?: { [key: string]: string };
}
