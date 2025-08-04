const wheelCanvas = document.getElementById("wheelCanvas");
const ctx = wheelCanvas.getContext("2d");
const spinSound = document.getElementById("spinSound");
const bgMusic = document.getElementById("bgMusic");
const logoPointer = document.getElementById("logoPointer");

const segments = ["1 Pcs Dimsum", "Diskon 2 Ribu", "Es Teh Gratis"];
const colors = ["#FFCE63", "#FFF463", "#FF7474"];
let angle = 0;
let spinning = false;

// Gambar roda
function drawWheel() {
  const radius = wheelCanvas.width / 2;
  const segmentAngle = (2 * Math.PI) / segments.length;

  segments.forEach((label, i) => {
    const start = i * segmentAngle;
    const end = start + segmentAngle;

    ctx.beginPath();
    ctx.moveTo(radius, radius);
    ctx.arc(radius, radius, radius, start, end);
    ctx.fillStyle = colors[i % colors.length];
    ctx.fill();
    ctx.stroke();

    // Teks
    ctx.save();
    ctx.translate(radius, radius);
    ctx.rotate(start + segmentAngle / 2);
    ctx.textAlign = "right";
    ctx.fillStyle = "#000";
    ctx.font = "bold 14px Arial";
    ctx.fillText(label, radius - 10, 5);
    ctx.restore();
  });
}
drawWheel();

// Spin
function spinWheel(name, phone) {
  if (spinning) return;

  spinning = true;
  logoPointer.style.animationPlayState = "running";
  spinSound.currentTime = 0;
  spinSound.play();

  const randomAngle = Math.floor(3600 + Math.random() * 360);
  const duration = 4000;
  const start = performance.now();
  // Tampilkan popup alert
document.getElementById("popupAlert").classList.remove("hidden");

// Tutup popup ketika tombol OK ditekan
document.getElementById("closePopup").addEventListener("click", function () {
  document.getElementById("popupAlert").classList.add("hidden");
});

  function animateSpin(now) {
    const elapsed = now - start;
    const progress = Math.min(elapsed / duration, 1);
    angle = (randomAngle * easeOut(progress)) % 360;
    wheelCanvas.style.transform = `rotate(${angle}deg)`;

    if (progress < 1) {
      requestAnimationFrame(animateSpin);
    } else {
      spinning = false;
      logoPointer.style.animationPlayState = "paused";
      const selectedIndex = Math.floor(
        ((360 - (angle % 360)) % 360) / (360 / segments.length)
      );
      const result = segments[selectedIndex];
      addWinner(name, phone, result);
    }
  }
  requestAnimationFrame(animateSpin);
}

// Tambah pemenang
function addWinner(name, phone, prize) {
  const li = document.createElement("li");
  li.textContent = `${name} (${phone}) - ${prize}`;
  document.getElementById("winnerList").appendChild(li);
}

// Ease out animation
function easeOut(t) {
  return 1 - Math.pow(1 - t, 3);
}

// Form submit
document.getElementById("spinForm").addEventListener("submit", function (e) {
  e.preventDefault();
  const name = document.getElementById("nameInput").value;
  const phone = document.getElementById("phoneInput").value;

  // Unmute dan play musik saat interaksi pertama
  bgMusic.muted = false;
  bgMusic.play().catch(() => {});

  spinWheel(name, phone);
});

// Pause musik
document.getElementById("pauseMusic").addEventListener("click", function () {
  if (bgMusic.paused) {
    bgMusic.play();
    this.textContent = "Pause Musik";
  } else {
    bgMusic.pause();
    this.textContent = "Play Musik";
  }
});
