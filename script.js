
const menuButton = document.querySelector('.menu-button');
const nav = document.querySelector('.nav-links');

menuButton?.addEventListener('click', () => {
  const isOpen = nav.classList.toggle('open');
  menuButton.setAttribute('aria-expanded', String(isOpen));
  menuButton.textContent = isOpen ? '✕' : '☰';
});

document.querySelectorAll('.nav-links a').forEach(link => {
  link.addEventListener('click', () => {
    nav.classList.remove('open');
    menuButton?.setAttribute('aria-expanded', 'false');
    if (menuButton) menuButton.textContent = '☰';
  });
});

document.getElementById('year').textContent = new Date().getFullYear();

document.getElementById('quoteForm').addEventListener('submit', (event) => {
  event.preventDefault();

  const name = document.getElementById('name').value.trim() || 'Not provided';
  const location = document.getElementById('location').value.trim() || 'Not provided';
  const items = document.getElementById('items').value.trim() || 'Not provided';
  const amount = document.getElementById('amount').value;
  const stairs = document.getElementById('stairs').value;

  const message =
`Hi Kingdom Lift, I'd like a free junk removal estimate.

Name: ${name}
Area: ${location}
Items: ${items}
Approx. amount: ${amount}
Stairs: ${stairs}

I can attach photos in this text.`;

  window.location.href = `sms:+14692681577?body=${encodeURIComponent(message)}`;
});
