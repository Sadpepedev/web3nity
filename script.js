function toggleMenu() {
  const menu = document.querySelector('.menu');
  menu.classList.toggle('active');
}

// Display current year in footer
document.getElementById('year').textContent = new Date().getFullYear();

