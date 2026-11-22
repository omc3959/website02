# 🎯 OdooHub - Interactive Web App with Odoo Integration

![Version](https://img.shields.io/badge/version-1.0.0-blue)
![License](https://img.shields.io/badge/license-MIT-green)
![Node](https://img.shields.io/badge/node-20%2B-green)
![Docker](https://img.shields.io/badge/docker-ready-blue)

تطبيق ويب تفاعلي مبني بـ Next.js مع مصادقة Google OAuth وتكامل كامل مع Odoo، جاهز للنشر على Docker و Hostinger.

## ✨ الميزات الرئيسية

- 🔐 **مصادقة آمنة** - Google OAuth integration
- 📊 **تكامل Odoo** - مزامنة المهام مع Odoo ERP
- ⚡ **أداء عالي** - Next.js 16 + React 19
- 🎨 **واجهة حديثة** - Tailwind CSS مع Dark Mode
- 📱 **Responsive** - يعمل على جميع الأجهزة
- 🐳 **Docker Ready** - جاهز للنشر على أي خادم
- 🔄 **Real-time Updates** - مزامنة فورية مع Odoo
- 🔒 **TypeScript** - أمان النوع الكامل

## 📋 المتطلبات

- Node.js 20+
- Docker و Docker Compose (للنشر)
- Google OAuth Credentials
- Odoo Instance Access
- Domain (للنشر على Hostinger)

## 🚀 البدء السريع

### التطوير المحلي

```bash
# تثبيت المكتبات
npm install

# إعداد متغيرات البيئة
cp .env.local.example .env.local
# عدّل .env.local بـ بيانات الإعداد الصحيحة

# تشغيل سيرفر التطوير
npm run dev
```

افتح `http://localhost:3000` في المتصفح.

### استخدام Docker محلياً

```bash
# بناء الصورة
docker-compose build

# تشغيل
docker-compose up -d

# شاهد الـ Logs
docker-compose logs -f web
```

## 📚 الأدلة

| الدليل | الوصف |
|--------|--------|
| [QUICKSTART.md](./QUICKSTART.md) | 🏃 البدء السريع في دقائق |
| [SETUP.md](./SETUP.md) | ⚙️ الإعداد التفصيلي |
| [DOCKER_SETUP.md](./DOCKER_SETUP.md) | 🐳 إعداد Docker و Docker Compose |
| [HOSTINGER_DEPLOYMENT.md](./HOSTINGER_DEPLOYMENT.md) | 🌐 نشر على Hostinger خطوة بخطوة |
| [PROJECT_STRUCTURE.md](./PROJECT_STRUCTURE.md) | 📁 شرح بنية المشروع |
| [INSTALLATION_ISSUES.md](./INSTALLATION_ISSUES.md) | 🔧 حل مشاكل التثبيت |

## 🛠️ الأوامر المتاحة

### التطوير

```bash
npm run dev      # تشغيل سيرفر التطوير
npm run build    # بناء الإصدار الإنتاجية
npm start        # تشغيل الإنتاج
npm run lint     # فحص الأخطاء
```

### Docker

```bash
make help        # عرض جميع الأوامر
make build       # بناء الصورة
make up          # تشغيل الـ Containers
make down        # إيقاف الـ Containers
make logs        # عرض الـ Logs
make shell       # دخول الـ Container
```

### النشر

```bash
make deploy      # نشر كامل
make update      # تحديث من GitHub ونشر
./deploy.sh      # استخدام سكريبت النشر
```

## 📊 بنية المشروع

```
website02/
├── app/
│   ├── api/              # API endpoints
│   │   ├── auth/         # مصادقة NextAuth
│   │   └── tasks/        # endpoints المهام
│   ├── components/       # مكونات React
│   │   ├── Header.tsx
│   │   ├── OdooTodoList.tsx
│   │   ├── Counter.tsx
│   │   └── SessionProvider.tsx
│   ├── lib/              # مكتبات مساعدة
│   │   └── odoo.ts       # عميل Odoo
│   ├── login/            # صفحة تسجيل الدخول
│   ├── layout.tsx        # Layout الرئيسي
│   └── page.tsx          # الصفحة الرئيسية
├── Dockerfile            # Docker configuration
├── docker-compose.yml    # Docker Compose configuration
├── .env.local.example    # مثال متغيرات البيئة
└── Makefile              # أوامر مختصرة
```

## 🔐 الإعداد

### 1. Google OAuth

1. اذهب إلى [Google Cloud Console](https://console.cloud.google.com)
2. أنشئ مشروع جديد
3. أنشئ OAuth 2.0 Credentials
4. أضف Redirect URI: `http://localhost:3000/api/auth/callback/google`
5. انسخ Client ID و Secret إلى `.env.local`

### 2. Odoo

أضف معلومات الاتصال بـ Odoo إلى `.env.local`:

```env
ODOO_URL=https://your-odoo-instance.com
ODOO_DATABASE=your_database
ODOO_USERNAME=your_user@example.com
ODOO_PASSWORD=your_password
```

### 3. NextAuth

```bash
# توليد secret key
openssl rand -hex 32
```

## 🌐 النشر على Hostinger

اقرأ [HOSTINGER_DEPLOYMENT.md](./HOSTINGER_DEPLOYMENT.md) للحصول على دليل كامل خطوة بخطوة.

الخطوات الأساسية:

```bash
# 1. الاتصال بالخادم
ssh root@your_server_ip

# 2. تثبيت Docker
curl -fsSL https://get.docker.com -o get-docker.sh
sudo sh get-docker.sh

# 3. نسخ المشروع
git clone https://github.com/omc3959/website02.git
cd website02

# 4. إعداد المتغيرات
cp .env.hostinger.example .env
nano .env

# 5. النشر
docker-compose build
docker-compose up -d
```

## 📞 الدعم

للمساعدة والاستفسارات:
- 📧 البريد الإلكتروني: omc3959@gmail.com
- 🐙 GitHub Issues: [github.com/omc3959/website02/issues](https://github.com/omc3959/website02/issues)
- 📖 التوثيق: اقرأ الأدلة في هذا المشروع

## 🎉 شكراً لاستخدامك OdooHub!

للبدء الآن:

```bash
# اختر أحد الخيارات:

# 1. تطوير محلي
npm install && npm run dev

# 2. Docker محلي
docker-compose up -d

# 3. نشر على Hostinger
# اقرأ: HOSTINGER_DEPLOYMENT.md
```

---

**Made with ❤️ by Claude**
