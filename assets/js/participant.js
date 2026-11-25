const questions=[
 "ฉันวางแผนสิ่งที่ต้องทำในแต่ละวัน",
 "ฉันจัดลำดับความสำคัญของงานได้",
 "ฉันทำงานหรือการบ้านเสร็จตามเวลาที่กำหนด",
 "ฉันแบ่งเวลาเรียนและเวลาพักผ่อนได้เหมาะสม",
 "ฉันควบคุมเวลาใช้โทรศัพท์หรือเล่นเกมได้",
 "ฉันปรับแผนเมื่อมีงานเร่งด่วนได้"
];
const scale=["ไม่เคย","นาน ๆ ครั้ง","บางครั้ง","บ่อยครั้ง","เป็นประจำ"];
const likert=document.getElementById("likertQuestions");
questions.forEach((q,i)=>{const card=document.createElement("div");card.className="question-card";card.innerHTML=`<div class="question-title">${i+1}. ${q}</div><div class="likert">${scale.map((s,n)=>`<label><input type="radio" name="q${i}" value="${n+1}" required>${s}</label>`).join("")}</div>`;likert.appendChild(card)});
const allocationItems=[["sleep","นอนหลับ",8],["study","เรียน / ทำการบ้าน",7],["phone","โทรศัพท์ / โซเชียล",2],["game","เล่นเกม",1],["chores","งานบ้าน / ภาระส่วนตัว",2],["rest","พักผ่อน / อื่น ๆ",4]];
const alloc=document.getElementById("allocationControls");
allocationItems.forEach(([key,label,val])=>{const row=document.createElement("div");row.className="allocation-row";row.innerHTML=`<div><strong>${label}</strong><small>ชั่วโมงต่อวัน</small></div><input type="number" min="0" max="24" step="0.5" value="${val}" data-allocation="${key}" aria-label="${label} ชั่วโมง">`;alloc.appendChild(row)});
const inputs=[...document.querySelectorAll("[data-allocation]")];
function total(){return inputs.reduce((s,x)=>s+(Number(x.value)||0),0)}
function updateTotal(){const t=total();document.getElementById("hoursTotal").textContent=t.toFixed(1).replace(".0","");document.getElementById("allocationNotice").textContent=Math.abs(t-24)<0.001?"จัดสรรครบ 24 ชั่วโมงแล้ว":"เวลารวมต้องเท่ากับ 24 ชั่วโมง (ขณะนี้ "+t.toFixed(1)+" ชั่วโมง)";document.getElementById("allocationNotice").style.background=Math.abs(t-24)<0.001?"#e8faf2":"#f0f4ff"}
inputs.forEach(x=>x.addEventListener("input",updateTotal));updateTotal();
let step=0;const steps=[...document.querySelectorAll(".survey-step")],back=document.getElementById("backBtn"),next=document.getElementById("nextBtn"),submit=document.getElementById("submitBtn"),err=document.getElementById("errorText");
function showStep(n){step=n;steps.forEach((s,i)=>s.classList.toggle("active",i===n));back.hidden=n===0;next.hidden=n===2;submit.hidden=n!==2;document.getElementById("stepLabel").textContent=`ส่วนที่ ${n+1} จาก 3`;document.getElementById("progressBar").style.width=((n+1)/3*100)+"%";err.textContent="";window.scrollTo({top:0,behavior:"smooth"})}
function validateCurrent(){const current=steps[step];for(const el of current.querySelectorAll("input[required],select[required]")){if(el.type==="radio"){if(!current.querySelector(`input[name="${el.name}"]:checked`)){el.focus();return false}}else if(!el.checkValidity()){el.reportValidity();return false}}return true}
next.addEventListener("click",()=>{if(validateCurrent())showStep(step+1)});back.addEventListener("click",()=>showStep(step-1));
document.getElementById("surveyForm").addEventListener("submit",async e=>{e.preventDefault();if(!validateCurrent())return;if(Math.abs(total()-24)>0.001){err.textContent="กรุณาจัดสรรเวลาให้รวมกันเท่ากับ 24 ชั่วโมง";return}
const payload={grade:document.getElementById("grade").value,main_activity:document.getElementById("mainActivity").value,sleep_hours:Number(document.getElementById("sleepHours").value),study_hours:Number(document.getElementById("studyHours").value),phone_hours:Number(document.getElementById("phoneHours").value),game_hours:Number(document.getElementById("gameHours").value),likert:questions.map((q,i)=>({question:q,score:Number(document.querySelector(`input[name="q${i}"]:checked`).value)})),obstacle:document.getElementById("obstacle").value,strategy:document.getElementById("strategy").value.trim(),allocation:Object.fromEntries(inputs.map(x=>[x.dataset.allocation,Number(x.value)])),consent:true};
const client=window.getSupabase();if(!client){err.textContent="ระบบยังไม่ได้ตั้งค่า Supabase กรุณาติดต่อผู้ดูแลโครงการ";return}
submit.disabled=true;submit.textContent="กำลังส่ง...";
try{const {data,error}=await client.from("responses").insert({payload}).select("id").single();if(error)throw error;sessionStorage.setItem("24hours_last_result",JSON.stringify(payload));location.href="result.html"}catch(ex){console.error(ex);err.textContent="ส่งข้อมูลไม่สำเร็จ กรุณาตรวจสอบอินเทอร์เน็ตแล้วลองอีกครั้ง";submit.disabled=false;submit.innerHTML="ส่งคำตอบ ✓"}
});
