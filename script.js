document.addEventListener("DOMContentLoaded", () => {
  myLibrary = JSON.parse(localStorage.getItem("myLibrary")) || [];
  displayLibrary();
});

const cardContainer = document.querySelector(".cardContainer");
const openForm = document.getElementById("openForm");
const bookDialog = document.getElementById("bookDialog");
const titleInput = document.getElementById("titleInput");
const authorInput = document.getElementById("authorInput");
const genreInput = document.getElementById("genreInput");
const pagesInput = document.getElementById("pagesInput");
const addBook = document.getElementById("addBook");
const closeBook = document.getElementById("closeBook");
const search = document.getElementById("search");
const searchBtn = document.getElementById("searchBtn");
const displayAll = document.getElementById("displayAll");
const userBtn = document.getElementById("userBtn");
const userDialog = document.getElementById("userDialog");
const userClose = document.getElementById("userClose");
const clearLibrary = document.getElementById("clearLibrary");

let myLibrary = [];

userBtn.addEventListener("click", (e) => {
  e.preventDefault();
  userDialog.showModal();
});

clearLibrary.addEventListener("click", (e) => {
  e.preventDefault();
  cardContainer.textContent = "";
  myLibrary = [];
  localStorage.removeItem("myLibrary");
  userDialog.close();
});

userClose.addEventListener("click", (e) => {
  e.preventDefault();
  userDialog.close();
});

class Book {
  constructor(title, author, genre, pages, read) {
    this.title = title;
    this.author = author;
    this.genre = genre;
    this.pages = pages;
    this.read = read;
  }
}

openForm.addEventListener("click", (e) => {
  e.preventDefault();
  bookDialog.showModal();
});

closeBook.addEventListener("click", (e) => {
  e.preventDefault();
  bookDialog.close();
});

const createCard = (book) => {
  const card = document.createElement("div");
  card.classList.add("card");

  const img = document.createElement("img");
  img.src = "img/book.png";
  card.appendChild(img);

  const title = document.createElement("h2");
  title.textContent = book.title;
  card.appendChild(title);

  const author = document.createElement("p");
  author.textContent = `Author: ${book.author}`;
  card.appendChild(author);

  const genre = document.createElement("p");
  genre.textContent = `Genre: ${book.genre}`;
  card.appendChild(genre);

  const pages = document.createElement("p");
  pages.textContent = `Pages: ${book.pages}`;
  card.appendChild(pages);

  const read = document.createElement("button");
  read.textContent = book.read ? "Read" : "Not Read";
  read.addEventListener("click", () => {
    book.read = !book.read;
    read.textContent = book.read ? "Read" : "Not Read";
    localStorage.setItem("myLibrary", JSON.stringify(myLibrary));
  });
  card.appendChild(read);

  const remove = document.createElement("button");
  remove.textContent = "Remove";
  remove.addEventListener("click", () => {
    card.remove();
    myLibrary.splice(myLibrary.indexOf(book), 1);
    localStorage.setItem("myLibrary", JSON.stringify(myLibrary));
  });
  card.appendChild(remove);

  cardContainer.appendChild(card);
};

const addBookToLibrary = (book) => {
  myLibrary.push(book);
  createCard(book);
  localStorage.setItem("myLibrary", JSON.stringify(myLibrary));
};

addBook.addEventListener("click", (e) => {
  e.preventDefault();
  const title = titleInput.value;
  const author = authorInput.value;
  const genre = genreInput.value;
  const pages = pagesInput.value;
  const read = false;

  if (!title || !author) {
    alert("Please enter a title and author");
    return;
  }

  const newBook = new Book(title, author, genre, pages, read);
  addBookToLibrary(newBook);
  console.log(myLibrary);
  bookDialog.close();
});

const displayLibrary = () => {
  for (let i = 0; i < myLibrary.length; i++) {
    createCard(myLibrary[i]);
  }
};

searchBtn.addEventListener("click", (e) => {
  e.preventDefault();
  const query = search.value.toLowerCase();
  cardContainer.textContent = "";
  myLibrary.forEach((book) => {
    if (
      book.title.toLowerCase().includes(query) ||
      book.author.toLowerCase().includes(query) ||
      book.genre.toLowerCase().includes(query)
    ) {
      createCard(book);
    }
  });
});

displayAll.addEventListener("click", (e) => {
  e.preventDefault();
  cardContainer.textContent = "";
  displayLibrary();
});
