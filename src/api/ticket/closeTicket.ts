import { Response, Request } from "express";
import { updateStatusClose } from "../../schema/ticket/ticket.operation";
import BaseResponse from "../../utils/BaseResponse";

export default async function closeTicket(req: Request, res: Response) {
  const { userId } = req;
  const { ticketId } = req.params;
  try {
    const closedTicket = await updateStatusClose(userId!, ticketId);
    if (!closedTicket) {
      throw notFoundError;
    }
    res.json(new BaseResponse({ message: "ticket closed successfully" }));
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
