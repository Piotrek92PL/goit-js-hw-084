import throttle from 'lodash.throttle';

const form = document.querySelector('.feedback-form');
const emailInput = form.querySelector('input[name="email"]');
const messageInput = form.querySelector('textarea[name="message"]');

form.addEventListener('input', throttle(handleFormInput, 500));

function handleFormInput() {
  const formData = {
    email: emailInput.value,
    message: messageInput.value,
  };

  localStorage.setItem('feedback-form-state', JSON.stringify(formData));
}

window.addEventListener('DOMContentLoaded', () => {
  const savedFormData = localStorage.getItem('feedback-form-state');

  if (savedFormData) {
    const formData = JSON.parse(savedFormData);

    emailInput.value = formData.email;
    messageInput.value = formData.message;
  }
});

form.addEventListener('submit', handleSubmit);

function handleSubmit(event) {
  event.preventDefault();

  const formData = {
    email: emailInput.value,
    message: messageInput.value,
  };

  localStorage.removeItem('feedback-form-state');
  emailInput.value = '';
  messageInput.value = '';

  // Wylogowanie danych do konsoli
  console.log('Dane formularza:');
  console.log(formData);
}
