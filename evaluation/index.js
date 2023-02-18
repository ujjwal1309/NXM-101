const express = require("express");
const { connection } = require("./config/db");
const { booksRouter } = require("./routes/books.routes");
const { validator } = require("./middlewares/validator");
const swaggerJSdoc = require("swagger-jsdoc");
const swaggerUi = require("swagger-ui-express");
const cors = require("cors");
require("dotenv").config();

const app = express();

app.use(express.json());
app.use(cors());

const options = {
  definition: {
    openapi: "3.0.0",
    info: {
      title: "Learning Swagger",
      version: "1.0.0",
    },
    servers: [
      {
        url: "http://localhost:4000",
      },
    ],
  },
  apis: ["./routes/*.js"],
};

const swaggerSpec = swaggerJSdoc(options);
app.use("/docs", swaggerUi.serve, swaggerUi.setup(swaggerSpec));

app.use("/books", validator);
app.use("/books", booksRouter);

app.listen(process.env.port, async () => {
  console.log("server is running");
  try {
    await connection;
    console.log("Connected to the DB");
  } catch (error) {
    console.log("Can't connect to the DB");
    console.log(error);
  }
});
