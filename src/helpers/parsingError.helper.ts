import { ValidationError } from "express-validator";

const parseValidationError = (errors: ValidationError[]) => {
  const parsedError: { [key: string]: string } = {};
  errors.forEach((error) => {
    parsedError[error.param] = error.msg;
  });

  return parsedError;
};

const removeEmpty = (obj: any) => {
  Object.entries(obj).forEach(
    ([key, val]) =>
      (val && typeof val === "object" && removeEmpty(val)) ||
      ((val === undefined || val === "") && delete obj[key])
  );
  return obj;
};

export { parseValidationError, removeEmpty };
