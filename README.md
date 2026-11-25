# 24 HOURS — Time Management Survey

เว็บไซต์แบบสำรวจเชิงโต้ตอบสำหรับโครงงานศึกษา ใช้ GitHub Pages + Supabase

## โครงสร้างโปรเจกต์

```text
24-hours-project/
├── index.html
├── participant/
│   ├── survey.html
│   └── result.html
├── admin/
│   ├── login.html
│   └── dashboard.html
├── assets/
│   ├── css/style.css
│   └── js/
│       ├── config.js
│       ├── participant.js
│       ├── result.js
│       ├── login.js
│       └── admin.js
└── supabase/schema.sql
```

## 1) สร้าง Supabase

1. ไปที่ https://supabase.com/ แล้วสร้าง Project
2. เปิด **SQL Editor** แล้ววางเนื้อหาไฟล์ `supabase/schema.sql` จากนั้นกด Run
3. ไปที่ **Project Settings → API** (หรือ API Keys) แล้วคัดลอก Project URL และ `anon` / publishable key
4. เปิด `assets/js/config.js` แล้วแทนค่า:
   - `ใส่_SUPABASE_PROJECT_URL`
   - `ใส่_SUPABASE_ANON_PUBLIC_KEY`
5. ห้ามใช้ `service_role` หรือ secret key ในไฟล์หน้าเว็บเด็ดขาด

## 2) สร้างบัญชี Admin ส่วนตัว

1. ใน Supabase ไปที่ **Authentication → Users → Add user** แล้วสร้างอีเมล/รหัสผ่านของผู้ดูแล
2. คัดลอก UUID ของบัญชีที่สร้าง
3. เปิด **SQL Editor** แล้วรันคำสั่งนี้ โดยแทน UUID จริง:

```sql
insert into public.admin_users (user_id)
values ('ใส่-UUID-ของ-Admin-ตรงนี้');
```

4. เปิด `admin/login.html` แล้วเข้าสู่ระบบด้วยบัญชีนั้น
5. อย่าเปิดให้สมัครสมาชิกทั่วไป และอย่าเพิ่ม UUID ของบุคคลอื่นใน `admin_users`

การป้องกันข้อมูลใช้ Supabase Row Level Security (RLS): ผู้เข้าชมทั่วไปส่งแบบสำรวจได้ แต่ไม่มีสิทธิ์อ่านข้อมูล ส่วนบัญชีที่อยู่ใน `admin_users` เท่านั้นที่อ่านข้อมูลได้

## 3) เผยแพร่ด้วย GitHub Pages

1. สร้าง Repository ใหม่ใน GitHub เช่น `24-hours`
2. อัปโหลดไฟล์และโฟลเดอร์ทั้งหมดในโปรเจกต์นี้ (ต้องให้ `index.html` อยู่ที่ root ของ repository)
3. ไปที่ **Settings → Pages**
4. ใน **Build and deployment** เลือก `Deploy from a branch`
5. เลือก branch `main` และ folder `/ (root)` แล้วกด Save
6. รอ GitHub แสดง URL เว็บไซต์ เช่น `https://ชื่อผู้ใช้.github.io/24-hours/`
7. เปิด URL ทดสอบหน้าแรก ส่งคำตอบทดสอบ แล้วตรวจดูใน Admin Dashboard

หน้า Admin:
`https://ชื่อผู้ใช้.github.io/ชื่อ-repository/admin/login.html`

## 4) ก่อนส่งลิงก์ให้ผู้ตอบ

- ทดสอบส่งข้อมูล 1–2 ครั้ง
- ตรวจสอบว่า Dashboard เห็นข้อมูล และ Export CSV เปิดได้
- ตรวจสอบว่าผู้ที่ไม่ได้ล็อกอินเปิด Dashboard แล้วถูกส่งไปหน้า Login
- ลบข้อมูลทดสอบออกจาก Supabase Table Editor ก่อนเริ่มเก็บข้อมูลจริง
- อย่าใส่ชื่อ เลขประจำตัว เบอร์โทร หรือข้อมูลที่ระบุตัวผู้ตอบได้ หากไม่จำเป็น

## ข้อควรรู้เกี่ยวกับข้อมูล

- คำถามชั่วโมงนอน/เรียน/โทรศัพท์/เกม คือข้อมูลที่ผู้ตอบรายงานเกี่ยวกับชีวิตประจำวัน
- การจัดสรรเวลา 24 ชั่วโมง คือกิจกรรมจำลองให้ผู้ตอบแบ่งเวลา ไม่ใช่หลักฐานว่าพวกเขาใช้เวลาจริงตามนั้น
- Dashboard แสดงข้อมูลได้สูงสุด 2,000 แถวต่อการโหลดหนึ่งครั้งในเวอร์ชันเริ่มต้น
- CSV ประกอบด้วยข้อมูลพื้นฐาน คะแนนรายข้อ และ JSON ของการจัดสรรเวลา สามารถเปิดด้วย Excel ได้
- ระบบนี้ไม่มีการเก็บชื่อผู้ตอบหรืออีเมลผู้ตอบ แต่ Supabase จะเก็บเวลาที่ส่งคำตอบ (`created_at`)
- แบบสอบถามและตัวเลือกใน `participant/survey.html` และ `participant.js` เป็นฉบับเริ่มต้น ควรให้ครูที่ปรึกษาตรวจและปรับให้ตรงกับวัตถุประสงค์/กรอบการวิจัยก่อนเปิดเก็บข้อมูลจริง

## การแก้ไขคำถาม

- แก้คำถามมาตราส่วน 5 ระดับใน `assets/js/participant.js` ที่ตัวแปร `questions`
- แก้ตัวเลือก/คำถามทั่วไปใน `participant/survey.html`
- หากเปลี่ยนชื่อ field ในข้อมูลที่บันทึก ต้องปรับ `assets/js/admin.js` ให้ตรงกันด้วย
