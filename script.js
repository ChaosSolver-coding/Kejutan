const canvas = document.getElementById("wheel");
const ctx = canvas.getContext("2d");
const spinBtn = document.getElementById("spin");
const result = document.getElementById("result");
const siLapar = document.getElementById("siLapar");
const listPemenang = document.getElementById("listPemenang");

const hadiah = [
  "1pcs Dimsum Gratis",
  "Es Teh Gratis",
  "Diskon Rp 2000",
  "Komik Si Lapar",
  "Hadiah Misteri",
  "Coba Lagi"
];

const colors = ["#FFDAB9", "#FFB347", "#FFFF99", "#ADD8E6", "#D8BFD8", "#FFB6C1"];

let anglePerSlice = (2 * Math.PI) / hadiah.length;
let isSpinning = false;

// Gambar awal roda
function drawWheel() {
  for (let i = 0; i < hadiah.length; i++) {
    ctx.beginPath();
    ctx.moveTo(200, 200);
    ctx.arc(200, 200, 200, i * anglePerSlice, (i + 1) * anglePerSlice);
    ctx.fillStyle = colors[i];
    ctx.fill();
    ctx.save();
    ctx.translate(200, 200);
    ctx.rotate(i * anglePerSlice + anglePerSlice / 2);
    ctx.fillStyle = "#000";
    ctx.font = "16px sans-serif";
    ctx.fillText(hadiah[i], 90, 0);
    ctx.restore();
  }
}

drawWheel();

function getUserData() {
  const nama = document.getElementById("nama").value.trim();
  const hp = document.getElementById("hp").value.trim();
  return { nama, hp };
}

function sudahPernahMain() {
  return localStorage.getItem("sudahSpin") === "true";
}

function simpanKeLocalStorage(nama, hp) {
  localStorage.setItem("sudahSpin", "true");
  localStorage.setItem("nama", nama);
  localStorage.setItem("hp", hp);
}

function kirimKeWhatsApp(nama, hp, hadiah) {
  const noWa = "6281234567890"; // Ganti dengan nomor admin
  const pesan = `Halo! Saya ${nama} (${hp}) memenangkan: ${hadiah}`;
  window.open(`https://wa.me/${noWa}?text=${encodeURIComponent(pesan)}`, "_blank");
}

function kirimKeGoogleSheet(nama, hp, hadiah) {
  fetch("https://script.google.com/macros/s/YOUR_SCRIPT_ID/exec", {
    method: "POST",
    body: JSON.stringify({ nama, hp, hadiah }),
    headers: { "Content-Type": "application/json" }
  });
}

function tampilkanPemenang(nama, hadiah) {
  const li = document.createElement("li");
  li.textContent = `${nama} – ${hadiah}`;
  listPemenang.appendChild(li);
}

spinBtn.addEventListener("click", () => {
  if (isSpinning) return;

  const { nama, hp } = getUserData();
  if (!nama || !hp) return alert("Isi nama dan nomor HP terlebih dahulu.");
  if (sudahPernahMain()) return alert("Kamu sudah pernah spin hari ini.");

  isSpinning = true;
  let spinAngle = Math.random() * 360 + 360 * 5;
  let finalAngle = spinAngle % 360;
  let hadiahIndex = hadiah.length - Math.floor(finalAngle / (360 / hadiah.length)) - 1;

  // Animasi roda dan si lapar
  let currentRotation = 0;
  const interval = setInterval(() => {
    currentRotation += 10;
    canvas.style.transform = `rotate(${currentRotation}deg)`;
    siLapar.style.transform = `scale(${1 + Math.sin(currentRotation / 10) * 0.05})`;
    if (currentRotation >= spinAngle) {
      clearInterval(interval);
      const hadiahDidapat = hadiah[hadiahIndex];
      result.textContent = `🎉 Selamat! Kamu mendapatkan: ${hadiahDidapat}`;
      simpanKeLocalStorage(nama, hp);
      tampilkanPemenang(nama, hadiahDidapat);
      kirimKeWhatsApp(nama, hp, hadiahDidapat);
      kirimKeGoogleSheet(nama, hp, hadiahDidapat);
      isSpinning = false;
    }
  }, 20);
});
