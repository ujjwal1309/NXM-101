const express = require("express");
const { BookModel } = require("../models/books.model");
const fs = require("fs");

const booksRouter = express.Router();

/**
 * @swagger
 * components:
 *    schemas:
 *      Book:
 *        type: object
 *        properties:
 *          id:
 *            type: string
 *            description: The auto-generated id of the user
 *          name:
 *            type: string
 *            description: The user name
 *          email:
 *            type: string
 *            description: The user email
 *          age:
 *            type: integer
 *            description: Age of the user
 */

/**
 * @swagger
 * tags:
 *  name: Books
 *  description: All the API routes related to books
 */

/**
 * @swagger
 * /books:
 *  get:
 *      summary: This will get all the books data from the database
 *      tags: [Books]
 *      responses:
 *          200:
 *              description: The list of all the users
 *              content:
 *                  application/json:
 *                      schema:
 *                          type: array
 *                          item:
 *                              $ref: "#/components/schemas/Book"
 */

booksRouter.get("/", async (req, res) => {
  const query = req.query;
  try {
    if (query.price_low && query.price_high) {
      const books = await BookModel.find({
        $and: [
          { price: { $gte: query.price_low } },
          { price: { $lte: query.price_high } },
        ],
      });
      res.send(books);
    } else {
      const books = await BookModel.find(query);
      res.send(books);
    }
  } catch (error) {
    res.send({ msg: error, err: error.message });
  }
});

/**
 * @swagger
 * /books/add:
 *  post:
 *      summary: To add the details of the new book
 *      tags: [Books]
 *      requestedBody:
 *        required: true
 *        content:
 *          application/json:
 *            schema:
 *              $ref: "#components/schemas/Book"
 *      responses:
 *        200:
 *          description: The user was successfully registered
 *          content:
 *            application/json:
 *              schema:
 *                $ref: "#components/schemas/Book"
 *        500:
 *          description: Some server error
 */

booksRouter.post("/add", async (req, res) => {
  try {
    const book = new BookModel(req.body);
    await book.save();
    res.send({ msg: "Book has been successfully added" });
  } catch (error) {
    res.send({ msg: error, err: error.message });
  }
});

/**
 * @swagger
 * /books/update/{id}:
 *  patch:
 *    summary: It will update the user details
 *    tags: [Books]
 *    parameters:
 *      - in: path
 *        name: id
 *        schema:
 *          type: string
 *        required: true
 *        description: The book id
 *    requestBody:
 *      required: true
 *      content:
 *        application/json:
 *          schema:
 *            $ref: "#/components/schemas/Book"
 *    responses:
 *      200:
 *        description: The user details has been updated
 *        content:
 *          application/json:
 *            schema:
 *              $ref: "#/components/schemas/Book"
 *      404:
 *        description: The user was not found
 *      500:
 *        description: Some error happened
 */

booksRouter.patch("/update/:id", async (req, res) => {
  const id = req.params.id;
  try {
    await BookModel.findByIdAndUpdate({ _id: id }, req.body);
    fs.appendFileSync(
      "./records.txt",
      `The document with ${id} has been updated`
    );
    res.send({ msg: "Books has been successfully updated" });
  } catch (error) {
    res.send({ msg: error, err: error.message });
  }
});

/**
 * @swagger
 * /books/delete/{id}:
 *  delete:
 *    summary: It will delete the user details
 *    tags: [Books]
 *    parameters:
 *      - in: path
 *        name: id
 *        schema:
 *          type: string
 *        required: true
 *        description: The book id
 *    responses:
 *      200:
 *        description: The book has been deleted
 *        content:
 *          application/json:
 *            schema:
 *              $ref: "#/components/schemas/Book"
 *      404:
 *        description: The user was not found
 *      500:
 *        description: Some error happened
 */

booksRouter.delete("/delete/:id", async (req, res) => {
  const id = req.params.id;
  try {
    await BookModel.findByIdAndDelete({ _id: id }, req.body);
    fs.appendFileSync(
      "./records.txt",
      `The document with ${id} has been deleted`
    );
    res.send({ msg: "Books has been successfully deleted" });
  } catch (error) {
    res.send({ msg: error, err: error.message });
  }
});

module.exports = { booksRouter };
