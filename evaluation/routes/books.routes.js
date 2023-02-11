const express = require("express");
const { BookModel } = require("../models/books.model");
const fs = require("fs");

const booksRouter = express.Router();

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

booksRouter.post("/add", async (req, res) => {
  try {
    const book = new BookModel(req.body);
    await book.save();
    res.send({ msg: "Book has been successfully added" });
  } catch (error) {
    res.send({ msg: error, err: error.message });
  }
});

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
