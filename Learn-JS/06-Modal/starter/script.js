'use strict';

const modal = document.querySelector('.modal');
const overlay = document.querySelector('.overlay');
const btnCloseModal = document.querySelector('.close-modal');
const btnsOpenModal = document.querySelectorAll('.show-modal');

const openModel = function () {
  console.log('button click ... ');
  modal.classList.remove('hidden');
  overlay.classList.remove('hidden');
};

const closeModal = function () {
  console.log('click close');
  modal.classList.add('hidden');
  overlay.classList.add('hidden');
};

for (let index = 0; index < btnsOpenModal.length; index++) {
  btnsOpenModal[index].addEventListener('click', openModel);
}

btnCloseModal.addEventListener('click', closeModal);

document.addEventListener('keydown', function (e) {
  console.log(e.key);
});
