const canvas = document.getElementById('sig-pad');
const ctx = canvas.getContext('2d');
let drawing = false;

// Image Preview
function previewImg(e, id) {
    document.getElementById(id).src = URL.createObjectURL(e.target.files[0]);
}

// Signature Position Logic
function getPos(e) {
    const rect = canvas.getBoundingClientRect();
    const x = (e.touches ? e.touches[0].clientX : e.clientX) - rect.left;
    const y = (e.touches ? e.touches[0].clientY : e.clientY) - rect.top;
    return { x, y };
}

// Draw Logic
function start(e) { drawing = true; ctx.beginPath(); ctx.moveTo(getPos(e).x, getPos(e).y); if(e.touches) e.preventDefault(); }
function move(e) { if(!drawing) return; const p = getPos(e); ctx.lineWidth = 2; ctx.lineTo(p.x, p.y); ctx.stroke(); if(e.touches) e.preventDefault(); }
function stop() { drawing = false; }

canvas.addEventListener('mousedown', start);
canvas.addEventListener('mousemove', move);
window.addEventListener('mouseup', stop);
canvas.addEventListener('touchstart', start);
canvas.addEventListener('touchmove', move);
canvas.addEventListener('touchend', stop);

function clearSig() { ctx.clearRect(0, 0, canvas.width, canvas.height); }

// Update Card Content
function updateCard() {
    document.getElementById('outName').innerText = document.getElementById('inName').value;
    document.getElementById('outEng').innerText = document.getElementById('inEng').value;
    document.getElementById('outFather').innerText = document.getElementById('inFather').value;
    document.getElementById('outMother').innerText = document.getElementById('inMother').value;
    document.getElementById('outDOB').innerText = document.getElementById('inDOB').value;
    document.getElementById('outID').innerText = document.getElementById('inID').value;
    document.getElementById('cardSig').src = canvas.toDataURL();
}

// Download functionality
function download() {
    html2canvas(document.getElementById("nidCard"), { scale: 3, useCORS: true }).then(cvs => {
        const link = document.createElement("a");
        link.download = "NID_Card_Masum_Tech.png";
        link.href = cvs.toDataURL("image/png");
        link.click();
    });
}
