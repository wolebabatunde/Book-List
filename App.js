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


// SHOW ALERT

UI.prototype.showAlert = function (message, className) {
    // CREATE A DIV

    const div = document.createElement('div');

    // ADD CLASSNAME TO DIV

    div.className = ` alert ${className}` //it has a classname of 'alert' and we added the className we pass up there to it

    // ADD TEXT NODE

    div.appendChild(document.createTextNode(message));

    // GET PARENT

    const container = document.querySelector('.container');

    // GET FORM (Because we want to put the message before the form)

    const form = document.getElementById('book-form');

    // INSERT ALERT THE DIV BEFORE THE FORM
    container.insertBefore(div, form);


    // TIMEOUT AFTER 3 SECONDS

    setTimeout(function () {
        document.querySelector('.alert').remove();
    }, 3000);

};


// DELETE BOOK FROM LIST

UI.prototype.deleteBook = function (target) {
    if (target.className === 'delete') {
        target.parentElement.parentElement.remove();
    }
};


// CLEAR FIELDS AFTER SUBMITTING
UI.prototype.clearFields = function () {
    document.getElementById('title').value = '';
    document.getElementById('author').value = '';
    document.getElementById('isbn').value = '';
};


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


        // VALIDATION

        if (title === '' || author === '' || isbn === '') {

            // ERROR ALERT

            ui.showAlert('Please Kindly fill all form input', 'error')

        } else {
            // ADD BOOK TO LIST

            ui.addBookToList(book);


            // SHOW SUCCESS
            ui.showAlert('Book Added!', 'success');


            // CLEAR FIELDS AFTER SUBMITING

            ui.clearFields();

        }


        e.preventDefault();

    });



// EVENT LISTENER FOR DELETE (Using Event delegation by getting the parent div)

document.getElementById('book-list').addEventListener('click', function (e) {

    // INSTANTIATE UI

    const ui = new UI();

    // DELETE BOOK
    ui.deleteBook(e.target);

    // SHOW ALERT

    ui.showAlert('Book Removed', 'success');



    e.preventDefault();
})