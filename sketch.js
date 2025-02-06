let x = 0.01, y = 0, z = 0;
let sigma = 10, rho = 28, beta = 8 / 3;
let points = [];
let rhoSlider, startButton, resetButton;
let isAnimating = false;

function setup() {
  createCanvas(600, 400, WEBGL);
  
  // Don't create controls here as they are already in the HTML
}

function startAnimation() {
  isAnimating = true;
  loop(); // Start the animation loop
}

function resetAnimation() {
  isAnimating = false;
  points = [];
  x = 0.01;
  y = 0;
  z = 0;
  loop(); // Reset and start animating from the beginning
}

function draw() {
  background(0);
  
  // Rotate the view for 3D effect
  rotateX(frameCount * 0.01);
  rotateY(frameCount * 0.01);
  
  // Update the value of rho from the slider
  rho = document.getElementById('rhoSlider').value;

  // Time step and Lorenz system calculation
  let dt = 0.01;
  let dx = sigma * (y - x) * dt;
  let dy = (x * (rho - z) - y) * dt;
  let dz = (x * y - beta * z) * dt;

  // Update the state variables
  x += dx;
  y += dy;
  z += dz;

  // Store the new points in the points array
  points.push(createVector(x, y, z));

  // Draw the Lorenz attractor as a 3D path
  noFill();
  beginShape();
  for (let i = 0; i < points.length; i++) {
    stroke((i % 255), 255, 255);
    vertex(points[i].x * 5, points[i].y * 5, points[i].z * 5);
  }
  endShape();

  // Stop the animation if it's not active
  if (!isAnimating) {
    noLoop(); // Pause the animation when it's stopped
  }
}

function setupControls() {
  // Set up Start and Reset buttons
  startButton = document.getElementById('startButton');
  startButton.addEventListener('click', startAnimation);
  
  resetButton = document.getElementById('resetButton');
  resetButton.addEventListener('click', resetAnimation);
}
