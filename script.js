const spinBtn = document.getElementById("spinBtn");
const wheel = document.getElementById("wheel");
const ctx = wheel.getContext("2d");
const result = document.getElementById("result");
const winnersList = document.getElementById("winnersList");

const prizes = [
  "1pcs Dimsum Gratis",
  "Coba Lagi",
  "Hadiah Misteri",
  "Komik Story",
  "Diskon Rp 2000",
  "Es Teh Gratis"
];

const colors = ["#ffe0b2", "#ffcccb", "#d1c4e9", "#b2dfdb", "#f0f4c3", "#ffe0b2"];

function drawWheel() {
  const angle = (2 * Math.PI) / prizes.length;
  for (let i = 0; i < prizes.length; i++) {
    ctx.beginPath();
    ctx.moveTo(150, 150);
    ctx.fillStyle = colors[i];
    ctx.arc(150, 150, 150, i * angle, (i + 1) * angle);
    ctx.fill();
    ctx.save();
    ctx.translate(150, 150);
    ctx.rotate(i * angle + angle / 2);
    ctx.fillStyle = "#000";
    ctx.font = "14px sans-serif";
    ctx.textAlign = "right";
    ctx.fillText(prizes[i], 140, 5);
    ctx.restore();
  }
}

drawWheel();

let spinning = false;

spinBtn.addEventListener("click", () => {
  const nama = document.getElementById("nama").value.trim();
  const hp = document.getElementById("hp").value.trim();

  if (!nama || !hp) {
    alert("Isi nama dan nomor HP terlebih dahulu!");
    return;
  }

  if (localStorage.getItem("sudahSpin") === "true") {
    alert("Kamu sudah spin hari ini!");
    return;
  }

  localStorage.setItem("sudahSpin", "true");
  localStorage.setItem("nama", nama);
  localStorage.setItem("hp", hp);

  spinBtn.disabled = true;
  spinning = true;

  const spinAngle = Math.floor(3600 + Math.random() * 360);
  const duration = 5000;

  let start = null;
  function rotate(timestamp) {
    if (!start) start = timestamp;
    const progress = timestamp - start;
    const angle = (spinAngle * Math.min(progress / duration, 1)) % 360;
    wheel.style.transform = `rotate(${angle}deg)`;

    if (progress < duration) {
      requestAnimationFrame(rotate);
    } else {
      const degrees = (spinAngle % 360);
      const segmentAngle = 360 / prizes.length;
      const index = Math.floor(((360 - degrees + segmentAngle / 2) % 360) / segmentAngle);
      const hadiah = prizes[index];

      result.textContent = `Selamat! Kamu mendapatkan: ${hadiah}`;
      addWinner(nama, hp, hadiah);
      // Kirim ke Google Sheet + WhatsApp (opsional)
    }
  }

  requestAnimationFrame(rotate);
});

function addWinner(nama, hp, hadiah) {
  const li = document.createElement("li");
  li.textContent = `${nama} (${hp}) - ${hadiah}`;
  winnersList.prepend(li);
}
