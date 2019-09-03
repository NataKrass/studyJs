'use strict';

let books = document.querySelector('.books');
console.log(books);
let book = document.querySelectorAll('.book');
console.log(book);

books.insertBefore(book[1], book[0]);
books.removeChild(book[2]);
books.appendChild(book[2]);
books.insertBefore(book[3], book[2]);
books.insertBefore(book[3], book[5]);

let body = document.querySelector('body');
body.setAttribute('style', 'background-image: url(./image/you-dont-know-js.jpg)');

book[4].classList.add('book-three');
let bookThreeTitle = books.querySelector('.book-three h2 a');
bookThreeTitle.textContent = 'Книга 3. this и Прототипы Объектов';

body.removeChild(body.querySelector('.adv'));

book[0].classList.add('book-two');
let bookTwo = books.querySelector('.book-two');
let bookTwoList = bookTwo.querySelector('ul');
let bookTwoLi = bookTwo.querySelectorAll('li');

bookTwoList.insertBefore(bookTwoLi[6], bookTwoLi[4]);
bookTwoList.insertBefore(bookTwoLi[8], bookTwoLi[4]);
bookTwoList.insertBefore(bookTwoLi[2], bookTwoLi[10]);

book[5].classList.add('book-five');
let bookFive = books.querySelector('.book-five');
let bookFiveList = bookFive.querySelector('ul');
let bookFiveLi = bookFive.querySelectorAll('li');
bookFiveList.insertBefore(bookFiveLi[9], bookFiveLi[3]);
bookFiveList.insertBefore(bookFiveLi[2], bookFiveLi[6]);
bookFiveList.insertBefore(bookFiveLi[5], bookFiveLi[8]);


let newChild = document.createElement('li');
book[2].classList.add('book-six');
let bookSix = books.querySelector('.book-six');
let bookSixList = bookSix.querySelector('ul');
let bookSixLi = bookSix.querySelectorAll('li');

bookSixList.removeChild(bookSixLi[9]);
bookSixList.appendChild(newChild);
bookSixList.appendChild(bookSixLi[9]);
newChild.textContent = 'Глава 8: За пределами ES6';
