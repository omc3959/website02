# OdooHub - Setup Guide

تطبيق ويب تفاعلي متصل بـ Odoo مع مصادقة Google OAuth

## المتطلبات

- Node.js 18+
- حساب Odoo (نسخة cloud أو self-hosted)
- حساب Google Cloud Console

## خطوات الإعداد

### 1️⃣ إعداد متغيرات البيئة

```bash
# انسخ ملف المثال
cp .env.local.example .env.local
```

### 2️⃣ إعداد Google OAuth

1. اذهب إلى [Google Cloud Console](https://console.cloud.google.com)
2. أنشئ مشروع جديد
3. فعّل OAuth 2.0 Consent Screen
4. أنشئ OAuth 2.0 Credentials (نوع: Web application)
5. أضف `http://localhost:3000` و `http://localhost:3000/api/auth/callback/google` إلى Authorized redirect URIs
6. انسخ Client ID و Client Secret إلى `.env.local`:

```env
GOOGLE_CLIENT_ID=your_client_id
GOOGLE_CLIENT_SECRET=your_client_secret
NEXTAUTH_SECRET=your-secret-key-here (يمكنك توليدها بـ: openssl rand -hex 32)
```

### 3️⃣ إعداد Odoo

1. احصل على معلومات اتصالك بـ Odoo:
   - **ODOO_URL**: رابط موقع Odoo الخاص بك (مثل: https://odoo.example.com)
   - **ODOO_DATABASE**: اسم قاعدة البيانات
   - **ODOO_USERNAME**: اسم المستخدم
   - **ODOO_PASSWORD**: كلمة المرور

2. أضفها إلى `.env.local`:

```env
ODOO_URL=https://your-odoo-instance.com
ODOO_DATABASE=your_database_name
ODOO_USERNAME=your_odoo_user@example.com
ODOO_PASSWORD=your_odoo_password
```

### 4️⃣ تثبيت المكتبات

```bash
npm install
```

### 5️⃣ تشغيل التطبيق

```bash
npm run dev
```

افتح المتصفح على `http://localhost:3000`

## الميزات

✅ **Google OAuth Authentication** - تسجيل دخول آمن  
✅ **Odoo Integration** - مزامنة المهام مع Odoo  
✅ **Real-time Updates** - تحديثات فورية  
✅ **Responsive Design** - يعمل على جميع الأجهزة  
✅ **Dark Mode** - دعم المظهر الليلي  

## البنية المعمارية

```
app/
├── api/
│   ├── auth/[...nextauth]/ - مصادقة NextAuth
│   └── tasks/ - API endpoints للمهام
├── components/
│   ├── Header.tsx - الرأس مع معلومات المستخدم
│   ├── OdooTodoList.tsx - قائمة المهام المتصلة بـ Odoo
│   ├── Counter.tsx - عداد تفاعلي
│   └── SessionProvider.tsx - موفر الجلسة
├── lib/
│   └── odoo.ts - عميل Odoo للاتصال بـ API
└── page.tsx - الصفحة الرئيسية
```

## API Endpoints

### الحصول على المهام
```
GET /api/tasks
Authorization: Required
```

### إنشاء مهمة جديدة
```
POST /api/tasks
Content-Type: application/json

{
  "name": "Task name",
  "description": "Optional description"
}
```

### تحديث مهمة
```
PUT /api/tasks/[id]
Content-Type: application/json

{
  "state": "done" | "todo"
}
```

### حذف مهمة
```
DELETE /api/tasks/[id]
```

## Troubleshooting

### "Failed to connect to Odoo"
- تأكد من أن Odoo URL صحيح
- تحقق من بيانات المستخدم
- تأكد من أن قاعدة البيانات صحيحة

### "Google OAuth Error"
- تحقق من Client ID و Client Secret
- تأكد من إضافة Redirect URI بشكل صحيح

### "Tasks not syncing"
- تحقق من الـ console للأخطاء
- تأكد من أن المستخدم مسجل الدخول
- تحقق من الاتصال بـ Odoo

## النشر على Vercel

```bash
# دفع إلى GitHub
git push origin main

# انسخ المتغيرات في Vercel:
vercel env pull

# انشر
vercel deploy --prod
```

## الترخيص

MIT License
