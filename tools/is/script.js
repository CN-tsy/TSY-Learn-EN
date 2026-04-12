let name_=document.querySelector('.name');
let isHaveInfo=false;

const ts=document.querySelector(".i1");
const te=document.querySelector(".i2");
const Cbtn=document.querySelector(".confirm");
const Ts=document.querySelector(".Ts_btn");
const subdoc=document.querySelector(".sub");
const startT=document.querySelector(".startT");
const endT=document.querySelector(".endT");
const toggleCheckbox = document.querySelector('.toggle');
const mode=document.querySelector('.mode');
const basicInfoSubBtn=document.getElementById("basicInfoSubBtn");
const examNameI=document.querySelector("#examNameI input");
const subjectI=document.querySelector("#examSubI input");
const Exam={
    name:"",
    subject:"",
    startTime:"",
    endTime:""
}

mode.style.display="none";
basicInfoSubBtn.addEventListener("click",()=> {
    Exam.name=examNameI.value.trim();
    Exam.subject=subjectI.value.trim();
    if(Exam.name===""||Exam.subject===""){
        alert("请完整填写考试信息");
        return;
    }
    name_.textContent=`${Exam.name}指令系统`;
    isHaveInfo=true;
    console.log(Exam);
})
let hour=0, min=0, hour2=0, min2=0;
let ifplaysound=false;

Cbtn.addEventListener("click", () => {
    Exam.startTime=ts.value;
    Exam.endTime=te.value;
    [hour, min] = Exam.startTime.split(':');
    [hour2, min2] = Exam.endTime.split(':');
    hour=Number(hour), min=Number(min), hour2=Number(hour2), min2=Number(min2);
    console.log(hour, min, hour2, min2);
    startT.textContent=`开考时间：${Exam.startTime}:00`;
    endT.textContent=`结束时间：${Exam.endTime}:00`;
    mode.style.display="block";
    console.log(Exam);
});

function updateTime() {
    const now = new Date(); 
    const Now_hours = String(now.getHours()).padStart(2, '0');   
    const Now_minutes = String(now.getMinutes()).padStart(2, '0'); 
    const Now_seconds = String(now.getSeconds()).padStart(2, '0'); 
    
    const timeString = `${Now_hours}:${Now_minutes}:${Now_seconds}`;
    document.querySelector(".T").textContent = timeString;
}
updateTime();
setInterval(updateTime, 1000);

function updateExamStatus() {
    if(!isHaveInfo){
        return;
    }
    const now = new Date();
    const Now_hours = now.getHours();
    const Now_minutes = now.getMinutes();

    if (Now_hours < hour || (Now_hours === hour && Now_minutes < min)) {//准备
        subdoc.textContent = `科目：${Exam.subject} 准备`;

        const remainingMinutes = (hour * 60 + min) - (Now_hours * 60 + Now_minutes);
        const hoursLeft = Math.floor(remainingMinutes / 60);
        const minutesLeft = remainingMinutes % 60;

        if (hoursLeft > 0) {
            mode.textContent = `距离开始还有 ${hoursLeft}小时${minutesLeft}分`;
        } else {
            mode.textContent = `距离开始还有 ${minutesLeft}分钟`;
        }
    } else if (//进行中
        (Now_hours > hour || (Now_hours === hour && Now_minutes >= min)) &&
        (Now_hours < hour2 || (Now_hours === hour2 && Now_minutes < min2))
    ) {
        subdoc.textContent = `科目：${Exam.subject} 进行中`;

        let remainingMinutes = (hour2 * 60 + min2) - (Now_hours * 60 + Now_minutes);
        let hoursLeft = Math.floor(remainingMinutes / 60);
        let minutesLeft = remainingMinutes % 60;

        if (hoursLeft > 0) {
            mode.textContent = `距离结束还有 ${hoursLeft}小时${minutesLeft}分`;
        } else {
            minutesLeft-=1;
            if (minutesLeft<=0){
                mode.textContent = `距离结束还有 少于1分钟`;
                return;
            }
            mode.textContent = `距离结束还有 ${minutesLeft}分钟`;
        }
    } else if (Now_hours >= hour2 && Now_minutes >= min2) {//结束
        subdoc.textContent = `科目：${Exam.subject} 结束`;
        mode.textContent = `请全体考生停笔，起立，待检测无误后方可离开考场`;
    }
    if (((Now_hours == hour && Now_minutes == min) || (Now_hours == hour2 && Now_minutes == min2)) && 
        (now.getSeconds()==0 || now.getSeconds()==1) && ifplaysound
    ) {//播放提示音
        playSound();
    }
}
updateExamStatus();
setInterval(updateExamStatus, 1000);

const audio = new Audio('bell.mp3');
function playSound() {
  audio.play().catch(error => {
    console.log('播放失败：', error); // 处理播放限制（如未用户交互）
  });
  console.log(`提示音:播放 [${new Date().getHours()}:${new Date().getMinutes()}]`);
}

console.log("提示音:"+ifplaysound);
toggleCheckbox.addEventListener('change', (event) => {
    if (event.target.checked) {
        ifplaysound=true;
        console.log("提示音:"+ifplaysound);
    } else {
        ifplaysound=false;
        console.log("提示音:"+ifplaysound);
    }
});


function forcecStartExam(){
    if(!confirm("使用这种方式开考不会对输入的信息进行任何格式检查，确认后考试立即开始")){
        console.log('已终止');
        return;
    }
    isHaveInfo=true;
    name_.textContent=`${Exam.name}指令系统`;
    [hour, min] = Exam.startTime.split(':');
    [hour2, min2] = Exam.endTime.split(':');
    hour=Number(hour), min=Number(min), hour2=Number(hour2), min2=Number(min2);
    console.log(hour, min, hour2, min2);
    startT.textContent=`开考时间：${Exam.startTime}:00`;
    endT.textContent=`结束时间：${Exam.endTime}:00`;
    mode.style.display="block";

}