class Book {
    constructor(title, author, isbn) {
        this.title = title;
        this.author = author;
        this.isbn = isbn;
    };
};


class UI {

    // ADD BOOK TO LIST
    addBookToList(book) {
        const list = document.getElementById('book-list');

        // Create TR (Table Row)

        const row = document.createElement('tr');

        // Insert Cols to ROW

        row.innerHTML = `
        <td>${book.title}</td>
        <td>${book.author}</td>
        <td>${book.isbn}</td>
        <td><a href= '#' class="delete">X</a></td>
        `

        // Append Child

        list.appendChild(row);



    }

    // SHOW ALERT
    showAlert(message, className) {

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


    }

    // DELETE BOOK FROM LIST
    deleteBook(target) {

        if (target.className === 'delete') {
            target.parentElement.parentElement.remove();
        }

    }

    // CLEAR FIELDS
    clearFields() {

        document.getElementById('title').value = '';
        document.getElementById('author').value = '';
        document.getElementById('isbn').value = '';
    }
};


// LOCAL STORAGE CLASS (Saving and deleting from Local Storage)

class Store {

    // Get book from storage
    static getBooks() {
        let books;

        if (localStorage.getItem('books') === null) {
            books = [];
        } else {
            books = JSON.parse(localStorage.getItem('books'));
        };

        return books;

    }



    // Display Book from local Storage
    static displayBooks() {
        const books = Store.getBooks();

        books.forEach(function (book) {

            const ui = new UI;

            // Add book to UI

            ui.addBookToList(book);

        });
    }


    // Add Book from local storage
    static addBook(book) {

        const books = Store.getBooks();

        books.push(book);

        localStorage.setItem('books', JSON.stringify(books));

    }


    // Delete Book from Local Storage
    static removeBook() {

    }
}


// This Function will be called after the DOM Event is loaded

// DOM Load Event

document.addEventListener('DOMContentLoaded',
    Store.displayBooks);


// EVENT LISTERNER TO ADD BOOK

document.getElementById('book-form').addEventListener('submit',
    function (e) {

        const title = document.getElementById('title').value;
        const author = document.getElementById('author').value;
        const isbn = document.getElementById('isbn').value;


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

            // ADD TO LOCAL STORAGE

            Store.addBook(book);


            // SHOW SUCCESS
            ui.showAlert('Book Added!', 'success');


            // CLEAR FIELDS AFTER SUBMITING

            ui.clearFields();

        }
        e.preventDefault();

    });


// EVENT LISTENER FOR DELETE(Using Event delegation by getting the parent div)

document.getElementById('book-list').addEventListener('click', function (e) {

    // INSTANTIATE UI (USER INTERFACE)

    const ui = new UI();

    // DELETE BOOK
    ui.deleteBook(e.target);

    // SHOW ALERT

    ui.showAlert('Book Removed', 'success');



    e.preventDefault();
})