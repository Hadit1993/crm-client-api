import { json, Request, Response } from "express";
import { readAllTickets } from "../../schema/ticket/ticket.operation";
import BaseResponse from "../../utils/BaseResponse";

export default async function getAllTickets(req: Request, res: Response) {
  const { userId } = req;

  try {
    const tickets = await readAllTickets(userId!);
    res.json(
      new BaseResponse({
        message:
          tickets.length > 0
            ? "all tickets has been received successfully"
            : "no ticket found",
        data: tickets,
      })
    );
  } catch (error: any) {
    res
      .status(400)
      .json(new BaseResponse({ success: false, message: error.message }));
  }
}
