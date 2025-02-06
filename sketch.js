let x = 0.01, y = 0, z = 0;
let sigma = 10, rho = 28, beta = 8/3;
let points = [];
let rhoSlider;

function setup() {
  createCanvas(600, 400, WEBGL);
  colorMode(HSB);
  rhoSlider = createSlider(20, 40, 28, 0.1);
  rhoSlider.position(10, 10);
}

function draw() {
  background(0);
  rotateX(frameCount * 0.01);
  rotateY(frameCount * 0.01);
  
  rho = rhoSlider.value();

  let dt = 0.01;
  let dx = sigma * (y - x) * dt;
  let dy = (x * (rho - z) - y) * dt;
  let dz = (x * y - beta * z) * dt;

  x += dx;
  y += dy;
  z += dz;
  points.push(createVector(x, y, z));

  noFill();
  beginShape();
  for (let i = 0; i < points.length; i++) {
    stroke((i % 255), 255, 255);
    vertex(points[i].x * 5, points[i].y * 5, points[i].z * 5);
  }
  endShape();
}
