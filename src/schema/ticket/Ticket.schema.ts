import { Document, model, Model, Schema, Types } from "mongoose";

interface ITiCket {
  clientId?: string;
  subject: string;
  openAt: Date;
  status: string;
  conversations: Conversation[];
}

interface Conversation {
  sender: string;
  message: string;
  msgAt?: Date;
}

const TicketSchema = new Schema<ITiCket, Model<ITiCket>, ITiCket>({
  clientId: {
    type: Schema.Types.ObjectId,
  },

  subject: {
    type: String,
    maxlength: 100,
    required: true,
    default: "",
  },

  openAt: {
    type: Date,
    required: true,
    default: new Date(),
  },

  status: {
    type: String,
    maxlength: 30,
    required: true,
    default: "Pending operator response",
  },

  conversations: [
    {
      sender: {
        type: String,
        maxlength: 50,
        required: true,
        default: "",
      },
      message: {
        type: String,
        maxlength: 1000,
        required: true,
        default: "",
      },
      msgAt: {
        type: Date,
        required: true,
        default: new Date(),
      },
    },
  ],
});

const TicketModel = model<ITiCket>("Ticket", TicketSchema);

type TicketDocument = Document<any, any, ITiCket> &
  ITiCket & {
    _id: Types.ObjectId;
  };
export { ITiCket, TicketModel, TicketDocument };
