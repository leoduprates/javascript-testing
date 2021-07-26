document.addEventListener('DOMContentLoaded', function () {
  const modalOverlay = document.querySelector('.modal-overlay');
  const modal = document.querySelector('.modal');

  document.querySelector('#save-button').addEventListener('click', function () {
    const title = document.querySelector('#title-input');
    const description = document.querySelector('#description-textarea');
    const xhr = new XMLHttpRequest();

    xhr.open('POST', `/api/cards`, true);
    xhr.setRequestHeader('Content-Type', 'application/json;charset=UTF-8');
    xhr.send(
      JSON.stringify({
        title: title.value,
        description: description.value,
      })
    );

    location.reload();
  });

  document
    .querySelector('#modal-overlay')
    .addEventListener('click', function (event) {
      if (event.target == event.currentTarget) {
        modalOverlay.classList.toggle('closed');
        modal.classList.toggle('closed');
      }
    });

  document
    .querySelector('.close-button')
    .addEventListener('click', function () {
      modalOverlay.classList.toggle('closed');
      modal.classList.toggle('closed');
    });

  document.querySelector('.card-button').addEventListener('click', function () {
    modalOverlay.classList.toggle('closed');
    modal.classList.toggle('closed');
  });
});
