// public/index.js
document.addEventListener('DOMContentLoaded', async () => {
    const response = await fetch('/getAllBooks');
    if (response.ok) {
      const bookListDiv = document.getElementById('bookList');
      const books = await response.json();
      books.forEach(book => {
        const bookDiv = document.createElement('div');
        bookDiv.classList.add('book-info');
        bookDiv.setAttribute('data-book-id', book.id);
        bookDiv.innerHTML = `<strong>Book Name:</strong> ${book.name} <br>
                              <strong>Taken on:</strong> ${book.taken_on} <br>
                              <strong>Return date:</strong> ${book.return_date} <br>
                              <strong>Fine charged:</strong> Rs. ${book.fine_charged}`;
        const returnButton = document.createElement('button');
        returnButton.textContent = 'Return';
        returnButton.addEventListener('click', async () => {
          const bookId = bookDiv.getAttribute('data-book-id');
          const returnResponse = await fetch(`/returnBook/${bookId}`, {
            method: 'POST',
          });
          if (returnResponse.ok) {
            bookListDiv.removeChild(bookDiv);
          }
        });
        bookDiv.appendChild(returnButton);
        bookListDiv.appendChild(bookDiv);
      });
    }
  });
  
  document.getElementById('addBookForm').addEventListener('submit', async (e) => {
    e.preventDefault();
    const bookName = document.getElementById('bookName').value;
    const response = await fetch('/addBook', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/x-www-form-urlencoded',
      },
      body: `bookName=${encodeURIComponent(bookName)}`,
    });
    if (response.ok) {
      const bookListDiv = document.getElementById('bookList');
      const bookData = await response.json();
      const bookDiv = document.createElement('div');
      bookDiv.classList.add('book-info');
      const takenOn = new Date().toISOString().slice(0, 10);
      const returnDate = new Date();
      returnDate.setDate(returnDate.getDate() + 14);
      const fineCharged = 0;
      
      bookDiv.setAttribute('data-book-id', bookData.id);
      bookDiv.innerHTML = `<strong>Book Name:</strong> ${bookName} <br>
                            <strong>Taken on:</strong> ${takenOn} <br>
                            <strong>Return date:</strong> ${returnDate.toISOString().slice(0, 10)} <br>
                            <strong>Fine charged:</strong> Rs. ${fineCharged}`;
      const returnButton = document.createElement('button');
      returnButton.textContent = 'Return';
      returnButton.addEventListener('click', async () => {
        const bookId = bookDiv.getAttribute('data-book-id');
        const returnResponse = await fetch(`/returnBook/${bookId}`, {
          method: 'POST',
        });
        if (returnResponse.ok) {
          bookListDiv.removeChild(bookDiv);
        }
      });
      bookDiv.appendChild(returnButton);
      bookListDiv.appendChild(bookDiv);
    }
  })

  