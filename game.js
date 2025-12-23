cat <<EOF > game.js
const canvas = document.getElementById("gameCanvas");
const ctx = canvas.getContext("2d");
canvas.width = window.innerWidth;
canvas.height = window.innerHeight;

const WORLD_SIZE = 3000;
const player = { x: WORLD_SIZE/2, y: WORLD_SIZE/2, size: 30, speed: 6, color: "#00ffcc" };
const camera = { x: 0, y: 0 };
const keys = {};

window.onkeydown = (e) => keys[e.key] = true;
window.onkeyup = (e) => keys[e.key] = false;

function loop() {
    if(keys["ArrowLeft"] || keys["a"]) player.x -= player.speed;
    if(keys["ArrowRight"] || keys["d"]) player.x += player.speed;
    if(keys["ArrowUp"] || keys["w"]) player.y -= player.speed;
    if(keys["ArrowDown"] || keys["s"]) player.y += player.speed;

    // منع الخروج من حدود العالم
    player.x = Math.max(0, Math.min(WORLD_SIZE, player.x));
    player.y = Math.max(0, Math.min(WORLD_SIZE, player.y));

    camera.x = player.x - canvas.width/2;
    camera.y = player.y - canvas.height/2;

    ctx.clearRect(0, 0, canvas.width, canvas.height);
    ctx.save();
    ctx.translate(-camera.x, -camera.y);

    // رسم شبكة العالم (Grid)
    ctx.strokeStyle = "#333";
    for(let i=0; i<=WORLD_SIZE; i+=100) {
        ctx.beginPath(); ctx.moveTo(i,0); ctx.lineTo(i,WORLD_SIZE); ctx.stroke();
        ctx.beginPath(); ctx.moveTo(0,i); ctx.lineTo(WORLD_SIZE,i); ctx.stroke();
    }

    // رسم اللاعب (مربع متوهج)
    ctx.fillStyle = player.color;
    ctx.shadowBlur = 15; ctx.shadowColor = player.color;
    ctx.fillRect(player.x - player.size/2, player.y - player.size/2, player.size, player.size);
    ctx.restore();

    requestAnimationFrame(loop);
}
loop();
EOF
