# ⚡ البدء السريع - OdooHub

## 🚀 ابدأ في دقائق

### الخطوة 1: تثبيت الحزم

```bash
cd "h:\My Drive\AI_Workshop\Claude Project\website02"
npm install
```

**إذا واجهت مشاكل:** اقرأ [INSTALLATION_ISSUES.md](./INSTALLATION_ISSUES.md)

### الخطوة 2: إعداد المتغيرات

انسخ ملف المثال:
```bash
cp .env.local.example .env.local
```

### الخطوة 3: أضف بيانات Google OAuth

1. اذهب إلى: https://console.cloud.google.com
2. أنشئ مشروع جديد
3. ابحث عن "OAuth 2.0 Consent Screen"
4. أنشئ "Create Credentials" → "OAuth client ID" → "Web application"
5. أضف `http://localhost:3000/api/auth/callback/google` إلى Redirect URIs
6. انسخ Client ID و Secret

**في `.env.local`:**
```env
GOOGLE_CLIENT_ID=your_client_id_here
GOOGLE_CLIENT_SECRET=your_client_secret_here
NEXTAUTH_SECRET=your_secret_key_here
NEXTAUTH_URL=http://localhost:3000
```

### الخطوة 4: أضف بيانات Odoo

**في `.env.local`:**
```env
ODOO_URL=https://your-odoo-instance.com
ODOO_DATABASE=your_database_name
ODOO_USERNAME=your_odoo_user@example.com
ODOO_PASSWORD=your_odoo_password
```

### الخطوة 5: شغّل التطبيق

```bash
npm run dev
```

افتح: **http://localhost:3000**

## 📋 الخطوات التالية

- [ ] اختبر تسجيل الدخول مع Google
- [ ] اختبر إضافة مهمة جديدة
- [ ] تحقق من المهام في Odoo
- [ ] اختبر التحديث والحذف
- [ ] اختبر Dark Mode (أسفل اليسار)

## 🎯 الميزات المتاحة

| الميزة | الحالة | الملف |
|--------|-------|------|
| Google OAuth | ✅ جاهز | `app/api/auth/[...nextauth]/route.ts` |
| Odoo Integration | ✅ جاهز | `app/lib/odoo.ts` |
| Task Management | ✅ جاهز | `app/components/OdooTodoList.tsx` |
| Counter | ✅ جاهز | `app/components/Counter.tsx` |
| Dark Mode | ✅ جاهز | Tailwind CSS |
| Responsive | ✅ جاهز | CSS Grid |

## 🐛 استكشاف الأخطاء

### المشكلة: "Missing Packages"
```bash
npm install --no-save
```

### المشكلة: "OAuth Error"
- تحقق من `GOOGLE_CLIENT_ID` و `GOOGLE_CLIENT_SECRET`
- تأكد من إضافة Redirect URI

### المشكلة: "Odoo Connection Failed"
- تحقق من `ODOO_URL` و بيانات المستخدم
- تأكد من الاتصال بالإنترنت

## 📚 الملفات المهمة

| الملف | الوصف |
|------|--------|
| `SETUP.md` | دليل الإعداد الشامل |
| `PROJECT_STRUCTURE.md` | شرح بنية المشروع |
| `INSTALLATION_ISSUES.md` | حل مشاكل التثبيت |
| `.env.local.example` | نموذج المتغيرات |

## 🌐 الوصول إلى التطبيق

```
http://localhost:3000  → الصفحة الرئيسية
http://localhost:3000/login  → تسجيل الدخول
```

## 📱 اختبر على جهاز آخر

بعد التشغيل على localhost، يمكنك الوصول من جهاز آخر على الشبكة:

```bash
# أوجد IP الخاص بك
ipconfig

# استخدم http://YOUR_IP:3000 من جهاز آخر
```

## 🎉 نجاح!

إذا رأيت:
- ✅ صفحة تسجيل دخول بزر Google
- ✅ إمكانية إضافة مهام
- ✅ مزامنة مع Odoo

**تهانينا! التطبيق يعمل بشكل صحيح!** 🚀

## 💡 نصائح

- استخدم Developer Tools (F12) لرؤية الـ console
- افتح Network tab لمراقبة الطلبات
- جرب Dark Mode بالضغط على الزر في الأسفل

## 📞 المساعدة

إذا واجهت مشاكل:
1. اقرأ [INSTALLATION_ISSUES.md](./INSTALLATION_ISSUES.md)
2. تحقق من [PROJECT_STRUCTURE.md](./PROJECT_STRUCTURE.md)
3. راجع console في DevTools

---

**Happy Coding! 🎉**
