const weatherForm = document.querySelector('#weather_form');
const address = document.querySelector('#address');
const errorMessage = document.querySelector('#error');
const successMessage = document.querySelector('#success');

weatherForm.addEventListener('submit', (e) => {
  e.preventDefault();

  const url = `http://localhost:3000/weather?address=${address.value}`;
  fetch(url).then((response) => {
    response.json().then((data) => {
      successMessage.textContent = 'Loading...';
      if(data.error) {
        errorMessage.textContent = data.error;
        successMessage.textContent = '';
      } else {
        errorMessage.textContent = '';
        successMessage.textContent = data.location + '\n' + data.forecast;
      }
    });
  });
});
