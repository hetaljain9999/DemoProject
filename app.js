const express = require('express');
const bodyParser = require('body-parser');
const bookController = require('./controllers/bookController');
const Book = require('./models/book');

const app = express();
const port = 3000;

app.use(bodyParser.urlencoded({ extended: true }));
app.use(express.static('public'));

app.get('/getAllBooks', bookController.getAllBooks);
app.post('/addBook', bookController.addBook);
app.post('/returnBook/:id', bookController.returnBook);


Book.sync().then(result => {
  console.log(result);
}).catch(err=>{
  console.log(err);
});

/*const insert = {
  name: 'physics',
  taken_on: '12-03-2021',
  return_date: '14-03-2022',
  fine_charged: 12
};

Book.create(insert).then(result=>{
  console.log(result);
}).catch(err=> {
  console.log(err);
});
*/
app.listen(port, () => {
  console.log(`App listening at http://localhost:${port}`);
});