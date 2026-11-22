# ⚡ Hostinger - البدء السريع (5 دقائق)

دليل سريع جداً لنشر التطبيق على Hostinger VPS.

## 🚀 الخطوات الأساسية

### 1. الاتصال بالخادم

```bash
ssh root@your_server_ip
```

### 2. استنساخ المشروع

```bash
cd /home/your_username  # أو /root
git clone https://github.com/omc3959/website02.git
cd website02
```

### 3. تشغيل إعداد Hostinger

```bash
chmod +x hostinger-setup.sh
sudo ./hostinger-setup.sh
```

### 4. إعداد المتغيرات

```bash
cp .env.hostinger.example .env
nano .env

# أضف بيانات:
# GOOGLE_CLIENT_ID=...
# GOOGLE_CLIENT_SECRET=...
# ODOO_URL=...
# إلخ
```

### 5. تشغيل التطبيق

```bash
docker-compose -f docker-compose.hostinger.yml up -d
```

### 6. التحقق

```bash
docker-compose -f docker-compose.hostinger.yml ps
docker-compose -f docker-compose.hostinger.yml logs -f web
```

**انتظر حتى ترى:**
```
ready - started server on 0.0.0.0:3000
```

## 📋 أوامر مهمة

```bash
# عرض الحالة
make hostinger-status

# عرض الـ Logs
make hostinger-logs

# إعادة التشغيل
make hostinger-restart

# الإيقاف
make hostinger-down

# النسخ الاحتياطي
make hostinger-backup
```

## 🌍 الوصول

**محلي (SSH):**
```bash
curl http://localhost:3000
```

**من المتصفح (عبر Nginx):**
```
https://your-domain.com
```

## 🔗 المراجع

- [HOSTINGER_DOCKER_SETUP.md](./HOSTINGER_DOCKER_SETUP.md) - شامل
- [HOSTINGER_DEPLOYMENT.md](./HOSTINGER_DEPLOYMENT.md) - تفصيل كامل
- [docker-compose.hostinger.yml](./docker-compose.hostinger.yml) - الإعدادات

## 📊 نظام التخزين

```
/docker/website02/
├── data/      ← البيانات المستمرة
├── logs/      ← ملفات السجلات
└── node_modules/
```

---

**هذا كل شيء! 🎉**

إذا واجهت مشاكل، اقرأ:
- [HOSTINGER_DOCKER_SETUP.md](./HOSTINGER_DOCKER_SETUP.md)
- [INSTALLATION_ISSUES.md](./INSTALLATION_ISSUES.md)
