import { NextFunction, Request, Response } from "express";
import { validationResult } from "express-validator";
import { parseValidationError } from "../helpers/parsingError.helper";
import BaseResponse from "../utils/BaseResponse";

export default function errorMiddleWare(
  req: Request,
  res: Response,
  next: NextFunction
) {
  const errors = validationResult(req);
  if (errors.isEmpty()) {
    return next();
  } else {
    const parsedError = parseValidationError(errors.array());
    const baseResponse = new BaseResponse({
      success: false,
      statusCode: 400,
      message: "some inputs are invalid",
      error: parsedError,
    });
    return res.status(400).json(baseResponse);
  }
}
