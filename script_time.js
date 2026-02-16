const timedoc = document.querySelector('.time');
const utcDoc = document.querySelector('.UTC'); // 获取显示 UTC 时间的元素

function getT() {
    const now = new Date();
    const hours = String(now.getHours()).padStart(2, '0'); 
    const minutes = String(now.getMinutes()).padStart(2, '0'); 
    const seconds = String(now.getSeconds()).padStart(2, '0'); 

    timedoc.textContent = `${hours}:${minutes}:${seconds}`;

    // UTC 时间
    const utcHours = String(now.getUTCHours()).padStart(2, '0'); 
    const utcMinutes = String(now.getUTCMinutes()).padStart(2, '0'); 
    const utcSeconds = String(now.getUTCSeconds()).padStart(2, '0'); 
    utcDoc.textContent = `${utcHours}:${utcMinutes}:${utcSeconds}`;
}

// 每秒更新一次时间
setInterval(getT, 1000);

