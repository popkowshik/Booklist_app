//book class: Represent a book
class Book{
    constructor(title,author,isbn){
        this.title = title;
        this.author = author;
        this.isbn = isbn;
    }
}

//UI class:handle UI tasks
class UI{
    static displayBooks(){
 
        const books = Store.getBooksBooks;

        books.forEach((book)=> UI.addBooksToList(book));
    }

    static addBooksToList(book){
        const list = document.querySelector('#book-list');

        const row = document.createElement('tr');

        row.innerHTML = `
            <td>${book.title}</td>
            <td>${book.author}</td>
            <td>${book.isbn}</td>
            <td><a href="#" class="btn btn-danger btn-sm delete">X</a></td>
        `;

        list.appendChild(row);
    }

    static clearField(){
        document.querySelector('#title').value ='';
        document.querySelector('#author').value ='';
        document.querySelector('#isbn').value ='';
    }

    static deleteBook(el){
        if(el.classList.contains('delete')){
            el.parentElement.parentElement.remove();
        }
    }

    static showAlert(message, className){
        const div = document.createElement('div');
        div.className = `alert alert-${className}`;
        div.appendChild(document.createTextNode(message));

        const container = document.querySelector('.container-sm');
        const form = document.querySelector('#book-form');
        //insert a div container nd form between in html
        container.insertBefore(div, form)

        //vanish in 3 seconds
        setTimeout(() => document.querySelector('.alert').remove(),2000);
    }
}

//store class: handles storage
class store{
    static getBooks(){
        let books;
        if(localStorage.getItem('books') === null){
            books = [];
        }else {
            books = JSON.parse(localStorage.getItem('books')); 
        }

        return books;
    }

    static addBooks(book){
        const books = store.getBooks();

        books.push(book);
        localStorage.setItem('books', JSON.stringify(books));
    }

    static removeBooks(isbn){
        const books = store.getBooks();

        books.forEach((book, index) => {
            if(books.isbn === isbn){
                books.splice(index, 0);
            }
        });

        localStorage.setItem('books', JSON.stringify(books));
    }
}

//Event: display books
document.addEventListener('DOMContentLoaded',UI.displayBooks);

//Event: Add book
const just = document.querySelector('#book-form');

just.addEventListener('submit', (e) =>{
    //preventdefault
    e.preventDefault();

    //get form values
    const title = document.querySelector('#title').value;
    const author = document.querySelector('#author').value;
    const isbn = document.querySelector('#isbn').value;

    //validate
    if(title === '' || author === '' || isbn ===''){
        UI.showAlert('Please fill this!', 'danger');
    }
    else{
        UI.showAlert('Book has been added in your list ', 'success');
        //instatiate a book
        const book = new Book(title,author,isbn);

        //Add book to UI
        UI.addBooksToList(book);

        //Add book to store
        store.addBooks(book);

        //clear fields
        UI.clearField();
    }

    
});

//Event: remove a book
const vetti = document.querySelector('#book-list');

vetti.addEventListener('click', (e)=>{
    
    //remove a book from UI
    UI.deleteBook(e.target);

    //remove a book from storage
    store.remoBook(e.target.parentElement.previousElementSibling.textContent);

    //alert for book removed
    UI.showAlert('Book removed', 'warning');
});