const canvas = document.getElementById('lorentzCanvas');
const ctx = canvas.getContext('2d');
const rangeSlider = document.getElementById('rangeSlider');
const rangeValue = document.getElementById('rangeValue');
const resetButton = document.getElementById('resetButton');

let sigma = 10, rho = 28, beta = 8/3;
let x = 0.1, y = 0, z = 0;

function draw() {
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    ctx.beginPath();
    ctx.arc(300 + x * 5, 200 + z * 5, 2, 0, 2 * Math.PI);
    ctx.fill();
}

function update() {
    const dt = 0.01;
    let dx = sigma * (y - x);
    let dy = x * (rho - z) - y;
    let dz = x * y - beta * z;
    
    x += dx * dt;
    y += dy * dt;
    z += dz * dt;

    draw();
}

function reset() {
    x = 0.1; y = 0; z = 0;
    rangeSlider.value = 10;
    rangeValue.textContent = 10;
}

rangeSlider.addEventListener('input', (e) => {
    rangeValue.textContent = e.target.value;
    rho = parseFloat(e.target.value);
});

resetButton.addEventListener('click', reset);

setInterval(update, 20);
