const canvas = document.getElementById("wheel");
const ctx = canvas.getContext("2d");
const spinBtn = document.getElementById("spin");
const resultText = document.getElementById("result");

const hadiah = [
  "Diskon 10%",
  "Dimsum Gratis 1",
  "Minuman Gratis",
  "Free Saus",
  "Coba Lagi",
  "Voucher Rp5.000",
];

const slice = 360 / hadiah.length;
let angle = 0;
let isSpinning = false;

function drawWheel() {
  for (let i = 0; i < hadiah.length; i++) {
    let startAngle = (i * slice) * Math.PI / 180;
    let endAngle = ((i + 1) * slice) * Math.PI / 180;

    ctx.beginPath();
    ctx.moveTo(200, 200);
    ctx.arc(200, 200, 200, startAngle, endAngle);
    ctx.fillStyle = i % 2 === 0 ? "#FFD54F" : "#FFB74D";
    ctx.fill();
    ctx.stroke();

    // Teks hadiah
    ctx.save();
    ctx.translate(200, 200);
    ctx.rotate((startAngle + endAngle) / 2);
    ctx.textAlign = "right";
    ctx.fillStyle = "#333";
    ctx.font = "16px sans-serif";
    ctx.fillText(hadiah[i], 180, 10);
    ctx.restore();
  }
}
drawWheel();

spinBtn.onclick = () => {
  if (isSpinning) return;
  isSpinning = true;

  let randomAngle = Math.floor(Math.random() * 360) + 720; // dua putaran
  let current = 0;
  const interval = setInterval(() => {
    current += 10;
    angle += 10;
    canvas.style.transform = `rotate(${angle}deg)`;

    if (current >= randomAngle) {
      clearInterval(interval);
      isSpinning = false;

      let finalAngle = angle % 360;
      let index = Math.floor(hadiah.length - (finalAngle / slice)) % hadiah.length;
      resultText.innerText = `Kamu dapat: ${hadiah[index]}`;
    }
  }, 20);
};
