class Book {
  constructor(title, author, isbn) {
    this.title = title;
    this.author = author;
    this.isbn = isbn;
  }
}

class UI {
  addBookToList(book) {
    const list = document.getElementById('book-list');

    //create tr
    const row = document.createElement('tr');

    row.innerHTML = `
         <td>${book.title}</td>
         <td>${book.author}</td>
         <td>${book.isbn}</td>
         <td><a href="#" class="delete">Delete</a></td>
         `;

    list.appendChild(row);
  }

  showAlert(message, className) {
    const div = document.createElement('div');

    div.className = `alert ${className}`;
    div.appendChild(document.createTextNode(message));

    //get parent
    const container = document.querySelector('.container');
    const form = document.querySelector('#book-form');
    //insert alert
    container.insertBefore(div, form);

    //set time to disappear
    setTimeout(function() {
      document.querySelector('.alert').remove();
    }, 3000);
  }

  deleteBook(target) {
    if (target.className == 'delete') {
      target.parentElement.parentElement.remove();
    }
  }

  clearfields() {
    document.getElementById('title').value = '';
    document.getElementById('author').value = '';
    document.getElementById('isbn').value = '';
  }
}

//local sorage class
class Store {
  static getBooks() {
    let books;
    if (localStorage.getItem('books') === null) {
      books = [];
    } else {
      books = JSON.parse(localStorage.getItem('books'));
    }
    return books;
  }
  static displayBooks() {
    const books = Store.getBooks();
    books.forEach(function(book) {
      const ui = new UI();
      ui.addBookToList(book);
    });
  }
  static addBook(book) {
    const books = Store.getBooks();
    books.push(book);
    localStorage.setItem('books', JSON.stringify(books));
  }
  static removeBook(isbn) {
    const books = Store.getBooks();
    books.forEach(function(book, index) {
      if (book.isbn === isbn) {
        books.splice(index, 1);
      }
    });
    localStorage.setItem('books', JSON.stringify(books));
  }
}

//dDOM load event
document.addEventListener('DOMContentLoaded', Store.displayBooks);

document.getElementById('book-form').addEventListener('submit', function(e) {
  const title = document.getElementById('title').value,
    author = document.getElementById('title').value,
    isbn = document.getElementById('isbn').value;

  //instantiating book class
  const book = new Book(title, author, isbn);
  const ui = new UI();

  if (title == '' || author == '' || isbn == '') {
    ui.showAlert('Please all fill are required', 'error');
  } else {
    ui.addBookToList(book);

    Store.addBook(book);
    ui.showAlert('Book Added', 'success');
    ui.clearfields();
  }
  e.preventDefault();
});

document.getElementById('book-list').addEventListener('click', function(e) {
  ui = new UI();

  //delete the book
  ui.deleteBook(e.target);

  //remove book from loca storage
  Store.removeBook(e.target.parentElement.previousElementSibling.textContent);
  //show message
  ui.showAlert('Book Delete', 'success');
  e.preventDefault();
});
