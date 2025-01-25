/************************************************************************
 * PARALLAX OUTLINED VAPORWAVE SHAPES
 ************************************************************************/
const canvas = document.getElementById('bgCanvas');
const ctx = canvas.getContext('2d');

// We'll track the current scroll position
let scrollOffset = 0;

// Size of entire page
let width, height, docHeight;

let shapes = [];
const numShapes = 12; // Adjust for more or fewer shapes

function measureCanvas() {
  // Full width is always viewport width
  width = window.innerWidth;
  // Full height is the total scrollable height of the document
  docHeight = document.body.scrollHeight;
  height = docHeight;

  canvas.width = width;
  canvas.height = height;
}

// Make sure we recalc on load and resize
window.addEventListener('resize', measureCanvas);
measureCanvas();

// Initialize shapes
function initShapes() {
  const shapeTypes = ['circle', 'triangle', 'square'];

  shapes = [];
  for (let i = 0; i < numShapes; i++) {
    const type = shapeTypes[Math.floor(Math.random() * shapeTypes.length)];
    
    // Random positions across entire doc height
    const baseX = Math.random() * width;
    const baseY = Math.random() * height;

    // Parallax factor: 0.1 - 0.5 => moves slower than scroll
    // or tweak if you want some shapes faster than scroll
    const parallaxFactor = 0.1 + Math.random() * 0.4;

    shapes.push({
      type,
      baseX,
      baseY,
      size: 40 + Math.random() * 30, // 40-70
      color: getRandomVaporwaveColor(),
      parallax: parallaxFactor
    });
  }
}

function getRandomVaporwaveColor() {
  // Slightly translucent outlines
  const colors = [
    'rgba(255, 113, 206, 0.7)',  // pink
    'rgba(1, 205, 254, 0.6)',    // cyan
    'rgba(5, 255, 161, 0.6)',    // neon green
    'rgba(185, 103, 255, 0.7)',  // purple
    'rgba(255, 154, 255, 0.5)'   // pastel pink
  ];
  return colors[Math.floor(Math.random() * colors.length)];
}

initShapes();

// Listen for scroll changes
window.addEventListener('scroll', () => {
  scrollOffset = window.scrollY || window.pageYOffset;
});

// Render loop
function animate() {
  ctx.clearRect(0, 0, width, height);

  shapes.forEach(shape => {
    // Calculate shape’s parallax-based Y position
    const parallaxY = shape.baseY - scrollOffset * shape.parallax;
    const x = shape.baseX; // No horizontal parallax in this example

    // Draw outline shape
    ctx.strokeStyle = shape.color;
    ctx.lineWidth = 2;
    ctx.beginPath();

    if (shape.type === 'circle') {
      ctx.arc(x, parallaxY, shape.size / 2, 0, Math.PI * 2);
    } else if (shape.type === 'triangle') {
      ctx.moveTo(x, parallaxY - shape.size / 2);
      ctx.lineTo(x - shape.size / 2, parallaxY + shape.size / 2);
      ctx.lineTo(x + shape.size / 2, parallaxY + shape.size / 2);
      ctx.closePath();
    } else if (shape.type === 'square') {
      ctx.rect(x - shape.size / 2, parallaxY - shape.size / 2, shape.size, shape.size);
    }

    ctx.stroke();
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

// Close mobile menu on link click
document.querySelectorAll('.menu a').forEach(link => {
  link.addEventListener('click', () => {
    document.querySelector('.menu').classList.remove('active');
  });
});

// Footer Year
const yearSpan = document.getElementById('year');
if (yearSpan) {
  yearSpan.textContent = new Date().getFullYear();
}
