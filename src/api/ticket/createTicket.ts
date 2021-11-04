import { Request, Response } from "express";
import { insertTicket } from "../../schema/ticket/ticket.operation";
import { ITiCket } from "../../schema/ticket/ticket.schema";
import BaseResponse from "../../utils/BaseResponse";

export default async function createTicket(req: Request, res: Response) {
  try {
    await tryCreateTicket(req, res);
  } catch (error: any) {
    handleError(res, error);
  }
}

async function tryCreateTicket(req: Request, res: Response) {
  const ticket: Partial<ITiCket> = assembleTicket(req);
  await addTicketToDB(ticket);
  sendResponse(res);
}

function sendResponse(res: Response) {
  res.status(201).json(
    new BaseResponse({
      statusCode: 201,
      message: "ticket created successfully",
    })
  );
}

async function addTicketToDB(ticket: Partial<ITiCket>) {
  const result = await insertTicket(ticket);
  if (!result) throw new Error();
}

function assembleTicket(req: Request) {
  const { subject, sender, message } = req.body;
  const clientId = req.userId;

  const ticket: Partial<ITiCket> = {
    subject,
    clientId,
    conversations: [
      {
        sender,
        message,
      },
    ],
  };
  return ticket;
}

function handleError(res: Response, error: any) {
  res.status(400).json(
    new BaseResponse({
      success: false,
      message: error.message,
    })
  );
}
