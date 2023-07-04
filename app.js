// Variables globales
const addBookButton = document.querySelector('.addBook');
const authorForm = document.querySelector('.author');
const titleForm = document.querySelector('.title');
const pagesForm = document.querySelector('.pages');
const checkBox = document.querySelector('#check');
const deleteAllBtn = document.querySelector('.deleteAll');
const cardWrapper = document.querySelector('.cardsWrapper');
const booksRead = document.querySelector('.statusBookRead');
const booksUnread = document.querySelector('.statusBookUnread');
const totalBooks = document.querySelector('.totalBooks');

class Book {
    constructor(id = '', title = 'Unknown', author = 'Unknown', pages = '0', isRead = false) {
        this.id = id;
        this.title = title;
        this.author = author;
        this.pages = pages;
        this.isRead = isRead;
    }
}

class Library {
    constructor() {
        this.books = [];
        this.nextBookId = 1;
    }

    addBook(newBook) {
        if (!this.isBookInLibrary(newBook)) {
            newBook.id = this.nextBookId.toString();
            this.nextBookId++;
            this.books.push(newBook);
        } else {
            alert('El libro que deseas agregar ya se encuentra en la libreria');
        }
    }

    deleteBook(bookId) {
        this.books = this.books.filter(book => book.id !== bookId);
    }

    deleteAll() {
        this.books = [];
    }

    isBookInLibrary(newBook) {
        return this.books.some(book => book.title === newBook.title);
    }

    getBooksReadCount() {
        return this.books.filter(book => book.isRead).length;
    }

    getBooksUnreadCount() {
        return this.books.filter(book => !book.isRead).length;
    }

    getTotalBooksCount() {
        return this.books.length;
    }
}

const libraryInstance = new Library();

// Event listeners
addBookButton.addEventListener('click', handleAddBook);
deleteAllBtn.addEventListener('click', handleDeleteAll);

function handleAddBook(event) {
    event.preventDefault();

    const newAuthorValue = authorForm.value;
    const newTitleValue = titleForm.value;
    const newPagesValue = Number(pagesForm.value);
    const isChecked = checkBox.checked;

    const newBook = new Book('', newTitleValue, newAuthorValue, newPagesValue, isChecked);

    libraryInstance.addBook(newBook);
    displayBooks();
    displayStatus();
}

function handleDeleteAll() {
    libraryInstance.deleteAll();
    displayBooks();
    displayStatus();
}

function createBookCard(book) {
    const status = book.isRead ? 'Read' : 'On Progress';
    const statusColor = book.isRead ? 'finish' : 'onProgress';

    const card = document.createElement('div');
    card.classList.add('card');

    const wrapper1 = createWrapperElement('h3', 'Title:', 'p', 'bookTitle', book.title);
    card.appendChild(wrapper1);

    const wrapper2 = createWrapperElement('h3', 'Author:', 'p', '', book.author);
    card.appendChild(wrapper2);

    const wrapper3 = createWrapperElement('h3', 'Pages:', 'p', '', book.pages);
    card.appendChild(wrapper3);

    const wrapper4 = createWrapperElement('h3', 'Status:', 'p', statusColor, status);
    card.appendChild(wrapper4);

    const readButton = document.createElement('button');
    readButton.classList.add('read');
    readButton.textContent = 'Read';
    readButton.addEventListener('click', () => {
        book.isRead = true;
        displayBooks();
        displayStatus();
    });
    card.appendChild(readButton);

    const deleteButton = document.createElement('button');
    deleteButton.classList.add('delete');
    deleteButton.textContent = 'X';
    deleteButton.setAttribute('data-id', book.id);
    deleteButton.addEventListener('click', () => {
        libraryInstance.deleteBook(book.id);
        displayBooks();
        displayStatus();
    });
    card.appendChild(deleteButton);

    return card;
}

function createWrapperElement(labelTag, labelText, valueTag, valueClass, valueText) {
    const wrapper = document.createElement('div');
    wrapper.classList.add('wrapper');

    const label = document.createElement(labelTag);
    label.textContent = labelText;
    wrapper.appendChild(label);

    const value = document.createElement(valueTag);
    if (valueClass) {
        value.classList.add(valueClass);
    }
    value.textContent = valueText;
    wrapper.appendChild(value);

    return wrapper;
}

function displayBooks() {
    cardWrapper.innerHTML = '';

    libraryInstance.books.forEach(book => {
        const card = createBookCard(book);
        cardWrapper.appendChild(card);
    });
}

function displayStatus() {
    const booksReadCount = libraryInstance.getBooksReadCount();
    const booksUnreadCount = libraryInstance.getBooksUnreadCount();
    const totalBooksCount = libraryInstance.getTotalBooksCount();

    booksRead.textContent = `Books Read: ${booksReadCount}`;
    booksUnread.textContent = `Books On-Progress: ${booksUnreadCount}`;
    totalBooks.textContent = `Total Books: ${totalBooksCount}`;
}

// Inicializar la visualización de libros y estado
displayBooks();
displayStatus();