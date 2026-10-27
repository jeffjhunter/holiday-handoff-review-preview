'use strict';
// Browser-only demo. No network request, storage, cookies or analytics.
const form = document.getElementById('demo-form');
const firstName = document.getElementById('first-name');
const email = document.getElementById('email');
const button = form.querySelector('button');
button.disabled = false;
function validate(field) {
  const value = field.value.trim();
  let error = '';
  if (field === firstName && (!value || !/\p{L}/u.test(value))) error = 'Enter a first name containing at least one letter.';
  if (field === email && (!value || !field.validity.valid || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value))) error = 'Enter a valid email address, for example alex@example.com.';
  document.getElementById(field.id + '-error').textContent = error;
  field.setAttribute('aria-invalid', String(Boolean(error)));
  return !error;
}
[firstName, email].forEach(field => {
  field.addEventListener('blur', () => validate(field));
  field.addEventListener('input', () => {
    if (field.getAttribute('aria-invalid') === 'true') validate(field);
  });
});
form.addEventListener('submit', event => {
  event.preventDefault();
  const validName = validate(firstName);
  const validEmail = validate(email);
  if (!validName || !validEmail) {
    document.getElementById('form-status').textContent = 'Please check the highlighted fields.';
    (validName ? email : firstName).focus();
    return;
  }
  button.disabled = true;
  document.getElementById('form-status').textContent = 'Opening the demo confirmation. No email has been sent.';
  form.reset();
  window.location.assign('thank-you.html');
});
// Avoid browser back/forward-cache retaining entered details.
window.addEventListener('pagehide', () => form.reset());
window.addEventListener('pageshow', () => { form.reset(); button.disabled = false; });
