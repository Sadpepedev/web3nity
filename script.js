/************************************************************************
 * NEON SHAPES
 ************************************************************************/
const canvas = document.getElementById('bgCanvas');
const ctx = canvas.getContext('2d');

let width, height;
const numShapes = 12; // Adjust as needed
let shapes = [];

function resizeCanvas() {
  width = window.innerWidth;
  height = window.innerHeight;
  canvas.width = width;
  canvas.height = height;
}

window.addEventListener('resize', resizeCanvas);
resizeCanvas();

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
      color: getNeonColor(),
      vx: -0.5 + Math.random(),
      vy: -0.5 + Math.random(),
    });
  }
}

// Brighter 80s neon
function getNeonColor() {
  const colors = [
    'rgba(255, 0, 128, 0.8)',   // hot pink
    'rgba(0, 255, 255, 0.8)',   // aqua
    'rgba(255, 255, 0, 0.8)',   // yellow
    'rgba(255, 0, 255, 0.8)',   // magenta
    'rgba(0, 255, 0, 0.8)',     // lime
    'rgba(0, 128, 255, 0.8)'    // bright blue
  ];
  return colors[Math.floor(Math.random() * colors.length)];
}

initShapes();

// Animate the shapes
function animate() {
  ctx.clearRect(0, 0, width, height);

  shapes.forEach(shape => {
    shape.x += shape.vx;
    shape.y += shape.vy;

    // Wrap around screen edges
    if (shape.x < -50) shape.x = width + 50;
    if (shape.x > width + 50) shape.x = -50;
    if (shape.y < -50) shape.y = height + 50;
    if (shape.y > height + 50) shape.y = -50;

    // Draw shape outline
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
 * NAV MENU / FOOTER YEAR
 ************************************************************************/
function toggleMenu() {
  const menu = document.querySelector('.menu');
  menu.classList.toggle('active');
}

document.querySelectorAll('.menu a').forEach(link => {
  link.addEventListener('click', () => {
    document.querySelector('.menu').classList.remove('active');
  });
});

// Footer year
const yearSpan = document.getElementById('year');
if (yearSpan) {
  yearSpan.textContent = new Date().getFullYear();
}
