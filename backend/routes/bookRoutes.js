import express from "express";
import { Book } from "../models/booksModel.js";

const router = express.Router();

// Route for creating a new book
router.post("/", async (req, res) => {
  try {
    if (!req.body.title || !req.body.author || !req.body.publishYear) {
      return res.status(400).send({
        message: `Send all the requried fields: title, author, publishYear`,
      });
    }
    const newBook = {
      title: req.body.title,
      author: req.body.author,
      publishYear: req.body.publishYear,
    };
    const books = await Book.create(newBook);
    return res.status(200).send({
      message: "Data created successfully",
      data: books,
    });
  } catch (error) {
    console.log(error.message);
    res.status(500).send({ message: error.message });
  }
});

// Route for reading all the book
router.get("/", async (req, res) => {
  try {
    const books = await Book.find({});
    return res.send({
      count: books.length,
      data: books,
    });
  } catch (error) {
    console.log(error.message);
    res.status(500).send({ message: error.message });
  }
});

// Route for reading a book by its id
router.get("/:id", async (req, res) => {
  try {
    const { id } = req.params;
    const book = await Book.findById(id);
    return res.send({
      book,
    });
  } catch (error) {
    console.log(error.message);
    res.status(500).send({ message: error.message });
  }
});

//Route for updating a book by its id
router.put("/:id", async (req, res) => {
  try {
    if (!req.body.title || !req.body.author || !req.body.publishYear) {
      return res.status(400).send({
        message: `Send all the requried fields: title, author, publishYear`,
      });
    }

    const { id } = req.params;
    const result = await Book.findByIdAndUpdate(id, req.body);
    if (!result) return res.status(400).send({ message: "Book not found" });
    return res.status(200).send({ message: "Book updated successfully" });
  } catch (error) {
    console.log(error.message);
    res.status(500).send({ message: error.message });
  }
});

//Route for deleting a book by its id
router.delete("/:id", async (req, res) => {
  try {
    const { id } = req.params;
    const result = await Book.findByIdAndDelete(id);
    if (!result) return res.status(400).send({ message: "Book not found" });
    return res.status(200).send({ message: "Book deleted successfully" });
  } catch (error) {
    console.log(error.message);
    res.status(500).send({ message: error.message });
  }
});

export default router;
