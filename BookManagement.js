class Book{
    constructor(name, gerne, author, price, isBorrowed, id){
        this.name = name;
        this.gerne = gerne;
        this.author = author;
        this.price = price;
        this.isBorrowed = isBorrowed;
        this.id = id;
    }
}

class Container{
    constructor(element, books_arr){
        this.element = element;
        this.books_arr = books_arr;
    }

    addBook(book){
        this.books_arr.push(book)
        this.element.appendChild(createBookBlock(book));
        this.addButtonFunction(this.element.lastElementChild.id, book, this.books_arr);
    }

    addButtonFunction(book_blockID, book, books_arr){
        let buttonGroup = document.getElementById(book_blockID).getElementsByTagName('button');
        buttonGroup[0].onclick = function(){
            books_arr.splice(books_arr.indexOf(book), 1);
            this.parentElement.parentElement.parentElement.remove(this.parentElement.parentElement);
            transferShelf.addBook(book);
            updatePricing();
        }
        buttonGroup[1].onclick = function(){
            books_arr.splice(books_arr.indexOf(book), 1);
            this.parentElement.parentElement.parentElement.remove(document.getElementById(book_blockID));
            bookShelf.addBook(book);
            updatePricing();
        }
        buttonGroup[2].onclick = function(){
            books_arr.splice(books_arr.indexOf(book), 1);
            this.parentElement.parentElement.parentElement.remove(document.getElementById(book_blockID));
            bookShelf.addBook(book);
        }
        buttonGroup[3].onclick = function(){
            let index = findBookWithId(book_blockID, bookShelf.books_arr)
            if (index != -1){
                document.getElementById(book_blockID).classList.toggle("edit");
                let priceSection = document.getElementById(book_blockID).firstElementChild.nextElementSibling.firstElementChild.firstElementChild;
                if (isNumber(priceSection.value)){
                    bookShelf.books_arr[index].price = priceSection.value;
                }
                else priceSection.value = 0;
            }
        }
        buttonGroup[4].onclick = function(){
            books_arr.splice(books_arr.indexOf(book), 1);
            this.parentElement.parentElement.parentElement.remove(document.getElementById(book_blockID));
        }
    }
}

function findBookWithId(id, books_arr){
    for(let book of books_arr){
        if(book.id == id){
            return books_arr.indexOf(book);
        }
    }
    return -1;
}

function updatePricing(){
    let total = 0;
    for (let i of transferShelf.books_arr){
        total += +(i.price);
    }
    document.getElementById("borrow-confirm").textContent = "Borrow " + transferShelf.books_arr.length + " book" + ((transferShelf.books_arr.length <= 1)? "" : "s") + " (Total: " + total + ")";
}

function borrowBook(){
    transferShelf.element.replaceChildren();
    for (let book of transferShelf.books_arr){
        book.isBorrowed = true;
        borrowShelf.addBook(book);
    }
    transferShelf.books_arr = [];
    updatePricing();
}

document.getElementById("borrow-confirm").onclick = function(){
    borrowBook();
}

document.getElementById("addBtn").onclick = function(){
    document.getElementById("add-window").classList.remove("none");
}

document.getElementById("closeBtn").onclick = function(){
    document.getElementById("add-window").classList.add("none");
}

function isNumber(num) {
    return /^\d+$/.test(num);
}

document.getElementById("addBook").onclick = function(){
    let nameIn = document.getElementById("nameIn").value;
    let gerneIn = document.getElementById("gerneIn").value;
    let authorIn = document.getElementById("authorIn").value;
    let priceIn = document.getElementById("priceIn").value;

    if (nameIn && gerneIn && authorIn && priceIn && isNumber(priceIn)){
        let newBook = new Book(nameIn, gerneIn, authorIn, priceIn, false, globalId);
        globalId++;
        bookShelf.addBook(newBook);
        document.getElementById("add-window").classList.add("none");
        document.getElementById("nameIn").value = "";
        document.getElementById("gerneIn").value = "";
        document.getElementById("authorIn").value = "";
        document.getElementById("priceIn").value = "";
    }
}

function createBookBlock(book){
    let table = document.createElement('table');
    table.classList.add("editable");
    table.classList.add("edit");
    table.id = book.id;

    let row = document.createElement('tr');
    let cell = document.createElement('th');
    cell.textContent = book.name;
    row.appendChild(cell);
    cell = document.createElement('th');
    cell.textContent = book.gerne;
    row.appendChild(cell);
    cell = document.createElement('th');
    cell.textContent = book.author;
    row.appendChild(cell);
    table.appendChild(row);

    row=document.createElement('tr');
    cell = document.createElement('th');
    let input = document.createElement('input');
    input.value = book.price;
    cell.appendChild(input);
    cell.colSpan = 3;
    row.appendChild(cell);

    table.appendChild(row);

    row = document.createElement('tr');
    cell = document.createElement('td');
    let button = document.createElement('button');
    button.classList.add("shelf");
    button.textContent = "Borrow book";
    cell.appendChild(button);

    button =document.createElement('button');
    button.classList.add("transfer");
    button.textContent = "Return book";
    cell.appendChild(button);
    row.appendChild(cell);

    button =document.createElement('button');
    button.classList.add("borrow");
    button.textContent = "Retrieve Book";
    cell.appendChild(button);
    row.appendChild(cell);

    cell = document.createElement('td');
    button = document.createElement('button');
    button.classList.add("shelf");
    button.classList.add("edit");
    cell.appendChild(button);
    row.appendChild(cell);

    cell = document.createElement('td');
    button = document.createElement('button');
    button.classList.add("shelf");
    button.classList.add("delete");
    button.textContent = "Delete book";
    cell.appendChild(button);
    row.appendChild(cell);

    table.appendChild(row);
    return table;

}