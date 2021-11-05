import { Request, Response } from "express";
import { removeTicket } from "../../schema/ticket/ticket.operation";
import BaseResponse from "../../utils/BaseResponse";

export default async function deleteTicket(req: Request, res: Response) {
  const { userId } = req;
  const { ticketId } = req.params;
  try {
    const removedTicket = await removeTicket(userId!, ticketId);
    if (!removedTicket) throw notFoundError;
    res.json(new BaseResponse({ message: "ticket deleted successfully" }));
  } catch (error) {
    handleError(error, res);
  }
}

const notFoundError = {
  message: "no ticket found with this id",
  statusCode: 404,
};

const handleError = (error: any, res: Response) => {
  if (error.name) {
    handleMongooseError(error, res);
  } else handleNormalError(error, res);
};

const handleMongooseError = (error: any, res: Response) => {
  return res.status(notFoundError.statusCode).json(
    new BaseResponse({
      success: false,
      message: notFoundError.message,
      statusCode: notFoundError.statusCode,
    })
  );
};

const handleNormalError = (error: any, res: Response) => {
  const { message, statusCode = 400 } = error;
  res
    .status(statusCode)
    .json(new BaseResponse({ success: false, message, statusCode }));
};
