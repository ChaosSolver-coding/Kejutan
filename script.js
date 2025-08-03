const wheel = document.getElementById("wheel");
const spinBtn = document.getElementById("spin");
const siLapar = document.getElementById("siLapar");
const resultEl = document.getElementById("result");
const listPemenang = document.getElementById("listPemenang");
const namaInput = document.getElementById("nama");
const hpInput = document.getElementById("hp");

const segments = [
  "Dimsum Gratis",
  "Minum Gratis",
  "Voucher 10%",
  "Voucher 20%",
  "Hadiah Misteri",
  "Coba Lagi"
];

const colors = ["#ffccbc", "#ffe0b2", "#dcedc8", "#b2dfdb", "#d1c4e9", "#f8bbd0"];
const segAngle = 360 / segments.length;

// Cek spin sebelumnya
if (localStorage.getItem("sudahSpin")) {
  spinBtn.disabled = true;
  spinBtn.textContent = "SUDAH SPIN";
}

// Gambar roda
function drawWheel() {
  const ctx = wheel.getContext("2d");
  for (let i = 0; i < segments.length; i++) {
    const angle = i * segAngle * Math.PI / 180;
    ctx.beginPath();
    ctx.moveTo(200, 200);
    ctx.arc(200, 200, 200, angle, angle + segAngle * Math.PI / 180);
    ctx.fillStyle = colors[i];
    ctx.fill();
    ctx.save();
    ctx.translate(200, 200);
    ctx.rotate(angle + segAngle * Math.PI / 360);
    ctx.textAlign = "right";
    ctx.fillStyle = "#000";
    ctx.font = "bold 16px sans-serif";
    ctx.fillText(segments[i], 180, 10);
    ctx.restore();
  }
}
drawWheel();

// Animasi Si Lapar
function animateSiLapar() {
  siLapar.style.transform = "scale(1.5)";
  setTimeout(() => {
    siLapar.style.transform = "scale(1)";
  }, 500);
}

// Proses Spin
spinBtn.addEventListener("click", () => {
  const nama = namaInput.value.trim();
  const hp = hpInput.value.trim();

  if (!nama || !hp) {
    alert("Isi nama dan nomor HP dulu ya!");
    return;
  }

  const selected = Math.floor(Math.random() * segments.length);
  const stopAngle = 360 * 5 + (360 - selected * segAngle - segAngle / 2);

  wheel.style.transition = "transform 4s ease-out";
  wheel.style.transform = `rotate(${stopAngle}deg)`;

  animateSiLapar();

  setTimeout(() => {
    const hadiah = segments[selected];
    resultEl.textContent = `🎁 Selamat ${nama}, kamu mendapatkan: ${hadiah}!`;

    // Simpan ke localStorage
    localStorage.setItem("sudahSpin", "true");
    spinBtn.disabled = true;
    spinBtn.textContent = "SUDAH SPIN";

    const pemenang = `${nama} (${hp}) - ${hadiah}`;
    simpanPemenang(pemenang);
    tampilkanPemenang();
  }, 4500);
});

// Simpan data pemenang ke localStorage
function simpanPemenang(data) {
  let list = JSON.parse(localStorage.getItem("listPemenang")) || [];
  list.push(data);
  localStorage.setItem("listPemenang", JSON.stringify(list));
}

function tampilkanPemenang() {
  listPemenang.innerHTML = "";
  const list = JSON.parse(localStorage.getItem("listPemenang")) || [];
  list.forEach(p => {
    const li = document.createElement("li");
    li.textContent = p;
    listPemenang.appendChild(li);
  });
}

tampilkanPemenang(); // Panggil saat awal halaman dibuka
