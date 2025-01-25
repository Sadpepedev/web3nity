/************************************************************************
 * VAPORWAVE-INSPIRED GEOMETRIC SHAPES
 ************************************************************************/
const canvas = document.getElementById('bgCanvas');
const ctx = canvas.getContext('2d');

let width, height;

// Array of drifting shapes
let shapes = [];
const numShapes = 12; // Increase for more floating shapes

function resizeCanvas() {
  width = window.innerWidth;
  height = window.innerHeight;
  canvas.width = width;
  canvas.height = height;
}
window.addEventListener('resize', resizeCanvas);
resizeCanvas();

// Initialize shapes
function initShapes() {
  shapes = [];
  const shapeTypes = ['circle', 'triangle', 'square'];

  for (let i = 0; i < numShapes; i++) {
    const type = shapeTypes[Math.floor(Math.random() * shapeTypes.length)];
    
    shapes.push({
      type: type,
      x: Math.random() * width,
      y: Math.random() * height,
      size: 30 + Math.random() * 30, // 30-60 px
      color: getRandomVaporwaveColor(),
      vx: -0.5 + Math.random(), // random horizontal speed (-0.5 to +0.5)
      vy: -0.5 + Math.random()  // random vertical speed (-0.5 to +0.5)
    });
  }
}

// Return a random translucent color from a vaporwave-like palette
function getRandomVaporwaveColor() {
  // Each has alpha to be partially translucent
  const colors = [
    'rgba(255, 113, 206, 0.5)',  // pink
    'rgba(1, 205, 254, 0.4)',    // cyan
    'rgba(5, 255, 161, 0.4)',    // neon green
    'rgba(185, 103, 255, 0.5)',  // purple
    'rgba(255, 154, 255, 0.4)'   // pastel pink
  ];
  return colors[Math.floor(Math.random() * colors.length)];
}

// Create shape array
initShapes();

// Animate shapes
function animate() {
  ctx.clearRect(0, 0, width, height);

  shapes.forEach(shape => {
    // Move shape
    shape.x += shape.vx;
    shape.y += shape.vy;

    // If shape drifts off-screen, wrap it around
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
