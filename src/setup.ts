import cors from "cors";
import { config } from "dotenv";
import express from "express";
import helmet from "helmet";
import morgan from "morgan";
import ticketRouterV1 from "./routers/v1/ticket.router";
import userRouterV1 from "./routers/v1/user.router";
import mongoose from "mongoose";

const setupMiddlewares = (app: express.Express) => {
  config();
  app.use(express.urlencoded({ extended: true }));
  app.use(express.json());
  app.use(helmet());
  app.use(cors());
  app.use(morgan("combined"));
};

const setupRouters = (app: express.Express) => {
  app.use("/api/v1/user", userRouterV1);
  app.use("/api/v1/ticket", ticketRouterV1);
};

const connectMongoDB = () => {
  mongoose
    .connect(process.env.MONGO_URL!)
    .then(() => console.log("mongodb connected"))
    .catch((error) => console.log({ error }));
};

export { setupMiddlewares, setupRouters, connectMongoDB };
