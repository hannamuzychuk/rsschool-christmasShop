const targetDate = new Date("Jan 1, 2027 00:00:00").getTime();

setInterval(() => {
  const now = new Date().getTime();
  const diff = targetDate - now;

  document.getElementById("days").textContent =
    Math.floor(diff / (1000 * 60 * 60 * 24));
  document.getElementById("hours").textContent =
    Math.floor((diff / (1000 * 60 * 60)) % 24);
  document.getElementById("minutes").textContent =
    Math.floor((diff / (1000 * 60)) % 60);
  document.getElementById("seconds").textContent =
    Math.floor((diff / 1000) % 60);
}, 1000);


  const navLinks = document.querySelectorAll('.tabs a');

  navLinks.forEach(link => {
    link.addEventListener('click', function(event) {
      navLinks.forEach(l => l.classList.remove('active'));
      this.classList.add('active');
    });
  });