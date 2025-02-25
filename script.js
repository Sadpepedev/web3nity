/************************************************************************
 * FREE-FLOATING VAPORWAVE SHAPES (OUTLINES)
 ************************************************************************/
const canvas = document.getElementById('bgCanvas');
const ctx = canvas.getContext('2d');

let width, height;

// We'll have an array of shapes that drift around
let shapes = [];
const numShapes = 12; // Increase for more shapes

function resizeCanvas() {
  width = window.innerWidth;
  height = window.innerHeight;
  canvas.width = width;
  canvas.height = height;
}
window.addEventListener('resize', resizeCanvas);
resizeCanvas();

// Initialize shapes with random positions and speeds
function initShapes() {
  shapes = [];
  const shapeTypes = ['circle', 'triangle', 'square'];

  for (let i = 0; i < numShapes; i++) {
    const type = shapeTypes[Math.floor(Math.random() * shapeTypes.length)];

    shapes.push({
      type,
      x: Math.random() * width,
      y: Math.random() * height,
      size: 40 + Math.random() * 30, 
      color: getRandomVaporwaveColor(),
      vx: -0.5 + Math.random(), // horizontal speed
      vy: -0.5 + Math.random()  // vertical speed
    });
  }
}

// Random vaporwave-ish outline color
function getRandomVaporwaveColor() {
  const colors = [
    'rgba(255, 113, 206, 0.6)',  // pink
    'rgba(1, 205, 254, 0.5)',    // cyan
    'rgba(5, 255, 161, 0.5)',    // neon green
    'rgba(185, 103, 255, 0.7)',  // purple
    'rgba(255, 154, 255, 0.5)'   // pastel pink
  ];
  return colors[Math.floor(Math.random() * colors.length)];
}

initShapes();

// Animate the shapes
function animate() {
  ctx.clearRect(0, 0, width, height);

  shapes.forEach(shape => {
    // Move shape
    shape.x += shape.vx;
    shape.y += shape.vy;

    // Wrap edges
    if (shape.x < -50) shape.x = width + 50;
    if (shape.x > width + 50) shape.x = -50;
    if (shape.y < -50) shape.y = height + 50;
    if (shape.y > height + 50) shape.y = -50;

    // Draw outline
    ctx.strokeStyle = shape.color;
    ctx.lineWidth = 2;
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

    ctx.stroke();
  });

  requestAnimationFrame(animate);
}
animate();

/************************************************************************
 * NAVBAR MOBILE TOGGLE & FOOTER YEAR
 ************************************************************************/
function toggleMenu() {
  const menu = document.querySelector('.menu');
  menu.classList.toggle('active');
}

// Close mobile menu on link click
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
