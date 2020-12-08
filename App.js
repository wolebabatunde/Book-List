// BOOK CONSTRUCTOR 
function Book(title, author, isbn) {
    this.title = title;
    this.author = author;
    this.isbn = isbn;
}


// UI CONSTRUCTOR
function UI() {};


// ADD BOOK TO LIST

UI.prototype.addBookToList = function (book) {
    const list = document.getElementById('book-list');


    // CREATE TR(TABLE ROW) ELEMENT

    const row = document.createElement('tr');

    // INSERT COLS

    row.innerHTML = `
    <td>${book.title}</td>
    <td>${book.author}</td>
    <td>${book.isbn}</td>
    <td><a href = '#' class = "delete">X</a></td>
    `;

    list.appendChild(row);
};

// CLEAR FIELDS AFTER SUBMITTING
UI.prototype.clearFields = function () {
    document.getElementById('title').value = '';
    document.getElementById('author').value = '';
    document.getElementById('isbn').value = '';
};


// DELETE FROM BOOK

UI.prototype.removeBook = function () {
    document.querySelector('.delete');

    console.log('deleting....');
}

// EVENT LISTENERS
document.getElementById('book-form').addEventListener('submit',
    function (e) {

        // GET FROM VALUES

        const title = document.getElementById('title').value,
            author = document.getElementById('author').value,
            isbn = document.getElementById('isbn').value;


        // INSTANTIATE BOOK

        const book = new Book(title, author, isbn);


        // INSTANTIATE UI

        const ui = new UI();

        // ADD BOOK TO LIST

        ui.addBookToList(book);


        // CLEAR FIELDS AFTER SUBMITING

        ui.clearFields();

        e.preventDefault();


        // DELETE

        ui.removeBook();
    })