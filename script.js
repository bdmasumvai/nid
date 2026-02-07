const canvas = document.getElementById('sig-pad');
const ctx = canvas.getContext('2d');
let writing = false;

function previewImg(e, id) {
    document.getElementById(id).src = URL.createObjectURL(e.target.files[0]);
}

function getPos(e) {
    const rect = canvas.getBoundingClientRect();
    const x = (e.touches ? e.touches[0].clientX : e.clientX) - rect.left;
    const y = (e.touches ? e.touches[0].clientY : e.clientY) - rect.top;
    return { x, y };
}

canvas.addEventListener('mousedown', (e) => { writing = true; ctx.beginPath(); ctx.moveTo(getPos(e).x, getPos(e).y); });
canvas.addEventListener('mousemove', (e) => { 
    if (!writing) return;
    const p = getPos(e);
    ctx.lineTo(p.x, p.y);
    ctx.lineWidth = 2; ctx.stroke();
});
window.addEventListener('mouseup', () => writing = false);

// টাচ স্ক্রিন সাপোর্ট
canvas.addEventListener('touchstart', (e) => { writing = true; ctx.beginPath(); ctx.moveTo(getPos(e).x, getPos(e).y); e.preventDefault(); });
canvas.addEventListener('touchmove', (e) => { if(writing) { const p = getPos(e); ctx.lineTo(p.x, p.y); ctx.stroke(); } e.preventDefault(); });

function clearSig() { ctx.clearRect(0, 0, canvas.width, canvas.height); }

function updateCard() {
    document.getElementById('outName').innerText = document.getElementById('inName').value;
    document.getElementById('outEng').innerText = document.getElementById('inEng').value;
    document.getElementById('outFather').innerText = document.getElementById('inFather').value;
    document.getElementById('outMother').innerText = document.getElementById('inMother').value;
    document.getElementById('outDOB').innerText = document.getElementById('inDOB').value;
    document.getElementById('outID').innerText = document.getElementById('inID').value;
    document.getElementById('cardSig').src = canvas.toDataURL();
}

function download() {
    html2canvas(document.getElementById("nidCard"), { scale: 3 }).then(cvs => {
        const link = document.createElement("a");
        link.download = "NID_Pro_Masum.png";
        link.href = cvs.toDataURL();
        link.click();
    });
}
