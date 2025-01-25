// Starfield setup
const canvas = document.getElementById('starCanvas');
const ctx = canvas.getContext('2d');

let stars = [];
const numStars = 200;   // Adjust for more/less stars
let width, height;

// Resize canvas to fill the window
function resizeCanvas() {
  width = window.innerWidth;
  height = window.innerHeight;
  canvas.width = width;
  canvas.height = height;
}
window.addEventListener('resize', resizeCanvas);
resizeCanvas();

// Initialize stars with random positions and depths
function initStars() {
  stars = [];
  for (let i = 0; i < numStars; i++) {
    stars.push({
      x: Math.random() * width,
      y: Math.random() * height,
      z: Math.random() * width // z used to create depth perspective
    });
  }
}
initStars();

// Animate the starfield
function animate() {
  ctx.clearRect(0, 0, width, height);

  for (let i = 0; i < numStars; i++) {
    let star = stars[i];
    
    // Move star forward
    star.z -= 2;
    if (star.z <= 0) {
      // Reset star to the far edge
      star.x = Math.random() * width;
      star.y = Math.random() * height;
      star.z = width;
    }
    
    // Simple perspective projection
    let k = 128.0 / star.z; // "focal length"
    let sx = star.x * k + width / 2;
    let sy = star.y * k + height / 2;
    
    // Star size based on distance
    let size = (1 - star.z / width) * 2;
    
    // Draw star
    ctx.fillStyle = '#ffffff';
    ctx.fillRect(sx, sy, size, size);
  }

  requestAnimationFrame(animate);
}
animate();

// Navbar toggle for mobile
function toggleMenu() {
  const menu = document.querySelector('.menu');
  menu.classList.toggle('active');
}

// Close the menu on link click
document.querySelectorAll('.menu a').forEach(link => {
  link.addEventListener('click', () => {
    document.querySelector('.menu').classList.remove('active');
  });
});

// Display current year in footer (if needed)
const yearSpan = document.getElementById('year');
if (yearSpan) {
  yearSpan.textContent = new Date().getFullYear();
}
