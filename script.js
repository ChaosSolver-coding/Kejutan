javascript
document.getElementById('userForm').addEventListener('submit', function(e) {
  e.preventDefault();
  const name = document.getElementById('name').value;
  const phone = document.getElementById('phone').value;
localStorage.setItem('userName', name);
  localStorage.setItem('userPhone', phone);
  document.getElementById('userForm').style.display = 'none';
  document.getElementById('wheelSection').style.display = 'block';
});

const canvas = document.getElementById('wheelCanvas');
const ctx = canvas.getContext('2d');
const segments = [
  'Gratis 1 dimsum',
  'Diskon Rp2.000',
  'Ceritamu Jadi komik strip',
  'Hadiah misteri',
  'Gagal (coba lagi)',
  'Stiker lucu'
];
const colors = ['#FFB6C1', '#FFD700', '#ADFF2F', '#87CEFA', '#FFA07A', '#DA70D6'];
let startAngle = 0;
const arc = Math.PI / (segments.length / 2);

function drawWheel() {
  for (let i = 0; i < segments.length; i++) {
    const angle = startAngle + i * arc;
    ctx.fillStyle = colors[i];
    ctx.beginPath();
    ctx.moveTo(250, 250);
    ctx.arc(250, 250, 200, angle, angle + arc);
    ctx.fill();
    ctx.save();
    ctx.translate(250 + Math.cos(angle + arc / 2) * 150, 250 + Math.sin(angle + arc / 2) * 150);
    ctx.rotate(angle + arc / 2 + Math.PI / 2);
    ctx.fillStyle = '#000';
    ctx.fillText(segments[i], -ctx.measureText(segments[i]).width / 2, 0);
    ctx.restore();
  }
}

drawWheel();

document.getElementById('spinButton').addEventListener('click', function() {const randomIndex = Math.floor(Math.random() * segments.length);
  document.getElementById('result').textContent = `Selamat! Anda mendapatkan: ${segments[randomIndex]}`;
});