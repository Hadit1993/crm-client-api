import { json, Request, Response } from "express";

import { readTicketById } from "../../schema/ticket/ticket.operation";
import BaseResponse from "../../utils/BaseResponse";

export default async function getTicket(req: Request, res: Response) {
  const { userId } = req;
  const { ticketId } = req.params;

  try {
    const ticket = await getTicketById(userId!, ticketId);
    res.json(
      new BaseResponse({
        message: "ticket has been received successfully",
        data: ticket,
      })
    );
  } catch (error: any) {
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

async function getTicketById(userId: string, ticketId: string) {
  const ticket = await readTicketById(userId!, ticketId);
  if (!ticket) throw notFoundError;
  return ticket;
}
