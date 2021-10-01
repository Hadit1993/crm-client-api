import express from "express";

import { connectMongoDB, setupMiddlewares, setupRouters } from "./setup";

const app = express();

const port = process.env.PORT || 3001;

setupMiddlewares(app);
setupRouters(app);
connectMongoDB();

app.listen(port, () => {
  console.log(`API is ready on http://localhost:${port}`);
});
