const myLibrary = []
let bookModal = document.getElementById("bookModal");
let bookButton = document.querySelector(".book-button");
let span = document.querySelector(".close");

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