const canvas = document.getElementById('bgCanvas');
const ctx = canvas.getContext('2d');

let width, height;
let shapes = [];
const numShapes = 12; // More shapes = busier background

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
      type: type,
      x: Math.random() * width,
      y: Math.random() * height,
      size: 40 + Math.random() * 30, // 40-70
      color: getNeonColor(),
      vx: -0.5 + Math.random(),
      vy: -0.5 + Math.random()
    });
  }
}

// Very neon / 80s-like colors
function getNeonColor() {
  const colors = [
    'rgba(255, 0, 128, 0.8)',   // hot pink
    'rgba(0, 255, 255, 0.8)',   // neon aqua
    'rgba(255, 255, 0, 0.8)',   // neon yellow
    'rgba(255, 0, 255, 0.8)',   // magenta
    'rgba(0, 255, 0, 0.8)',     // lime green
    'rgba(0, 128, 255, 0.8)'    // neon blue
  ];
  return colors[Math.floor(Math.random() * colors.length)];
}

initShapes();

function animate() {
  ctx.clearRect(0, 0, width, height);

  shapes.forEach(shape => {
    // Move shape
    shape.x += shape.vx;
    shape.y += shape.vy;

    // Wrap around edges
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
