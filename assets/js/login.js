const client=window.getSupabase();const form=document.getElementById("loginForm"),errorBox=document.getElementById("loginError");
form.addEventListener("submit",async e=>{e.preventDefault();if(!client){errorBox.textContent="ยังไม่ได้ตั้งค่า Supabase ใน assets/js/config.js";return}
const email=document.getElementById("email").value,password=document.getElementById("password").value;
const {data,error}=await client.auth.signInWithPassword({email,password});if(error){errorBox.textContent="อีเมลหรือรหัสผ่านไม่ถูกต้อง";return}
const {data:admin,error:adminError}=await client.from("admin_users").select("user_id").eq("user_id",data.user.id).maybeSingle();
if(adminError||!admin){await client.auth.signOut();errorBox.textContent="บัญชีนี้ไม่มีสิทธิ์เป็นผู้ดูแล";return}location.href="dashboard.html";
});
