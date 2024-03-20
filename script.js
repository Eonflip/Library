//Library class constructor
class Library {
    constructor() {
        this.books = [];
    }
}
//Book class constructor
class Book {
    constructor(title, author, pages, genre, year, read) {
        this.title = title;
        this.author = author;
        this.pages = pages;
        this.genre = genre;
        this.year = year;
        this.read = read;
    }
};

//Create new library object
const myLibrary = new Library();


//Variables to add events
let bookModal = document.getElementById("bookModal");
let bookButton = document.querySelector(".book-button");
let bookGrid = document.querySelector(".book-grid");
let span = document.querySelector(".close");
let addBook = document.querySelector(".add-book");




function addBookToLibrary() {
    const form = document.getElementById('bookForm');
    const title = form.title.value;
    const author = form.author.value;
    const pages = form.pages.value;
    const genre = form.genre.value;
    const year = form.year.value;
    const read = form.read.checked;

    const newBook = new Book(title, author, pages, genre, year, read);

    myLibrary.books.push(newBook);
};


bookButton.addEventListener('click', () => {
    bookModal.style.display = "block";
});

span.onclick = function() {
    bookModal.style.display = "none";
};

window.onclick = function(event) {
    if (event.target == bookModal) {
        bookModal.style.display = "none";
    }
};


document.getElementById('bookForm').addEventListener('submit', function(event) {
    event.preventDefault();
    addBookToLibrary();
    displayBooks(); // Update the display with the new book
    saveLocal();
    document.getElementById('bookForm').reset(); // Reset the form fields

    const latestBook = myLibrary.books[myLibrary.books.length - 1];

    bookModal.style.display = "none";
});


const saveLocal = () => {
    localStorage.setItem('library', JSON.stringify(myLibrary.books));
};

const restoreLocal = () => {
    const books = JSON.parse(localStorage.getItem('library'));
    if (books) {
        myLibrary.books = books.map(book => new Book(book.title, book.author, book.pages, book.genre, book.year, book.read));
        displayBooks(); // Ensure you implement this function to show books on the UI
    }
};

document.addEventListener('DOMContentLoaded', restoreLocal);


const displayBooks = () => {
    bookGrid.innerHTML = ''; // Clear existing books to avoid duplicates
    myLibrary.books.forEach((book, index) => {
        const bookTile = document.createElement('div');
        bookTile.classList.add('book-tile');

        const bookTitle = document.createElement('h1');
        bookTitle.textContent = book.title;
        bookTile.appendChild(bookTitle);

        const bookAuthor = document.createElement('p');
        const authorLabel = document.createElement('strong'); // Use strong instead of span for semantic bolding
        authorLabel.textContent = 'Author:'; // Set text content safely
        bookAuthor.appendChild(authorLabel); // Append the bold "Author: " to the paragraph
        bookAuthor.append(` ${book.author}` ); // Add the author's name after the bold label
        bookTile.appendChild(bookAuthor); 

        const bookPages = document.createElement('p');
        const pagesLabel = document.createElement('strong');
        pagesLabel.textContent = 'Pages:';
        bookPages.appendChild(pagesLabel);
        bookPages.append(` ${book.pages}` );
        bookTile.appendChild(bookPages);

        const bookGenre = document.createElement('p');
        const genreLabel = document.createElement('strong');
        genreLabel.textContent = 'Genre:';
        bookGenre.appendChild(genreLabel);
        bookGenre.append( ` ${book.genre}` );
        bookTile.appendChild(bookGenre);

        const yearRead = document.createElement('p');
        const yearLabel = document.createElement('strong');
        yearLabel.textContent = 'Year Read:';
        yearRead.appendChild(yearLabel);
        yearRead.append( ` ${book.year}` );
        bookTile.appendChild(yearRead);

        const bookRead = document.createElement('button');
        bookRead.textContent = book.read ? "Read" : "Not Read";
        if(book.read) {
            bookRead.classList.add("book-read");
        } else {
            bookRead.classList.add("not-read");
        }
        bookRead.addEventListener('click', () => {
            book.read = !book.read;
            updateReadButton(bookRead, book.read);
            saveLocal();
        });

        bookTile.appendChild(bookRead);

        const deleteBook = document.createElement('button');
        deleteBook.classList.add('delete-book');
        deleteBook.textContent = 'Delete';
        deleteBook.onclick = function() { // Attach event listener here
            // Remove the book from the array and the DOM
            myLibrary.books.splice(index, 1); // Remove the book from the array
            displayBooks(); // Re-display the books after removal
            saveLocal(); // Update localStorage
        };
        bookTile.appendChild(deleteBook);

        bookGrid.appendChild(bookTile);

    });
};

function updateReadButton(button, read) {
    button.textContent = read ? "Read" : "Not Read";
    button.classList.remove('book-read', 'not-read');
    button.classList.add(read ? 'book-read' : 'not-read');
}
