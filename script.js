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
};

function addBookToLibrary() {
    const form = document.getElementById('bookForm');
    const title = form.title.value;
    const author = form.author.value;
    const pages = form.pages.value;
    const genre = form.genre.value;
    const read = form.read.checked;

    const newBook = new Book(title, author, pages, genre, read);

    myLibrary.push(newBook);
};


bookButton.onclick = function() {
    bookModal.style.display = "block";
};

span.onclick = function() {
    bookModal.style.display = "none";
};

window.onclick = function(event) {
    if (event.target == bookModal) {
        bookModal.style.display = "none";
    }
};


addBook.onclick = function(event) {
    event.preventDefault();
    addBookToLibrary();

    const latestBook = myLibrary[myLibrary.length - 1];

    const bookTile = document.createElement('div');
    bookTile.classList.add('book-tile');

    const bookTitle = document.createElement('h1');
    bookTitle.textContent = latestBook.title;
    bookTile.appendChild(bookTitle);

    const bookAuthor = document.createElement('p');
    bookAuthor.textContent = latestBook.author;
    bookTile.appendChild(bookAuthor);
    
    const bookPages = document.createElement('p');
    bookPages.textContent = latestBook.pages;
    bookTile.appendChild(bookPages);

    const bookGenre = document.createElement('p');
    bookGenre.textContent = latestBook.genre
    bookTile.appendChild(bookGenre);

    const bookRead = document.createElement('button');
    bookRead.textContent = latestBook.read ? "Read" : "Not Read";
    bookRead.classList.add('book-read');
    bookTile.appendChild(bookRead);

    bookGrid.appendChild(bookTile);

    bookModal.style.display = "none";
};


const saveLocal = () => {
    localStorage.setItem('library', JSON.stringify(library))
  }
  
  const restoreLocal = () => {
    const books = JSON.parse(localStorage.getItem('library'))
    if (books) {
      library.books = books.map((book) => JSONToBook(book))
    } else {
      library.books = []
    }
  };



  saveLocal();