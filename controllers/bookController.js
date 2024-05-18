// controllers/bookController.js
const Book = require('../models/book');

exports.getAllBooks = (req, res) => {
  Book.findAll()
    .then(books => {
      res.json(books);
    })
    .catch(err => {
      console.error('Error getting books: ' + err.stack);
      res.sendStatus(500);
    });
};

exports.addBook = (req, res) => {
  const { bookName } = req.body;
  const takenOn = new Date().toISOString().slice(0, 10);
  const returnDate = new Date();
  returnDate.setDate(returnDate.getDate() + 14); // Assuming a 14-day return period
  const fineCharged = 0; // Assuming no fine initially

  Book.create({ name: bookName, taken_on: takenOn, return_date: returnDate, fine_charged: fineCharged })
    .then(book => {
      console.log('Book added successfully');
      res.json({ id: book.id });
    })
    .catch(err => {
      console.error('Error adding book: ' + err.stack);
      res.sendStatus(500);
    });
};

exports.returnBook = (req, res) => {
  const id = req.params.id;
  Book.destroy({ where: { id: id } })
    .then(() => {
      console.log('Book deleted successfully');
      res.sendStatus(200);
    })
    .catch(err => {
      console.error('Error deleting book: ' + err.stack);
      res.sendStatus(500);
    });
}
