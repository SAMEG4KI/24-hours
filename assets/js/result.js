const raw=sessionStorage.getItem("24hours_last_result");const p=raw?JSON.parse(raw):null;const summary=document.getElementById("personalSummary"),bars=document.getElementById("allocationSummary");
if(!p){summary.innerHTML="<p>ไม่พบข้อมูลสรุปในอุปกรณ์นี้ หากส่งแบบสำรวจแล้ว ข้อมูลของคุณถูกบันทึกในระบบแล้ว</p>";bars.innerHTML="";}else{
const items=[["ระดับชั้น",p.grade],["กิจกรรมหลัก",p.main_activity],["เวลานอน",p.sleep_hours+" ชม."],["เรียน/ทำการบ้าน",p.study_hours+" ชม."],["โทรศัพท์",p.phone_hours+" ชม."],["เล่นเกม",p.game_hours+" ชม."]];
summary.innerHTML=items.map(([k,v])=>`<div class="summary-item"><span>${k}</span><strong>${v}</strong></div>`).join("");
const names={sleep:"นอนหลับ",study:"เรียน/ทำการบ้าน",phone:"โทรศัพท์/โซเชียล",game:"เล่นเกม",chores:"งานบ้าน/ภาระส่วนตัว",rest:"พักผ่อน/อื่น ๆ"};
bars.innerHTML=Object.entries(p.allocation).map(([k,v])=>`<div class="summary-bar"><span>${names[k]}</span><div class="bar-track"><div class="bar-fill" style="width:${v/24*100}%"></div></div><strong>${v} ชม.</strong></div>`).join("");
}
