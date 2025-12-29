/* ===== BACKGROUND LOVE ===== */
const canvas = document.getElementById("loveCanvas");
const ctx = canvas.getContext("2d");
let hearts = [], w, h;

function resize() {
    w = canvas.width = innerWidth;
    h = canvas.height = innerHeight;
    hearts = [];
    const total = Math.floor((w * h) / 20000);
    for (let i = 0; i < total; i++) {
        hearts.push({
            x: Math.random() * w,
            y: Math.random() * h,
            size: 10 + Math.random() * 18,
            speed: 0.2 + Math.random() * 0.6,
            alpha: 0.15 + Math.random() * 0.35
        });
    }
}
resize();
addEventListener("resize", resize);

function animate() {
    ctx.clearRect(0,0,w,h);
    hearts.forEach(hd => {
        ctx.globalAlpha = hd.alpha;
        ctx.font = `${hd.size}px Arial`;
        ctx.fillText("❤️", hd.x, hd.y);
        hd.y -= hd.speed;
        if (hd.y < -20) {
            hd.y = h + 20;
            hd.x = Math.random() * w;
        }
    });
    requestAnimationFrame(animate);
}
animate();

/* ===== LOGIC ===== */
function normalizeNama(n) { return n.toLowerCase().replace(/\s+/g,""); }
function mirip(n,t) { return n.includes(t); }

function proses() {
    const n1 = document.getElementById("nama1").value.trim();
    const n2 = document.getElementById("nama2").value.trim();
    if (!n1 || !n2) {
        document.getElementById("hasil").innerHTML = "⚠️ Masukkan kedua nama!";
        return;
    }

    document.getElementById("loading").style.display = "flex";
    document.getElementById("btn").disabled = true;

    setTimeout(() => {
        cekKecocokan(n1,n2);
        document.getElementById("loading").style.display = "none";
        document.getElementById("btn").disabled = false;
    }, 2000);
}

function cekKecocokan(raw1, raw2) {
    const a = normalizeNama(raw1);
    const b = normalizeNama(raw2);

    const melda = mirip(a,"melda") || mirip(b,"melda");
    const hendery = mirip(a,"hendery") || mirip(b,"hendery");
    const naufal = mirip(a,"naufal") || mirip(b,"naufal");

    let hasil;

    if (melda && hendery) {
        hasil = `${raw1} ❤️ ${raw2}<br>💔 Hasil: 0%`;
    } else if (melda && naufal) {
        hasil = `${raw1} ❤️ ${raw2}<br>💖 Hasil: 99%`;
    } else {
        const options = [
            "Mungkin tidak 😅",
            "Tidak tahu 🤔",
            "Kayanya ngga deh 😬",
            "Coba lagi nanti 💭",
            "Hasil rahasia… 🔒"
        ];
        const random = options[Math.floor(Math.random() * options.length)];
        hasil = `${raw1} ❤️ ${raw2}<br>❓ Hasil: ${random}`;
    }

    document.getElementById("hasil").innerHTML = hasil;
}