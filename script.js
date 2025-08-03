const wheel = document.getElementById("wheel");
const ctx = wheel.getContext("2d");
const segments = [
  "Hadiah Misteri",
  "Coba Lagi",
  "1pcs Dimsum",
  "Es Teh Gratis",
  "Diskon 2 ribu",
  "Komik Si Lapar"
];
const colors = ["#e6ccff", "#ffb3b3", "#ffdead", "#ffb347", "#ffff99", "#add8e6"];
let angle = 0;
let isSpinning = false;
let spun = false;

// Gambar roda
function drawWheel() {
  const centerX = wheel.width / 2;
  const centerY = wheel.height / 2;
  const radius = wheel.width / 2;
  const arcSize = (2 * Math.PI) / segments.length;

  for (let i = 0; i < segments.length; i++) {
    const startAngle = i * arcSize;
    ctx.beginPath();
    ctx.moveTo(centerX, centerY);
    ctx.arc(centerX, centerY, radius, startAngle, startAngle + arcSize);
    ctx.fillStyle = colors[i];
    ctx.fill();
    ctx.save();
    ctx.translate(centerX, centerY);
    ctx.rotate(startAngle + arcSize / 2);
    ctx.textAlign = "right";
    ctx.fillStyle = "black";
    ctx.font = "16px Arial";
    ctx.fillText(segments[i], radius - 10, 10);
    ctx.restore();
  }
}

drawWheel();

// Spin
function spinWheel() {
  if (isSpinning || spun) return;
  isSpinning = true;
  spun = true;

  const randomSpin = Math.floor(Math.random() * 360) + 360 * 5;
  const finalAngle = randomSpin % 360;

  wheel.style.transition = "transform 4s ease-out";
  wheel.style.transform = `rotate(${randomSpin}deg)`;

  setTimeout(() => {
    isSpinning = false;
    const segmentAngle = 360 / segments.length;
    const selectedIndex = Math.floor(((360 - finalAngle + segmentAngle / 2) % 360) / segmentAngle);
    const selectedPrize = segments[selectedIndex];

    alert("Selamat! Kamu dapat: " + selectedPrize);

    const name = document.getElementById("name").value;
    const phone = document.getElementById("phone").value;
    document.getElementById("winnersList").innerHTML += `<li>${name} (${phone}): ${selectedPrize}</li>`;

    // (Opsional) kirim ke Google Sheets dan WhatsApp API di sini
  }, 4000);
}

document.getElementById("spinForm").addEventListener("submit", function (e) {
  e.preventDefault();
  spinWheel();
});
