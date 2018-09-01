//Book Constructor
function Book(title, author, isbn) {
  this.title = title;
  this.autor = author;
  this.isbn = isbn;
}

//UL Constructor
function UI() {
  UI.prototype.addBookToList = function(book) {
    //console.log(book);

    const list = document.getElementById('book-list');

    //create tr Element
    const row = document.createElement('tr');
    //console.log(row);

    //Insert row
    row.innerHTML = `
            <td>${book.title}</td>
            <td>${book.author}</td>
            <td>${book.isbn}</td>
            <td><a href="#" class="delete">X</a></td>
            `;

    list.appendChild(row);
  };

  //alert message
  UI.prototype.showAlert = function(message, className) {
    //create div
    const div = document.createElement('div');
    //add classes
    div.className = 'alert ${className}';
    //add text
    div.appendChild(document.createTextNode(message));

    //get parent
    const container = document.querySelector('.container');
    //get form
    const form = document.querySelector('#book-form');
    //insert alert
    container.insertBefore(div, form);
    //time out after three second
    setTimeout(function() {
      document.querySelector('.alert').remove();
    }, 3000);
  };
  UI.prototype.deleteBook = function(target) {
    if (target.className === 'delete') {
      target.parentElement.parentElement.remove();
    }
  };

  UI.prototype.clearfields = function() {
    document.getElementById('title').value = '';
    document.getElementById('author').value = '';
    document.getElementById('isbn').value = '';
  };
}

//Event listeners for add  book
document.getElementById('book-form').addEventListener('submit', function(e) {
  //console.log('test');
  const title = document.getElementById('title').value,
    author = document.getElementById('author').value,
    isbn = document.getElementById('isbn').value;

  //instantiating the Book Constructor
  const book = new Book(title, author, isbn);

  //console.log(book);

  //instantiating a UI object
  const ui = new UI();
  console.log(ui);

  //validate
  if (title == '' || author == '' || isbn == '') {
    //Error
    ui.showAlert('Please Fill in all fields', 'error');
  } else {
    //add book to the list
    ui.addBookToList(book);
    //clear field
    ui.clearfields();
    //success message
    ui.showAlert('Book Added', 'success');
  }

  e.preventDefault();
});

//Event listerner for delete
document.getElementById('book-list').addEventListener('click', function(e) {
  const ui = new UI();

  //Delete Book
  ui.deleteBook(e.target);
  //show an Alert
  ui.showAlert('Book Remove', 'success');
  e.preventDefault();
});
