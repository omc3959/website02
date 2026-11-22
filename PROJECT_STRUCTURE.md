# بنية المشروع - OdooHub

## 📁 هيكل المشروع

```
website02/
├── app/
│   ├── api/
│   │   ├── auth/[...nextauth]/
│   │   │   └── route.ts              # المصادقة مع Google OAuth
│   │   └── tasks/
│   │       ├── route.ts              # API endpoints: GET, POST للمهام
│   │       └── [id]/route.ts         # API endpoints: PUT, DELETE للمهام
│   │
│   ├── components/
│   │   ├── Counter.tsx               # عداد تفاعلي
│   │   ├── Header.tsx                # الرأس مع معلومات المستخدم
│   │   ├── OdooTodoList.tsx          # قائمة المهام المتصلة بـ Odoo
│   │   ├── SessionProvider.tsx       # موفر جلسة NextAuth
│   │   └── TodoList.tsx              # قائمة مهام محلية (اختيارية)
│   │
│   ├── lib/
│   │   └── odoo.ts                   # عميل Odoo API
│   │
│   ├── layout.tsx                    # Layout الرئيسي
│   ├── page.tsx                      # الصفحة الرئيسية
│   ├── login/
│   │   └── page.tsx                  # صفحة تسجيل الدخول
│   ├── globals.css                   # الأنماط العامة
│   └── favicon.ico
│
├── public/
│   ├── next.svg
│   └── vercel.svg
│
├── middleware.ts                     # Middleware للمصادقة
├── next.config.ts                    # إعداد Next.js
├── tailwind.config.ts                # إعداد Tailwind CSS
├── tsconfig.json                     # إعداد TypeScript
├── eslint.config.mjs                 # إعداد ESLint
├── package.json                      # المكتبات والنصوص البرمجية
├── .env.local.example                # مثال على متغيرات البيئة
├── .gitignore
├── SETUP.md                          # دليل الإعداد
├── INSTALLATION_ISSUES.md            # حل مشاكل التثبيت
└── README.md
```

## 🔄 تدفق المشروع

```
المستخدم
   ↓
Login Page (Google OAuth)
   ↓
Middleware (التحقق من الجلسة)
   ↓
Home Page
   ├── Counter Component (محلي)
   └── OdooTodoList Component
        ├── GET /api/tasks → Odoo Client
        ├── POST /api/tasks → Odoo Client
        ├── PUT /api/tasks/[id] → Odoo Client
        └── DELETE /api/tasks/[id] → Odoo Client
```

## 📄 الملفات الرئيسية

### 1. المصادقة (`app/api/auth/[...nextauth]/route.ts`)
- إعداد NextAuth مع Google OAuth
- معالجة جلسات المستخدمين
- Callbacks للمصادقة والجلسات

### 2. عميل Odoo (`app/lib/odoo.ts`)
- المصادقة مع Odoo
- جلب المهام
- إنشاء/تحديث/حذف المهام
- معالجة الأخطاء

### 3. API Routes
- **GET /api/tasks** - جلب المهام الحالية
- **POST /api/tasks** - إنشاء مهمة جديدة
- **PUT /api/tasks/[id]** - تحديث مهمة
- **DELETE /api/tasks/[id]** - حذف مهمة

### 4. المكونات
- **Counter**: عداد تفاعلي باستخدام React hooks
- **Header**: شريط العنوان مع معلومات المستخدم
- **OdooTodoList**: قائمة المهام المتصلة بـ Odoo
- **SessionProvider**: موفر الجلسة (NextAuth)

## 🔐 نظام المصادقة

```
Google OAuth Flow:
1. المستخدم يضغط "Sign in with Google"
2. إعادة توجيه إلى Google
3. المستخدم يصرح للتطبيق
4. Google يعيد رمز المصادقة
5. NextAuth يتحقق ويُنشئ جلسة
6. المستخدم يُعاد توجيهه إلى الصفحة الرئيسية
```

## 🔗 اتصال Odoo

```
Frontend (OdooTodoList)
   ↓
API Route (/api/tasks)
   ↓
Odoo Client (app/lib/odoo.ts)
   ↓
Odoo JSON-RPC API
   ↓
Odoo Database
```

## 📊 نموذج البيانات

### Task (OdooTask)
```typescript
{
  id: number;              // معرّف فريد
  name: string;            // اسم المهمة
  description?: string;    // الوصف (اختياري)
  state?: string;          // الحالة (todo, done, etc)
  user_id?: number[];      // معرف المستخدم
  date_deadline?: string;  // تاريخ الاستحقاق
  priority?: string;       // الأولوية
}
```

## 🛠️ المكتبات المستخدمة

| المكتبة | الإصدار | الغرض |
|--------|-------|--------|
| Next.js | 16.4.6 | إطار العمل |
| React | 19.3.0 | مكتبة الواجهات |
| TypeScript | 5+ | لغة البرمجة |
| Tailwind CSS | 4.3.3 | التصميم |
| NextAuth | 5+ | المصادقة |
| Axios | latest | طلبات HTTP |
| Lucide React | latest | أيقونات |

## 📝 ملفات الإعداد

### `.env.local.example`
نموذج متغيرات البيئة المطلوبة

### `tailwind.config.ts`
إعداد Tailwind CSS

### `tsconfig.json`
إعداد TypeScript وPathsMapping (@/*)

### `next.config.ts`
إعداد Next.js

## 🚀 الأوامر المتاحة

```bash
npm run dev          # تشغيل سيرفر التطوير
npm run build        # بناء الإصدار الإنتاجية
npm start            # تشغيل الإصدار الإنتاجية
npm run lint         # فحص الأخطاء
```

## 🔄 التدفق الكامل للتطبيق

### 1. التحميل الأول
```
استخدم زيارة localhost:3000
   ↓ (Middleware يفحص الجلسة)
   ↓ (لا توجد جلسة)
   ↓ إعادة توجيه إلى /login
   ↓ صفحة Login تعرض زر Google
```

### 2. تسجيل الدخول
```
المستخدم يضغط "Sign in with Google"
   ↓ Google OAuth Flow
   ↓ NextAuth ينشئ جلسة
   ↓ إعادة توجيه إلى /
```

### 3. الصفحة الرئيسية
```
تُعرض:
- Counter (عداد تفاعلي)
- OdooTodoList (يستدعي GET /api/tasks)
   ↓ (Odoo Client يتصل بـ Odoo)
   ↓ تُعرض المهام
```

### 4. إضافة مهمة
```
المستخدم يكتب المهمة والضغط "Add"
   ↓ POST /api/tasks
   ↓ Odoo Client ينشئ المهمة في Odoo
   ↓ المهمة تُضاف إلى الواجهة
```

## ✨ الميزات المدمجة

- ✅ Google OAuth للمصادقة الآمنة
- ✅ اتصال مباشر مع Odoo
- ✅ واجهة مستخدم تفاعلية
- ✅ Dark Mode
- ✅ Responsive Design
- ✅ Type Safety (TypeScript)
- ✅ Error Handling
- ✅ Loading States

## 🐛 معالجة الأخطاء

- محاولات اتصال فاشلة
- أخطاء المصادقة
- أخطاء الشبكة
- أخطاء قاعدة البيانات

كل هذه الأخطاء يتم التعامل معها بشكل آمن وتُعرض رسائل واضحة للمستخدم.
