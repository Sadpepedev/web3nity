/************************************************************************
 * STARFIELD + RANDOM GEOMETRIC SHAPES BACKGROUND
 ************************************************************************/
const canvas = document.getElementById('bgCanvas');
const ctx = canvas.getContext('2d');

let width, height;
let stars = [];
const numStars = 150; // Adjust for more/less stars

// We'll add random geometric shapes (circles, triangles, squares).
let shapes = [];
const numShapes = 8; // Adjust for more/less floating shapes

function resizeCanvas() {
  width = window.innerWidth;
  height = window.innerHeight;
  canvas.width = width;
  canvas.height = height;
}
window.addEventListener('resize', resizeCanvas);
resizeCanvas();

// Initialize stars
function initStars() {
  stars = [];
  for (let i = 0; i < numStars; i++) {
    stars.push({
      x: Math.random() * width,
      y: Math.random() * height,
      z: Math.random() * width
    });
  }
}

// Initialize shapes
function initShapes() {
  shapes = [];
  // We'll rotate between circle, triangle, and square
  const shapeTypes = ['circle', 'triangle', 'square'];

  for (let i = 0; i < numShapes; i++) {
    const type = shapeTypes[Math.floor(Math.random() * shapeTypes.length)];
    shapes.push({
      type: type,
      x: Math.random() * width,
      y: Math.random() * height,
      size: 20 + Math.random() * 30,
      color: getRandomVaporwaveColor(),
      vx: -0.5 + Math.random(), // random horizontal speed
      vy: -0.5 + Math.random()  // random vertical speed
    });
  }
}

// Return a random translucent color from a vaporwave palette
function getRandomVaporwaveColor() {
  // Each has alpha ~0.4 or 0.5 for translucency
  const colors = [
    'rgba(255, 113, 206, 0.5)',  // pink
    'rgba(1, 205, 254, 0.4)',    // cyan
    'rgba(5, 255, 161, 0.4)',    // neon green
    'rgba(185, 103, 255, 0.5)',  // purple
    'rgba(255, 154, 255, 0.4)'   // pastel pink
  ];
  return colors[Math.floor(Math.random() * colors.length)];
}

// Initialize arrays
initStars();
initShapes();

// Animate the canvas
function animate() {
  ctx.clearRect(0, 0, width, height);

  // 1) Starfield
  for (let i = 0; i < numStars; i++) {
    const star = stars[i];
    star.z -= 2; // Move forward
    if (star.z <= 0) {
      // Reset star to the far plane
      star.x = Math.random() * width;
      star.y = Math.random() * height;
      star.z = width;
    }

    // Perspective
    const k = 128.0 / star.z; 
    const sx = star.x * k + width / 2;
    const sy = star.y * k + height / 2;
    const size = (1 - star.z / width) * 2; // star size

    ctx.fillStyle = '#ffffff'; // white star
    ctx.fillRect(sx, sy, size, size);
  }

  // 2) Random Vaporwave Shapes
  shapes.forEach(shape => {
    // Update position
    shape.x += shape.vx;
    shape.y += shape.vy;

    // Wrap around edges
    if (shape.x < -50) shape.x = width + 50;
    if (shape.x > width + 50) shape.x = -50;
    if (shape.y < -50) shape.y = height + 50;
    if (shape.y > height + 50) shape.y = -50;

    // Draw shape
    ctx.fillStyle = shape.color;
    ctx.beginPath();

    if (shape.type === 'circle') {
      ctx.arc(shape.x, shape.y, shape.size / 2, 0, Math.PI * 2);
    } else if (shape.type === 'triangle') {
      ctx.moveTo(shape.x, shape.y - shape.size / 2);
      ctx.lineTo(shape.x - shape.size / 2, shape.y + shape.size / 2);
      ctx.lineTo(shape.x + shape.size / 2, shape.y + shape.size / 2);
      ctx.closePath();
    } else if (shape.type === 'square') {
      ctx.rect(shape.x - shape.size / 2, shape.y - shape.size / 2, shape.size, shape.size);
    }

    ctx.fill();
  });

  requestAnimationFrame(animate);
}
animate();

/************************************************************************
 * NAVBAR MOBILE TOGGLE & YEAR FOOTER
 ************************************************************************/
function toggleMenu() {
  const menu = document.querySelector('.menu');
  menu.classList.toggle('active');
}

// Close the menu when a link is clicked (mobile)
document.querySelectorAll('.menu a').forEach(link => {
  link.addEventListener('click', () => {
    document.querySelector('.menu').classList.remove('active');
  });
});

// Display current year in footer
const yearSpan = document.getElementById('year');
if (yearSpan) {
  yearSpan.textContent = new Date().getFullYear();
}
