//Library class constructor
class Library {
    constructor() {
        this.books = [];
    }

    addBook(book) {
        this.books.push(book);
        this.saveToLocalStorage();
    }

    removeBook(index) {
        this.books.splice(index, 1);
        this.saveToLocalStorage();
    }

    toggleRead(index) {
        this.books[index].read = !this.books[index].read;
        this.saveToLocalStorage();
    }

    saveToLocalStorage() {
        localStorage.setItem('library', JSON.stringify(this.books));
    }

    restoreFromLocalStorage() {
        const books = JSON.parse(localStorage.getItem('library'));
        if (books) {
            this.books = books.map(book => new Book(book.title, book.author, book.pages, book.genre, book.year, book.read));
        }
    }

    getBooks() {
        return this.books;
    }
};


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

class UI {
    constructor() {
        this.bookModal = document.getElementById("bookModal");
        this.bookButton = document.querySelector(".book-button");
        this.bookGrid = document.querySelector(".book-grid");
        this.span = document.querySelector(".close");
        this.addBook = document.querySelector(".add-book");

        //Define library object
        this.library = new Library();
        this.library.restoreFromLocalStorage();

        this.bookButton.addEventListener('click', () => {
            this.bookModal.style.display = "block";
        });

        this.span.addEventListener('click', () => {
            this.bookModal.style.display = "none";
        });

        window.addEventListener('click', (event) => {
            if (event.target == this.bookModal) {
                this.bookModal.style.display = "none";
            }
        });

        document.getElementById('bookForm').addEventListener('submit', (event) => {
            event.preventDefault();
            this.addBookToLibrary();
            this.displayBooks();
            document.getElementById('bookForm').reset();
            this.bookModal.style.display = "none";
        });

        this.displayBooks();
    }

    addBookToLibrary() {
        const form = document.getElementById('bookForm');
        const title = form.title.value;
        const author = form.author.value;
        const pages = form.pages.value;
        const genre = form.genre.value;
        const year = form.year.value;
        const read = form.read.checked;

        const newBook = new Book(title, author, pages, genre, year, read);
        this.library.addBook(newBook);
    }

    displayBooks() {
        this.bookGrid.innerHTML = '';
        this.library.getBooks().forEach((book, index) => {
            const bookTile = document.createElement('div');
            bookTile.classList.add('book-tile');

            const bookTitle = document.createElement('h1');
            bookTitle.textContent = book.title;
            bookTile.appendChild(bookTitle);
            
            const bookAuthor = document.createElement('p');
            const authorLabel = document.createElement('strong');
            authorLabel.textContent = 'Author:';
            bookAuthor.appendChild(authorLabel);
            bookAuthor.append(` ${book.author}` );
            bookTile.appendChild(bookAuthor);

            const bookPages = document.createElement('p');
            const pagesLabel = document.createElement('strong');
            pagesLabel.textContent = 'Pages:';
            bookPages.appendChild(pagesLabel);
            bookPages.append(` ${ book.pages }`);
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
            bookRead.classList.add(book.read ? "book-read" : "not-read");
            bookRead.addEventListener('click', () => {
                this.library.toggleRead(index);
                this.updateReadButton(bookRead, book.read);
                this.displayBooks(); // Update the display after toggling read status
            });

            bookTile.appendChild(bookRead);

            const deleteBook = document.createElement('button');
            deleteBook.classList.add('delete-book');
            deleteBook.textContent = 'Delete';
            deleteBook.onclick = () => { // Attach event listener here
                // Remove the book from the array and the DOM
                this.library.removeBook(index); // Remove the book from the array
                this.displayBooks(); // Re-display the books after removal
            };
            bookTile.appendChild(deleteBook);

            this.bookGrid.appendChild(bookTile);
        });
    }

    updateReadButton(button, read) {
        button.textContent = read ? "Read" : "Not Read";
        button.classList.remove('book-read', 'not-read');
        button.classList.add(read ? 'book-read' : 'not-read');
    }
}


document.addEventListener('DOMContentLoaded', () => new UI());