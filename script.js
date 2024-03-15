const myLibrary = [];
let bookModal = document.getElementById("bookModal");
let bookButton = document.querySelector(".book-button");
let bookGrid = document.querySelector(".book-grid");
let span = document.querySelector(".close");
let addBook = document.querySelector(".add-book");


//Book constructor
class Book {
    constructor(title, author, pages, genre, read) {
        this.title = title;
        this.author = author;
        this.pages = pages;
        this.genre = genre;
        this.read = read;
    }
}

function addBookToLibrary() {
    const form = document.getElementById('bookForm');
    const title = form.title.value;
    const author = form.author.value;
    const pages = form.pages.value;
    const genre = form.genre.value;
    const read = form.read.checked;

    const newBook = new Book(title, author, pages, genre, read);

    myLibrary.push(newBook);
}


bookButton.onclick = function() {
    bookModal.style.display = "block";
}

span.onclick = function() {
    bookModal.style.display = "none";
}

window.onclick = function(event) {
    if (event.target == modal) {
        bookModal.style.display = "none";
    }
}


addBook.onclick = function() {
    const latestBook = myLibrary[-1];
    bookGrid.appendChild(latestBook);
}