import { Request, Response } from "express";
import { updateClientReply } from "../../schema/ticket/ticket.operation";
import BaseResponse from "../../utils/BaseResponse";

export default async function updateReplyTicket(req: Request, res: Response) {
  const { userId } = req;
  const { ticketId } = req.params;
  const { sender, message } = req.body;
  try {
    const updatedTicket = await updateClientReply({
      clientId: userId!,
      ticketId,
      sender,
      message,
    });
    if (!updatedTicket) {
      throw notFoundError;
    }

    res.json(new BaseResponse({ message: "reply updated successfully" }));
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
  }
  handleNormalError(error, res);
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
