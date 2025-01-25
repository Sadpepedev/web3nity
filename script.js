/************************************************************************
 * FREE-FLOATING, OUTLINE-ONLY VAPORWAVE SHAPES
 ************************************************************************/
const canvas = document.getElementById('bgCanvas');
const ctx = canvas.getContext('2d');

let width, height;

// Array to store shape objects
let shapes = [];
const numShapes = 12; // Adjust for more/less shapes

function resizeCanvas() {
  width = window.innerWidth;
  height = window.innerHeight;
  canvas.width = width;
  canvas.height = height;
}

function debounce(func, wait) {
  let timeout;
  return function(...args) {
    clearTimeout(timeout);
      timeout = setTimeout(() => func.apply(this, args), wait);
    };
  }
  const shapeTypes = ['circle', 'triangle', 'square'];

  for (let i = 0; i < numShapes; i++) {
    const type = shapeTypes[Math.floor(Math.random() * shapeTypes.length)];

    if (shapes[i]) {
      // Update existing shape
      shapes[i].type = type;
      shapes[i].x = Math.random() * width;
      shapes[i].y = Math.random() * height;
      shapes[i].size = 40 + Math.random() * 30; // 40-70
      shapes[i].color = getRandomVaporwaveColor();
    const type = shapeTypes[Math.floor(Math.random() * shapeTypes.length)];

    shapes.push({
      type: type,
      x: Math.random() * width,
      y: Math.random() * height,
      size: 40 + Math.random() * 30, // 40-70
      color: getRandomVaporwaveColor(),
      vx: getRandomVelocity(), // random horizontal speed
          shapes[i].vx = getRandomVelocity(); // random horizontal speed
          shapes[i].vy = getRandomVelocity(); // random vertical speed
        } else {
          // Create new shape
          shapes.push({
            type: type,
            x: Math.random() * width,
            y: Math.random() * height,
            size: 40 + Math.random() * 30, // 40-70
            color: getRandomVaporwaveColor(),
            vx: getRandomVelocity(), // random horizontal speed
            vy: getRandomVelocity()  // random vertical speed
          });
        }
      }
    }
  }
      vy: -0.5 + Math.random()  // random vertical speed
  ;
  
function getRandomVaporwaveColor() {
  const colors = [
// Returns a random translucent vaporwave color
// Helper function to generate random velocity between -0.5 and 0.5
function getRandomVelocity() {
  return -0.5 + Math.random();
}

initShapes();
  const colors = [
  function initShapes() {
    for (let i = 0; i < numShapes; i++) {
      const type = shapeTypes[Math.floor(Math.random() * shapeTypes.length)];
      shapes.push({
        type: type,
        x: Math.random() * width,
        y: Math.random() * height,
        size: 40 + Math.random() * 30, // 40-70
        color: getRandomVaporwaveColor(),
        vx: getRandomVelocity(), // random horizontal speed
        vy: getRandomVelocity()  // random vertical speed
      });
    }
  }
  
  function animate() {
    ctx.lineWidth = 2;
    'rgba(1, 205, 254, 0.5)',    // cyan
    'rgba(5, 255, 161, 0.5)',    // neon green
    'rgba(185, 103, 255, 0.7)',  // purple
    'rgba(255, 154, 255, 0.5)'   // pastel pink
  ];
  return colors[Math.floor(Math.random() * colors.length)];
}
  ctx.lineWidth = 2;
  shapes.forEach(shape => {
    // Clear the previous shape position
    ctx.clearRect(shape.x - shape.size / 2 - 2, shape.y - shape.size / 2 - 2, shape.size + 4, shape.size + 4);

    // Update position
    shape.x += shape.vx;
    shape.y += shape.vy;

    // Wrap around edges
    if (shape.x < -50) shape.x = width + 50;
    if (shape.x > width + 50) shape.x = -50;
  requestAnimationFrame(animate);
}

initShapes();
resizeCanvas();
animate();

    if (shape.type === 'circle') {
      const radius = shape.size / 2;
      ctx.arc(shape.x, shape.y, radius, 0, Math.PI * 2);
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

    ctx.stroke();
  });

  requestAnimationFrame(animate);
}
animate();

/************************************************************************
 * NAVBAR & FOOTER SCRIPTS
 ************************************************************************/
function toggleMenu() {
  const menu = document.querySelector('.menu');
  menu.classList.toggle('active');
}

// Close the menu on link click (mobile)
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
