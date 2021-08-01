document.addEventListener('DOMContentLoaded', () => {
  document.querySelectorAll('.delete-card').forEach((item) => {
    item.addEventListener('click', () => {
      const id = item.getAttribute('data-id');
      const xhr = new XMLHttpRequest();

      xhr.open('DELETE', `/api/cards/${id}`, true);
      xhr.send();

      window.location.reload();
    });
  });

  document.querySelectorAll('.update-card').forEach((item) => {
    item.addEventListener('click', () => {
      const id = item.getAttribute('data-id');
      const title = document.querySelector(`[data-id='title_${id}']`);
      const description = document.querySelector(
        `[data-id='description_${id}']`,
      );

      const xhr = new XMLHttpRequest();
      xhr.open('PUT', `/api/cards/${id}`, true);
      xhr.setRequestHeader('Content-Type', 'application/json;charset=UTF-8');
      xhr.send(
        JSON.stringify({
          title: title.value,
          description: description.value,
        }),
      );

      window.location.reload();
    });
  });

  document.querySelectorAll('#title-card').forEach((item) => {
    item.addEventListener('click', () => {
      item.removeAttribute('readonly');
    });
  });

  document.querySelectorAll('#description-card').forEach((item) => {
    item.addEventListener('click', () => {
      item.removeAttribute('readonly');
    });
  });
});
