// Book Class represents a Book

class Book {
    constructor (title, author, number, read) {
        this.title = title;
        this.author = author;
        this.number = number;
        this.read = read;
    }
    
}

// UI Class handle user interface tasks

class UI {
    static displayBooks() {
        
        const books = Store.getBooks();

        books.forEach((book) => UI.addBookToList(book));
    }

        static addBookToList(book) {
            const list = document.querySelector('#book-list');
            
            // create a table row element

            const row = document.createElement('tr');
                row.innerHTML = `
                <td>${book.title}</td>
                <td>${book.author}</td>
                <td>${book.number}</td>
                <td>${book.read}</td>
                <td><a href="#" class="btn btn-danger btn-sm
                delete">X</a></td>
                `;
                

                list.appendChild(row);
        }
        

        static deleteBook(el) {
            if(el.classList.contains('delete')) {
                el.parentElement.parentElement.remove();
                
            }
            
        }

        static showAlert(message, className) {
            const div = document.createElement('div');
            div.className = `alert alert-${className}`;
            div.appendChild(document.createTextNode(message));
            const container = document.querySelector('.container');
            const form = document.querySelector('#book-form');
            container.insertBefore(div, form);

            // Make alert go away after 3 seconds

            setTimeout(() => document.querySelector('.alert').remove(),
            3000);
        }

        static clearFields() {
            document.querySelector('#title').value = '';
            document.querySelector('#author').value = '';
            document.querySelector('#number').value = '';
            if (document.querySelector('#read').value === "yes") {
                document.querySelector('.slider').click();
            }

        }
    }

// Store Class handles storage

class Store {
   static getBooks() {
    let books;
    if(localStorage.getItem('books') === null) {
        books = []
     } else {
    books = JSON.parse(localStorage.getItem('books'));
     }
    return books;
    }
    

   static addBook(book) {
    const books = Store.getBooks();
    console.log(book.read);
    books.push(book);
    localStorage.setItem('books', JSON.stringify(books));
    }

   static removeBook(read) {
    const books = Store.getBooks();

    books.forEach((book, index) => {
        if(book.read === read) {
            books.splice(index, 1);
        }
    });

    localStorage.setItem('books', JSON.stringify(books));
    }
}

// Event: Display Book

document.addEventListener('DOMContentLoaded', UI.displayBooks);

// Event: Add a book

document.querySelector('#book-form').addEventListener('submit', (e) => {
    
    // Prevent actual submit
    e.preventDefault();
    
    
    // Get form values
    
    const title = document.querySelector('#title').value;
    const author = document.querySelector('#author').value;
    const number = document.querySelector('#number').value;
    let read = document.querySelector('#read').value;
   

    
   
    // Validation

    if(title === '' || author === '' || number === '') {
       UI.showAlert('Fill all fields please', 'danger');
    } else {

    // Instantiate book
    
    const book = new Book(title, author, number, read);
    
   

    // Add book to UI
    
    UI.addBookToList(book);

    // Add book to store

    Store.addBook(book);

    // Success message popup

    UI.showAlert('Book added to the list', 'success');

    // Clear fields
    
    UI.clearFields();
    }
});

// Event: Slider
document.querySelector('#read').addEventListener('click', (e) => {
    let buttonValue = document.querySelector('#read').value;

    if (buttonValue === "no") {
        document.querySelector('#read').value = "yes";
    } else {
        document.querySelector('#read').value = "no";
    }
});


// Event: Remove a book

document.querySelector('#book-list').addEventListener('click', (e) => {
    
// Removes book from the UI

    UI.deleteBook(e.target);

//Removes book from the Store   

    Store.removeBook
    (e.target.parentElement.previousElementSibling.textContent);


// Book deleted message

    UI.showAlert('Book removed from the list', 'success');
});

